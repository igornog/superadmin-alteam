terraform {
  backend "s3" {
    bucket         = "s3-terraform-remote-state-eu-west-1-858816193321"
    dynamodb_table = "dynamodb-terraform-remote-state-eu-west-1-858816193321"
    region         = "eu-west-1"
    key            = "prod"
  }
  required_version = ">= 1.1.9, < 2.0.0"
}

provider "aws" {
  region = var.region
}
module "base_data" {
  source = "modules/base_data"
}
