import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set)=>({
    messages:[],
    users:[],
    selectedUser : null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUSers : async()=>{
        set({isUsersLoading:true})

        try {
            const res = await axiosInstance.get('/messages/users')
            set({users: res.data})
            
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUsersLoading: false})
        }
    },

    getMessages : async(userId)=>{
        set({isMessagesLoading: true})

        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages: res.data})
            
        } catch (error) {
            toast.error(error.response.data.massage)
        }finally{
            set({isMessagesLoading: false})
        }
    },
    // todo
    setSelectedUSer : (selectedUser)=>set({selectedUser})

}))