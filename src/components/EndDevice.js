import React from 'react';
import EndDeviceImagem from "../assets/endDevice.svg"
import { useDrag } from 'react-dnd'


export default function EndDevice(props) {
    
    return (
        <>
            <img src={EndDeviceImagem} alt="" />
            <p>{props.name}</p>
            {/* TODO: adicionar STATUS da coneXão e conexoes */}
        </>
    );
}