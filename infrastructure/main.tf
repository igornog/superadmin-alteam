terraform {
  backend "s3" {
    bucket         = "s3-terraform-remote-state-eu-west-1-858816193321"
    dynamodb_table = "dynamodb-terraform-remote-state-eu-west-1-858816193321"
    region         = "eu-west-1"
  }
  required_version = ">= 1.1.9, < 2.0.0"
}

provider "aws" {
  region = var.region
}
module "base_data" {
  source = "./modules/base_data"
}

module "domain_name" {
  source          = "./modules/api_domain"
  stage           = var.stage
  certificate_arn = module.base_data.alteam_api_cert_arn
  hosted_zone_id  = module.base_data.hosted_zone_id
}
