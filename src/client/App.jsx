import { useState } from 'react';
import { Link, Routes, Router } from "react-router-dom";
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import Movies from './components/Movies';
import Register from './components/Register';


function App() {
  const [count, setCount] = useState(0);
  const [ token, setToken ] = useState(null);

  return (
    <div className='App'>
        <h1>Ratamovie</h1>
        <img id='comp-img' src='./computer.png'></img>
        <Login />
    </div>
  );
}

export default App;
