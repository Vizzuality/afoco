output "environment_settings" {
  value = aws_elastic_beanstalk_environment.application_environment.all_settings
}

# output "instances" {
#   value       = try(aws_elastic_beanstalk_environment.application_environment.instances, [])
#   description = "Instances used by this environment"
# }

# output "load_balancers" {
#   value       = try(aws_elastic_beanstalk_environment.application_environment.load_balancers, [])
#   description = "Elastic Load Balancers in use by this environment"
# }

output "lb_dns_name" {
  value = data.aws_lb.load_balancer_dns.dns_name
}
