const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/UserController");

router.get("/", UserController.index);
router.get("/profile", UserController.getProfile);
router.post("/profile", UserController.updateProfile);

module.exports = router;
