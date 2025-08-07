import express from "express"
import cors from "cors";

const app = express()

app.use(cors({
    origin: "*" ,
    credentials: true
}));
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true,limit : "16kb"}))

import userRoutes from "./Routes/user.routes.js"
import ticketRoutes from "./Routes/ticket.routes.js"

app.use("/api/users",userRoutes);
app.use("/api/tickets",ticketRoutes);

export {app}