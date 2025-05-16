import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import NochatSelected from '../components/NochatSelected'
import Charcontainer from '../components/Charcontainer'

function Homepage() {
  const { selectedUser} = useChatStore()
  return (
    <div className='h-screen bg-base-200'>
      <div className="flex itemse-center justify-center pt-20 px-4">
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
         <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar/>
  
            {
              !selectedUser ?
              <NochatSelected/> :
              <Charcontainer/>
            }
         </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage