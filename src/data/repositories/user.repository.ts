import UserModel, { UserEntity } from '../../schemas/user.entity';

export class UserRepository {

  getUserByEmail(email: string): Promise<UserEntity | null> {
    return UserModel.findOne({ email }).exec();
  }

  getUserById(_id: string): Promise<UserEntity | null> {
    return UserModel.findOne({ _id }).exec();
  }

  createUser(email: string, password: string, role: string): Promise<UserEntity> {
    return UserModel.create({email, password, role});
  }
}