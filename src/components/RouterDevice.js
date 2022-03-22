import React from 'react';
import RouterImagem from "../assets/router.svg"


export default function EndDevice(props) {
    
    return (
        <>
            <img src={RouterImagem} alt="" />
            <p>{props.name}</p>
            {/* TODO: adicionar STATUS da coneXão e conexoes */}
        </>
    );
}