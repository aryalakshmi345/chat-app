import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

// zustand : global state management library

export const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLogingIn: false,
    isProfileUpdating: false,

    isCheckingAuth : true,

    checkAuth : async  ()=>{
        try {
            const response = await axiosInstance.get("/auth/check")
            set({authUser: response.data})
        } catch (error) {
            console.log('Error in checkAuth: ',error);
            set({authUser:null})
            
        }finally{
            set({isCheckingAuth: false})
        }
    } ,

    signup: async(data) =>{
        console.log('xfcghjk');
        
        set({isSigningUp: true})

        try {
            const response = await axiosInstance.post('/auth/signup',data)
            set({authUser: response.data})
            toast.success('Account created successfully')
            
        } catch (error) {
           toast.error(error.response.data.message) 
        }finally{
            set({isSigningUp: false})
        }
    } ,

    login: async(data)=>{
        set({isLogingIn: true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser: res.data})
            toast.success('Logged in successfully')            
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLogingIn: false})
        }
    },
     updateProfile : async ()=>{

    },

    logout: async()=>{
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser: null})
            toast.success('Logout successfully')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}))