import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'


// sign-up
export const signup = async(req,res)=>{
    const {fullName, email, password} = req.body

    try {
        if(!fullName || !email || !password){
            return res.status(400).send({message:"All fields are required!"})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
           return res.status(403).send({message: "This email already exist. Please login or try again with another email"})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
    
        const newUser =  new User({
            fullName,
            email,
            password: hashedPassword
        })
    
        if(newUser){
            // generate jwt token
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).send({
                _id: newUser._id,
                fullName: newUser.fullName,
                email:newUser.email,
                profileImage: newUser.profileImage
            })
        }else{
            res.status(400).send({message:"Invalid user data"})
        }
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
        console.log("Error in Signup Controller",error);
    }


}

// login
export const login = async(req,res)=>{
   const {email,password} = req.body

try {
       const user = await User.findOne({email})
    
       if(!user){
        return res.status(400).send({message:'Invalid email or password'})
       }
    
       const isPasswordCorrect = await bcrypt.compare(password,user.password)
    
       if(!isPasswordCorrect){
        return res.status(400).send({message:'Invalid email or password'})
       }
    
       generateToken(user._id,res)
       res.status(200).send({
        id: user._id,
        fullName:user.fullName,
        email: user.email,
        profileImage: user.profileImage
       })
} catch (error) {
    res.status(500).send({message:"Internal Server Error"})
    console.log("Error in login Controller",error);
}


}


// logout
export const logout = async(req,res)=>{
   try {
    res.cookie("jwt","",{
     maxAge: 0
    })
 
    res.status(200).send({message: "Logged out successfully"})
   } catch (error) {
    res.status(500).send({message:"Internal Server Error"})
    console.log("Error in logout Controller",error);
   }
}


// update profile
export const updateProfile = async(req,res)=>{
    const {profileImage} = req.body

   try {
     const userId = req.user._id
 
     const uploadResponse = await cloudinary.uploader.upload(profileImage)
     const updatedUser = await User.findByIdAndUpdate(userId,{profileImage:uploadResponse.secure_url},{new:true})
 
     res.status(200).send(updatedUser)
 
   } catch (error) {
    res.status(500).send({message:"Internal Server Error"})
    console.log("Error in update-profile Controller",error);
   }
}

//  check auth
export const checkAuth = async(req,res)=>{
    try {
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
        console.log("Error in check auth Controller",error);
    }
}