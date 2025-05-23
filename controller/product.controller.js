const { updateProductService, ProductPriceService, ProductAccordingToPricerangeService, highestPriceInEachCatagoryService, createProductService } = require("../services/product.service")

const createProductController = async(req,res) =>{
  const productDetails = req.body
  try{
     const createProduct = await createProductService(productDetails)
     console.log(createProduct)
     if(createProduct){
         res.status(200).json({message:"product created successful",data:createProduct})
      }
  }catch(error){
    console.log(error)
      res.status(400).json({message:"product creation failed",error:createProduct.message})
  }
} 

const updateProductController = async(req,res) =>{
    const productId = req.params.id
    const productDetails = req.body
    try{
       const updatedProduct = await updateProductService(productId,productDetails)
       console.log(updatedProduct)
       if(updatedProduct){
           res.status(200).json({message:"product updated successful",data:updatedProduct})
       }else{
        res.status(404).json({message:"product not found"})
       }
    }catch(error){
        res.status(400).json({message:"product updated failed",error:updatedProduct.message})
    }
} 

const productPriceController = async(req,res) =>{
   try{
     const getProductPriceData = await ProductPriceService()
     console.log(getProductPriceData)
     res.status(200).json({message:"product price data fetched successful",data:getProductPriceData})
   }catch(error){
    res.status(400).json({message:"product price failed",error:error})
   }
}

const ProductAccordingToPriceController = async(req,res) =>{
    try{
      const getProduct = await ProductAccordingToPricerangeService()
      console.log(getProduct)
      res.status(200).json({message:"product fetched successful",data:getProduct})
    }catch(error){
     res.status(400).json({message:"product fetched failed",error:error})
    }
 }

 const highestPriceInEachCatagoryController = async(req,res) =>{
    try{
      const getProduct = await highestPriceInEachCatagoryService()
      console.log(getProduct)
      res.status(200).json({message:"Highest price product fetched successful",data:getProduct})
    }catch(error){
     res.status(400).json({message:"Highest price product fetched failed",error:error})
    }
 }

module.exports = {
  createProductController,
    updateProductController,
    productPriceController,
    ProductAccordingToPriceController,
    highestPriceInEachCatagoryController
}