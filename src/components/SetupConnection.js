import React from 'react';
import { FaEthernet } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';



export function AddConnection({ cable, setCable }) {

    return (
        <button
            className={'conn-actions-button ' + (cable ? 'on' : 'off')}
            onClick={() => setCable(!cable)} >

            <FaEthernet
                style={{
                    width: '60%',
                    height: '60%',
                }} />

            <p>Criar Conexao</p>
        </button>
    );
}


export function DeleteConnection({ deletingConn, setDeletingConn }) {

    return (
        <button
            className={'conn-actions-button ' + (deletingConn ? 'on' : 'off')}
            onClick={() => setDeletingConn(!deletingConn)} >

            <TiDeleteOutline
                style={{
                    width: '60%',
                    height: '60%',
                }} />

            <p>Deletar Conexao</p>
        </button>
    );
}