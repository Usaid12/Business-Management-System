import EnvVars from '@src/constants/EnvVars';
import { User } from '@src/entities/user.entity';
import { sign } from 'jsonwebtoken';

export const signAccessToken = (user: User) => {
  const payload = {
    user_id: user.id,
    role_id: user.roleId,
    email: user.email,
  };
  const { SECRET, EXPIRE } = EnvVars.Jwt.ACCESS;

  const access_token = sign(payload, SECRET, { expiresIn: EXPIRE });
  return access_token;
};
