# TODO: not sure this will be needed, this was supposed to be for fetching images from ECR onto EC2
resource "aws_iam_role" "ec2_ecr_role" {
  name = "${var.project_name}-${var.environment}-ec2_ecr_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF

  tags = {
    project     = var.project_name,
    environment = var.environment
  }
}

resource "aws_iam_instance_profile" "ec2_ecr_profile" {
  name = "${var.project_name}-${var.environment}-ec2_ecr_profile"
  role = aws_iam_role.ec2_ecr_role.name
}

resource "aws_iam_role_policy" "ec2_ecr_policy" {
  name = "${var.project_name}-${var.environment}-ec2_ecr_policy"
  role = aws_iam_role.ec2_ecr_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}
