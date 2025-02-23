import Drone from "../../models/Drone.js";
import { defineEventHandler, readBody, createError, setCookie } from "h3";

export default defineEventHandler(async (event) => {
  try {
    return await Drone.find(
      {
        seller: event.context.user?.organization,
      },
      { registrar: 0 }
    ).populate({ path: "soldBy", select: "username" });
  } catch (error) {
    console.error("Error getting drone data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
