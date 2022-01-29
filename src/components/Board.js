import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';


import EndDevice from "./EndDevice.js"
import Device from "./Device.js"
import { ItemTypes, DevicesList } from './Constants'

import "../styles/drawingArea.css"


function Board(props) {
    const devices = DevicesList

    const [board, setBoard] = useState([])

    let __uniqueIdentifier__ = 0;
    let getIdentifier = () => {
        __uniqueIdentifier__++;
        return __uniqueIdentifier__-1;
    }
    const isJSON = (text) => {
        try {
            const json = JSON.parse(text);
            return true
        } catch (e) {
            return false
        }
    }
    

    useEffect(
        () => {
            if (isJSON(props.network)) {
                const componentes = JSON.parse(props.network).componentes
                setBoard(componentes.map(
                    (dev) => ({
                        id: { ...dev }
                    })
                ))
            }
        }
        , [props.network]
    );

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ENDDEVICE,
        drop: (item, monitor) => {
            console.log( monitor.getClientOffset())
            const delta = item.isConst 
                ? monitor.getDifferenceFromInitialOffset() : monitor.getClientOffset();
            const left = Math.round(item.left || 0 + delta.x);
            const top = Math.round(item.top || 0 , delta.y);
 
            
            console.log("isConst", item);
            if( item.isConst != undefined || item.isConst ){
                alert('add')
                addDevice(item.id, left, top)            }
            else{
                alert('move')
                moveDevice(item.id, left, top)
            }

            return undefined;
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const moveDevice = useCallback((id, left, top) => {
        setBoard( (board) => {
            board[id].left = left
            board[id].top = top
            return board
        })
    })

    const addDevice = (id, left, top) => {
        const devList = devices.filter( (dev) => id === dev.id);
        devList[0]["left"] = left
        devList[0]["top"] = top
        
        let newDevice = Object.assign({},{ ...devList[0] }, { isConst:undefined } ) ;
        newDevice.id = getIdentifier()   
    
        console.log(newDevice)

        setBoard( (board) => [...board, newDevice]);
    }

    return (
        <>
            <div className='devicesBar'>
                <input type={"button"} onClick={()=>console.log(board)} />
                <input type={"button"} onClick={()=>console.log(devices)} />
                {
                    devices.map((dev) => {
                        return <Device properties={dev} id={dev.id} />
                    })
                }
            </div>

            <div ref={drop} className='board'>
                {
                    board.map((dev) => {
                        return <div onClick={()=>alert(dev.id)}>
                                    <Device  properties={dev} id={dev.id} />
                                </div>
                    })
                }
            </div>

        </>

    );
}

export default Board;