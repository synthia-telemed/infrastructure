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
    size  = "Standard_B2ms"
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
    sku_name    = "B_Standard_B1ms"
    location    = "eastasia"
    version     = "13"
    storageSize = 32768
  }
  type = object({
    sku_name     = string
    location     = string
    version      = string
    storage_size = number
  })
  description = "Configuration of the PostgreSQL server"
}

variable "postgresql_admin_username" {
  default     = "postgres"
  type        = string
  description = "Username of the PostgreSQL administrator"
}

variable "postgresql_admin_password" {
  default     = "changeThiS!!"
  type        = string
  description = "Password of the PostgreSQL administrator"
}
