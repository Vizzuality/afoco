##
# Module to build the ECR repository
##

resource "aws_ecr_repository" "ecr" {
    name = var.ecr_name
    image_tag_mutability = var.image_mutability
    tags = var.tags

    encryption_configuration {
        encryption_type = var.encrypt_type
    }
}
