locals {
  isProd = var.stage == "prod"
}
module "bucket_label" {
  source = "../../../../../infrastructure/modules/naming"
  stage  = var.stage
  name   = "s3-website"
}

resource "aws_s3_bucket" "s3" {
  bucket        = module.bucket_label.id
  tags          = module.bucket_label.tags
  force_destroy = !local.isProd
}

resource "aws_s3_bucket_policy" "allow_access_from_another_account" {
  bucket = aws_s3_bucket.s3.id
  policy = templatefile("${path.module}/s3-website-policy.json", {
    bucket-name : module.bucket_label.id
    origin_access_identity_id : var.origin_access_identity_id
  })
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.s3.id

  index_document {
    suffix = "index.html"
  }
}
