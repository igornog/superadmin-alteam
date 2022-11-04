terraform {
  backend "s3" {
    bucket         = "s3-terraform-remote-state-eu-west-1-858816193321"
    dynamodb_table = "dynamodb-terraform-remote-state-eu-west-1-858816193321"
    region         = "eu-west-1"
    key            = "prod"
  }
  required_version = ">= 1.1.9, < 2.0.0"
}

module "website" {
  source                    = "./modules/s3-static-website"
  stage                     = var.stage
  origin_access_identity_id = module.cloudfront.origin_access_identity_id
}
module "cloudfront" {
  source             = "./modules/cloudfront"
  bucket_domain_name = module.website.regional_domain_name
  stage              = var.stage
  certificate_arn    = var.certificate_arn
  zone_id            = var.zone_id
}

