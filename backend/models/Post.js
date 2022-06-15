const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      max: 100,
    },
    tag: {
      type: String,
    },
    rating: {
      type: Number, 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);