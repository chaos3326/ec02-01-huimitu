const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const ensureAnthenticated = require('../config/auth');
const SiteController = require('../app/controllers/SiteController');
=======
const ensureAnthenticated = require("../config/auth");
const SiteController = require("../app/controllers/SiteController");
var passport = require("passport");
>>>>>>> e142cdb0fc6bd37822faccc57f6673ea44bc604f

router.get("/logout", SiteController.logout);
router.get("/login", SiteController.login);
router.post("/login", SiteController.validateLogin);
router.get("/register", SiteController.register);
router.post("/register", SiteController.validateRegister);
router.get("/", ensureAnthenticated.ensureAuthenticated, SiteController.index);
router.get(
  "/login/federated/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login/failure",
  })
);
router.get("/login/failure", (req, res) => {
  res.send("Something went wrong..");
});

<<<<<<< HEAD
router.get('/logout',SiteController.logout);
router.get('/login', SiteController.login);
router.post('/login', SiteController.validateLogin);
router.get('/register', SiteController.register);
router.post('/register', SiteController.validateRegister);
router.get('/', ensureAnthenticated.ensureAuthenticated, SiteController.index);


module.exports = router;
=======
module.exports = router;
>>>>>>> e142cdb0fc6bd37822faccc57f6673ea44bc604f
