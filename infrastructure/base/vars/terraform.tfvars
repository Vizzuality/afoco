aws_region         = "ap-northeast-2"
allowed_account_id = "AWS ACCOUNT ID"
project_name       = "afoco"
repo_name          = "afoco"

# domains managed externally
production_domain = "climation.afocosec.org"
staging_domain    = "climation-staging.afocosec.org"

beanstalk_platform = "64bit Amazon Linux 2023 v4.0.0 running Docker"
beanstalk_tier     = "WebServer"
ec2_instance_type  = "t3a.small"
ec2_disk_size      = "32"
rds_engine_version = "15.5"
rds_instance_class = "db.t3.micro"
