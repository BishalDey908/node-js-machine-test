const usermodel = require("../model/userModel.model")

const userCreationService= async(userDetails)=>{
    const {firstName,lastName,email,userName,password,phoneNumber,address,dateOfBirth,isActive,role,profileImage}=userDetails
    try{
        const result = await usermodel.create({firstName,lastName,email,userName,password,phoneNumber,address,dateOfBirth,isActive,role,profileImage})
        return result
    }catch(error){
        return error
    }
}

module.exports = {
    userCreationService
}