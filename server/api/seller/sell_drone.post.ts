import Drone from "../../models/Drone.js";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const { id, idcardnumber, idname, idexpirydate } = body;

    if (!id || !idcardnumber || !idname || !idexpirydate) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    const updatedDrone = await Drone.updateOne(
      { barcode1: id, seller: event.context.user?.organization }, // The ID of the drone you want to update
      {
        idcardnumber,
        idname,
        idexpirydate,
        sold: true,
        soldBy: event.context.user?.id,
        sellTime: Date.now(),
      } // The new data to update
    );

    return { message: "Drone data submitted successfully!" };
  } catch (error) {
    console.error("Error in drone data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
