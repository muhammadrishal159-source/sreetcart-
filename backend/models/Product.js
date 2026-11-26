const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide product title'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Dress',
    },
    price: {
      type: Number,
      required: [true, 'Please provide offer price'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    offerTag: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    stockStatus: {
      type: String,
      enum: ['in_stock', 'limited', 'out_of_stock'],
      default: 'in_stock',
    },
    sizes: {
      type: String,
      default: '',
    },
    isHotDeal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate discount percentage before save
productSchema.pre('save', function (next) {
  if (this.originalPrice > this.price && this.originalPrice > 0) {
    this.discountPercentage = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  } else {
    this.discountPercentage = 0;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

