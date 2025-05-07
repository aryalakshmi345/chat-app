import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function Profile() {
  const {isProfileUpdating, authUser, updateProfile} = useAuthStore()
  return (
    <div className='h-screen pt-20'>
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <div className="text-2xl font-semibold">
            Profile
          </div>
          <div className="mt-2">Your Profile Information</div>
        </div>

      </div>
    </div>
  )
}

export default Profile