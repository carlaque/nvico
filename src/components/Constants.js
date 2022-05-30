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
    "maxConnections": 1,
    "currentConnections": 0,
  },
  {
    "id": 2,
    "isConst": true,
    "type": "router",
    "name": "Router",
    "maxConnections": 2,
    "currentConnections": 0,
  },
  {
    "id": 3,
    "isConst": true,
    "type": "switch",
    "name": "Switch",
    "maxConnections": 2,
    "currentConnections": 0,
  }
]
