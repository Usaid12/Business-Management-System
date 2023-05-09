import db from "@src/database";
import { Role } from "@src/entities/role.entity";
import { User } from "@src/entities/user.entity";

export const RoleRepository = db.getRepository(Role);
export const UserRepository = db.getRepository(User);