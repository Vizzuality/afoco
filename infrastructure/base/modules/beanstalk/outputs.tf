output "environment_instances" {
  value = aws_elastic_beanstalk_environment.application_environment.instances
}

output "environment_settings" {
  value = aws_elastic_beanstalk_environment.application_environment.all_settings
}
