data "azurerm_key_vault" "medicineman_kv" {
  name                = "medicineman-kv"
  resource_group_name = "medicineman-kv-rsg"
}

data "azurerm_key_vault_secret" "linux_public_key" {
  name         = "medicineman-server-ssh-public-key"
  key_vault_id = data.azurerm_key_vault.medicineman_kv.id
}
