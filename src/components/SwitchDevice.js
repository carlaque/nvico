import React from 'react';
import SwitchImagem from "../assets/switch.svg"


export default function Switch(props) {
    
    return (
        <>
            <img src={SwitchImagem} alt="" />
            <p>{props.name}</p>
            {/* TODO: adicionar STATUS da coneXão e conexoes */}
        </>
    );
}