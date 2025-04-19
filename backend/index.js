import express from 'express'
import { connectDB } from './db/connectDB.js' 
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import paymentRoute  from './routes/payment.route.js'

import postRoutes from './routes/post.route.js'





dotenv.config()


const app = express()
const port = process.env.PORT || 1000

// app.use(cors({origin: "http://localhost:3000 ", credentials: true}))
app.use(cors({
  origin: 'https://recipe-recomendation-system-frontendsite.onrender.com',  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // If using cookies/sessions
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/payments",paymentRoute)
app.use("/api/posts",postRoutes)


app.listen(port, () => {
  connectDB()
  console.log(`Example app listening on port ${port}`)
  console.log("hii")
})