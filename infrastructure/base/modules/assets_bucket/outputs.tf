output "bucket_name" {
  value = aws_s3_bucket.assets.id
}

output "bucket_region" {
  value = aws_s3_bucket.assets.region
}

output "bucket_user_access_key" {
  value = aws_iam_access_key.strapi_admin_access_key.id
}

output "bucket_user_secret_key" {
  value     = aws_iam_access_key.strapi_admin_access_key.secret
  sensitive = true
}

output "bucket_regional_domain_name" {
  value = aws_s3_bucket.assets.bucket_regional_domain_name
}