import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {

  const [amount, setAmount] = useState(0)
  // const [total, setTotal] = useState(0)
  const hamPrice = 10.00

  // const test = useRef(() => {
  //   console.log("Hello")
  // }, [amount])

  useEffect(() => {
    console.log("Hello");
  }, [amount]);
  
  return (

    <div className="App">
      <header className="App-header">

        <div>Hamburger</div>
        <div>Price: { hamPrice }</div>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <p>Total = { amount * hamPrice}</p>

      </header>
    </div>
  );
}

export default App;
