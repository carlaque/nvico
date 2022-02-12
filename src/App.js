import "./styles/styles.css"
import { useState } from "react";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import "./styles/drawingArea.css"
import Board from "./components/Board.js"

function App() {

  const [network, setNetwork] = useState("");

  const geraRede = () => {
    let text = document.getElementsByTagName("textarea").input.value
    setNetwork(text)
  };

  return (
    <div className="App">
      {/* <aside>
        <h1>JSON AQUI</h1>
        <textarea 
        name="input" cols="60" rows="40" placeholder=" Digite aqui o JSON para gerar uma rede..."></textarea>
        <button onClick={geraRede}>Gerar Rede</button>
      </aside> */}
      
      <DndProvider backend={HTML5Backend}>
        <Board network={network} />
      </DndProvider>

    </div>
  );
}

export default App;
