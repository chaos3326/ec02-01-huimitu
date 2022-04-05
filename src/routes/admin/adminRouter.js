const express = require('express');
const router = express.Router();
const Anthenticated = require('../../config/auth');
const adminController = require('../../app/controllers/AdminController')

router.get('/addProducts', adminController.addProducts);
router.post('/addProducts', adminController.storeProducts);
router.get('/products', adminController.products);
router.get('/products/details', adminController.productsDetails);
router.get('/users/manage', adminController.manageUser);
router.get('/users/banned', adminController.manageUserBanned);
router.patch('/:id/restore', adminController.userRestore);
router.get('/', Anthenticated.ensureAuthenticated, Anthenticated.isAdmin, adminController.index);


module.exports = router;