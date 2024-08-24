import {
  async_error_handler,
  Custom_error,
  jwtVerification,
} from '@himanshu_guptaorg/utils';
import { Request, Response, NextFunction } from 'express';
import { reqWithUser } from '../types';
import { UserModel } from '../models/user';
const authenticateUser = async_error_handler(
  async (req: reqWithUser, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('fdfjdhf');
    if (
        req.url.startsWith('/patterns') &&
      !(  req.query.your &&
        req.query.your == 'true')
      
    ) {
      next();
      return;
    }
    console.log('fdfjdfhjfufuhsdfui');
    if (!token) {
      throw new Custom_error({
        errors: [{ message: 'TokenMissing' }],
        statusCode: 401,
      });
    }

    const decoded: { _id: string } = (await jwtVerification(
      token,
      process.env.JWT_SECRET!
    )) as { _id: string };

    if (!decoded) {
      throw new Custom_error({
        errors: [{ message: 'InvalidToken' }],
        statusCode: 401,
      });
    }
    const user = await UserModel.findById(decoded._id);
    if (!user)
      throw new Custom_error({
        errors: [{ message: 'NoSuchUser' }],
        statusCode: 404,
      });
    req.user = user;
    next();
  }
);

export default authenticateUser;
