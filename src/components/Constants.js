export const ItemTypes = {
  ENDDEVICE: 'enddevice'
}

export const DevicesList = [
  {
    "id": 1,
    "type": "end-device",
    "name": "pc-da-nasa",
    "network": {
      "ip": "111.111.111.111",
      "mask": "222.222.222.222",
      "isDHCP": true,
      "gateway": "333.333.333.333",
      "dnsServer": ""
    },
    "interface": "FAST_ETHERNET"
  },
  {
    "id": 2,
    "type": "end-device",
    "name": "pc-da-nasa2",
    "network": {
      "ip": "111.111.111.111",
      "mask": "222.222.222.222",
      "isDHCP": true,
      "gateway": "333.333.333.333",
      "dnsServer": ""
    },
    "interface": "FAST_ETHERNET"
  }
]
