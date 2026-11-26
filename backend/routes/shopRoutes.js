const express = require('express');
const {
  getAllShops,
  getShopDetail,
  getMyShop,
  saveMyShop,
  updateShopById,
} = require('../controllers/shopController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllShops);
router.get('/my-shop', protect, authorize('shop_owner', 'admin'), getMyShop);
router.post('/my-shop', protect, authorize('shop_owner', 'admin'), saveMyShop);
router.get('/:idOrSlug', getShopDetail);
router.put('/:id', updateShopById);

module.exports = router;

