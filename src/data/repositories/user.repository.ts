import UserModel, { UserEntity } from '../../schemas/user.entity';

export class UserRepository {

  getUserByEmail(email: string): Promise<UserEntity | null> {
    return UserModel.findOne({ email }).exec();
  }

  getUserById(_id: string): Promise<UserEntity | null> {
    return UserModel.findOne({ _id }).exec();
  }

  createUser(user: UserEntity): Promise<UserEntity> {
    return UserModel.create(user);
  }
}