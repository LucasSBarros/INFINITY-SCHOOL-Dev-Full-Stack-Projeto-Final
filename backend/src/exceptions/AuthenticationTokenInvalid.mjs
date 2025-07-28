import AppError from "./AppError.mjs";

export default class AuthenticationTokenInvalid extends AppError {
  constructor(message = "Invalid token", statusCode = 401) {
    super(message, statusCode);
  }
}
