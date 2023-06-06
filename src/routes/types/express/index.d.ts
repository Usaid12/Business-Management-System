import 'express';
import { JwtAccessPayload } from '../types';
import { UserInfo } from '@src/services/user.service';


// **** Declaration Merging **** //

declare module 'express' {

  export interface Request {
    payload?: JwtAccessPayload
    user?: UserInfo
  }
}
