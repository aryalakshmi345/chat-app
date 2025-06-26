import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import authRoutes from "./routes/auth.route.js"
import messageRoute from './routes/message.route.js'
import { connectDB } from "./lib/db.js"
import cookieParser from 'cookie-parser'
import { app, server } from "./lib/socket.js";


dotenv.config()


const port = 4000


app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use("/api/auth",authRoutes)
app.use('/api/messages',messageRoute)


server.listen(port,()=>{
    console.log(`Server is running on port ${port} and waiting for client requests...`);
    connectDB()
})

app.get('/',(req,res)=>{
    res.send('chat-app server is running')  
})