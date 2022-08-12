output "db_name" {
  value = aws_db_instance.postgres_db.db_name
}
output "db_username" {
  value = aws_db_instance.postgres_db.username
}
output "db_address" {
  value = aws_db_instance.postgres_db.address
}
output "db_password" {
  value = data.aws_ssm_parameter.db_password.value
}