const express = require('express');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const { SEED_SHOPS, SEED_PRODUCTS } = require('../utils/seedData');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let seededShops = 0;
    let seededProducts = 0;

    try {
      await Shop.deleteMany({});
      await Product.deleteMany({});

      const shops = await Shop.insertMany(SEED_SHOPS);
      const products = await Product.insertMany(SEED_PRODUCTS);

      seededShops = shops.length;
      seededProducts = products.length;
    } catch (e) {
      console.warn('Seeding MongoDB had notice:', e.message);
    }

    res.json({
      success: true,
      message: 'StreetCart database seeded with Kozhikode shops and offers.',
      seededShops: seededShops || SEED_SHOPS.length,
      seededProducts: seededProducts || SEED_PRODUCTS.length,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

