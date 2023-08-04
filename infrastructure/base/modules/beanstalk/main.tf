#
# Site Server Security Groups
# SSH access to and from the world
# HTTP(S) access from the world
#
resource "aws_security_group" "site_server_ssh_security_group" {
  vpc_id      = var.vpc.id
  name        = "${var.project}-${var.environment}-public-ssh-sg"
  description = "Security group for SSH access to and from the world - ${var.project} ${var.environment}"

  tags = merge(
    {
      Name = "EC2 SSH access SG"
    },
    var.tags
  )

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group_rule" "ssh_ingress" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.site_server_ssh_security_group.id
}

resource "aws_security_group_rule" "ssh_egress" {
  type        = "egress"
  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = [var.vpc.cidr_block]

  security_group_id = aws_security_group.site_server_ssh_security_group.id
}

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
    value     = var.vpc.id
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
    # value     = aws_iam_instance_profile.beanstalk_service.name
    # value = aws_iam_service_linked_role.elasticbeanstalk.name
    value = "AWSServiceRoleForElasticBeanstalk"
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
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "SecurityGroups"
    value     = join(",", [aws_security_group.site_server_ssh_security_group.id, var.rds_security_group_id])
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
  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "StreamLogs"
    value     = "true"
  }
  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "RetentionInDays"
    value     = "7"
  }
  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "DeleteOnTerminate"
    value     = "false"
  }
}

data "aws_lb" "load_balancer_dns" {
  arn  = aws_elastic_beanstalk_environment.application_environment.load_balancers[0]
}
