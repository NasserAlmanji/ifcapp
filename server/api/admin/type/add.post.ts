import connectDB from "../../../db";
import DroneType from "../../../models/DroneType.js";
import { defineEventHandler, readBody, createError } from "h3";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const { type } = body;

    if (!type) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    const newType = new DroneType({
      type,
      creator: event.context.user.id,
    });
    await newType.save();

    return { message: "Type data submitted successfully!" };
  } catch (error) {
    console.error("Error saving type data:", error);
    return error;
  }
});
