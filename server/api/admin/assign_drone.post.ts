import Drone from "../../models/Drone.js";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const { distributor, items } = body;

    if (!distributor || !items) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    items.forEach(async (element) => {
      const updatedDrone = await Drone.updateOne(
        { barcode1: element }, // The ID of the drone you want to update
        { seller: distributor, assignedBy: event.context.user.id, assignedTime: Date.now() } // The new data to update
      );
    });

    // Save drone data to MongoDB

    return { message: "Drone updated submitted successfully!" };
  } catch (error) {
    console.error("Error updating drone data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
