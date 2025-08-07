import dotenv from "dotenv"
import { ConnectDB } from "./database/db.js"
import { app } from "./app.js"

dotenv.config({path: './.env'})

ConnectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running on http://localhost:${process.env.PORT || 8000}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection Error: ",err)
})