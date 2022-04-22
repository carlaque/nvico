import React, { useCallback, useState, useEffect } from 'react';
import { EndDeviceEditorForm } from './editorForms/EndDeviceEditorForm.js'
import { SwitchEditorForm } from './editorForms/SwitchEditorForm.js'
import { RouterEditorForm } from './editorForms/RouterEditorForm.js'



const Popup = (props) => {

    const [device, setDevice] = useState({ ...props.device })

    const handleSubmit = useCallback(event => {
        event.preventDefault()
        props.updateBoardWith(device)
        props.setShow(false)
        props.setSelectedDevice(null)
    }, [props.updateBoardWith])

    const handleInputChange = useCallback(event => {
        device[event.target.name] = event.target.value
        setDevice({ ...device })
    }, [device])

    let components = {
        endDevice: <EndDeviceEditorForm device={{ ...device }} setDevice={setDevice} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />,
        router: <RouterEditorForm device={{ ...device }} setDevice={setDevice} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />,
        switch: < SwitchEditorForm device={{ ...device }} setDevice={setDevice} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
    }

    return props.show ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>Edit Device</h1>
                <button className='close-btn'
                    onClick={
                        () => {
                            props.setShow(false);
                            props.setSelectedDevice(null)
                        }
                    }> + </button>
                {/* {React.cloneElement( */}
                    {components[props.device.type]}
                    {/* {  ...device, setDevice, handleSubmit, handleInputChange })} */}

            </div>
        </div>
    ) : "";
}

export default Popup;
