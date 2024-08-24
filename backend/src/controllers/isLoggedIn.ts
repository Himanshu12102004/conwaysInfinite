import {
  async_error_handler,
  Custom_error,
  Custom_response,
  jwtVerification,
} from '@himanshu_guptaorg/utils';
import { Request, Response, NextFunction } from 'express';
import { reqWithUser } from '../types';
import { UserModel } from '../models/user';
const isLoggedIn = async_error_handler(
  async (req: reqWithUser, res: Response, next: NextFunction) => {
  const response = new Custom_response(
    true,
    null,
    { user:req.user},
    'success',
    201,
    null
  );
  res.json(response);
  }
);

export default isLoggedIn;
