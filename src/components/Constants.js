export const ItemTypes = {
  ENDDEVICE: 'endDevice'
}

export const DevicesList = [
  {
    "id": 1,
    "isConst": true,
    "type": "endDevice",
    "name": "pc-da-nasa",
    "network": {
      "ip": "111.111.111.111",
      "mask": "222.222.222.222",
      "isDHCP": true,
      "gateway": "333.333.333.333",
      "dnsServer": ""
    },
    "maxConnections": 1,
    "currentConnections": 0,
    "interface": "FAST_ETHERNET"
  },
  {
    "id": 2,
    "isConst": true,
    "type": "router",
    "name": "pc-da-nasa2",
    "network": {
      "ip": "111.111.111.111",
      "mask": "222.222.222.222",
      "isDHCP": true,
      "gateway": "333.333.333.333",
      "dnsServer": ""
    },
    "maxConnections": 1,
    "currentConnections": 0,
    "interface": "FAST_ETHERNET"
  }
]
