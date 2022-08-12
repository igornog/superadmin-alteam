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
  source = "./base/data"
}
module "freelancers" {
  source      = "../apps/freelancers/infrastructure"
  stage       = var.stage
  db_name     = module.postgres_db.db_name
  db_username = module.postgres_db.db_username
  db_address  = module.postgres_db.db_address
  db_password = module.postgres_db.db_password
}

module "postgres_db" {
  source = "../libs/postgres-db/infrastructure"
  stage  = var.stage
  vpc_id = module.base_data.vpc_id
}
