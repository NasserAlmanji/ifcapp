import connectDB from "../db";
import Drone from "../models/Drone.js";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const { type, barcode1, barcode2, barcode3 } = body;

    // Save drone data to MongoDB
    const newDrone = new Drone({ type, barcode1, barcode2, barcode3 });
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
