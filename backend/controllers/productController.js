const Product = require('../models/Product');
const { SEED_PRODUCTS } = require('../utils/seedData');

let memoryProducts = [...SEED_PRODUCTS];

// @desc    Get all products with filters
// @route   GET /api/products
exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, shopId, search, sort } = req.query;

    try {
      const filter = {};
      if (category && category !== 'All') {
        filter.category = new RegExp(`^${category}$`, 'i');
      }
      if (shopId) {
        filter.shopId = shopId;
      }
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { offerTag: { $regex: search, $options: 'i' } },
        ];
      }

      let query = Product.find(filter);

      if (sort === 'discount_desc') {
        query = query.sort({ discountPercentage: -1 });
      } else if (sort === 'price_asc') {
        query = query.sort({ price: 1 });
      } else if (sort === 'price_desc') {
        query = query.sort({ price: -1 });
      } else {
        query = query.sort({ createdAt: -1 });
      }

      const products = await query.exec();
      if (products && products.length > 0) {
        return res.json(products);
      }
    } catch (dbErr) {}

    // In-memory fallback
    let results = [...memoryProducts];
    if (category && category !== 'All') {
      results = results.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (shopId) {
      results = results.filter((p) => p.shopId === shopId);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.offerTag?.toLowerCase().includes(q)
      );
    }

    if (sort === 'discount_desc') {
      results.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    } else if (sort === 'price_asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      results.sort((a, b) => b.price - a.price);
    }

    return res.json(results);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (product) return res.json(product);
    } catch (dbErr) {}

    const found = memoryProducts.find((p) => p._id === id || p.id === id);
    if (!found) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json(found);
  } catch (err) {
    next(err);
  }
};

// @desc    Create product
// @route   POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const productData = req.body;

    const discountPercentage =
      productData.originalPrice > productData.price
        ? Math.round(
            ((productData.originalPrice - productData.price) /
              productData.originalPrice) *
              100
          )
        : 0;

    try {
      const product = await Product.create({
        ...productData,
        discountPercentage,
      });
      return res.status(201).json({ success: true, product });
    } catch (dbErr) {}

    // Memory fallback
    const newProd = {
      _id: 'prod_' + Date.now(),
      id: 'prod_' + Date.now(),
      ...productData,
      discountPercentage,
      createdAt: new Date().toISOString(),
    };
    memoryProducts.unshift(newProd);

    return res.status(201).json({ success: true, product: newProd });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      await Product.findByIdAndDelete(id);
    } catch (dbErr) {}

    const idx = memoryProducts.findIndex((p) => p._id === id || p.id === id);
    if (idx !== -1) memoryProducts.splice(idx, 1);

    return res.json({ success: true, message: 'Product removed' });
  } catch (err) {
    next(err);
  }
};
