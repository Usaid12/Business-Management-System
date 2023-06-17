import EnvVars from '@src/constants/EnvVars';
import { TokenTypes } from '@src/constants/enum';
import { User } from '@src/entities/user.entity';
import { Response } from 'express';
import { sign, verify } from 'jsonwebtoken';


export const signToken = <T extends object>(payload: T, type: TokenTypes) => {
  const tokenType = type.toUpperCase();
  if (tokenType !== 'ACCESS' && tokenType !== 'REFRESH') throw new Error('Invalid Token Type');
  const { SECRET, EXPIRE } = EnvVars.Jwt[tokenType];
  const access_token = sign(payload, SECRET, { expiresIn: EXPIRE });
  return access_token;
};

export const verifyToken = (token: string, type: TokenTypes) => {
  const tokenType = type.toUpperCase();
  if (tokenType !== 'ACCESS' && tokenType !== 'REFRESH') throw new Error('Invalid Token Type');
  const { SECRET } = EnvVars.Jwt[tokenType];
  const payload = verify(token, SECRET);
  if (typeof payload === 'string') return { data: payload };
  return payload;
};

