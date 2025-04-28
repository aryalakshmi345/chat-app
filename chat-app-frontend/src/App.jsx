import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
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

  if(isCheckingAuth && !authUer){
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
        <Route path='/' element={authUer ?<Homepage/> : <Navigate to={'/login'}/>}/>
        <Route path='/login' element={!authUer ?<Login/>: <Navigate to={'/'}/>}/>
        <Route path='/profile' element={authUer ?<Profile/> : <Navigate to={'/login'}/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/sign-up' element={!authUer ?<SignUp/> : <Navigate to={'/'}/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App
