// Write a query to search for products by productName and description using a case-insensitive match.

const searchProducts = async (productName,description) => {
    return await Product.find({
      $or: [
        { productName: { $regex: productName, $options: 'i' } }, 
        { description: { $regex: description, $options: 'i' } }
      ]
    });
  };


//   Write a query that implements pagination to fetch products with the option to sort by price and filter by category.

  const { page = 1, limit = 10, sort = 'price', category } = req.query;

const query = {};
if (category) query.categoryId = category;

const products = await Product.find(query)
  .sort({ [sort.startsWith('-') ? sort.slice(1) : sort]: sort.startsWith('-') ? -1 : 1 })
  .skip((page - 1) * limit)
  .limit(parseInt(limit))
  .populate('categoryId', 'name');

const total = await Product.countDocuments(query);

const pagination = {
  currentPage: parseInt(page),
  totalPages: Math.ceil(total / limit),
  totalProducts: total
};

// How would you calculate the total payback amount for a specific user based on their investment history (i.e., paybackhistory)?
const cal = roiInvestmodel.paybackhistory
const paybackhistory = cal.reduce((sum, item) => sum + item.amount, 0);