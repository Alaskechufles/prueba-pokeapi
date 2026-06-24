import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Pokemon from './pages/Pokemon'
import Pokemones from './pages/Pokemones'


function App() {

  return (
    <>
    <nav className='flex flex-col'>
      <Link className='bg-amber-300' to={"/"} >Home</Link>
      <Link className='bg-red-400' to={"/about"} >About</Link>
      <Link className='bg-blue-300' to={"/contact"} >Contact</Link>
      <Link className='bg-purple-300' to={"/pokemon"} >Lista de Pokemones</Link>
      <Link className='bg-orange-300' to={"/pokemon/charmander"} >Pokemon 1</Link>
      <Link className='bg-orange-300' to={"/pokemon/charizard"} >Pokemon 2</Link>
      <Link className='bg-orange-300' to={"/pokemon/pidgeotto"} >Pokemon 3</Link>
    </nav>
    
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/pokemon' element={<Pokemones/>}></Route>
        <Route path='/pokemon/:nombre' element={<Pokemon/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
