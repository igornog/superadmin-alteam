terraform {
  backend "s3" {
    bucket         = "s3-terraform-remote-state-eu-west-1-858816193321"
    dynamodb_table = "dynamodb-terraform-remote-state-eu-west-1-858816193321"
    region         = "eu-west-1"
    key            = "dev/front"
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
  certificate_arn    = module.data.admin_alteam_cert_arn
  zone_id            = module.data.hosted_zone_id
}
resource "null_resource" "deploy" {
  triggers = {
    always = timestamp()
  }
  provisioner "local-exec" {
    command = "aws s3 sync ${path.module}/../dist s3://alt-${var.stage}-s3-website-tf/ --delete"
  }
}

module "data" {
  source = "../../../infrastructure/modules/base_data"
}

