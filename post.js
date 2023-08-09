const { json } = require("body-parser");
const express = require("express");
const postRouter = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/blogs");
const articles = require("../models/users");

// Create blogpost/article
postRouter.post("/create", async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  const body = req.body.body;
  const blog = new Post({
    title: title,
    description: description,
    author: author,
    body: body,
  });
  console.log(blog);
  blog.save((err) => {
    if (err) {
      res.status(404).send(err);
    } else res.render("create_successful.ejs");
  });
});

//Get All Blogposts
postRouter.get("/blogs", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // Get Blogpost By ID
postRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((blogs) => {
      res.status(200).send(blogs);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

// Update Blogpost
postRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const blog = req.body;

  Post.updatedAt = new Date(); // sets the lastUpdateAt to the current date
  Post.findByIdAndUpdate(id, blog, { new: true })
    .then((newBlog) => {
      res.status(200).send({
        message: "Your blog post/article has been updated successfully",
        data: newBlog,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Delete Blogpost By ID
postRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({
        message: "Your blog post has been deleted successfully",
        data: "",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });
});

module.exports = postRouter;
