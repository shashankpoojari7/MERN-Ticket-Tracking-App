import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import os from "os";

const app = express()

app.use(cors({
    origin: "http://localhost:5173" ,
    credentials: true
}));
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true,limit : "16kb"}))
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    pod: process.env.HOSTNAME || os.hostname(),
    hostname: os.hostname()
  });
});

import userRoutes from "./Routes/user.routes.js"
import ticketRoutes from "./Routes/ticket.routes.js"

app.use("/api/users",userRoutes);
app.use("/api/tickets",ticketRoutes);

export {app}