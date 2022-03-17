import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';


import EndDevice from "./EndDevice.js"
import Device from "./Device.js"
import { ItemTypes, DevicesList } from './Constants'

import "../styles/drawingArea.css"


function Board(props) {
    const devices = DevicesList
    const [lines, setLines] = useState([]);

    const [board, setBoard] = useState([])

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


                if (board.length === 2) {
                    let newLines = lines.concat({
                        x1: board[0].left,
                        y1: board[0].top,
                        x2: board[1].left,
                        y2: board[1].top
                    })
                    setLines(newLines);
                }
                
                return undefined;
            },
            collect: (monitor) => ({ isOver: !!monitor.isOver()})
            ,
        }),
        [moveDevice],
    )

    return (
        <div className='drawingArea'>
            <div className='devicesBar'>
                {devices.map((dev) => {
                    return <Device properties={dev} id={dev.id} />
                })}
                <button onClick={()=>console.log(lines, board)}>asd</button>
            </div>

            <div ref={drop} className='board'>
                {
                    lines.map((line, key) => {
                        // x-left y-top
                        return  <svg id={key} width={Math.max(line.x1, line.x2)} height="500">
                                    <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="black"/>
                                </svg>
                    })
                }
                {Object.entries(board).map(([key, dev]) => {
                    return <Device properties={dev} id={key} />
                })}
            </div>

        </div>

    );
}

export default Board;