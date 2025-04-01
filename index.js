require("dotenv").config()
const express = require("express")
const app = express()
const userModel = require("./model/userModel.model")
const productRouter = require("./routes/product.routes")
const userRouter = require("./routes/user.routes")
const PORT = process.env.PORT || 2000
require("./db/mongoose.db")

app.use(express.json())

app.use("/api",productRouter)
app.use("/api",userRouter)

app.post("/api/userCreation",async(req,res)=>{
    const {firstName,lastName,email,userName,password,phoneNumber,address,dateOfBirth,isActive,role,profileImage}=req?.body
    try{
        const creation = await userModel?.create({firstName,lastName,email,userName,password,phoneNumber,address,dateOfBirth,isActive,role,profileImage})
        res?.status(200)?.json({message: "User created success", data:creation})
    }catch(error){
        res?.status(400)?.json({message: "User creation failed", data:error})
    }
    console.log("User created")
})



app.listen(PORT,()=>{
    console.log("server is running on port 3000")
})