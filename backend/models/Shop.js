const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide shop name'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    ownerId: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Dress',
    },
    city: {
      type: String,
      default: 'Kozhikode',
    },
    area: {
      type: String,
      default: 'SM Street (Mittayi Theruvu)',
    },
    address: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    whatsapp: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    logoUrl: {
      type: String,
      default: '',
    },
    bannerUrl: {
      type: String,
      default: '',
    },
    brandColor: {
      type: String,
      default: '#E04F2E',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    adPriority: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from name
shopSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Shop', shopSchema);
