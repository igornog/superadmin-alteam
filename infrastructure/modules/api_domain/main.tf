resource "aws_apigatewayv2_domain_name" "api_domain" {
  domain_name     = "${var.stage}.api.alteam.io"

  domain_name_configuration {
    certificate_arn = var.certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_route53_record" "record" {
  name    = aws_apigatewayv2_domain_name.api_domain.domain_name
  type    = "A"
  zone_id = var.hosted_zone_id

  alias {
    evaluate_target_health = true
    name                   = aws_apigatewayv2_domain_name.api_domain.domain_name_configuration.0.target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api_domain.domain_name_configuration.0.hosted_zone_id
  }
}
