output "azs_with_ec2_instance_type_offering_ids" {
  value = data.aws_ec2_instance_type_offerings.azs_with_ec2_instance_type_offering.locations
}

output "subnets_with_ec2_instance_type_offering_ids" {
  value = local.subnets_with_ec2_instance_type_offering_ids
}

output "staging_beanstalk_environment_instances" {
  value = module.staging.beanstalk_environment_instances
}

output "staging_beanstalk_environment_settings" {
  value = module.staging.beanstalk_environment_settings
}

output "staging_postgresql_host" {
  value = module.staging.postgresql_host
}

output "staging_postgresql_port" {
  value = module.staging.postgresql_port
}
