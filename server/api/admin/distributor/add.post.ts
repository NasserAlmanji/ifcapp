import connectDB from "../../../db";
import Distributor from "../../../models/Distributor.js";
import { defineEventHandler, readBody, createError } from "h3";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const { name } = body;

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    const newDistributor = new Distributor({
      name,
      creator: event.context.user.id,
    });
    await newDistributor.save();

    return { message: "Distributor data submitted successfully!" };
  } catch (error) {
    console.error("Error saving distributor data:", error);
    return error;
  }
});
