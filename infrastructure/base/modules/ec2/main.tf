data "aws_ami" "latest_ubuntu_lts" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

data "aws_vpc" "default" {
  default = true
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.latest_ubuntu_lts.id
  instance_type = var.ec2_instance_type

  root_block_device {
    volume_size = 8
  }

  vpc_security_group_ids = [
    module.ec2_http_sg.security_group_id,
    module.ec2_ssh_sg.security_group_id
  ]
  iam_instance_profile = var.ec2_ecr_profile

  tags = {
    Name = var.ec2_instance_name
  }

  key_name                = "${var.ec2_instance_name}-key"
  monitoring              = true
  disable_api_termination = false
  ebs_optimized           = true
}

module "ec2_ssh_sg" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "ec2_ssh_sg"
  description = "Security group for dev SSH access"
  vpc_id      = data.aws_vpc.default.id

  ingress_cidr_blocks = ["127.0.0.1/32"]
  ingress_rules       = ["ssh-tcp"]
}

module "ec2_http_sg" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "ec2_http_sg"
  description = "Security group for HTTP access"
  vpc_id      = data.aws_vpc.default.id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["http-80-tcp", "https-443-tcp", "all-icmp"]
  egress_rules        = ["all-all"]
}
