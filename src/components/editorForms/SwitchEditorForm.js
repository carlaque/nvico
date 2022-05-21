import React, { useCallback } from 'react';

export const SwitchEditorForm = ({ device, handleInputChange }) => {

    return (
        <div className="form-edit">
                <label> Display Name: </label>
                <input
                    type="text"
                    autoComplete="off"
                    value={device.name}
                    onChange={handleInputChange}
                    name="name"
                />
                <label> Quantidade de Portas: </label>
                <input
                    type="number"
                    autoComplete="off"
                    value={device.maxConnections}
                    onChange={handleInputChange}
                    min={device.currentConnections}
                    name="maxConnections"
                />
        </div>
    )
}