terraform {
  backend "s3" {
    bucket         = "s3-terraform-remote-state-eu-west-1-858816193321"
    dynamodb_table = "dynamodb-terraform-remote-state-eu-west-1-858816193321"
    region         = "eu-west-1"
  }
  required_version = ">= 1.1.9, < 2.0.0"
}

module "talent_label" {
  source = "../../../infrastructure/modules/naming"
  stage  = var.stage
  name   = "talent"
}

module "database_context" {
  source = "../../../infrastructure/modules/db_context"
  stage  = var.stage
}

module "api" {
  source          = "../../../infrastructure/modules/api-lambda"
  stage           = var.stage
  package_path    = "${path.module}/../dist/package.zip"
  api_mapping_key = "talent"
  allowed_methods = ["PUT", "GET", "DELETE", "POST"]
  env_variables   = module.database_context.context
  namespace       = module.talent_label.id
  namespace_tags  = module.talent_label.tags
}
