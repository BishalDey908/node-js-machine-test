const productModel = require("../model/productModel.model")

const updateProductService = async(productId,productDetails)=>{
   try{
    const product = await productModel?.findOneAndUpdate({_id:productId},productDetails,{new:true})
    return product
   }catch(error){
     return new error ({message:"product not found"})
   }
}

const ProductPricePipeline = [
    {
        $group: {
          _id: null, // Group all documents together
          averagePrice: { $avg: "$price" }, // Calculate average
          totalValue: { $sum: "$pvValue" } // Optional: sum of all prices
        }
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          averagePrice: 1,
          totalValue: 1,
        }
      }
]

const ProductPriceService = async() =>{
    try{
      const result = await productModel.aggregate(ProductPricePipeline)
      console.log(result)
      return result
    }catch(error){
        return error 
    }
}

const ProductPricerangePipeline = [
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 100, 500, 1000, Infinity],  // Price range boundaries
        default: "Other",  // Shouldn't be needed with these boundaries
        output: {
          count: { $sum: 1 },
          products: { $push: "$$ROOT" },  // Optional: include all product docs
          averagePrice: { $avg: "$price" }
        }
      }
    },
    {
      $project: {
        range: {
          $switch: {
            branches: [
              { case: { $eq: ["$_id", 0] }, then: "0-100" },
              { case: { $eq: ["$_id", 100] }, then: "101-500" },
              { case: { $eq: ["$_id", 500] }, then: "501-1000" },
              { case: { $eq: ["$_id", 1000] }, then: "1000+" }
            ],
            default: "Other"
          }
        },
        count: 1,
        products: 1  // Remove this if you don't need individual products
      }
    },
    { $sort: { "_id": 1 } }  // Sort by price range ascending
  ];
  
  const ProductAccordingToPricerangeService = async() =>{
    try{
        const result = await productModel.aggregate(ProductPricerangePipeline)
        console.log(result)
        return result
    }catch(error){
        return error
    }
  }


  const highestPriceInEachCatagoryPipeline =  [
    // First, categorize products into price ranges
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 100, 500, 1000, Infinity],
        default: "Other",
        output: {
          products: { $push: "$$ROOT" }
        }
      }
    },
    // Then unwind the products array to process individual products
    {
      $unwind: "$products"
    },
    // Sort products within each category by price (descending)
    {
      $sort: {
        "_id": 1,          // Sort by price range
        "products.price": -1 // Sort by product price descending
      }
    },
    // Group again to get the first (highest priced) product in each category
    {
      $group: {
        _id: "$_id",       // Group by the price range again
        categoryName: {
          $first: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 0] }, then: "0-100" },
                { case: { $eq: ["$_id", 100] }, then: "101-500" },
                { case: { $eq: ["$_id", 500] }, then: "501-1000" },
                { case: { $eq: ["$_id", 1000] }, then: "1000+" }
              ],
              default: "Other"
            }
          }
        },
        highestPriceProduct: { $first: "$products" },
        highestPrice: { $max: "$products.price" },
        productCount: { $sum: 1 }
      }
    },
    // Project to clean up the output
    {
      $project: {
        _id: 0,
        priceRange: "$categoryName",
        highestPrice: 1,
        productCount: 1,
        product: "$highestPriceProduct"
      }
    },
    // Sort by price range
    {
      $sort: {
        "priceRange": 1
      }
    }
  ];

  const highestPriceInEachCatagoryService = async() =>{
    try{
        const result = await productModel.aggregate(highestPriceInEachCatagoryPipeline)
        console.log(result)
        return result
    }catch(error){
        return error
    }
  }




module.exports = {
    updateProductService,
    ProductPriceService,
    ProductAccordingToPricerangeService,
    highestPriceInEachCatagoryService
}