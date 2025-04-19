import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
  }
  ,
  { timestamps: true }
);

export const Donation = mongoose.model("Payments", donationSchema);