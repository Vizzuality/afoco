# Request and validate an SSL certificate from AWS Certificate Manager (ACM)
resource "aws_acm_certificate" "certificate" {
  domain_name       = var.domain
  validation_method = "DNS"

  tags = {
    Name = "${var.domain} SSL certificate"
  }
}
