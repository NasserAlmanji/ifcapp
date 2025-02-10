import connectDB from "../../db";
import Drone from "../../models/Drone.js";
import register from "../auth/register";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("event.context.user", event.context.user);

  try {
    const { type, barcode1, barcode2, barcode3 } = body;

    // Save drone data to MongoDB
    const newDrone = new Drone({
      type,
      barcode1,
      barcode2,
      barcode3,
      registrar: event.context.user.id,
    });
    await newDrone.save();

    return { message: "Drone data submitted successfully!" };
  } catch (error) {
    console.error("Error saving drone data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
