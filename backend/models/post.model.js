import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    recipe_name: {
      type: String,
      required: false,
      unique:false
    },
    recipe_process: {
      type: String,
      required: false,
      unique:false
    },
    creator: {
      type: String,
      required: false,
      unique:false
    },
    recipe_tags: {
      type: String,
      required: false,
      unique:false
    },
    recipe_image_url: {
      type: String,
      required: false,
      unique:false
    },
  },
  { timestamps: true }
);

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
