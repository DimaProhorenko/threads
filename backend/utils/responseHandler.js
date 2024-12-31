export const sendResponse = (res, statusCode, status, message, data = null) => {
  return res.status(statusCode).json({ status, message, data });
};

export const sendErrorResponse = (res, statusCode, errorMessage) => {
  return res
    .status(statusCode)
    .json({ status: "error", error: errorMessage, data: null });
};

export const sendServerError = (res, error) => {
  console.log(error);
  return sendErrorResponse(res, 500, error.message);
};
