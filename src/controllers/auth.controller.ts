import { withTransaction } from '@src/util/withTransaction';
import { RouteError } from '@src/other/classes';
import { LoginPayload, RegisterPayload } from '@src/validators/auth.validator';
import { compare } from 'bcryptjs';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import * as tokenService from '@src/services/token.service';
import UserService from '@src/services/user.service';
import { TokenTypes } from '@src/constants/enum';
import { JwtAccessPayload } from '@src/routes/types/types';

export const register = withTransaction(async (
  manager,
  req,
) => {
  const data = req.body as RegisterPayload;
  const userService = new UserService(manager);
  const user = await userService.create(data);
  const payload: JwtAccessPayload = {
    userId: user.id,
    roleId: user.roleId,
    email: user.email,
    role: data.role,
  };
  const access_token = tokenService.signToken(payload, TokenTypes.ACCESS);
  const refresh_token = tokenService.signToken(payload, TokenTypes.REFRESH);
  return {
    data: {
      user,
      tokens: {
        access_token,
        refresh_token,
      },
    },
    statusCode: HttpStatusCodes.CREATED,
    message: 'User registered successfully',
  };
});

export const login = withTransaction(async (
  manager, 
  req,
) => {
  const data = req.body as LoginPayload;
  const userService = new UserService(manager);
  const user = await userService.findByEmail(data.email);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Wrong Email, user not found');
  }
  const is_valid = await compare(data.password, user.password);
  if (!is_valid) {
    throw new RouteError(HttpStatusCodes.FORBIDDEN, 'You have entered incorrect password');
  }
  const payload: JwtAccessPayload = {
    userId: user.id,
    roleId: user.roleId,
    email: user.email,
    role: user.role.name,
  };
  const access_token = tokenService.signToken(payload, TokenTypes.ACCESS);
  const refresh_token = tokenService.signToken(payload, TokenTypes.REFRESH);

  return {
    data: {
      user,
      tokens: {
        access_token,
        refresh_token,
      },
    },
    statusCode: HttpStatusCodes.OK,
    message: 'You are logged In',
  };
});