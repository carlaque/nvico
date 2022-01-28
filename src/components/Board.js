import React from 'react';
import { useState } from 'react';
import { useDrop } from 'react-dnd';

import EndDevice from "./EndDevice.js"
import { ItemTypes } from './ItemTypes'


function Board() {
    const [board, setBoard] = useState([

    ])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ENDDEVICE,
        drop: (item) => addDevice(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const devices = [
        {
            "id": 1,
            "type":"end-device",
            "name":"pc-da-nasa",
            "network": {
                "ip":"111.111.111.111",
                "mask":"222.222.222.222",
                "isDHCP": true, 
                "gateway":"333.333.333.333",
                "dnsServer":""
            },
            "interface": "FAST_ETHERNET"
        },
        {
            "id": 2,
            "type":"end-device",
            "name":"pc-da-nasa2",
            "network": {
                "ip":"111.111.111.111",
                "mask":"222.222.222.222",
                "isDHCP": true, 
                "gateway":"333.333.333.333",
                "dnsServer":""
            },
            "interface": "FAST_ETHERNET"
        }
    ]

    const addDevice = (id) => {
        console.log(id)
        const devList = devices.filter( (dev) => id === dev.id);
        setBoard( (board) => [...board, devList[0]])
    }
    return (
        <div className='board' >
            <div style={{
                backgroundColor: "red"
            }}>
                {devices.map( (dev) => {
                    return <EndDevice name={dev.name} id={dev.id} />
                })}

            </div>

            <div ref={drop} style={{
                width: "100%",
                height: "100%"
            }}>
                {board.map((dev) => {
                    return <EndDevice name={dev.name} id={dev.id} /> 
                })}
            </div>

        </div>

    );
}

export default Board;