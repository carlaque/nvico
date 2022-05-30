export const EndDeviceEditorForm = ({ device, handleInputChange, board }) => {
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

        </div>
    )
}