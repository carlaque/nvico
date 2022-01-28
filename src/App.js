import "./styles/styles.css"
import DrawingArea from "./components/DrawingArea.js"

function App() {
  return (
    <div className="App">
      <aside>
        <h1>JSON AQUI</h1>
        <textarea name="input" cols="60" rows="40" placeholder=" Digite aqui o JSON para gerar uma rede..."></textarea>
        <button>Gerar Rede</button>
      </aside>
      
      <DrawingArea/>
      
    </div>
  );
}

export default App;
