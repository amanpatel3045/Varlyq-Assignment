const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All blogs list",
      blogs,
    });
  } catch (err) {
    
    return res.status(500).send({
      success: false,
      message: "error while getting all blogs",
      err,
    });
  }
};

//create blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    const existingUser = await userModel.findById(user);
    //validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog created successfully",
      newBlog,
    });
  } catch (err) {
   
    res.status(500).send({
      success: false,
      message: "error while creating blog",
      err,
    });
  }
};

//update blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "blog updated!",
      blog,
    });
  } catch (err) {
   
    return res.status(400).send({
      success: false,
      message: "error while updating blog",
      err,
    });
  }
};

//get single blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (err) {
  
    res.status(400).send({
      success: false,
      message: "error while getting single blog",
      err,
    });
  }
};

//delete blog
exports.deleteBlogController = async (req, res) => {
  try {
    // const blog = await blogModel
    //   .findOneAndDelete(req.params.id)
    //   .populate("user");
    // console.log("ggggggggggggggggggggggggggggggggg" + blog);
    // await blog.user.blogs.pull(blog);
    // await blog.user.save();
    // return res.status(200).send({
    //   success: true,
    //   message: "blog deleted successfully",
    // });

    const blog = await blogModel.findByIdAndDelete(req.params.id);

    await userModel.updateMany({}, { $pull: { blogs: req.params.id } });
    // console.log(blog);

    return res.status(200).send({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (err) {
    // console.log(err);
    return res.status(400).send({
      success: false,
      message: "error while deleting blog",
      err,
    });
  }
};

//get user's blog

exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (err) {
    // console.log(err);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      err,
    });
  }
};
