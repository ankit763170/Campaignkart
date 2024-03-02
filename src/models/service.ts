import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ServicesSchema = new mongoose.Schema(
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
    icon: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
