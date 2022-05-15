import React, { useCallback, useState, useEffect } from 'react';
import { EndDeviceEditorForm } from './editorForms/EndDeviceEditorForm.js'
import { SwitchEditorForm } from './editorForms/SwitchEditorForm.js'
import { RouterEditorForm } from './editorForms/RouterEditorForm.js'



const Popup = (props) => {

    const [device, setDevice] = useState(props.device)

    const handleSubmit = (event) => {
        event.preventDefault()
        props.updateBoardWith(device)
        props.setShow(false)
        props.setSelectedDevice(null)
    }

    const handleDelete = (event) => {
        let a = window.confirm("Quer deletar o dispositivo " + device.name + device.id + "?");
        if (a)
            props.deleteDevice(device.id)
    }

    const index = (obj,is, value) => {
        if (typeof is == 'string')
            return index(obj,is.split('.'), value);
        else if (is.length==1 && value!==undefined)
            return obj[is[0]] = value;
        else if (is.length==0)
            return obj;
        else
            return index(obj[is[0]],is.slice(1), value);
    }

    const handleInputChange = (event) => {
        let property = event.target.name
        index(device,property, event.target.value)        
        setDevice({ ...device })
    }

    let components = {
        endDevice: <EndDeviceEditorForm device={{ ...device }} handleInputChange={handleInputChange} />,
        router: <RouterEditorForm device={{ ...device }} handleInputChange={handleInputChange} />,
        switch: <SwitchEditorForm device={{ ...device }} handleInputChange={handleInputChange} />
    }

    return props.show ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>Edit Device</h1>
                <button className='close-btn' onClick={() => {
                    props.setShow(false);
                    props.setSelectedDevice(null)
                }}> + </button>
                <form onSubmit={handleSubmit} >
                    {/* {React.cloneElement( */}
                    {components[props.device.type]}
                    {/* {  ...device, setDevice, handleSubmit, handleInputChange })} */}

                    <div className="form-buttons">
                        <input type="button" value="DELETE" onClick={handleDelete} />
                        <input type="submit" value="APLICAR" />
                    </div>
                </form>
            </div>
        </div>
    ) : "";
}

export default Popup;
