import connectDB from "../db";
import FormData from "../models/form";

connectDB();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const { name, email, message } = body;

    // Save form data to MongoDB
    const newFormData = new FormData({ name, email, message });
    await newFormData.save();

    return { message: "Form submitted successfully!" };
  } catch (error) {
    console.error("Error saving form data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
