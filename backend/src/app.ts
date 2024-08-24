import { Custom_error, error_middleware } from '@himanshu_guptaorg/utils';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './routers/router';
import authenticateUser from './auth/auth';
import contribute from './controllers/contribute';
import signUp from './controllers/signup';
const app = express();
app.use(cors());
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 1000 * 60,
  max: 4,
});
app.use(express.json());
app.use('/api/v1', router);
app.use(limiter);
router.route('/contribute').post(authenticateUser, contribute);
router.route('/signup').post(signUp);
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Custom_error({
    errors: [{ message: 'pageNotFound' }],
    statusCode: 404,
  });
  next(err);
});
app.use(error_middleware);
export { app };
