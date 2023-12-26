import bcrypt from 'bcrypt';
import { PASSWORD_HASH_SALT_ROUNDS } from '../../constants/security.constant.js';
import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  createOne = async ({ email, password, name }) => {
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = await prisma.Users.create({
      data: { email, password: hashedPassword, name },
    });
    delete newUser.password;

    return newUser;
  };

  readOneById = async (id) => {
    const user = await prisma.Users.findUnique({ where: { id } });

    return user;
  };

  readOneByEmail = async (email) => {
    const user = await prisma.Users.findUnique({ where: { email } });

    return user;
  };

  promoteOne = async (email) => {
    const updateUser = await prisma.Users.update({
      where: { email },
      data: {
        userType: 'MANAGER',
      },
    });

    return updateUser;
  };
}
