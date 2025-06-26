import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedUserID = req.user._id
    
        const filteredUsers = await User.find({_id: { $ne:loggedUserID}}).select("-password")
        res.status(200).send(filteredUsers)
    } catch (error) {
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
}

export const getMessages = async(req,res)=>{
   
   try { const {id: userTohatId} = req.params
    const myid = req.user._id

    const messages = await Message.find({
        $or: [
            {senderId: myid, recieverId: userTohatId},
            {senderId: userTohatId, recieverId: myid}
        ]
    })

    res.status(200).send(messages)
} catch(error){
    res.status(500).send("Internal Server Error")
    console.log(error);
}
}


export const sendMessage = async(req,res)=>{
    console.log("Inside fn");
    
    try {
        const {text, image} = req.body
        const {id: recieverId } = req.params
        const senderId = req.user._id

        let imageURL
        if(image){
            // upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image,{
                upload_preset: 'unsigned_upload', 
            })
            // upload_preset: 'unsigned_upload', 
            imageURL = uploadResponse.secure_url
            }

            const newMessage = new Message({
                senderId,
                recieverId,
                text,
                image: imageURL
            })

            await newMessage.save()

            // /todo : realtime functionality goes here (socket.io)

            res.status(201).send(newMessage)
            
            
        
        
    } catch (error) {
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
}

