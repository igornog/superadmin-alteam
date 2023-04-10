terraform {
  backend "s3" {
    bucket         = "s3-terraform-remote-state-eu-west-1-858816193321"
    dynamodb_table = "dynamodb-terraform-remote-state-eu-west-1-858816193321"
    region         = "eu-west-1"
  }
  required_version = ">= 1.1.9, < 2.0.0"
}
locals {
  is_prod = var.stage == "prod"
}

module "ui_label" {
  source = "../../../infrastructure/modules/naming"
  stage  = var.stage
  name   = "ui"
}
resource "aws_amplify_app" "app" {
  name                     = module.ui_label.id
  repository               = "https://github.com/YJCollective/yjcapp"
  access_token = "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"
}
resource "aws_amplify_branch" "branch" {
  app_id            = aws_amplify_app.app.id
  branch_name       = local.is_prod ? "main" : "develop"
  enable_auto_build = true
  stage = "PRODUCTION"
}

resource "aws_amplify_domain_association" "domain_association" {
  app_id      = aws_amplify_app.app.id
  domain_name = "listing.alteam.io"

  dynamic "sub_domain" {
    for_each = local.is_prod ? [""] : ["dev"]
    content {
      branch_name = aws_amplify_branch.branch.branch_name
      prefix      = sub_domain.value
    }
  }
}
