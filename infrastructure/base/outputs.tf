output "availability_zones" {
  value = data.aws_availability_zones.azs_with_ec2_instance_type_offering.names
}

output "subnets" {
  value = local.subnets_with_ec2_instance_type_offering_ids
}

output "staging_postgresql_host" {
  value = module.staging.postgresql_host
}

output "staging_postgresql_port" {
  value = module.staging.postgresql_port
}

output "staging_beanstalk_environment_settings" {
  value = module.staging.beanstalk_environment_settings
}

output "staging_beanstalk_environment_cname" {
  value = module.staging.beanstalk_environment_cname
}

output "staging_acm_certificate_domain_validation_options" {
  description = "A list of attributes to feed into other resources to complete certificate validation. Can have more than one element, e.g. if SANs are defined. Only set if DNS-validation was used."
  value       = module.staging.acm_certificate_domain_validation_options
}

output "staging_acm_certificate_arn" {
  value = module.staging.acm_certificate_arn
}

output "staging_assets_bucket_name" {
  value = module.staging.assets_bucket_name
}

output "staging_assets_bucket_region" {
  value = module.staging.assets_bucket_region
}

output "staging_assets_bucket_user_access_key" {
  value = module.staging.assets_bucket_user_access_key
}

output "staging_assets_bucket_user_secret_key" {
  value     = module.staging.assets_bucket_user_secret_key
  sensitive = true
}

output "staging_assets_bucket_regional_domain_name" {
  value = module.staging.assets_bucket_regional_domain_name
}