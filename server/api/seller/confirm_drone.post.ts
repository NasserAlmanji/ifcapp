import Drone from "../../models/Drone.js";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const { distributor, items } = body;

    if (!items) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    items.forEach(async (element) => {
      const updatedDrone = await Drone.updateOne(
        { barcode1: element, seller: event.context.user?.organization }, // The ID of the drone you want to update
        {
          sellerHasReceived: true,
          hasBeenReceivedBy: event.context.user?.id,
          sellerHasReceivedTime: Date.now(),
        } // The new data to update
      );
    });

    // Save drone data to MongoDB

    return { message: "Drone update submitted successfully!" };
  } catch (error) {
    console.error("Error updating drone data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
