// server/models/User.js
import { Schema, mongoose } from "mongoose";

const droneTypeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, unique: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.DroneType ||
  mongoose.model("DroneType", droneTypeSchema);
