export type Error = { message: string; statusCode: number }

export const ErrorResponse = {
  Forbidden: { message: "Forbidden", statusCode: 403 },
  NotFound: { message: "Not Found", statusCode: 404 },
  BadRequest: { message: "Bad Request", statusCode: 400 },
  InternalServerError: { message: "Internal Server Error", statusCode: 500 },
}
