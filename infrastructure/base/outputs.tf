# output "all_availability_zones" {
#   value = data.aws_availability_zones.all_available_azs.names
# }

output "azs_with_ec2_instance_type_offering_ids" {
  value = data.aws_ec2_instance_type_offerings.azs_with_ec2_instance_type_offering.locations
}

# output "azs_with_ec2_instance_type_offering_names" {
#   value = data.aws_availability_zones.azs_with_ec2_instance_type_offering.names
# }

# output "subnet_ids_with_ec2_instance_type_offering_map" {
#   value = data.aws_subnets.subnets_with_ec2_instance_type_offering_map
# }

output "subnets_with_ec2_instance_type_offering_ids" {
  value = local.subnets_with_ec2_instance_type_offering_ids
}

output "staging_beanstalk_environment_instances" {
  value = module.staging.beanstalk_environment_instances
}

output "staging_beanstalk_environment_settings" {
  value = module.staging.beanstalk_environment_settings
}
