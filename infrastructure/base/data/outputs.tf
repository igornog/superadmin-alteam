output "subnets" {
  value = toset(data.aws_subnets.private.ids)
}
output "vpc_id" {
  value = local.vpc_id
}
