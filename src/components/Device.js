import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'

import EndDevice from './EndDevice.js';
import Router from './RouterDevice.js'
import Switch from './SwitchDevice.js'
import Cable from './SetupConnection.js'
import Popup from './DeviceEditorPopUp';


const components = {
    endDevice: <EndDevice />,
    router: <Router />,
    switch: <Switch />
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

    if (isDragging && !props.properties.isConst && !props.connectionBeingSet)
        return <div className='device' ref={drag} style={{
            position: "absolute",
        }} />
    else
        return (
            <div
                className={'device '+ (props.properties.isConst ? '' : 'deviceOnBoard')}
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    width: "8rem",
                    position: props.properties.isConst || "absolute",
                    left: props.properties.left,
                    top: props.properties.top,
                    margin: props.properties.isConst || '0'
                }} >
                {React.cloneElement(
                    components[props.properties.type],
                    props.properties)}
            </div>
        );
}

export default Device;