import AppError from "./AppError.mjs";

export default class AuthenticationTokenMissing extends AppError {
  constructor(message = "Token missing", statusCode = 401) {
    super(message, statusCode);
  }
}
