export const EndDeviceEditorForm = ({ device, handleInputChange, board }) => {
    // TODO colocar validacao dos campos de ip e mascara de acordo com flag isDHCP 
    let ips = []
    Object.entries(board)
        .forEach(([key, dev]) => {
            if (dev.type === "endDevice")
                ips.push(dev.network.ip)
        });

    const validadeIp = (event) => {
        let value = event.target.value
        if (ips.filter((v) => v === value))
            console.log('achou')
    }

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
                    name="network.isDHCP"
                />
            </div>

            <label> IP: </label>
            <input
                type="text"
                autoComplete="off"
                value={device.network.ip}
                onChange={handleInputChange}
                name="network.ip"
                onBlur={validadeIp}
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