variable "ecr_name" {
  description = "The name of the ECR registry"
  type        = string
  default     = null
}

variable "image_mutability" {
  description = "Provide image mutability"
  type        = string
  default     = "IMMUTABLE"
}

variable "encrypt_type" {
  description = "Provide type of encryption"
  type        = string
  default     = "KMS"
}

variable "ecr_tags" {
  description = "The key-value maps for tagging"
  type        = map(string)
  default     = {}
}
