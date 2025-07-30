import express from "express"
import { config } from "dotenv"
import router from "./routes/routes.js"
config()
const app = express()
app.use(express.json())
app.use(router)
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT||5000
app.listen(port,()=>console.log(`server connected at ${port}`))