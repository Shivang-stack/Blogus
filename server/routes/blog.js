const express = require("express");
const router = express.Router();

const {
  getBlogById,
  createBlog,
  getBlog,
  getAllBlog,
  updateBlog,
  photo,
  removeBlog,
  
} = require("../controllers/blog");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("blogId", getBlogById);

//actual routers goes here

//create
router.post(
  "/blog/create/:userId",
  isSignedIn,
  isAuthenticated,
  createBlog
);

//read
router.get("/blog/:blogId", getBlog);
router.get("/blogs", getAllBlog);
router.get("/blog/photo/:blogId", photo);

//update
router.put(
  "/blog/:blogId/:userId",
  isSignedIn,
  isAuthenticated,
  updateBlog
);

//delete

router.delete(
  "/blog/:blogId/:userId",
  isSignedIn,
  isAuthenticated,
  removeBlog
);

module.exports = router;
