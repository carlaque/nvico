import React from 'react';
import EndDeviceImagem from "../assets/endDevice.svg"
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'


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
            className='device'
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                // background: "transparent",
                cursor: 'move',
                width: "10vw",
            }} >
            <img src={EndDeviceImagem} alt="" />
            <p>{props.name}</p>
            {/* TODO: adicionar STATUS da coneXão e conexoes */}
        </div>
    );
}