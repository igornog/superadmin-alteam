variable "stage" {
  type = string
}
variable "namespace" {
  type = string
}
variable "namespace_tags" {
  type = map(string)
}
variable "allowed_methods" {
  type        = list(string)
  description = "POST,GET,PUT,DELETE"
}
variable "package_path" {
  type = string
}
variable "env_variables" {
  type    = map(string)
  default = {}
}
variable "timeout" {
  type    = number
  default = 15
}
variable "retention_in_days" {
  type = number
}
variable "memory_size" {
  type    = number
  default = 128
}
variable "security_group_ids" {
  type    = list(string)
  default = []
}
variable "subnet_ids" {
  type    = list(string)
  default = []
}
variable "layers_arn" {
  type    = list(string)
  default = []
}
