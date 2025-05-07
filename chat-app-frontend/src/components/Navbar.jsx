import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
  const {authUser,logout} = useAuthStore()
  return (
    <header className='bg-base-100 border-b border-base-100 fixed w-full top-0 z-40 backdrop-blour-lg bg-base-100/80'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>
          <div className="flex items-center gap-4">
            <Link to={'/'} className='flex gap-4 items-center'>
               <MessageSquare className="size-6 text-primary" /> 
               <h3 className='text-xl'>ChatApp</h3>
            </Link>  
          </div>

          <div className='flex items-center gap-2'>
            <Link to={'/settings'} className='btn btn-sm gap-2 transition-colors'>
              <Settings className='w-4 h-4'/>
              <span className='hidden sm:inline'>Settings</span>
            </Link>
            {

                authUser &&
              <><Link to={'/profile'} className='btn btn-sm gap-2 transition-colors'>
              <User className='w-4 h-4'/>
              <span className='hidden sm:inline'>Profile</span>
            </Link>
            <button className='btn btn-sm gap-2 transition-colors' onClick={logout}>
              <LogOut className='w-4 h-4'/>
              <span className='hidden sm:inline'>Logout</span>
            </button>
            </>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar