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

#
# EC2 configuration
#
variable "ec2_instance_type" {
  type        = string
  description = "The type of EC2 instance to launch"
}

#
# RDS configuration
#
variable "rds_instance_class" {
  type        = string
  description = "Instance type of Aurora PostgreSQL server"
}

variable "rds_engine_version" {
  type        = string
  description = "RDS Database engine version"
}

variable "rds_instance_count" {
  type        = number
  default     = 1
  description = "Number of Aurora PostgreSQL instances before autoscaling"
}

variable "rds_log_retention_period" {
  type        = number
  default     = 1
  description = "Time in days to keep log files in cloud watch"
}

variable "rds_backup_retention_period" {
  type        = number
  default     = 7
  description = "Time in days to keep db backups"
}
