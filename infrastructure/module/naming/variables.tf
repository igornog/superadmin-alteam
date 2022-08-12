variable "stage" {
  type = string
}
variable "name" {
  type = string
}

variable "attributes" {
  type    = list(string)
  default = []
}
