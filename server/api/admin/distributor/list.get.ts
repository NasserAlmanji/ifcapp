import Distributor from "../../../models/Distributor.js";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    return await Distributor.find({}).populate("creator");
  } catch (error) {
    console.error("Error saving drone data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
