import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'

import EndDevice from './EndDevice.js';


const components = {
    endDevice: <EndDevice />
}

function Device(props) {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.ENDDEVICE,
            item: props.properties,
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
            {React.cloneElement(
                components[props.properties.type],
                props.properties)}
        </div>
    );
}

export default Device;