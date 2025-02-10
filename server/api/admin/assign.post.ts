import Drone from "../../models/Drone.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const { id, seller } = body;

    console.log(id, seller);

    // Save drone data to MongoDB
    const updatedDrone = await Drone.findByIdAndUpdate(
      id, // The ID of the drone you want to update
      { seller } // The new data to update
    );

    return { message: "Drone data submitted successfully!" };
  } catch (error) {
    console.error("Error saving drone data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
