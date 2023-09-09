const express = require("express");

//router object
const router = express.Router();

const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");

//creating routes

//get all blogs using get method
router.get("/all-blog", getAllBlogsController);

//post blog using post method
router.post("/create-blog", createBlogController);

//update blog using put method
router.put("/update-blog/:id", updateBlogController);

//get single blog
router.get("/get-blog/:id", getBlogByIdController);

//delete blog using delete method
router.delete("/delete-blog/:id", deleteBlogController);

//GET || user blog
router.get("/user-blog/:id", userBlogController);

module.exports = router;
