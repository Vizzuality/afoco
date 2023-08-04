variable "project" {
  type        = string
  description = "A project namespace for the infrastructure."
}

variable "environment" {
  type        = string
  description = "The name of the environment this server hosts"
}

variable "region" {
  type        = string
  description = "A valid AWS region to house VPC resources."
}

variable "application_name" {
  type    = string
  default = "myapp"
}
variable "application_environment" {
  type    = string
  default = "myenv"
}
variable "solution_stack_name" {
  type = string
}
variable "tier" {
  type = string
}

variable "tags" {
  default     = {}
  type        = map(string)
  description = "A mapping of keys and values to apply as tags to all resources that support them."
}

variable "vpc" {}
variable "public_subnets" {}
variable "elb_public_subnets" {}

variable "ec2_instance_type" {
  type        = string
  description = "The type of EC2 instance to launch"
}

variable "rds_security_group_id" {
  type        = string
  description = "The security group ID for the RDS instance"
}

variable "domain" {
  type        = string
  description = "The domain name to use for the environment"
}
