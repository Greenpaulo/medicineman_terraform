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

resource "azurerm_linux_virtual_machine_scale_set" "medicineman_vmss" {
  name                = "medicineman-vmss"
  resource_group_name = azurerm_resource_group.medicineman_rg.name
  location            = azurerm_resource_group.medicineman_rg.location
  sku                 = "Standard_B1s"
  instances           = 2
  admin_username      = "adminuser"

  admin_ssh_key {
    username   = "adminuser"
    public_key = data.azurerm_key_vault_secret.linux_public_key.value
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "16.04-LTS"
    version   = "latest"
  }

  os_disk {
    storage_account_type = "Standard_LRS"
    caching              = "ReadWrite"
  }

  network_interface {
    name    = "medicineman-nic1"
    primary = true

    ip_configuration {
      name      = "internal"
      primary   = true
      subnet_id = azurerm_subnet.medicineman_subnet1.id
    }
  }
}
