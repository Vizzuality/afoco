output "beanstalk_environment_instances" {
  value = module.beanstalk.environment_instances
}

output "beanstalk_environment_settings" {
  value = module.beanstalk.environment_settings
}

output "postgresql_host" {
  value = module.postgresql.host
}

output "postgresql_port" {
  value = module.postgresql.port
}
