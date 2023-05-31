import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { User } from '@src/entities/user.entity';
import { RouteError } from '@src/other/classes';
import { RegisterPayload } from '@src/validators/auth.validator';
import { plainToInstance } from 'class-transformer';

const user_data_fields = [
  'id',
  'email',
  'firstName',
  'lastName',
  'phoneNumber',
  'gender',
  'profileCompleted',
  'createdAt',
  'deletedAt',
  'updatedAt',
];


type CreateUserData = Omit<RegisterPayload, 'role'> & { roleId: number }

export const createUser = async (data: CreateUserData): Promise<User> => {
  const user = await User.createQueryBuilder()
    .insert()
    .values(plainToInstance(User, data))
    .into(User)
    .returning(user_data_fields)
    .execute();
  return user.raw[0] as User;
};


export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User
    .createQueryBuilder('u')
    .innerJoinAndSelect('u.role', 'r')
    .where('u.email = :email', { email })
    .getOne();
  return user;
}
