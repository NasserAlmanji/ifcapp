import Drone from "../../../models/Drone.js";
import { defineEventHandler, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { id } = query;

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required ID parameter",
      });
    }

    const drone = await Drone.findOne({
      seller: event.context.user?.organization,
      barcode1: id,
    });

    if (!drone) {
      throw createError({
        statusCode: 400,
        statusMessage: "Drone barcode not valid with this seller",
      });
    }

    if (drone.sellerHasReceived) {
      throw createError({
        statusCode: 400,
        statusMessage: `Drone already confirmed before`,
      });
    }

    return { valid: true };
  } catch (error) {
    console.error("Error fetching mode:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Internal server error",
    });
  }
});
