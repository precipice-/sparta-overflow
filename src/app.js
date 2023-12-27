import express from 'express';
import { SERVER_PORT } from '../constants/app.constant.js';
import { apiRouter } from './routers/index.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT}번 포트로 서버가 열렸습니다!`);
});
