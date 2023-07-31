module "ecr" {
  source   = "../ecr"
  ecr_name = "${var.project_name}-${var.environment}-image-repository"
}
