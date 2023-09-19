const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title should have at least 3 characters"],
      maxlength: [50, "Title should not exceed 50 characters"],
    },
    summary: {
      type: String,
      maxlength: [150, "Summary should not exceed 150 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
  },
  {
    timestamps: true,
  },
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;

