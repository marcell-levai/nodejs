import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../data/repositories/user.repository';
import UserModel, { UserEntity } from '../../schemas/user.entity';
import jwt from 'jsonwebtoken';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(email: string, password: string, role: string): Promise<UserEntity>{
    const user = await this.userRepository.getUserByEmail(email);
    if (user) {
      throw { message: 'Email is not valid', status: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: UserEntity = {  email, password: hashedPassword, role };

    return this.userRepository.createUser(newUser);
  }

  async login(email: string, password: string): Promise<string>{
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw { message: 'No user found with such email or password', status: 404 };
    }

    const passwordsMatch = user && await bcrypt.compare(password, user.password);

    if (passwordsMatch) {     
      return this.generateToken(user.email);
    }else{
      throw { message: 'No user found with such email or password', status: 404 };
    }   
  }

  authenticateUser = async (userId: string) => {
    if (!userId) {
      throw { message: 'You must be authorized user', status: 403 };
    }
  
    const user = await this.userRepository.getUserById(userId);
    
    if (!user) {
      throw { message: 'User is not authorized', status: 401 };
    }
  }

  private generateToken(userId: string): string {
    const secretKey = 'secret123'; //Of course this should be hidden
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1d' });
    return token;
  }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id');
  
  if (!userId) {
    return res.status(403).send({ error: 'You must be authorized user' });
  }

  const user = await UserModel.findOne({ _id: userId }).exec();
  
  if (!user) {
    return res.status(401).send({ error: 'User is not authorized' });
  }
  
  next();
};