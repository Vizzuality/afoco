output "postgresql_host" {
  value = module.postgresql.host
}

output "postgresql_port" {
  value = module.postgresql.port
}

output "postgresql_username" {
  value = module.postgresql.username
}

output "postgresql_password" {
  value = module.postgresql.password
}

output "beanstalk_environment_settings" {
  value = module.beanstalk.environment_settings
}

output "beanstalk_environment_cname" {
  value = module.beanstalk.environment_cname
}

output "acm_certificate_domain_validation_options" {
  description = "A list of attributes to feed into other resources to complete certificate validation. Can have more than one element, e.g. if SANs are defined. Only set if DNS-validation was used."
  value       = flatten(aws_acm_certificate.acm_certificate[*].domain_validation_options)
}

output "acm_certificate_arn" {
  description = "The ARN of the ACM certificate"
  value       = aws_acm_certificate.acm_certificate.arn
}

output "assets_bucket_name" {
  value = module.assets_bucket.bucket_name
}

output "assets_bucket_region" {
  value = module.assets_bucket.bucket_region
}

output "assets_bucket_user_access_key" {
  value = module.assets_bucket.bucket_user_access_key
}

output "assets_bucket_user_secret_key" {
  value     = module.assets_bucket.bucket_user_secret_key
  sensitive = true
}

output "assets_bucket_regional_domain_name" {
  value = module.assets_bucket.bucket_regional_domain_name
}
