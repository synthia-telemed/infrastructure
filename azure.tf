provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "resource_group" {
  name     = "${var.project_name}-rg"
  location = var.azure_location
}

resource "azurerm_container_registry" "container_registry" {
  name                = var.registry_name
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_resource_group.resource_group.location
  sku                 = "Basic"
}

resource "azurerm_kubernetes_cluster" "aks_cluster" {
  name                              = "${var.project_name}-cluster"
  resource_group_name               = azurerm_resource_group.resource_group.name
  location                          = azurerm_resource_group.resource_group.location
  role_based_access_control_enabled = true
  dns_prefix                        = var.project_name

  default_node_pool {
    name       = "default"
    node_count = var.default_node_config.count
    vm_size    = var.default_node_config.size
  }

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_role_assignment" "aks-acr-role-assignment" {
  principal_id                     = azurerm_kubernetes_cluster.aks_cluster.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.container_registry.id
  skip_service_principal_aad_check = true
  depends_on = [
    azurerm_kubernetes_cluster.aks_cluster,
    azurerm_container_registry.container_registry
  ]
}


resource "azuread_application" "github_action_app" {
  display_name = "github_action_push_acr"
}

resource "azuread_service_principal" "github_action_sp" {
  application_id               = azuread_application.github_action_app.application_id
  app_role_assignment_required = false
}

resource "azuread_service_principal_password" "github_action_sp_password" {
  service_principal_id = azuread_service_principal.github_action_sp.object_id
}

resource "azurerm_role_assignment" "github_action_acr" {
  principal_id                     = azuread_service_principal.github_action_sp.object_id
  role_definition_name             = "AcrPush"
  scope                            = azurerm_container_registry.container_registry.id
  skip_service_principal_aad_check = true
  depends_on = [
    azurerm_container_registry.container_registry,
    azuread_service_principal.github_action_sp,
  ]
}
