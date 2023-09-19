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

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connecté à MongoDB");
  })
  .catch((err) => {
    console.error(`Erreur lors de la connection initiale à MongoDB: ${err}`);
  });

mongoose.connection.on("connected", () => {
  console.log("Connecté à MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`Erreur de connection à MongoDB: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Déconnexion de MongoDB");
});

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
  const post = await Post.findById({ _id: req.params.id });
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.send(post);
});

app.patch("/post/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.send(post);
});

app.delete("/post/:id", async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.status(200).send(post);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
