import jwt from "jsonwebtoken";
import User from "../models/User";

export default defineEventHandler(async (event) => {
  if (!event.node.req.url?.startsWith("/api/admin")) {
    return;
  }

  const authorizationHeader = event.node.req.headers["authorization"];

  if (!authorizationHeader) {
    throw createError({
      statusCode: 401,
      message: "Authorization header missing",
    });
  }

  console.log("auth token RRR", getCookie(event, "auth_token"));

  const token =
    getCookie(event, "auth_token") || authorizationHeader.split(" ")[1];

  console.log("token QQ", token);

  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Token missing in Authorization header",
    });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "123456789");

    console.log("decoded", decoded);

    // Fetch user based on the decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found",
      });
    }

    // Check if user has 'admin' role
    if (!user.role.includes("admin")) {
      throw createError({
        statusCode: 403,
        message: "Access denied. Admins only.",
      });
    }

    // Attach user to event context for further use
    event.context.user = user;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw createError({
        statusCode: 400,
        message: "Invalid token.",
      });
    } else {
      throw createError({
        statusCode: 500,
        message: "Internal server error.",
      });
    }
  }
});
