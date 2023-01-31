output "subnets" {
  value = toset(data.aws_subnets.private.ids)
}
output "vpc_id" {
  value = local.vpc_id
}
output "alteam_cert_arn" {
  value = local.alteam_cert_arn
}
output "admin_alteam_cert_arn" {
  value = local.admin_alteam_cert_arn
}
output "hosted_zone_id" {
  value = local.hosted_zone_id
}
output "alteam_api_cert_arn" {
  value = local.alteam_api_cert_arn
}
