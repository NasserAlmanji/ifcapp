// server/models/User.js
import { Schema, mongoose } from "mongoose";

const distributorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Distributor ||
  mongoose.model("Distributor", distributorSchema);
