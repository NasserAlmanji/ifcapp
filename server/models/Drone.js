// server/models/Drone.js
import mongoose from "mongoose";

const droneSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    barcode1: { type: String, required: true },
    barcode2: { type: String },
    barcode3: { type: String },
    seller: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Drone || mongoose.model("Drone", droneSchema);
