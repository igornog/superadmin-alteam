locals {
  subdomain = var.stage == "prod" ? "www" : var.stage
}
data aws_caller_identity "current"{}

resource "aws_lambda_function" "api_lambda" {
  function_name    = "${var.namespace}-lambda"
  runtime          = "nodejs16.x"
  role             = aws_iam_role.role.arn
  handler          = "index.handler"
  filename         = var.package_path
  source_code_hash = try(filebase64sha256(var.package_path), null)
  tags             = var.namespace_tags
  layers           = var.layers_arn
  dynamic "environment" {
    for_each = length(keys(var.env_variables)) == 0 ? [] : [true]
    content {
      variables = var.env_variables
    }
  }
  vpc_config {
    security_group_ids = var.security_group_ids
    subnet_ids         = var.subnet_ids
  }
  timeout     = var.timeout
  memory_size = var.memory_size
}

data "aws_iam_policy_document" "assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = [
        "lambda.amazonaws.com"
      ]
    }
  }
}

resource "aws_iam_role" "role" {
  name               = "${var.namespace}-role"
  assume_role_policy = data.aws_iam_policy_document.assume-role-policy.json
  tags               = var.namespace_tags
}

resource "aws_iam_role_policy_attachment" "attach" {
  role       = aws_iam_role.role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
resource "aws_cloudwatch_log_group" "logs" {
  name              = "/aws/lambda/${aws_lambda_function.api_lambda.function_name}"
  retention_in_days = var.retention_in_days
  tags              = var.namespace_tags
}

resource "aws_apigatewayv2_api" "http_api" {
  name                         = "${var.namespace}-http-api"
  protocol_type                = "HTTP"
  disable_execute_api_endpoint = false
  tags                         = var.namespace_tags
  cors_configuration {
    allow_origins  = ["https://${local.subdomain}.yjc.com"]
    allow_methods  = var.allowed_methods
    max_age        = 86400
    allow_headers  = ["*"]
    expose_headers = ["*"]
  }
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = var.stage
  auto_deploy = true
  tags        = var.namespace_tags
}

resource "aws_apigatewayv2_integration" "integration" {
  api_id = aws_apigatewayv2_api.http_api.id

  connection_type        = "INTERNET"
  integration_type       = "AWS_PROXY"
  payload_format_version = "1.0"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.api_lambda.invoke_arn
}

resource "aws_apigatewayv2_route" "route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.integration.id}"
}
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:eu-west-1:${data.aws_caller_identity.current.account_id}:${aws_apigatewayv2_api.http_api.id}/*"
}
