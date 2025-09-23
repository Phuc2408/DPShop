const productController = require('../../controller/productController');
const router = require('express').Router();

router.get("/:categorySlug/:subSlug", productController.getProductsBySub);
router.get("/:categorySlug", productController.getProductsByCategory);
module.exports = router;