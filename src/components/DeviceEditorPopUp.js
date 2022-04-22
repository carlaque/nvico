import React, { useCallback, useState, useEffect } from 'react';


const Popup = (props) => {

    const [device, setDevice] = useState({...props.device})



    const handleInputChange = useCallback(event => {
        device.maxConnections = event.target.value
        setDevice({ ...device })
    }, [device])

    const handleSubmit = useCallback(event => {
        event.preventDefault()
        props.updateBoardWith(device)
        props.setShow(false)
    }, [props.updateBoardWith])

    const EndDevicePopup = () => {
        return (
            <div className="endDeviceEdit">
                <input type="text" placeholder='000.000.000.000' />
            </div>
        )
    }

    const SwitchPopup = () => {

        return (
            <div className="switchEdit">
                <form onSubmit={handleSubmit} >

                    <label> Quantidade de Portas </label>
                    <input
                        type="number"
                        value={device.maxConnections}
                        onChange={handleInputChange}
                    />
                    <input type="submit" value="Aplicar" />
                </form>
            </div>
        )
    }

    const components = {
        endDevice: <EndDevicePopup />,
        router: <EndDevicePopup />,
        switch: < SwitchPopup />
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
                {components[props.device.type]}
            </div>
        </div>
    ) : "";
}

export default Popup;
