variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "domain" {
  type = string
}

variable "project_name" {
  type        = string
  description = "Short name of the project, will be used to prefix created resources"
}

variable "repo_name" {
  type        = string
  description = "Name of the Github repository where the code is hosted"
}


variable "environment" {
  type        = string
  description = "Name of the environment, will be used to prefix created resources"
}

variable "vpc" {
}

variable "tags" {
  default     = {}
  description = "Additional tags to add to resources"
}

variable "subnet_ids" {
}

variable "availability_zones" {
  type = list(string)
}

# IAM user that deploys TF
variable "pipeline_user_access_key_id" {
  type        = string
  description = "Access key id for the AWS user that will deploy the AWS resources"
  sensitive   = true
}

variable "pipeline_user_access_key_secret" {
  type        = string
  description = "Access key secret for the AWS user that will deploy the AWS resources"
  sensitive   = true
}

# Beanstalk configuration
variable "beanstalk_platform" {
  type        = string
  description = "The Elastic Beanstalk platform to use"
}

variable "beanstalk_tier" {
  type        = string
  description = "The Elastic Beanstalk tier to use"
}

variable "ec2_instance_type" {
  type        = string
  description = "EC2 instance type for the server"
}

variable "ec2_disk_size" {
  type        = string
  description = "The size of EC2 instance disk to launch"
}

# RDS configuration
variable "rds_backup_retention_period" {
  type        = number
  description = "Number of days to retain backup for the database"
  default     = 7
}

variable "rds_log_retention_period" {
  type        = number
  description = "Number of days to retain logs in Cloud Watch"
  default     = 30
}

variable "rds_engine_version" {
  type        = string
  description = "RDS Database engine version"
}

variable "rds_instance_count" {
  type        = number
  description = "Number of permanent RDS instances"
  default     = 1
}

variable "rds_instance_class" {
  type        = string
  description = "RDS instance type class"
}

# Client env vars
variable "ga_tracking_id" {
  type        = string
  default     = ""
  description = "Google Analytics tracking id"
}

variable "mapbox_api_token" {
  type        = string
  default     = ""
  description = "Mapbox api token"
}

variable "cert_validated" {
  type        = bool
  default     = false
  description = "Whether certificate is already validated or not"
}

variable "node_env" {
  type        = string
  default     = "production"
  description = "Node environment"
}
