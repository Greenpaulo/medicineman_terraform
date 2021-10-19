terraform {
  backend "azurerm" {
    resource_group_name  = "remote-state"
    storage_account_name = "medicinemantfstate"
    container_name       = "tfstate"
    key                  = "medicineman.tfstate"
  }
}
