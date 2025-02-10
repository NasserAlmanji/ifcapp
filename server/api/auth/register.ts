// server/api/auth/register.js
import User from "../../models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password, role, organization } = body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw createError({ statusCode: 400, message: "User already exists." });
  }

  const user = new User({ username, password, role, organization });
  await user.save();

  return { message: "User registered successfully." };
});
