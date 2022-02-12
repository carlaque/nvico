import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';


import EndDevice from "./EndDevice.js"
import Device from "./Device.js"
import { ItemTypes, DevicesList } from './Constants'

import "../styles/drawingArea.css"


function Board(props) {
    const devices = DevicesList

    const [board, setBoard] = useState({})

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
        found[0]["left"] = left
        found[0]["top"] = top

        let newDevice = {};
        let newId = getIdentifier()
        newDevice[newId] = { ...found[0] }
        newDevice[newId].isConst = undefined
        newDevice[newId].id = newId

        setBoard((board) => Object.assign(board, newDevice));
    }

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.ENDDEVICE,
            drop: (item, monitor) => {
                const delta = monitor.getDifferenceFromInitialOffset()
                const left = Math.round((item.left || 0) + delta.x);
                const top = Math.round((item.top || 0) + delta.y);

                if (item.isConst != undefined || item.isConst)
                    addDevice(item.id, left, top)
                else
                    moveDevice(item.id, left, top)

                return undefined;
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            }),
        }),
        [moveDevice],
    )

    return (
        <div className='drawingArea'>
            <div className='devicesBar'>
                {devices.map((dev) => {
                    return <Device properties={dev} id={dev.id} />
                })}
            </div>

            <div ref={drop} className='board'>
                {Object.entries(board).map(([key, dev]) => {
                    return <Device properties={dev} id={key} />
                })}
            </div>

        </div>

    );
}

export default Board;