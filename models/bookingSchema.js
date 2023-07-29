import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  saloon: { type: mongoose.Schema.Types.ObjectId, ref: "Saloon" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  services: [{ type: String, required: true }],
  barber: { type: mongoose.Schema.Types.ObjectId, ref: "Barber" },
  date: { type: Date, requird: true },
  timeslot: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "rejected"],
    default: "pending",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
