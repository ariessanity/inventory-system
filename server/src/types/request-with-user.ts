import { Request } from 'express';
import { User } from 'src/features/auth/model/user.model';

export interface RequestWithUser extends Request {
  user: User;
}