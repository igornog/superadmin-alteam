terraform {
  backend "s3" {
    bucket         = "s3-terraform-remote-state-eu-west-1-858816193321"
    dynamodb_table = "dynamodb-terraform-remote-state-eu-west-1-858816193321"
    region         = "eu-west-1"
    key            = "dev/auth-api"
  }
  required_version = ">= 1.1.9, < 2.0.0"
}
module "asset_label" {
  source = "../../../infrastructure/modules/naming"
  stage  = var.stage
  name   = "asset"
}
module "auth_env" {
  source = "../../../infrastructure/modules/auth_env"
}
module "api" {
  source            = "../../../infrastructure/modules/api_lambda"
  stage             = var.stage
  package_path      = "${path.module}/../dist/package.zip"
  allowed_methods   = ["POST","GET"]
  namespace         = module.asset_label.id
  namespace_tags    = module.asset_label.tags
  api_mapping_key = "asset"
  env_variables = module.auth_env.env_variables
}
module "asset_distribution" {
  source = "./modules/assetDistribution"
  stage  = var.stage
  id = module.asset_label.id
  tags = module.asset_label.tags
}
