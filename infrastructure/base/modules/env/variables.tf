variable "domain" {
  type = string
}

variable "project_name" {
  type        = string
  description = "Short name of the project, will be used to prefix created resources"
}

variable "environment" {
  type        = string
  description = "Name of the environment, will be used to prefix created resources"
}

variable "ec2_instance_type" {
  type        = string
  description = "The type of EC2 instance to launch"
}
