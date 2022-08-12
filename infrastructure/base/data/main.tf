locals {
  vpc_id  = "vpc-08c5ed0cc2f966e44"
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
