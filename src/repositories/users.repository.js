import bcrypt from 'bcrypt';
import { PASSWORD_HASH_SALT_ROUNDS } from '../../constants/security.constant.js';
import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  createOne = async ({ email, password, name }) => {
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = await prisma.users.create({
      data: { email, password: hashedPassword, name },
    });
    delete newUser.password;

    return newUser;
  };

  readOneById = async (userId) => {
    const user = await prisma.users.findUnique({ where: { userId } });

    return user;
  };

  readOneByEmail = async (email) => {
    const user = await prisma.users.findUnique({ where: { email } });

    return user;
  };

  promoteOne = async (email) => {
    const updateUser = await prisma.users.update({
      where: { email },
      data: {
        userType: 'MANAGER',
      },
    });

    return updateUser;
  };
}
