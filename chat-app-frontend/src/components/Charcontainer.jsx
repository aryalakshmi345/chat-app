import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'
import ChatHeader from './ChatHeadet'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'

function Charcontainer() {
  const {messages, getMessages, selectedUser, isMessageLoading} = useChatStore()

  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])

  if(true){ return(
     <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto">
        <MessageSkeleton />
      </div>
      <MessageInput />
    </div>
  )
}
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>

      <p>Messages...</p>

      <MessageInput/>
    </div>
  )
}

export default Charcontainer