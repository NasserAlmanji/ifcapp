import jwt from "jsonwebtoken";
import User from "../models/User";

export default defineEventHandler(async (event) => {
  if (event.node.req.url?.startsWith("/api/auth")) {
    return;
  }

  if (event.node.req.url?.startsWith("/login")) {
    return;
  }

  if (event.node.req.url?.startsWith("/register")) {
    return;
  }
  //const authorizationHeader = event.node.req.headers["authorization"];

  // if (!authorizationHeader) {
  //   throw createError({
  //     statusCode: 401,
  //     message: "Authorization header missing",
  //   });
  // }

  const token = getCookie(event, "auth_token"); // || authorizationHeader?.split(" ")[1];

  if (!token) {
    return sendRedirect(event, "/login", 302);

    // throw createError({
    //   statusCode: 401,
    //   message: "Token missing in Authorization header",
    // });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("user is: \n", decoded);

    // Fetch user based on the decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found",
      });
    }

    // Check if user has 'admin' role

    if (event.node.req.url?.startsWith("/api/admin")) {
      if (!user.role.includes("admin")) {
        throw createError({
          statusCode: 403,
          message: "Access denied. Admins only.",
        });
      }
    }

    if (event.node.req.url?.startsWith("/api/seller")) {
      if (!user.role.includes("seller")) {
        throw createError({
          statusCode: 403,
          message: "Access denied. Sellers only.",
        });
      }
    }
    // Attach user to event context for further use
    event.context.user = user;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendRedirect(event, "/login", 302);

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
