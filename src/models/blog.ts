
import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

export const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    long_description: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String,
      required: true,
    },
    slug:{
      type:String,
      required:true,
      unique: true
    },
  },
  {
    timestamps:true,
  }
);

// Text Index for multiple fields
BlogSchema.index({ title: 'text', long_description: 'text'});

