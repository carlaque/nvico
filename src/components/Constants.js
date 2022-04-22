export const ItemTypes = {
  ENDDEVICE: 'endDevice',
  ROUTER : 'router',
  SWITCH : 'switch'
}

export const DevicesList = [
  {
    "id": 1,
    "isConst": true,
    "type": "endDevice",
    "name": "End Device",
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
    "name": "Router",
    "maxConnections": 2,
    "currentConnections": 0,
    "interface": "FAST_ETHERNET"
  },
  {
    "id": 3,
    "isConst": true,
    "type": "switch",
    "name": "Switch",
    "network": {
      "ports":[]
    },
    "maxConnections": 2,
    "currentConnections": 0,
    "interface": "FAST_ETHERNET"
  }
]
