resource "azurerm_resource_group" "medicineman_rg" {
  name     = var.medicineman_rg
  location = var.location
}

resource "azurerm_virtual_network" "medicineman_vnet1" {
  name                = var.medicineman_vnet1
  resource_group_name = azurerm_resource_group.medicineman_rg.name
  location            = var.location
  address_space       = ["10.0.0.0/16"]
}

resource "azurerm_subnet" "medicineman_subnet1" {
  name                 = var.medicineman_subnet1
  resource_group_name  = azurerm_resource_group.medicineman_rg.name
  virtual_network_name = azurerm_virtual_network.medicineman_vnet1.name
  address_prefixes     = ["10.0.1.0/24"]
}
