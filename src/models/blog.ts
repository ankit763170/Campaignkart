import mongoose from "mongoose";
const { Schema } = mongoose;

export const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    cover_image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    created_by: {
      type: String,
    },
    updated_by: {
      type: String,
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
BlogSchema.index({ title: 'text', description: 'text' });
