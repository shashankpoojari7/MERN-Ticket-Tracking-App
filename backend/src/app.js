import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'

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
  res.status(200).json({
    status: "OK",
  });
});

import userRoutes from "./Routes/user.routes.js"
import ticketRoutes from "./Routes/ticket.routes.js"

app.use("/api/users",userRoutes);
app.use("/api/tickets",ticketRoutes);

export {app}