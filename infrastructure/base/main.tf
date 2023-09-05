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
    values = sort(data.aws_ec2_instance_type_offerings.azs_with_ec2_instance_type_offering.locations)
  }
}

# THIS IS TO FILTER THE SUBNETS BY AVAILABILITY ZONES WITH EC2 INSTANCE TYPE AVAILABILITY
# so that we know which subnets can be passed to the beanstalk resource without upsetting it
data "aws_subnets" "subnets_with_ec2_instance_type_offering_map" {
  for_each = toset(
    data.aws_ec2_instance_type_offerings.azs_with_ec2_instance_type_offering.locations
  )

  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default_vpc.id]
  }

  filter {
    name   = "availability-zone-id"
    values = ["${each.value}"]
  }
}

module "iam" {
  source = "./modules/iam"
}


locals {
  subnets_with_ec2_instance_type_offering_ids = sort([
    for k, v in data.aws_subnets.subnets_with_ec2_instance_type_offering_map : v.ids[0]
  ])
}

module "staging" {
  source                          = "./modules/env"
  domain                          = var.staging_domain
  project_name                    = var.project
  repo_name                       = var.repo_name
  environment                     = "staging"
  aws_region                      = var.aws_region
  vpc                             = data.aws_vpc.default_vpc
  subnet_ids                      = local.subnets_with_ec2_instance_type_offering_ids
  availability_zones              = data.aws_availability_zones.azs_with_ec2_instance_type_offering.names
  beanstalk_platform              = var.beanstalk_platform
  beanstalk_tier                  = var.beanstalk_tier
  ec2_instance_type               = var.ec2_instance_type
  rds_engine_version              = var.rds_engine_version
  rds_instance_class              = var.rds_instance_class
  mapbox_api_token                = var.mapbox_api_token
  ga_tracking_id                  = var.ga_tracking_id
  pipeline_user_access_key_id     = module.iam.pipeline_user_access_key_id
  pipeline_user_access_key_secret = module.iam.pipeline_user_access_key_secret
}
