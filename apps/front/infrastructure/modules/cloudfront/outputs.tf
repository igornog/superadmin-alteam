output "origin_access_identity_id" {
  value = aws_cloudfront_origin_access_identity.oai.id
}
output "distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}
output "ui_domain" {
  value = local.cname
}
