import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CasesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  timeframe: {
    type: String,
    required: true,
  },
  main_service: {
    type: String,
    required: true,
  },
  extra_service: {
    type: String,
    required: true,
  },
  return_on_investment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover_image: {
    type: String,
    required: true,
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  created_by:{
    type: Schema.Types.ObjectId,
    ref: "Users",
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});
