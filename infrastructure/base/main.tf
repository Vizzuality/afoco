terraform {
  backend "s3" {
    // TF does not allow vars here.
    // Use output state_bucket or "{var.project_name}-tfstate" from the state project
    bucket = "afoco-terraform-state"
    // Use var.aws_region from the state project
    region = "ap-northeast-2"
    // Use output state_lock_table or "{var.project_name}-tfstate-lock" from the state project
    dynamodb_table = "afoco-terraform-state-lock"
    encrypt        = true
    key            = "state"
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_vpc" "default_vpc" {
  default = true
}

data "aws_availability_zones" "all_available_azs" {
  state = "available"
}

# THIS IS TO FILTER THE AVAILABLE ZONES BY EC2 INSTANCE TYPE AVAILABILITY
# returns zone ids that have the requested instance type available
data "aws_ec2_instance_type_offerings" "azs_with_ec2_instance_type_offering" {
  filter {
    name   = "instance-type"
    values = [var.ec2_instance_type]
  }

  filter {
    name   = "location"
    values = data.aws_availability_zones.all_available_azs.zone_ids
  }

  location_type = "availability-zone-id"
}

# THIS IS TO FIND THE NAMES OF THOSE ZONES GIVEN BY IDS FROM ABOVE...
# because we need the names to pass to the staging module
data "aws_availability_zones" "azs_with_ec2_instance_type_offering" {
  filter {
    name   = "zone-id"
    values = data.aws_ec2_instance_type_offerings.azs_with_ec2_instance_type_offering.locations
  }
}

# THIS IS TO FILTER THE SUBNETS BY AVAILABILITY ZONES WITH EC2 INSTANCE TYPE AVAILABILITY
# so that we know which subnets can be passed to the beanstalk resource without upsetting it
data "aws_subnets" "subnets_with_ec2_instance_type_offering_map" {
  for_each = toset(data.aws_ec2_instance_type_offerings.azs_with_ec2_instance_type_offering.locations)

  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default_vpc.id]
  }

  filter {
    name   = "availability-zone-id"
    values = ["${each.value}"]
  }
}

locals {
  subnets_with_ec2_instance_type_offering_ids = [for k, v in data.aws_subnets.subnets_with_ec2_instance_type_offering_map : v.ids[0]]
}

data "aws_ami" "latest-ubuntu-lts" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# User data script to bootstrap authorized ssh keys
data "template_file" "server_setup" {
  template = file("${path.module}/templates/server_setup.sh.tpl")
  vars = {
    user     = "ubuntu"
    hostname = var.project_name
    authorized_ssh_keys = <<EOT
%{for row in formatlist("echo \"%v\" >> /home/ubuntu/.ssh/authorized_keys",
values(aws_key_pair.all)[*].public_key)~}
${row}
%{endfor~}
EOT
}
}

module "staging" {
  source       = "./modules/env"
  domain       = var.staging_domain
  project_name = var.project_name
  environment  = "staging"
  aws_region   = var.aws_region
  vpc          = data.aws_vpc.default_vpc
  # subnet_ids         = data.aws_subnets.subnet_ids.ids
  subnet_ids         = local.subnets_with_ec2_instance_type_offering_ids
  availability_zones = data.aws_availability_zones.azs_with_ec2_instance_type_offering.names
  ec2_instance_type  = var.ec2_instance_type
  ec2_ami            = data.aws_ami.latest-ubuntu-lts.id
  ec2_user_data      = data.template_file.server_setup.rendered
  rds_engine_version = var.rds_engine_version
  rds_instance_class = var.rds_instance_class
}
