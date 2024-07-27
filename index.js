const express = require("express");
const cors  = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouters");
const { UserModule } = require("./model/userModel");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/users",userRouter)

app.get("/",async(req,res)=>{
    const user = await UserModule.find();
    res.send(user)
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

