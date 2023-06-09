module "security_label" {
  source = "../../../../../infrastructure/modules/naming"
  stage  = var.stage
  name   = "postgres_db-security-group"
}
locals {
  stage_with_int = var.stage == "prod" ? "prod" : "int"
}

data "aws_ssm_parameter" "db_password" {
  name = "db_password"
}
resource "aws_security_group" "security_group" {
  name   = module.security_label.id
  vpc_id = var.vpc_id
  tags   = module.security_label.tags
}

resource "aws_security_group_rule" "postgresql" {
  security_group_id = aws_security_group.security_group.id
  from_port         = 5432
  protocol          = "tcp"
  to_port           = 5432
  type              = "ingress"
  cidr_blocks = [
    "0.0.0.0/0"
  ]
  ipv6_cidr_blocks = ["::/0"]
}
resource "aws_security_group_rule" "all_outbound" {
  security_group_id = aws_security_group.security_group.id
  protocol          = "all"
  type              = "egress"
  from_port         = 0
  to_port           = 0
  cidr_blocks = [
    "0.0.0.0/0"
  ]
  ipv6_cidr_blocks = [
    "::/0"
  ]
}

resource "aws_db_instance" "postgres_db" {
  identifier              = "${local.stage_with_int}-db"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  engine                  = "postgres"
  engine_version          = "14.4"
  db_name                 = "alteam_db"
  username                = "postgres"
  allow_major_version_upgrade = true
  auto_minor_version_upgrade = true
  password                = data.aws_ssm_parameter.db_password.value
  backup_retention_period = 30
  copy_tags_to_snapshot   = true
  vpc_security_group_ids  = [aws_security_group.security_group.id]
  parameter_group_name    = "default.postgres14"
  publicly_accessible     = true
  skip_final_snapshot     = true
}
resource "null_resource" "run_db_creation" {
  triggers = {
    always_run = timestamp()
  }

  depends_on = [
    aws_db_instance.postgres_db
  ]

  provisioner "local-exec" {
    command = "${path.module}/../../../scripts/createDatabase.sh"
  }
}

resource "null_resource" "run_migrations" {

  triggers = {
    always_run = timestamp()
  }

  depends_on = [
    null_resource.run_db_creation
  ]

  provisioner "local-exec" {
    command = "${path.module}/../../../scripts/migrateRun.sh"
  }
}

resource "aws_route53_record" "database" {
  zone_id = var.zone_id
  name    = "${local.stage_with_int}.db.alteam.io"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_db_instance.postgres_db.address]
}
