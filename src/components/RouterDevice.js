import React from 'react';
import RouterImagem from "../assets/router.svg"
import { useDrag } from 'react-dnd'


export default function EndDevice(props) {
    
    return (
        <>
            <img src={RouterImagem} alt="" />
            <p>{props.name}</p>
            {/* TODO: adicionar STATUS da coneXão e conexoes */}
        </>
    );
}