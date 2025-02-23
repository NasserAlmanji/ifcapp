import connectDB from "../../db";
import Drone from "../../models/Drone.js";
import { defineEventHandler, readBody, createError } from "h3";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("event.context.user api/admin/register", event.context.user);
  console.log("body at api/admin/regsiter", body);

  try {
    const { type, items } = body;

    if (!type || !items) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    items.forEach(async (element) => {
      const newDrone = new Drone({
        type,
        barcode1: element,
        registrar: event.context.user.id,
        registrationTime: Date.now(),
      });
      await newDrone.save();
    });
    // Save drone data to MongoDB

    return { message: "Drone data submitted successfully!" };
  } catch (error) {
    console.error("Error saving drone data:", error);
    return error;
  }
});
