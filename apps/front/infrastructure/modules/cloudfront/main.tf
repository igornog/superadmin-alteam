module "cloudfront_label" {
  source = "../../../../../infrastructure/modules/naming"
  stage  = var.stage
  name   = "cloudfront"
}

locals {
  origin_id           = "S3Origin"
  isProd              = var.stage == "prod"
  acm_certificate_arn = var.certificate_arn
  domain_name         = "admin.alteam.io"
  cname               = local.isProd ? local.domain_name : lower("${var.stage}.${local.domain_name}")
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = module.cloudfront_label.id
}

resource "aws_cloudfront_cache_policy" "one_year" {
  name        = "${module.cloudfront_label.id}-cache-policy"
  default_ttl = 60 * 60 * 24 * 7
  max_ttl     = 60 * 60 * 24 * 365
  min_ttl     = 60 * 60 * 24
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
resource "aws_cloudfront_cache_policy" "one_min" {
  name        = "${module.cloudfront_label.id}-one-min-cache-policy"
  default_ttl = 60
  max_ttl     = 60
  min_ttl     = 60
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


resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = var.bucket_domain_name
    origin_id   = local.origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  wait_for_deployment = false
  aliases             = [local.cname]

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  ordered_cache_behavior {
    path_pattern           = "/static/*"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = local.origin_id
    cache_policy_id        = aws_cloudfront_cache_policy.one_year.id
    compress               = true
    smooth_streaming       = true
    viewer_protocol_policy = "redirect-to-https"
  }
  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD"
    ]
    cached_methods = [
      "GET",
      "HEAD"
    ]
    target_origin_id       = local.origin_id
    cache_policy_id        = aws_cloudfront_cache_policy.one_min.id
    compress               = true
    smooth_streaming       = true
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_100"

  custom_error_response {
    error_caching_min_ttl = 3600
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = module.cloudfront_label.tags

  viewer_certificate {
    acm_certificate_arn      = local.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}


resource "aws_route53_record" "ipv4" {
  zone_id = var.zone_id
  name    = local.cname
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
resource "aws_route53_record" "ipv6" {
  zone_id = var.zone_id
  name    = local.cname
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
