import Drone from "../../models/Drone.js";

export default defineEventHandler(async (event) => {
  try {
    // Save drone data to MongoDB
    console.log(event);
    return await Drone.find({ seller: event.context.user?.organization });
  } catch (error) {
    console.error("Error getting drone data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
