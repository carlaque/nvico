import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Popup from './DeviceEditorPopUp.js';

import { MdImportExport } from 'react-icons/md';

import Device from "./Device.js"
import { ItemTypes, DevicesList } from './Constants'
import { AddConnection, DeleteConnection } from './SetupConnection.js';
import ImportExportPopup from './ImportExportPopUp.js';


function Board(props) {
    const devices = DevicesList

    const [board, setBoard] = useState([])
    const [cable, setCable] = useState(false)
    const [deletingConn, setDeletingConn] = useState(false)
    const [showDevicePopUp, setPopup] = useState(false)
    const [showImportExportPopUp, setImportExportPopup] = useState(false)
    
    const [connections, setConnections] = useState(Array)
    const [selectedDevice, setSelectedDevice] = useState(null)

    let connection = { "from": null, "to": null }

    // let __uniqueIdentifier__ = 0;
    // let oldGetIdentifier = () => {
    //     __uniqueIdentifier__++;
    //     return __uniqueIdentifier__ - 1;
    // }
    let getIdentifier = () => {
        let max = -1;
        board.forEach((device) => {
            if (device.id > max) {
                max = device.id;
            }
        })

        return Math.max(0, max+1);
    }

    const moveDevice = useCallback(
        (id, left, top) => {
            setBoard((board) => {
                let device = board.find(device => device && device.id === id)
                device.left = left
                device.top = top
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
            accept: [ItemTypes.ENDDEVICE, ItemTypes.SWITCH, ItemTypes.ROUTER],
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

    const addConnection = (device) => {
        if (connection.from === null)
            connection.from = device
        else if (connection.to === null) {
            connection.to = device
            updateConnections()
        }
    }

    const updateConnections = () => {
        board.forEach((dev) => {
            if (connection.from.id === dev.id)
                dev.currentConnections++
            if (connection.to.id === dev.id)
                dev.currentConnections++
        })

        setConnections([...connections, connection])
        setCable(false)

        connection = { "from": null, "to": null }
    }

    const isConnectable = (device) => {
        let isUnderMax = (device.currentConnections < device.maxConnections)
        return connection.from != null ? isUnderMax && (connection.from.id != device.id) : isUnderMax
        // return isUnderMax
    }

    const parseRem = (x) => {
        return x * parseInt(getComputedStyle(document.documentElement).fontSize);
    }

    const openDeviceEditor = (device) => {
        console.log(device)
        setPopup(true)
        setSelectedDevice(device)
    }

    const deleteDevice = (idDevice) => {
        setConnections(connections.filter((connection, index, array) => {
            if (connection.to.id === idDevice || connection.from.id === idDevice) {
                board[connection.to.id].currentConnections = Math.max(0, board[connection.to.id].currentConnections-1);
                board[connection.from.id].currentConnections = Math.max(0, board[connection.from.id].currentConnections-1);
                return false;
            }
            return true;
        }))
        // let newBoard = board
        // delete newBoard[idDevice]
        let newBoard = board.filter((device, index, array) => device.id !== idDevice)
        connections.forEach(
            (connection) => {
                if (connection.to.id === idDevice) {
                    connection.to = newBoard.find(device => device.id === idDevice);
                }
                else if (connection.from.id === idDevice) {
                    connection.from = newBoard.find(device => device.id === idDevice);
                }
            }
        )
        setBoard(newBoard)
        setPopup(false)
        setSelectedDevice(null)
        // setSelectedDevice(null)
        // console.log(board.filter((device, index, array) => {
        //     if(device.id === idDevice || device.id === idDevice) { 
        //         return false;
        //     }
        //     return true;
        // }))
    }

    const updateBoardWith = (dev) => {
        if (dev.id !== undefined) {
            board[dev.id] = dev
            setBoard((board) => {
                board[dev.id] = dev
                return board
            })
            let c = connections.forEach(
                (connection) => {
                    if (connection.to.id === dev.id) {
                        connection.to = dev;
                    }
                    else if (connection.from.id === dev.id) {
                        connection.from = dev;
                    }
                }
            )
        }
    }

    const deleteConnection = (conn, connId) => {
        let newConns = connections

        --board[conn.from.id].currentConnections
        --board[conn.to.id].currentConnections
        setBoard((board) => { return board })

        newConns.splice(newConns[connId], 1)
        setConnections([...newConns])
    }

    return (
        <div className={cable ? 'drawingArea mudaMouse' : 'drawingArea'} >
            <aside>
                <div className="bar">
                    {devices.map((dev) => {
                        return <Device properties={dev} id={dev.id} />
                    })}
                </div>
                <div className="bar">
                    <AddConnection cable={cable} setCable={(a)=>{setCable(a);setDeletingConn(false)}} />
                    <DeleteConnection deletingConn={deletingConn} setDeletingConn={(a)=>{setDeletingConn(a); setCable(false)}} />
                    <button className={'conn-actions-button'} onClick={() => setImportExportPopup(true)}>
                        <MdImportExport style={{width: '60%',height: '60%'}}/>Import/Export
                    </button>
                    {/* <button onClick={() => console.log(board)}>Print Board</button> */}
                    {/* <button onClick={() => console.log(connections)}>Print Connections</button> */}
                </div>

            </aside>
            <div ref={drop} className='board'>
                {
                    Object.entries(connections).map(([key, conn]) => {
                        // x==left y==top
                        let line = {
                            x1: conn.from.left,
                            y1: conn.from.top,
                            x2: conn.to.left,
                            y2: conn.to.top
                        }
                        return <button
                            style={{ all: 'unset', position: 'absolute' }}
                            onClick={
                                () => { deletingConn && deleteConnection(conn, key) }
                            }>
                            <svg id={key} width={Math.max(line.x1, line.x2) + parseRem(4)} height={Math.max(line.y1, line.y2) + parseRem(4)}>
                                <line x1={line.x1 + parseRem(-4)}
                                    y1={line.y1 + parseRem(4)}
                                    x2={line.x2 + parseRem(-4)}
                                    y2={line.y2 + parseRem(4)}
                                    stroke="black"
                                    shapeRendering="geometricPrecision"
                                    strokeWidth="3"
                                />
                            </svg>
                        </button>
                    })
                }
                {
                    Object.entries(board).map(([key, dev]) => {
                        return <button style={{ all: 'unset' }}
                            onClick={
                                () => { cable && (isConnectable(dev) && addConnection(dev)) }
                            }
                            onDoubleClick={
                                () => { dev.isConst || openDeviceEditor(dev) }
                            }>
                            <Device connectionBeingSet={cable} properties={dev} id={key} />
                        </button>
                    })
                }
            </div>
            {
                selectedDevice &&
                <Popup
                    show={showDevicePopUp}
                    deleteDevice={deleteDevice}
                    setShow={setPopup}
                    device={selectedDevice}
                    setSelectedDevice={setSelectedDevice}
                    updateBoardWith={updateBoardWith}
                    board={board}>
                </Popup>
            }
            {
                <ImportExportPopup show={showImportExportPopUp} setBoard={setBoard} setConnections={setConnections} setShow={setImportExportPopup} connections={connections} board={board}></ImportExportPopup>
            }
        </div>
    );
}

export default Board;