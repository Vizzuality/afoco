terraform {
  backend "s3" {
    // TF does not allow vars here.
    // Use output state_bucket or "{var.project_name}-tfstate" from the state project
    bucket = "afoco-tfstate"
    // Use var.aws_region from the state project
    region = "us-east-1"
    // Use output state_lock_table or "{var.project_name}-tfstate-lock" from the state project
    dynamodb_table = "afoco-tfstate-lock"
    encrypt        = true
    key            = "state"
  }
}

provider "aws" {
  region = var.aws_region
}

module "staging" {
  source            = "./modules/env"
  domain            = var.staging_domain
  project_name      = var.project_name
  environment       = "staging"
  ec2_instance_type = var.ec2_instance_type
}
