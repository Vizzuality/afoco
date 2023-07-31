# Create elastic beanstalk application

resource "aws_elastic_beanstalk_application" "application" {
  name = var.application_name
}

# Create elastic beanstalk Environment

resource "aws_elastic_beanstalk_environment" "application_environment" {
  name                   = var.application_environment
  application            = aws_elastic_beanstalk_application.application.name
  solution_stack_name    = var.solution_stack_name
  tier                   = var.tier
  wait_for_ready_timeout = "20m"

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = var.vpc_id
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", var.public_subnets)
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "AssociatePublicIpAddress"
    value     = "True"
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "ELBScheme"
    value     = "internet facing"
  }
  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "MatcherHTTPCode"
    value     = "200"
  }
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "LoadBalancerType"
    value     = "application"
  }
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = aws_iam_instance_profile.beanstalk_service.name
  }
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.beanstalk_ec2.name
  }
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = var.ec2_instance_type
  }
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = 1
  }
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = 2
  }
  setting {
    namespace = "aws:elasticbeanstalk:healthreporting:system"
    name      = "SystemType"
    value     = "enhanced"
  }
}

resource "aws_s3_bucket" "elasticbeanstalk-deployment" {
  bucket = var.application_deploy_s3_bucket
}

resource "aws_s3_bucket_versioning" "elasticbeanstalk-deployment" {
  bucket = aws_s3_bucket.elasticbeanstalk-deployment.id
  versioning_configuration {
    status = "Enabled"
  }
}

# TODO: not sure if this can be used to create an automation?
resource "aws_elastic_beanstalk_application_version" "latest" {
  name        = aws_elastic_beanstalk_application.application.name
  application = aws_elastic_beanstalk_application.application.name
  bucket      = aws_s3_bucket.elasticbeanstalk-deployment.id
  key         = "Dockerrun.aws.json"
}
