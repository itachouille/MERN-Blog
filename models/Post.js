import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title should have at least 5 characters"],
      maxlength: [40, "Title should not exceed 40 characters"],
    },
    summary: {
      type: String,
      maxlength: [60, "Summary should not exceed 60 characters"],
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

export default mongoose.model("Post", PostSchema);
