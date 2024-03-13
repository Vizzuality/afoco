locals {
  cms_env = {
    HOST                = "0.0.0.0"
    PORT                = 1337
    APP_KEYS            = "toBeModified1,toBeModified2"
    API_TOKEN_SALT      = random_password.api_token_salt.result
    ADMIN_JWT_SECRET    = random_password.admin_jwt_secret.result
    TRANSFER_TOKEN_SALT = random_password.transfer_token_salt.result
    JWT_SECRET          = random_password.jwt_secret.result
    CMS_URL             = "https://${var.domain}/cms/"
    NODE_ENV            = "development"

    # Database
    DATABASE_CLIENT                  = "postgres"
    DATABASE_HOST                    = module.postgresql.host
    DATABASE_PORT                    = module.postgresql.port
    DATABASE_NAME                    = "afoco"
    DATABASE_USERNAME                = module.postgresql.username
    DATABASE_PASSWORD                = module.postgresql.password
    DATABASE_SSL                     = true
    DATABASE_SSL_REJECT_UNAUTHORIZED = false
  }
  client_env = {
    NEXT_PUBLIC_ENVIRONMENT                    = "development"
    NEXT_PUBLIC_URL                            = "https://${var.domain}"
    NEXT_PUBLIC_API_URL                        = "https://${var.domain}/cms/api"
    NEXT_PUBLIC_MAPBOX_API_TOKEN               = var.mapbox_api_token
    NEXT_PUBLIC_GA_TRACKING_ID                 = var.ga_tracking_id
    RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = "false"
  }
}

resource "random_password" "api_token_salt" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "random_password" "admin_jwt_secret" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "random_password" "transfer_token_salt" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "random_password" "jwt_secret" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

module "github_values" {
  source     = "../github_values"
  repo_name  = var.repo_name
  secret_map = {
    PIPELINE_USER_ACCESS_KEY_ID     = var.pipeline_user_access_key_id
    PIPELINE_USER_SECRET_ACCESS_KEY = var.pipeline_user_access_key_secret
    STAGING_CMS_ENV_FILE            = join("\n", [for key, value in local.cms_env : "${key}=${value}"])
    STAGING_CLIENT_ENV_FILE         = join("\n", [for key, value in local.client_env : "${key}=${value}"])
    STAGING_DOMAIN                  = var.domain
  }
  variable_map = {
    AWS_REGION = var.aws_region
  }
}

module "ecr" {
  source = "../ecr"

  project     = var.project_name
  environment = var.environment
  tags        = {
    project     = var.project_name,
    environment = var.environment
  }
}


resource "aws_security_group" "postgresql_access" {
  vpc_id      = var.vpc.id
  description = "SG allowing access to the Postgres SG"

  tags = merge(
    {
      Name = "EC2 SG to access RDS - ${var.environment}"
    },
    var.tags
  )
}

resource "aws_security_group_rule" "port_forward_postgres" {
  type                     = "egress"
  from_port                = module.postgresql.port
  to_port                  = module.postgresql.port
  protocol                 = "-1"
  source_security_group_id = module.postgresql.security_group_id
  security_group_id        = aws_security_group.postgresql_access.id
}

module "postgresql" {
  source = "../postgresql"

  log_retention_period        = var.rds_log_retention_period
  subnet_ids                  = var.subnet_ids
  project                     = var.project_name
  environment                 = var.environment
  rds_backup_retention_period = var.rds_backup_retention_period
  rds_user_name               = "postgres"
  rds_engine_version          = var.rds_engine_version
  rds_instance_class          = var.rds_instance_class
  rds_instance_count          = var.rds_instance_count
  tags                        = var.tags
  vpc_id                      = var.vpc.id
  rds_port                    = 5432
  vpc_cidr_block              = var.vpc.cidr_block
  availability_zones          = var.availability_zones
  database_name               = var.project_name
}

module "beanstalk" {
  source = "../beanstalk"

  project                 = var.project_name
  environment             = var.environment
  region                  = var.aws_region
  application_name        = "${var.project_name}-${var.environment}"
  application_environment = "${var.project_name}-${var.environment}-environment"
  solution_stack_name     = var.beanstalk_platform
  tier                    = var.beanstalk_tier
  tags                    = var.tags
  vpc                     = var.vpc
  public_subnets          = var.subnet_ids
  elb_public_subnets      = var.subnet_ids
  ec2_instance_type       = var.ec2_instance_type
  ec2_disk_size           = var.ec2_disk_size
  rds_security_group_id   = aws_security_group.postgresql_access.id
  domain                  = var.domain
  acm_certificate         = aws_acm_certificate.acm_certificate
}
