import express from "express"
import mongoose from "mongoose";
import { chip_modal } from "./models/chips_model.js";
import chipRouter from "./routes/chip_routes.js"
import { configDotenv } from "dotenv";
import cors from "cors";

// const express = require("express");
const app= express();
configDotenv();

app.use(cors({
    origin:process.env.Frontend_URL,
    Credential:true,
    methods:["GET","POST","DELETE","PUT"]
}))



const PORT=process.env.PORT;
app.use(express.json())

try {
    const Mongo_Url=process.env.Mongo_Url;
    // mongoose.connect(`${Mongo_Url}/Chip_DB`)
    mongoose.connect(Mongo_Url)
    console.log("Connected")
} catch (error) {
    console.log(error)
}

app.get("/",(req,res)=>{
    res.send("Hellow World")
})

app.use("/api/chips",chipRouter)


app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`)
})