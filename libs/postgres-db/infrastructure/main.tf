terraform {
  backend "s3" {
    bucket         = "s3-terraform-remote-state-eu-west-1-858816193321"
    dynamodb_table = "dynamodb-terraform-remote-state-eu-west-1-858816193321"
    region         = "eu-west-1"
  }
  required_version = ">= 1.1.9, < 2.0.0"
}
module "data" {
  source = "../../../infrastructure/modules/base_data"
}
module "db" {
  source = "./modules/db"
  stage = var.stage
  vpc_id = module.data.vpc_id
  zone_id = module.data.hosted_zone_id

}
