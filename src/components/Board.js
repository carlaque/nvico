import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';


import Device from "./Device.js"
import { ItemTypes, DevicesList } from './Constants'

import "../styles/drawingArea.css"


function Board(props) {
    const devices = DevicesList

    const [board, setBoard] = useState([])
    const [cable, setCable] = useState(false)
    const [connections, setConnections] = useState(Array)

    let connection = { "from": null, "to": null }

    let __uniqueIdentifier__ = 0;
    let getIdentifier = () => {
        __uniqueIdentifier__++;
        return __uniqueIdentifier__ - 1;
    }

    const isJSON = (text) => {
        try {
            const json = JSON.parse(text);
            return true
        } catch (e) {
            return false
        }
    }

    // useEffect(
    //     () => {
    //         if (isJSON(props.network)) {
    //             const componentes = JSON.parse(props.network).componentes
    //             setBoard(componentes.map(
    //                 (dev) => ({
    //                     id: { ...dev }
    //                 })
    //             ))
    //         }
    //     }
    //     , [props.network]
    // );

    const moveDevice = useCallback(
        (id, left, top) => {
            setBoard((board) => {
                board[id].left = left
                board[id].top = top
                return board
            })
        },
        [board, setBoard]
    )

    const addDevice = (id, left, top) => {
        const found = devices.filter((dev) => id === dev.id);

        let newDevice = {};
        let newId = getIdentifier()
        newDevice[newId] = { ...found[0] }
        newDevice[newId].isConst = undefined
        newDevice[newId].id = newId
        newDevice[newId].left = left
        newDevice[newId].top = top

        setBoard((board) => Object.assign(board, newDevice));
    }

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.ENDDEVICE,
            drop: (item, monitor) => {
                let boardOffset = document.getElementsByClassName('board')[0].getBoundingClientRect()
                const delta = monitor.getDifferenceFromInitialOffset()
                const left = Math.round(item.left ? item.left + delta.x : window.event.clientX - boardOffset.x);
                const top = Math.round(item.top ? item.top + delta.y : window.event.clientY - boardOffset.y);

                if ((item.isConst != undefined) || item.isConst)
                    addDevice(item.id, left, top)
                else
                    moveDevice(item.id, left, top)

                return undefined;
            },
            collect: (monitor) => ({ isOver: !!monitor.isOver() })
            ,
        }),
        [moveDevice],
    )

    // useEffect(() => {
    //     if (connection.from != null && connection.to != null)
    //         updateConnections()
    //     console.log(lines)
    // }, [connection, connections, lines]);

    const addConnection = (device) => {
        if (connection.from === null)
            connection.from = device
        else if (connection.to === null) {
            connection.to = device
            // let d1 = board.filter((dev) => connection.from === dev.id)
            // let d2 = board.filter((dev) => device === dev.id)
            // update board?????
            updateConnections()
        }
    }

    const updateConnections = () => {
        // let newLines = lines.concat({
        //     x1: connection.from.left,
        //     y1: connection.from.top,
        //     x2: connection.to.left,
        //     y2: connection.to.top
        // })
        // setLines(newLines);

        setConnections([...connections, connection])
        setCable(false)

        connection = { "from": null, "to": null }
    }

    // TODO: aplicar no device
    const isConnectable = (device) => {
        // TODO: deixamos ele sobreescrever uma connection ja existente ?
        // TODO: set condicoes em que o device eh elegivel de se conectar 
        // futuramente considerar se o segundo dispositivo pode se conectar ao primeiro 

        return device.connection == null || true
    }

    const parseRem = (x) => {
        return x * parseInt(getComputedStyle(document.documentElement).fontSize);
    }

    return (
        <div className='drawingArea' >
            <div className='devicesBar'>
                {devices.map((dev) => {
                    return <Device properties={dev} id={dev.id} />
                })}
                <button onClick={() => setCable(!cable)}>Criar Conexao</button>
            </div>

            <div ref={drop} className='board'>
                {
                    Object.entries(connections).map(([key, conn]) => {
                        // x-left y-top
                        let line = {
                            x1: conn.from.left,
                            y1: conn.from.top,
                            x2: conn.to.left,
                            y2: conn.to.top
                        }
                        return <div style={{
                            position: 'absolute'
                        }}>
                            <svg id={key} width={Math.max(line.x1, line.x2) + parseRem(4)} height={Math.max(line.y1, line.y2) + parseRem(4)}>
                                <line   x1={line.x1 + (parseRem(4))} 
                                        y1={line.y1 + (parseRem(4))} 
                                        x2={line.x2 + (parseRem(4))} 
                                        y2={line.y2 + (parseRem(4))} stroke="black" />
                            </svg>
                        </div>
                    })
                }
                {Object.entries(board).map(([key, dev]) => {
                    return <button style={{ all: 'unset' }}
                        onClick={() => { cable && (isConnectable(dev) && addConnection(dev)) }}>
                        <Device connectionBeingSet={cable} properties={dev} id={key} />
                    </button>
                })}
            </div>

        </div>

    );
}

export default Board;