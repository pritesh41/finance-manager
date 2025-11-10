import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Income from './components/Income'
import Budget from './components/Budget';
import Expenses from './components/Expenses';
import Report from './components/Report';
import Landing from './components/Landing';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/income" element={<Income/>}/>
      <Route path='/expenses' element={<Expenses/>}/>
      <Route path='/budget' element={<Budget/>}/>
      <Route path='/report' element={<Report/>}/>
    </Routes>
    </>
  )
}

export default App
