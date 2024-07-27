const express = require("express")
const cors  = require("cors");
const { connection } = require("./config/db");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

app.get("/",async(req,res)=>{
    res.send("welcome ")
})

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to mongodb")
        console.log(`Server is running at ${process.env.port}`)
    } catch (error) {
        console.log("Error connecting to db")
    }
})

