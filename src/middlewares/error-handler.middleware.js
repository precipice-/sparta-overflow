// src/middlewares/error-handling.middleware.js

export const errorHandler = (err, req, res, next) => {
  // 에러를 출력합니다.
  console.error(err);

  // 클라이언트에게 에러 메시지를 전달합니다.
  const statusCode = err.statusCode ?? 500;
  const message =
    err.message ?? '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.';

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
