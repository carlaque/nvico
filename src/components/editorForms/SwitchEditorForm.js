import React, { useCallback } from 'react';

export const SwitchEditorForm = ({ device, setDevice, handleSubmit, handleInputChange }) => {

    return (
        <div className="switchEdit">
            <form onSubmit={handleSubmit} >
                <label> Display Name </label>
                <input
                    type="text"
                    value={device.name}
                    onChange={handleInputChange}
                    name="name"
                />
                <label> Quantidade de Portas </label>
                <input
                    type="number"
                    value={device.maxConnections}
                    onChange={handleInputChange}
                    name="maxConnections"
                />
                <input type="submit" value="Aplicar" />
            </form>
        </div>
    )
}