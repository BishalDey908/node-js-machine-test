require("dotenv").config()
const express = require("express")
const app = express()
const userModel = require("./model/userModel.model")
const productModel = require("./model/productModel.model")
const productRouter = require("./routes/product.routes")
require("./db/mongoose.db")

app.use(express.json())

app.use("/api",productRouter)

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

app.post("/api/productCreation",async(req,res)=>{
    const {productName,description,image,categoryId,images,price,pvValue}=req?.body
    try{
        const creation = await productModel?.create({productName,description,image,categoryId,images,price,pvValue})
        res?.status(200)?.json({message: "product created success", data:creation})
    }catch(error){
        res?.status(400)?.json({message: "product creation failed", data:error})
    }
    console.log("product created")
})

app.listen("3000",()=>{
    console.log("server is running on port 3000")
})