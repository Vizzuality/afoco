variable "aws_region" {
  type        = string
  description = "AWS region"
  default     = "ap-northeast-2"
}

variable "allowed_account_id" {
  type        = string
  description = "AWS account id"
}

variable "project_name" {
  type        = string
  description = "Short name of the project, will be used to prefix created resources"
  default     = "vizz"
}

variable "staging_domain" {
  type = string
}

variable "production_domain" {
  type = string
}

variable "ec2_instance_type" {
  type        = string
  description = "The type of EC2 instance to launch"
}
