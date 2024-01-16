import fs from 'fs';
import * as path from 'path';
import { UserEntity } from '../../schemas/user.entity';

const filePath = path.join(__dirname, '../../data/users.json');

export class UserRepository {

  getAllUser(): UserEntity[]{
    try {
      const users = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(users);
    } catch (error) {
      console.error('Error reading or parsing JSON:', error.message);
      return [];
    }
  }

  getUserByEmail(email: string): UserEntity | null {
    const users = this.getAllUser();
    return users.find((user) => user.email === email);
  }

  getUserById(id: string): UserEntity | null {
    const users = this.getAllUser();
    return users.find((user) => user.id === id);
  }

  createUser(user: UserEntity): UserEntity {
    const users = this.getAllUser();
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return user;
  }
}