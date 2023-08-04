import {Route, Routes, useLocation} from "react-router-dom"

import './App.css'
import Login from './components/Login/Login'
import HomePage from "./components/HomePage/HomePage"
import Navbar from "./components/Navbar/Navbar"
import Detail from "./components/Detail/Detail"
import CreatePokemon from "./components/CreatePokemon/CreatePokemon"
import About from "./components/About/About"

function App() {

  const location = useLocation();
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
        <Route path="/form" element={<CreatePokemon />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
