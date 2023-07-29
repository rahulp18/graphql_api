import mongoose, { Schema } from "mongoose";

const barberSchema = new Schema({
  name: { type: String, required: true },
  image: String,
  specialization: [{ type: String, required: true }],
});

const Barber = mongoose.model("Barber", barberSchema);

export default Barber;
