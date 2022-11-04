output "regional_domain_name" {
  value = aws_s3_bucket.s3.bucket_regional_domain_name
}
output "domain_name" {
  value = aws_s3_bucket.s3.bucket_domain_name
}
output "bucket_id" {
  value = aws_s3_bucket.s3.id
}
