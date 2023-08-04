output "postgresql_host" {
  value = module.postgresql.host
}

output "postgresql_port" {
  value = module.postgresql.port
}

output "beanstalk_environment_settings" {
  value = module.beanstalk.environment_settings
}

output "beanstalk_lb_dns_name" {
  value = module.beanstalk.lb_dns_name
}

output "acm_certificate_domain_validation_options" {
  description = "A list of attributes to feed into other resources to complete certificate validation. Can have more than one element, e.g. if SANs are defined. Only set if DNS-validation was used."
  value       = flatten(aws_acm_certificate.certificate[*].domain_validation_options)
}
