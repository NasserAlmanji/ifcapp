// server/db.js
import mongoose from "mongoose";
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();
const MONGODB_URI = config.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
