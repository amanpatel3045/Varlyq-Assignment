const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
//create user or register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    //check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exists",
      });
    }

    //Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (err) {
    
    return res.status(500).send({
      message: "Something went wrong while registering",
      success: false,
      err,
    });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
  } catch (err) {
    
    return res.status(500).send({
      success: false,
    });
  }
};

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "email is not registered",
      });
    }
    //FOR CHECKING PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Wrong credentials",
      });
    }
    return res.status(200).send({
      success: true,
      message: "logged in successfully",
      user,
    });
  } catch (err) {
  
    return res.status(500).send({
      success: false,
      message: "ERROR WHILE LOGIN",
      err,
    });
  }
};
