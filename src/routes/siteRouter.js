const express = require('express');
const router = express.Router();
const ensureAnthenticated = require('../config/auth');
const SiteController = require('../app/controllers/SiteController');


router.get('/logout',SiteController.logout);
router.get('/login', SiteController.login);
router.post('/login', SiteController.validateLogin);
router.get('/register', SiteController.register);
router.post('/register', SiteController.validateRegister);
router.get('/', ensureAnthenticated.ensureAuthenticated, SiteController.index);


module.exports = router;