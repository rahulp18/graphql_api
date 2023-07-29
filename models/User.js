import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: { type: String, required: [true, "Password is required"] },
    phone: String,
    otp: String,
    location: {
      lat: String,
      lng: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    saloons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Saloon" }],
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);
