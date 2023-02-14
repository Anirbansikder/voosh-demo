const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authenticate = require("../middleware/authentication");

router.post("/add-user", userController.addUser);
router.post("/login-user",userController.loginUser);
router.get("/getUserFromToken",authenticate,userController.getUserFromToken);
router.post("/add-order",authenticate,userController.addOrder);
router.get("/get-order",authenticate,userController.getOrder);

module.exports = router;