import './App.css';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { async } from '@firebase/util';

function App() {

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  // user word is used in a .map below in the return
  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }




  
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)

  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  
  const [amount, setAmount] = useState(0)

  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: newAge})
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = { age: age + 1 }
    await updateDoc(userDoc, newFields)
  }

  const deleteUser = async(id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  // const [total, setTotal] = useState(0)
  const hamPrice = 10.00


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data)
      console.log(data.docs)
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

        <h3>Register User</h3>
        <input placeholder='Email...' onChange={(event) => {
          setRegisterEmail(event.target.value)
        }}></input>
        <input placeholder='Password...' onChange={(event) => {
          setRegisterPassword(event.target.value)
        }}></input>

        <button onClick={register}>Create User</button>

        <h3>Login</h3>
        <input placeholder='Email...' onChange={(event) => {
          setLoginEmail(event.target.value)
        }}></input>
        <input placeholder='Password...' onChange={(event) => {
          setLoginPassword(event.target.value)
        }}></input>

        <button onClick={login}>Login</button>

        <h4>User Logged In:</h4>
        {user?.email}

        <button onClick={logout}>Sign Out</button>



        <input placeholder='Name...' onChange={(event) => {setNewName(event.target.value)
        }}
        />
        <input placeholder='Age...' onChange={(event) => {setNewAge(event.target.value)
        }}
        />
        <button onClick={createUser}>Create User</button>

        {users.map((user) => {
          return (
            <div>
              <h3>Name: {user.name}</h3>
              <h3>Age: {user.age}</h3>
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
