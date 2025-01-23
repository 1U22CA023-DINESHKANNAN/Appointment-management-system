import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Appointment from './appointment';
import Login from './login/login'
import Workspace from './doctor_workspace'
import Update from './update';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Appointment/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/workspace" element={<Workspace/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
