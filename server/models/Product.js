const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        Category: { type: String, index: true },
        Collection: { type: String, index: true },
        Brand: { type: String, index: true },
        ProductName: { type: String, required: true },
        Price: { type: String, required: true },
        Description: { type: String },

        Specifications: mongoose.Schema.Types.Mixed,
        Images: [{ type: String }],

        stock_quantity: { type: Number, default: 0 },

        price_value: { type: Number, index: true },
    },
    {
        timestamps: true,
        collection: 'Products',
    }
);
module.exports = mongoose.model('Product', ProductSchema);