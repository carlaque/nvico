import React, { useCallback } from 'react';




const Popup = (props) => {

    const handleInputChange = useCallback(event => {
        props.board[props.deviceId].maxConnections = event.target.value
        props.setBoard([...props.board])
    }, [props.setBoard])

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
                <label htmlFor=""> Quantidade de Portas
                    <input type="text" placeholder='0' value={props.board[props.deviceId].maxConnections} onChange={handleInputChange} />
                </label>

                <input type="button" value="Aplicar" />
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
                <button className='close-btn' onClick={() => { props.setShow(false) }}> + </button>
                {components[props.board[props.deviceId].type]}
            </div>
        </div>
    ) : "";
}

export default Popup;
