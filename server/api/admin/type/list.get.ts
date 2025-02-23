import DroneType from "../../../models/DroneType.js";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    return await DroneType.find({}).populate("creator");
  } catch (error) {
    console.error("Error saving type data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
