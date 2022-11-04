output "bucket_id" {
  value = module.website.bucket_id
}
output "distribution_id" {
  value = module.cloudfront.distribution_id
}
output "user_pool_arn" {
  value = module.user_pool.user_pool_arn
}
output "cognito_issuer" {
  value =  module.user_pool.cognito_issuer
}

output "cognito_jwks" {
  value =  module.user_pool.jwks
}
