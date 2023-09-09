const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

//router object
const router = express.Router();

// get all users using get method
router.get("/all-users", getAllUsers);

//create user using post method
router.post("/register", registerController);

//login using post method
router.post("/login", loginController);

module.exports = router;
