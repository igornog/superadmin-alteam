terraform {
  backend "s3" {
    bucket         = "s3-terraform-remote-state-eu-west-1-858816193321"
    dynamodb_table = "dynamodb-terraform-remote-state-eu-west-1-858816193321"
    region         = "eu-west-1"
    key            = "dev/auth-api"
  }
  required_version = ">= 1.1.9, < 2.0.0"
}
module "freelancer_label" {
  source = "../../../infrastructure/modules/naming"
  stage  = var.stage
  name   = "auth"
}

module "api" {
  source            = "../../../infrastructure/modules/api-lambda"
  stage             = var.stage
  package_path      = "${path.module}/../dist/package.zip"
  allowed_methods   = ["POST"]
  namespace         = module.freelancer_label.id
  namespace_tags    = module.freelancer_label.tags
  api_mapping_key = "auth"
}
