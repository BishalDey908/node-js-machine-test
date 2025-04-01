const userModel = require("../model/userModel.model")
const { userCreationService } = require("../services/user.service")

const userCreateController = async(req,res) =>{
    const userDetails = req?.body
    try{
        const userCreation = await userCreationService(userDetails)
        if(userCreation){
            res.status(201).json({message:"User created successfully",data:userCreation})
        }
    }catch(error){
        res.status(400).json({message:"User creation failed",data:error})
    }
}

module.exports = {
    userCreateController
}