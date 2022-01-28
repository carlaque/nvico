import React from 'react';
import EndDeviceImagem from "../assets/endDevice.svg"
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'


export default function EndDevice(props) {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.ENDDEVICE,
            item: {
                id: props.id
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }),
        []
    )
    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                border: isDragging ? "5px solid pink" : "0px",
                cursor: 'move',
                width: "10vw",
            }} >
            {/* <EndDeviceImagem /> */}
            <img src={EndDeviceImagem} alt="" />
            <p>{props.name}</p>
            {/* <p>{props.ip}</p> */}
            {/*<p>{props.mask}</p>
            <p>{props.isDHCP}</p>
            <p>{props.gateway}</p>
            <p>{props.dns}</p>
            <p>{props.interface}</p> */}
            {/* todo: adicionar STATUS da coneção e conexoes */}
        </div>
    );
}