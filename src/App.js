import "./styles/styles.css"
import DrawingArea from "./components/DrawingArea.js"
import { useState } from "react";

function App() {

  const [network, setNetwork] = useState("");

  const geraRede = () => {
    let text = document.getElementsByTagName("textarea").input.value
    // // document.getElementsByTagName("textarea").input.value = JSON.stringify(text)
    setNetwork(text)
  };

  return (
    <div className="App">
      <aside>
        <h1>JSON AQUI</h1>
        <textarea 
        name="input" cols="60" rows="40" placeholder=" Digite aqui o JSON para gerar uma rede..."></textarea>
        <button onClick={geraRede}>Gerar Rede</button>
      </aside>
      
      <DrawingArea network={network} />
      
    </div>
  );
}

export default App;
