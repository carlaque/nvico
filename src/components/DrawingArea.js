import React from 'react';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import "../styles/drawingArea.css"
import Board from "./Board.js"


function DrawingArea(props) {
    return (
        <div className="drawingArea">
            <div className='navbar'>
                {/* acoes do quadro aqui */}
                <a href="/home">ação do quadro 1</a>
                <a href="/home">ação do quadro 2</a>
                <a href="/home">ação do quadro 3</a>
                <a href="/home">ação do quadro 4</a>
            </div>
            <DndProvider backend={HTML5Backend}>
                <Board network={props.network}/>
            </DndProvider>
        </div >
    );
}

export default DrawingArea;