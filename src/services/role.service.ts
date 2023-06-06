import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { Role } from '@src/entities/role.entity';
import { RouteError } from '@src/other/classes';
import { BaseService } from './base.service';
import { EntityManager } from 'typeorm';
import { plainToInstance } from 'class-transformer';

export default class RoleService extends BaseService {
  constructor(dbManager:EntityManager) {
    super(dbManager);
  }

  public async findByName(name: string): Promise<Role> {
    const result = await this.db.query(`
      SELECT 
        r.id as "id",
        r.name as "name",
        r.created_at as "createdAt",
        r.updated_at as "updatedAt",
        r.deleted_at as "deletedAt"
      FROM roles r
      WHERE r.deleted_at IS NULL AND r.name=$1
    `, [name]);
    if (result.length === 0) throw new RouteError(HttpStatusCodes.NOT_FOUND, 'role doesn\'t exists');
    return plainToInstance(Role, result[0]);
  }

}
