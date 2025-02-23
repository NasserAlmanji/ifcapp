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

    const drone = await Drone.findOne({ barcode1: id });

    if (!drone) {
      throw createError({
        statusCode: 400,
        statusMessage: "Drone not registered",
      });
    }

    if (drone.seller) {
      throw createError({
        statusCode: 400,
        statusMessage: `Drone already with a seller ${drone.seller}`,
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
