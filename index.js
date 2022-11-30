const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Post = require("./models/Post");
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB);

app.post("/post", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send(post);
});

app.get("/posts", async (_, res) => {
  const posts = await Post.find({});
  res.send(posts);
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.find({ _id: req.params.id });
  res.send(post);
});

app.patch("/post/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body);
  await post.save();
  res.send(post);
});

app.delete("/post/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
