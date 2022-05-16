import React, { useState } from 'react';

const ImportExportPopup = (props) => {
    const [importObject, setImportObject] = useState('')

    const getExportData = () => {
        return JSON.stringify({board: props.board, connections: props.connections});
    }

    const copyToClipboard = () => {
        let textBox = document.getElementById("exportTextarea");
        textBox.select();
        navigator.clipboard.writeText(textBox.value);
    }

    const importFromTextarea = () => {
        let object = JSON.parse(importObject);

        object.connections.forEach(element => {
            element.to = object.board[element.to.id];
            element.from = object.board[element.from.id];
        });

        props.setBoard(object.board);
        props.setConnections(object.connections);
    }

    const handleImportTextarea = (event) => {
        setImportObject(event.target.value);
    }

    return props.show ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>Import / Export</h1>
                <button className='close-btn'
                    onClick={
                        () => {
                            props.setShow(false);
                        }
                    }> + </button>
                <div>
                    <div>
                        <label>Export</label><br/>
                        <textarea id='exportTextarea' style={{width: '100%', height: '300px'}} value={getExportData()}></textarea>
                        <button onClick={copyToClipboard}>copy</button>
                    </div>
                    <div>
                        <label>Import</label><br/>
                        <textarea style={{width: '100%', height: '300px'}} value={importObject} onChange={handleImportTextarea}></textarea>
                        <button onClick={importFromTextarea}>import</button>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}

export default ImportExportPopup;
