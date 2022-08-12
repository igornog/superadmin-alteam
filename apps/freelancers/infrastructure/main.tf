module "freelancer_label" {
  source = "../../../infrastructure/module/naming"
  stage  = var.stage
  name   = "freelancer"
}

module "api" {
  source            = "../../../infrastructure/module/api-lambda"
  stage             = var.stage
  package_path      = "${path.module}/../../../dist/apps/freelancers/package.zip"
  retention_in_days = 30
  allowed_methods   = ["PUT", "GET", "DELETE", "POST"]
  env_variables = {
    DB_ADDRESS : var.db_address
    DB_NAME : var.db_name
    DB_USERNAME : var.db_username
    DB_PASSWORD : var.db_password
  }
  namespace         = module.freelancer_label.id
  namespace_tags    = module.freelancer_label.tags
}

