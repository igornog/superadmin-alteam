output "subnets" {
  value = toset(data.aws_subnets.private.ids)
}
output "vpc_id" {
  value = local.vpc_id
}
output "alteam_cert_arn" {
  value = local.alteam_cert_arn
}
output "hoste_zone_id" {
  value = local.hosted_zone_id
}
