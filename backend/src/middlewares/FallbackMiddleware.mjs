export default function fallbackMiddleware(error, request, response, next) {
  console.error(error.stack);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  response.status(statusCode).json({ message });
}
