import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { Role } from '@src/entities/role.entity';
import { RouteError } from '@src/other/classes';

export const getRoleByName = async (name: string): Promise<Role> => {
  const role = await Role.createQueryBuilder('r')
    .where('r.name = :role', { role: name })
    .getOne();
  if (!role) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Role doenst exists');
  }
  return role;
};
