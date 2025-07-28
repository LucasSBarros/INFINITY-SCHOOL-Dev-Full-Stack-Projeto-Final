import AppError from "./AppError.mjs";

export default class AuthenticationError extends AppError {
  constructor(message = "Authentication error", statusCode = 401) {
    super(message, statusCode);
  }
}
