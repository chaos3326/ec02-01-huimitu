const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/UserController");

<<<<<<< HEAD
router.delete('/:id', UserController.delete);
router.get('/', UserController.index);
=======
router.get("/", UserController.index);
router.get("/profile", UserController.getProfile);
router.post("/profile", UserController.updateProfile);
>>>>>>> e142cdb0fc6bd37822faccc57f6673ea44bc604f

module.exports = router;
