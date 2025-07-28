import AuthenticationTokenMissing from "../exceptions/AuthenticationTokenMissing.mjs";
import AuthenticationTokenInvalid from "../exceptions/AuthenticationTokenInvalid.mjs";
import jsonwebtoken from "jsonwebtoken";
import env from "../utils/env.mjs";

export default function authMiddleware(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AuthenticationTokenMissing("Token missing", 401);
  }

  const token = authorization.split(" ")[1];

  try {
    const payload = jsonwebtoken.verify(token, env.JWT_SECRET);
    request.logged_user = payload;
    next();
  } catch (error) {
    throw new AuthenticationTokenInvalid("Invalid token", 401);
  }
}
