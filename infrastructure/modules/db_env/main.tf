locals {
  subdomain = var.stage == "prod" ? "prod" : "int"
  domain = "${local.subdomain}.db.alteam.io"
  db_name = var.stage == "prod" ? "alteam_db" : var.stage
}
data "aws_ssm_parameter" "db_password" {
  name = "db_password"
}
