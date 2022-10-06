import './App.css';
import { useState, useRef, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from "firebase/firestore";

function App() {

  const [amount, setAmount] = useState(0)
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")


  // const [total, setTotal] = useState(0)
  const hamPrice = 10.00


  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getUsers()
  }, [])

  useEffect(() => {
    console.log("Hello");
  }, [amount]);
  
  return (

    <div className="App">
      <header className="App-header">

        {users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
            </div>
          )
        })}

        <div>Hamburger</div>
        <div>Price: { hamPrice }</div>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <p>Total = { amount * hamPrice}</p>

      </header>
    </div>
  );
}

export default App;
