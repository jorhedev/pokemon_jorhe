import {Route, Routes} from "react-router-dom"

import './App.css'
import Login from './components/Login/Login'
import HomePage from "./components/HomePage/HomePage"
import Navbar from "./components/Navbar/Navbar"
import Detail from "./components/Detail/Detail"

function App() {

  const showNav = location.pathname !== "/";


  return (
    <>
      {showNav && (
        <Navbar/>
      )}
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path="/detail/:id" element={<Detail />} />


      </Routes>
    </>
  )
}

export default App
