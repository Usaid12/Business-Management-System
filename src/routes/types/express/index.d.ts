import 'express';
import { JwtAccessPayload } from '../types';
import { UserInfo } from '@src/services/user.service';


// **** Declaration Merging **** //

declare module 'express' {

  export interface Response extends Express.Response {
    locals: {
      payload?: JwtAccessPayload
      user?: UserInfo
    }
  }
}
