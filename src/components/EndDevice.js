import React from 'react';
import EndDeviceImagem from "../assets/endDevice.svg"


export default function EndDevice(props) {
    
    return (
        <>
            <img src={EndDeviceImagem} alt="" />
            <p>{props.name}</p>
            {/* TODO: adicionar STATUS da coneXão e conexoes */}
        </>
    );
}