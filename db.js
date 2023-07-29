import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
    console.log(error);
  }
};
