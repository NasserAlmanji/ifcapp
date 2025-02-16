// server/models/User.js
import { Schema, mongoose } from "mongoose";
import User from "./User";

const droneSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    barcode1: { type: String, required: true, unique: true },
    barcode2: { type: String },
    barcode3: { type: String },
    registrar: { type: Schema.Types.ObjectId, ref: "User" },
    registrationTime: Date,
    seller: { type: String },
    assignedTime: Date, // to seller
    assignedBy: { type: Schema.Types.ObjectId, ref: "User" },
    sellTime: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Drone || mongoose.model("Drone", droneSchema);
