import './App.css';
import FloatingMirror from './components/FloatingMirror';

function App() {
  return (
    <div className="App">
      <FloatingMirror
        src={`${process.env.PUBLIC_URL}/portrait.jpg`}
        alt="Portrait in blue glasses, a navy blazer and a black turtleneck"
        title="Akinlara"
        subtitle="STELLOO"
      />
    </div>
  );
}

export default App;
