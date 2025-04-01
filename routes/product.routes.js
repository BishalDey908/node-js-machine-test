const { updateProductController, productPriceController, ProductAccordingToPriceController, highestPriceInEachCatagoryController, createProductController } = require("../controller/product.controller")
const Product = require('../model/productModel.model');

const Router = require("express")
const router = Router()

router.post("/createProduct",createProductController)
router.post("/updateProduct/:id",updateProductController)
router.get("/productPrice",productPriceController)
router.get("/getProductByPrice",ProductAccordingToPriceController)
router.get("/highestPriceEachCatagory",highestPriceInEachCatagoryController)



router.get('/pagination/', async (req, res) => {
    try {
      // Parse query parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      // Build query
      const query = {};
      if (req.query.category) {
        query.category = req.query.category;
      }
      
      // Build sort
      const sort = {};
      if (req.query.sort) {
        const sortField = req.query.sort.replace('-', '');
        const order = req.query.sort.startsWith('-') ? -1 : 1;
        sort[sortField] = order;
      } else {
        sort.createdAt = -1; // Default sort
      }
      
      // Execute query
      const products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      
      // Get total count for pagination
      const total = await Product.countDocuments(query);
      
      // Build pagination result
      const pagination = {};
      if (skip + limit < total) {
        pagination.next = {
          page: page + 1,
          limit
        };
      }
      if (skip > 0) {
        pagination.prev = {
          page: page - 1,
          limit
        };
      }
      
      res.json({
        success: true,
        count: products.length,
        pagination,
        total,
        data: products
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  });

module.exports = router