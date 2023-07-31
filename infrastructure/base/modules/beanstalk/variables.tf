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

variable "vpc_id" {}
variable "public_subnets" {}
variable "elb_public_subnets" {}

variable "application_deploy_s3_bucket" {
  type = string
}

variable "ec2_instance_type" {
  type        = string
  description = "The type of EC2 instance to launch"
}
