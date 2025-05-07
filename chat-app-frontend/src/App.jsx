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
import { Toaster } from 'react-hot-toast'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser);

  if(isCheckingAuth && !authUser){
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
        <Route path='/' element={authUser ?<Homepage/> : <Navigate to={'/login'}/>}/>
        <Route path='/login' element={!authUser ?<Login/>: <Navigate to={'/'}/>}/>
        <Route path='/profile' element={authUser ?<Profile/> : <Navigate to={'/login'}/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/sign-up' element={!authUser ?<SignUp/> : <Navigate to={'/'}/>}/>
      </Routes>
     </div>
     <Toaster/>
    </>
  )
}

export default App
