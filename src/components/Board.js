import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

import EndDevice from "./EndDevice.js"
import { ItemTypes, DevicesList } from './Constants'

import "../styles/drawingArea.css"


function Board(props) {
    const devices = DevicesList

    const [board, setBoard] = useState([])
    
    const isJSON = (text) => {
        try {
            const json = JSON.parse(text);
            return true
        } catch (e) {
            return false
        }
    }

    useEffect(() => {
        if (isJSON(props.network)) {
            console.log(typeof JSON.parse(props.network) )
            setBoard(JSON.parse(props.network).componentes)
        }
    })

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ENDDEVICE,
        drop: (item) => addDevice(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const addDevice = (id) => {
        const devList = devices.filter((dev) => id === dev.id);
        setBoard((board) => [...board, devList[0]])
    }
    
    return (
        <>
            <div className='devicesBar'>
                {
                    devices.map((dev) => {
                        return <EndDevice name={dev.name} id={dev.id} />
                    })
                }
            </div>

            <div ref={drop} className='board'>
                {
                    board.map((dev) => {
                        return <EndDevice name={dev.name} id={dev.id} />
                    })
                }
            </div>

        </>

    );
}

export default Board;