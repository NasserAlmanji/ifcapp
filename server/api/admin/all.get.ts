import Drone from "../../models/Drone.js";

export default defineEventHandler(async (event) => {
  try {
    return await Drone.find({}).populate("registrar");
  } catch (error) {
    console.error("Error saving drone data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
