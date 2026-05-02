
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './navbar/navbar.jsx'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import SignUp from './Pages/Signup.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar />
  <Routes>
   {/* <Route path='/' element={<Home />} /> */}
   <Route path='/' element={<App />} />
   <Route path='/login' element={<Login />} />
   <Route path='/signup' element={<SignUp />} />
    
  </Routes>
  </BrowserRouter>
    
      
)
