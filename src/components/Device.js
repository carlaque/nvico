import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'

import EndDevice from './EndDevice.js';


const components = {
    endDevice: <EndDevice />
}

function openDeviceEditor(){
    // todo : set config device popup 
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
        [props.properties]
    )

    if (isDragging  && !props.properties.isConst )
        return <div className='device' ref={drag} style={{
            position: "absolute",
        }}/>
    else
        return (
            <div
                className='device'
                ref={drag}
                onDoubleClick={() => { props.properties.isConst || openDeviceEditor()  }}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    width: "10vw",
                    position: props.properties.isConst || "absolute",
                    left: props.properties.left,
                    top: props.properties.top,
                    margin : props.properties.isConst || '0'
                }} >
                {React.cloneElement(
                    components[props.properties.type],
                    props.properties)}
            </div>
        );
}

export default Device;