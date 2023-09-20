import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        errors: Object.values(error.errors).map((val) => val.message),
      });
    } else {
      return next(error);
    }
  }
};

export const getAllPosts = async (_, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).send(posts);
  } catch (error) {
    return next(error);
  }
};

export const getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send(post);
  } catch (error) {
    return next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedPost);
  } catch (error) {
    return next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send(deletedPost);
  } catch (error) {
    return next(error);
  }
};
