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

variable "ecr_name" {
  description = "The list of ect names to create"
  type = list(string)
  default = null
}
