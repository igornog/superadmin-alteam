locals {
  delimiter  = "-"
  namespace  = "pw"
  attributes = concat(var.attributes, ["tf"])
  id         = join(local.delimiter, concat([local.namespace, var.stage, var.name], local.attributes))
  tags       = {
    Attributes : join( " ", local.attributes)
    Stage : var.stage
    Namespace : local.namespace
    Name : local.id
  }
}

