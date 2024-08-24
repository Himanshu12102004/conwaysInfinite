import { Request } from 'express';
import { UserDoc } from './models/user';
export interface reqWithUser extends Request {
  user?: UserDoc;
}
