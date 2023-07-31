module "ecr" {
  source   = "../ecr"
  ecr_name = "${var.project_name}-${var.environment}"
  ecr_tags = {
    project     = var.project_name,
    environment = var.environment
  }
}

module "ec2" {
  source            = "../ec2"
  ec2_instance_type = var.ec2_instance_type
  ec2_instance_name = "${var.project_name}-${var.environment}"
}

module "iam" {
  source       = "../iam"
  project_name = var.project_name
  environment  = var.environment
}
