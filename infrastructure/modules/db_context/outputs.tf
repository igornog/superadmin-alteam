output "context" {
  value = {
    DB_ADDRESS : local.domain
    DB_NAME : local.db_name
    DB_USERNAME : "postgres"
    DB_PASSWORD : data.aws_ssm_parameter.db_password.value
  }
}

