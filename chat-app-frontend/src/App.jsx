import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import SignUp from './pages/SignUp'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'

function App() {
  const {authUer, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUer);

  if(!isCheckingAuth && !authUer){
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin'/> 
      </div>
    )
  }
  
  return (
    <>
     <div>

      <Navbar/>

      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App
