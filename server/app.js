import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";
import channelRoutes from "./routes/ChannelRoutes.js";

dotenv.config();

const app=express();
const port=process.env.PORT||8000;
const databaseURL=process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true, //for cookies
}));

app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/contacts",contactsRoutes);
app.use("/api/messages",messagesRoutes);
app.use("/api/channel",channelRoutes);

const server=app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});

setupSocket(server);

mongoose.connect(databaseURL)
    .then(()=>console.log("Connected to Database"))
    .catch((e)=>console.log(e.message));