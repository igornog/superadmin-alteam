output "env_variables" {
  value = {
    TOKEN_SECRET : data.aws_ssm_parameter.token_secret.value
  }
}
