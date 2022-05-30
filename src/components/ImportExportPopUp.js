import React, { useState } from 'react';

const ImportExportPopup = (props) => {
    const [importObject, setImportObject] = useState('')

    document.onkeydown = (e) => {
        if (e.key === "Escape") {
            props.setShow(false);
            props.setSelectedDevice(null)
        }
    }

    const getExportData = () => {
        let board = { board: props.board, connections: props.connections }
        return JSON.stringify(board, undefined, 4)
    }

    const copyToClipboard = () => {
        let textBox = document.getElementById("exportTextarea");
        textBox.select();
        navigator.clipboard.writeText(textBox.value);
    }

    const downloadJson = () => {
        const element = document.createElement("a");
        let jsonText = document.getElementById("exportTextarea").value;

        const blob = new Blob([jsonText]);

        element.href = URL.createObjectURL(blob);

        let currentdate = new Date();
        let datetime = currentdate.getDate() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear() + "."
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        element.download = `nvico-${datetime}.json`;
        document.body.appendChild(element);
        element.click();
    }

    const importFromTextarea = () => {
        try {
            let object = JSON.parse(importObject);

            object.connections.forEach(element => {
                element.to = object.board[element.to.id];
                element.from = object.board[element.from.id];
            });

            props.setBoard(object.board);
            props.setConnections(object.connections);
        } catch (e) {
            alert("ERRO AO IMPORTAR JSON - MAL FORMADO")
        }
    }

    const handleImportTextarea = (event) => {
        setImportObject(event.target.value);
    }

    const beautifyJSON = () => {
        let ugly = importObject
        try {
            let obj = JSON.parse(ugly)
            let pretty = JSON.stringify(obj, undefined, 4)
            setImportObject(pretty)
        } catch (e) {
            alert("ERRO AO IMPORTAR JSON - MAL FORMADO")
        }
    }

    return props.show ? (
        <div className="popup">
            <div className="popup-inner">
                <button className='close-btn'
                    onClick={
                        () => {
                            props.setShow(false);
                        }
                    }> + </button>
                <div>
                    <div>
                        <h1>Export</h1>
                        <textarea id='exportTextarea' style={{ width: '100%', height: '300px' }} value={getExportData()}></textarea>
                        <div className="buttons">
                            <button onClick={copyToClipboard}>Copiar</button>
                            <button onClick={downloadJson}>Download</button>
                        </div>
                    </div>
                    <div>
                        <h1>Import</h1>
                        <textarea style={{ width: '100%', height: '300px' }} value={importObject} onChange={handleImportTextarea}></textarea>

                        <div className="buttons">
                            <button onClick={importFromTextarea}>Importar</button>
                            <button onClick={beautifyJSON}>Embelezar JSON</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}

export default ImportExportPopup;
