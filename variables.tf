variable "azure_location" {
  default     = "southeastasia"
  description = "Azure Location"
  type        = string
}

variable "project_name" {
  default     = "synthia"
  type        = string
  description = "Name of the project"
}

variable "registry_name" {
  default     = "synthiatelemed"
  type        = string
  description = "Name of the Azure Container Registry"
}

variable "default_node_config" {
  default = {
    size  = "Standard_B2s"
    count = 1
  }
  type = object({
    size  = string
    count = number
  })
  description = "Default node configuration"
}


variable "postgresql_config" {
  default = {
    sku_name     = "B_Standard_B1ms"
    location     = "eastasia"
    version      = "13"
    storage_size = 32768
    zone         = "2"
  }
  type = object({
    sku_name     = string
    location     = string
    version      = string
    storage_size = number
    zone         = string
  })
  description = "Configuration of the PostgreSQL server"
}

variable "postgresql_admin_username" {
  default     = "postgres"
  type        = string
  sensitive   = true
  description = "Username of the PostgreSQL administrator"
}

variable "postgresql_admin_password" {
  default     = "changeThiS!!"
  type        = string
  sensitive   = true
  description = "Password of the PostgreSQL administrator"
}

variable "mongoatlas_public_key" {
  type        = string
  sensitive   = true
  description = "Public key for MongoDB Atlas"
}

variable "mongoatlas_private_key" {
  type        = string
  sensitive   = true
  description = "Private key for MongoDB Atlas"
}

variable "mongoatlas_org_id" {
  type        = string
  sensitive   = true
  description = "Organization ID for MongoDB Atlas"
}

variable "mongoatlas_cluster_config" {
  default = {
    provider = "AWS"
    region   = "AP_SOUTHEAST_1"
    size     = "M0"
    version  = "5.0"
  }
  type = object({
    provider = string
    size     = string
    region   = string
    version  = string
  })
  description = "Configuration of the MongoDB Atlas cluster"
}


variable "mongoatlas_admin_username" {
  default     = "admin"
  type        = string
  description = "Username of the MongoDB Atlas administrator"
}
variable "mongoatlas_admin_password" {
  default     = "changeThiS!!"
  type        = string
  sensitive   = true
  description = "Password of the MongoDB Atlas administrator"
}

variable "mongoatlas_cidr_access_list" {
  default     = "0.0.0.0/0"
  type        = string
  description = "CIDR access list for MongoDB Atlas"
}
