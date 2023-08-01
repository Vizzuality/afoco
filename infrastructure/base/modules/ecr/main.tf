##
# Module to build the ECR repository
##

resource "aws_ecr_repository" "ecr" {
  name                 = var.ecr_name
  image_tag_mutability = var.image_mutability
  tags                 = var.ecr_tags

  encryption_configuration {
    encryption_type = var.encrypt_type
  }
}

resource "aws_ecr_lifecycle_policy" "default_policy" {
  repository = aws_ecr_repository.ecr.name
  policy     = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last n cms images",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["cms"],
                "countType": "imageCountMoreThan",
                "countNumber": 3
            },
            "action": {
                "type": "expire"
            }
        },
        {
            "rulePriority": 2,
            "description": "Keep last n client images",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["client"],
                "countType": "imageCountMoreThan",
                "countNumber": 3
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
