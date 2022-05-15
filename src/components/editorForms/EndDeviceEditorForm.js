export const EndDeviceEditorForm = ({ device, handleInputChange }) => {

    // TODO colocar validacao dos campos de ip e mascara de acordo com flag isDHCP 
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

            <div className="label-checkbox">
                <label> DHCP: </label>
                <input
                    type="checkbox"
                    checked={device.network.isDHCP}
                    onChange={handleInputChange}
                    name="isDHCP"
                />
            </div>
            
            <label> IP: </label>
            <input
                type="text"
                autoComplete="off"
                value={device.network.ip}
                onChange={handleInputChange}
                name="network.ip"
            />
            <label> Mascara: </label>
            <input
                type="text"
                autoComplete="off"
                value={device.network.mask}
                onChange={handleInputChange}
                name="network.mask"
            />

            <label> DNS Server: </label>
            <input
                type="text"
                autoComplete="off"
                value={device.network.dnsServer}
                onChange={handleInputChange}
                name="network.dnsServer"
            />



        </div>
    )
}