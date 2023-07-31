terraform {
  backend "s3" {
    bucket = "afoco-test-tfstate"
    dynamodb_table = "afoco-test-tfstate-lock"
    region         	   = "us-east-1"
    encrypt        	   = true
    key                = "terraform.tfstate"
  }
}

module "ecr" {
    source = "./modules/ecr"

    ecr_name = var.ecr_name
}