const Blog = require("../models/blog");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getBlogById = (req, res, next, id) => {
    Blog.findById(id).exec((err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "Blog not found in DB"
        });
      }
      req.blog = cate;
      next();
    });
  };

exports.createBlog = (req, res) => {
let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { title, body } = fields;

    if (!title || !body) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let blog = new Blog(fields);
    blog.user = req.profile.id;
    blog.author = req.profile.name;
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      blog.photo.data = fs.readFileSync(file.photo.path);
      blog.photo.contentType = file.photo.type;
    }
    // console.log(blog);

    //save to the DB
    blog.save((err, blog) => {
      if (err) {
        res.status(400).json({
          error: "Saving Blog in DB failed"
        });
      }
      res.json(blog);
    });
  });
};
  exports.getBlog = (req, res) => {
    return res.json(req.blog);
  };


  //middleware
exports.photo = (req, res, next) => {
    if (req.blog.photo.data) {
      res.set("Content-Type", req.blog.photo.contentType);
      return res.send(req.blog.photo.data);
    }
    next();
  };
  
  
  exports.getAllBlog = (req, res) => {
    Blog.find().exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: "NO blogs found"
        });
      }
      res.json(blogs);
    });
  };
  
  exports.updateBlog = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //updation code
      let blog = req.blog;
      blog = _.extend(blog, fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        blog.photo.data = fs.readFileSync(file.photo.path);
        blog.photo.contentType = file.photo.type;
      }
      // console.log(blog);
  
      //save to the DB
      blog.save((err, blog) => {
        if (err) {
          res.status(400).json({
            error: "Updation of blog failed"
          });
        }
        res.json(blog);
      });
    });
  };
  
  exports.removeBlog = (req, res) => {
    const blog = req.blog;
  
    blog.remove((err, blog) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this blog"
        });
      }
      res.json({
        message: "Successfull deleted"
      });
    });
  };
  