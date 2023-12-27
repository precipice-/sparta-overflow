import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  promote = async (targetEmail) => {
    // const { loginUser } = await this.usersRepository.readOneByEmail(targetEmail);

    const updateUser = await this.usersRepository.promoteOne(targetEmail);

    return updateUser;
  };
}
