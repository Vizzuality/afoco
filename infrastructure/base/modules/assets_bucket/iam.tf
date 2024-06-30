resource "aws_iam_user" "strapi_admin" {
  name = "${var.application_name}-strapi-admin"
}

resource "aws_iam_access_key" "strapi_admin_access_key" {
  user = aws_iam_user.strapi_admin.name
}

data "aws_iam_policy_document" "strapi_admin_s3_policy" {
  statement {
    effect    = "Allow"
    actions   = ["s3:ListBucket", "s3:ListAllMyBuckets"]
    resources = ["*"]
  }
  statement {
    effect    = "Allow"
    actions   = ["s3:*"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.assets.id}/*"]
  }
}

resource "aws_iam_policy" "strapi_admin_s3_policy" {
  name        = "${var.application_name}-strapi-admin-s3-policy"
  description = "Allows Strapi admin to manage assets in the assets bucket"
  policy      = data.aws_iam_policy_document.strapi_admin_s3_policy.json
}

resource "aws_iam_policy_attachment" "strapi_admin_s3_policy" {
  name = "${var.application_name}-strapi-admin-s3-policy-attachment"
  policy_arn = aws_iam_policy.strapi_admin_s3_policy.arn
  users      = [aws_iam_user.strapi_admin.name]
}