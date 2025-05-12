import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from "lucide-react";

function Profile() {
  const {isUpdatingProfile, authUser, updateProfile} = useAuthStore()
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageUpload = async(e)=>{
    const file = e.target.files[0]
    if(!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = async()=>{
      const base64Image = reader.result
      setSelectedImage(base64Image)
      await updateProfile({profileImage: base64Image})
    }

  }
  return (
    <div className='h-screen pt-20'>
      <div className="bg-base-300 rounded max-w-2xl mx-auto p-6 space-y-8">
        <div className=" text-center">
          <div className="text-2xl font-semibold">
            Profile
          </div>
          <div className="mt-2">Your Profile Information</div>
        </div>
          {/* profile image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img src={selectedImage || authUser.profilePic || './profile.webp'} alt="" className='size-32 rounded-full object-cover border-4' />
           
            <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className='w-5 h-5 text-base-20'/>
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />

              </label>
              </div>

                  {/* informations */}
              <div className='space-y-6'>
                <div className="space-y-1.5">
                  
                  <p className='px-4 py-2.5  border-b flex items-center border-zinc-700 '><User className='w-5 h-5 me-3'/>{authUser.fullName}</p>
                </div>

                <div className="space-y-1.5">
                 
                  <p className='px-4 py-2.5  border-b flex items-center border-zinc-700 w-100'><Mail className='w-5 h-5 me-3'/>{authUser.email}</p>
                </div>

              </div>
                                {/* Additional info */}
              <div className='mt-6 bg-base-300 rounded-xl p-6'>
              <h2 className="text-lg font-medium  mb-4 ">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 ">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>

              </div>
          </div>
      </div>
    </div>
  )
}

export default Profile