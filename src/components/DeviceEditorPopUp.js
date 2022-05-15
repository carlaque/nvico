import React, { useCallback, useState, useEffect } from 'react';
import { EndDeviceEditorForm } from './editorForms/EndDeviceEditorForm.js'
import { SwitchEditorForm } from './editorForms/SwitchEditorForm.js'
import { RouterEditorForm } from './editorForms/RouterEditorForm.js'



const Popup = (props) => {

    const [device, setDevice] = useState( props.device )

    const handleSubmit = (event) => {
        event.preventDefault()
        props.updateBoardWith(device)
        props.setShow(false)
        props.setSelectedDevice(null)
    }

    const handleDelete = (event) => {
        let a = window.confirm("Quer deletar o dispositivo " + device.name + device.id +"?");
        if(a)
            props.deleteDevice(device.id)
    }

    const handleInputChange = (event) => {
        device[event.target.name] = event.target.value
        setDevice({ ...device })
    }

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
                <form onSubmit={handleSubmit} >
                {/* {React.cloneElement( */}
                    {components[props.device.type]}
                    {/* {  ...device, setDevice, handleSubmit, handleInputChange })} */}

                    <input type="button" value="delete" onClick={handleDelete}/>
                    <input type="submit" value="Aplicar" />
                </form>
            </div>
        </div>
    ) : "";
}

export default Popup;
