import mongoose from "mongoose";
const { Schema, Types } = mongoose;

export const BlogSchema = new Schema(
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
    category: {
      type: Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    created_by: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
    updated_by: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Text Index for multiple fields
BlogSchema.index({ title: 'text', long_description: 'text' });
