const express = require('express');
const router = express.Router();
const ensureAnthenticated = require("../config/auth");
const productController = require('../app/controllers/ProductController');

router.get('/:id/edit', productController.edit);
router.get('/details/:slug',ensureAnthenticated.ensureAuthenticated, productController.details);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
//router.get('/', productController.products);
router.get('/', ensureAnthenticated.ensureAuthenticated, productController.getProducts);
router.get('/add-to-cart/:id', productController.addToCart);
router.get('/carts', productController.carts);
router.get('/reduce/:id', productController.cartsReduceItem);
router.get('/remove/:id', productController.cartsRemoveItem);
router.get('/checkout', productController.checkOut);
router.post('/checkout', productController.checkOutCharge);
router.get('/confirmed', productController.orderConfirmed)

module.exports = router;