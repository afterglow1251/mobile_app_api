import { Request } from 'express';
import { JwtPayload } from 'src/auth/jwt.strategy';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
