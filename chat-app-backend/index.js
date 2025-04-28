import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import authRoutes from "./routes/auth.route.js"
import messageRoute from './routes/message.route.js'
import { connectDB } from "./lib/db.js"
import cookieParser from 'cookie-parser'


dotenv.config()
const app = express()


const port = 4000


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use("/api/auth",authRoutes)
app.use('/api/messages',messageRoute)


app.listen(port,()=>{
    console.log(`Server is running on port ${port} and waiting for client requests...`);
    connectDB()
})

app.get('/',(req,res)=>{
    res.send('chat-app server is running')  
})