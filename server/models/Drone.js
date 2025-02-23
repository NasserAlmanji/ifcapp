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
    assignedTime: { type: Date },
    assignedBy: { type: Schema.Types.ObjectId, ref: "User" },
    sellerHasReceived: { type: Boolean },
    hasBeenReceivedBy: { type: Schema.Types.ObjectId, ref: "User" },
    sellerHasReceivedTime: Date,
    sold: Boolean,
    sellTime: Date,
    soldBy: { type: Schema.Types.ObjectId, ref: "User" },
    idcardnumber: String,
    idname: String,
    idexpirydate: String,
  },
  { timestamps: true }
);

export default mongoose.models.Drone || mongoose.model("Drone", droneSchema);
