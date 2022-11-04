locals {
  vpc_id  = "vpc-08c5ed0cc2f966e44"
  alteam_cert_arn = "arn:aws:acm:us-east-1:858816193321:certificate/159085fe-75ea-41ae-9bad-27f4d667151d"
  hosted_zone_id = "Z0939757W8GV0GAF55V5"
}
provider "aws" {
  alias  = "eu"
  region = "eu-west-1"
}
data "aws_subnets" "private" {
  filter {
    name   = "vpc-id"
    values = [local.vpc_id]
  }
}
