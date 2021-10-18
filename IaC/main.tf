resource "azurerm_resource_group" "medicineman_rsg" {
  name     = var.medicineman_rsg
  location = var.location
}

resource "azurerm_virtual_network" "medicineman_vnet1" {
  name                = var.medicineman_vnet1
  resource_group_name = azurerm_resource_group.medicineman_rsg.name
  location            = var.location
  address_space       = ["10.0.0.0/16"]
}

resource "azurerm_subnet" "medicineman_subnet1" {
  name                 = var.medicineman_subnet1
  resource_group_name  = azurerm_resource_group.medicineman_rsg.name
  virtual_network_name = azurerm_virtual_network.medicineman_vnet1.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_public_ip" "medicineman_dev_server_public_ip" {
  name                = "medicine-man-dev-server-public-ip"
  location            = var.location
  resource_group_name = azurerm_resource_group.medicineman_rsg.name
  allocation_method   = "Dynamic"
}

resource "azurerm_network_interface" "medicineman_dev_server_nic" {
  name                = "mediciman-dev-server-nic"
  location            = var.location
  resource_group_name = azurerm_resource_group.medicineman_rsg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.medicineman_subnet1.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.medicineman_dev_server_public_ip.id
  }
}

resource "azurerm_linux_virtual_machine" "medicineman_dev_vm" {
  name                = "medicineman-dev-vm"
  resource_group_name = azurerm_resource_group.medicineman_rsg.name
  location            = azurerm_resource_group.medicineman_rsg.location
  size                = "Standard_B1s"
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.medicineman_dev_server_nic.id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = data.azurerm_key_vault_secret.linux_public_key.value
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "16.04-LTS"
    version   = "latest"
  }
}

# resource "azurerm_linux_virtual_machine_scale_set" "medicineman_vmss" {
#   name                = "medicineman-prod-vmss"
#   resource_group_name = azurerm_resource_group.medicineman_rsg.name
#   location            = azurerm_resource_group.medicineman_rsg.location
#   sku                 = "Standard_B1s"
#   instances           = 2
#   admin_username      = "adminuser"

#   admin_ssh_key {
#     username   = "adminuser"
#     public_key = data.azurerm_key_vault_secret.linux_public_key.value
#   }

#   source_image_reference {
#     publisher = "Canonical"
#     offer     = "UbuntuServer"
#     sku       = "16.04-LTS"
#     version   = "latest"
#   }

#   os_disk {
#     storage_account_type = "Standard_LRS"
#     caching              = "ReadWrite"
#   }

#   network_interface {
#     name    = "medicineman-nic1"
#     primary = true

#     ip_configuration {
#       name      = "internal"
#       primary   = true
#       subnet_id = azurerm_subnet.medicineman_subnet1.id
#     }
#   }
# }
