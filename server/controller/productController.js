// productController.js

const Product = require('../models/Product');
const { findCategoryBySlug, findCollectionBySlug } = require("../utils/slugMapper");

const productController = {
    // Hàm xử lý route /api/products/:categorySlug
    getProductsByCategory: async (req, res) => {
        try {
            const { categorySlug } = req.params;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 64;
            const skip = (page - 1) * limit;

            const filter = {};
            const categoryStr = findCategoryBySlug(categorySlug);

            // Nếu không tìm thấy category, trả về 404
            if (!categoryStr) {
                return res.status(404).json({ msg: "Category not found" });
            }
            filter.Category = categoryStr;

            const [items, total] = await Promise.all([
                Product.find(filter)
                    .sort({ _id: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                Product.countDocuments(filter),
            ]);

            res.json({
                page,
                limit,
                total,
                totalPages: Math.max(Math.ceil(total / limit), 1),
                hasNext: page * limit < total,
                items,
            });
        } catch (error) {
            console.error("[getProductsByCategory] error:", error);
            return res.status(500).json({ msg: error.message });
        }
    },

    // Hàm xử lý route /api/products/:categorySlug/:subSlug
    getProductsBySub: async (req, res) => {
        try {
            const { categorySlug, subSlug } = req.params;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 64;
            const skip = (page - 1) * limit;

            const filter = {};
            const categoryStr = findCategoryBySlug(categorySlug);
            const collectionStr = findCollectionBySlug(subSlug);

            // Nếu không tìm thấy category hoặc sub, trả về 404
            if (!categoryStr || !collectionStr) {
                return res.status(404).json({ msg: "Category or sub-category not found" });
            }
            filter.Category = categoryStr;
            filter.Collection = collectionStr;

            const [items, total] = await Promise.all([
                Product.find(filter)
                    .sort({ _id: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                Product.countDocuments(filter),
            ]);

            res.json({
                page,
                limit,
                total,
                totalPages: Math.max(Math.ceil(total / limit), 1),
                hasNext: page * limit < total,
                items,
            });
        } catch (error) {
            console.error("[getProductsBySub] error:", error);
            return res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = productController;