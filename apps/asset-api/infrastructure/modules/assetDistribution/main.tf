locals {
  isProd = var.stage == "prod"
  cName  = "assets.alteam.io"
}

resource "aws_s3_bucket" "s3" {
  bucket        = "s3-${var.id}"
  tags          = var.tags
  force_destroy = !local.isProd
}

resource "aws_s3_bucket_policy" "allow_access_from_another_account" {
  bucket = aws_s3_bucket.s3.id
  policy = templatefile("${path.module}/s3-website-policy.json", {
    bucket-name : aws_s3_bucket.s3.id
    origin_access_identity_id : aws_cloudfront_origin_access_identity.oai.id
  })
}

resource "aws_cloudfront_cache_policy" "static_cache" {
  name        = "cloudfront-${var.id}-static-cache-policy"
  default_ttl = 2592000
  max_ttl     = 2592000
  min_ttl     = 2592000
  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for ${var.id}"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.s3.bucket_regional_domain_name
    origin_id   = "S3Origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  wait_for_deployment = false
  aliases             = [local.cName]

  enabled             = true
  is_ipv6_enabled     = true


  default_cache_behavior {
    allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods = [
      "GET",
      "HEAD",
      "OPTIONS"
    ]
    target_origin_id       = "S3Origin"
    cache_policy_id        = aws_cloudfront_cache_policy.static_cache.id
    compress               = true
    smooth_streaming       = false
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = var.tags

  viewer_certificate {
    acm_certificate_arn      = module.base_data.alteam_cert_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}
module "base_data" {
  source = "../../../../../infrastructure/modules/base_data"
}

resource "aws_route53_record" "ipv4" {
  zone_id =  module.base_data.hosted_zone_id
  name    = local.cName
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
resource "aws_route53_record" "ipv6" {
  zone_id = module.base_data.hosted_zone_id
  name    = local.cName
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
