const Shop = require('../models/Shop');
const { SEED_SHOPS } = require('../utils/seedData');

let memoryShops = [...SEED_SHOPS];

// @desc    Get all shops with category/search/area filter
// @route   GET /api/shops
exports.getAllShops = async (req, res, next) => {
  try {
    const { category, search, area } = req.query;

    try {
      const filter = {};
      if (category && category !== 'All') {
        filter.category = new RegExp(`^${category}$`, 'i');
      }
      if (area && area !== 'all') {
        filter.area = new RegExp(area.replace('-', ' '), 'i');
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { area: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      const shops = await Shop.find(filter).sort({ adPriority: -1, isFeatured: -1, createdAt: -1 });
      if (shops && shops.length > 0) {
        return res.json(shops);
      }
    } catch (dbErr) {}

    // In-memory fallback
    let filtered = [...memoryShops];
    if (category && category !== 'All') {
      filtered = filtered.filter(
        (s) => s.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (area && area !== 'all') {
      const cleanArea = area.toLowerCase().replace(/[^a-z0-9]/g, '');
      filtered = filtered.filter((s) =>
        s.area.toLowerCase().replace(/[^a-z0-9]/g, '').includes(cleanArea)
      );
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.area.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    return res.json(filtered);
  } catch (err) {
    next(err);
  }
};

// @desc    Get shop by ID or Slug
// @route   GET /api/shops/:idOrSlug
exports.getShopDetail = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    try {
      let shop = null;
      if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
        shop = await Shop.findById(idOrSlug);
      }
      if (!shop) {
        shop = await Shop.findOne({ slug: idOrSlug });
      }
      if (shop) return res.json(shop);
    } catch (dbErr) {}

    const found = memoryShops.find(
      (s) => s._id === idOrSlug || s.id === idOrSlug || s.slug === idOrSlug
    );

    if (!found) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    return res.json(found);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current merchant's shop
// @route   GET /api/shops/my-shop
exports.getMyShop = async (req, res, next) => {
  try {
    const ownerId = req.user.id || req.user._id;

    try {
      const shop = await Shop.findOne({ ownerId });
      if (shop) return res.json({ shop });
    } catch (dbErr) {}

    const found =
      memoryShops.find((s) => s.ownerId === ownerId) || memoryShops[0];
    return res.json({ shop: found });
  } catch (err) {
    next(err);
  }
};

// @desc    Create or update merchant's shop profile
// @route   POST /api/shops/my-shop
exports.saveMyShop = async (req, res, next) => {
  try {
    const ownerId = req.user.id || req.user._id;
    const shopData = req.body;

    const slug = (shopData.name || 'shop')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    try {
      let shop = await Shop.findOne({ ownerId });
      if (shop) {
        Object.assign(shop, shopData);
        shop.slug = slug;
        await shop.save();
        return res.json({ message: 'Shop profile updated successfully', shop });
      } else {
        shop = await Shop.create({
          ...shopData,
          slug,
          ownerId,
        });
        return res.status(201).json({ message: 'Shop profile created successfully', shop });
      }
    } catch (dbErr) {}

    // Memory fallback
    const idx = memoryShops.findIndex((s) => s.ownerId === ownerId);
    const updated = {
      ...memoryShops[0],
      ...shopData,
      ownerId,
      slug,
      _id: shopData._id || 'shop_' + Date.now(),
      id: shopData._id || 'shop_' + Date.now(),
    };

    if (idx >= 0) {
      memoryShops[idx] = updated;
    } else {
      memoryShops.unshift(updated);
    }

    return res.json({ message: 'Shop profile saved', shop: updated });
  } catch (err) {
    next(err);
  }
};

// @desc    Update shop by ID (Admin toggle isFeatured / isOpen)
// @route   PUT /api/shops/:id
exports.updateShopById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    try {
      let shop = await Shop.findByIdAndUpdate(id, updateData, { new: true });
      if (shop) return res.json({ message: 'Shop updated', shop });
    } catch (dbErr) {}

    const idx = memoryShops.findIndex((s) => s._id === id || s.id === id);
    if (idx >= 0) {
      memoryShops[idx] = { ...memoryShops[idx], ...updateData };
      return res.json({ message: 'Shop updated', shop: memoryShops[idx] });
    }

    return res.json({ message: 'Shop updated', shop: updateData });
  } catch (err) {
    next(err);
  }
};

