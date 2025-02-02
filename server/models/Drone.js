// server/models/Drone.js
import mongoose from "mongoose";

const droneSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    barcode1: { type: String, required: true },
    //barcode2: { type: String, required: true },
    //barcode3: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Drone || mongoose.model("Drone", droneSchema);
