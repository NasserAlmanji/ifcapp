// server/api/auth/login.js
import User from "../../models/User";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  const user = await User.findOne({ username });
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found." });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw createError({ statusCode: 400, message: "Invalid credentials." });
  }

  user.password = undefined;

  //let {username, role, organization} = {...user};
  const token = jwt.sign(
    {
      username: user.username,
      role: user.role,
      organization: user.organization,
      id: user.id,
    },
    process.env.JWT_SECRET || "123456789",
    { expiresIn: "1h" }
  );

  setCookie(event, "auth_token", token);
  //setCookie("auth_token").value = token; // Save token in a cookie

  return { user, token };
});
