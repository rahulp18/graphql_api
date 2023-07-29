import mongoose, { Schema } from "mongoose";

const saloonSchemas = new Schema(
  {
    name: String,
    location: {
      lat: String,
      lng: String,
    },
    services: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    owoner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    managers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    barbers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Barber" }],
    timeSlots: [
      {
        date: { type: Date, required: true },
        slots: [{ type: String, required: true }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Saloon = mongoose.model("Saloon", saloonSchemas);

export default Saloon;
