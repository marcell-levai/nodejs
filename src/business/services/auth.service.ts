import bcrypt from 'bcrypt';
import { UserRepository } from '../../data/repositories/user.repository';
import { UserEntity } from '../../schemas/user.entity';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../../../config';


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

    return this.userRepository.createUser(email, hashedPassword, role);
  }

  async login(email: string, password: string): Promise<string>{
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw { message: 'No user found with such email or password', status: 404 };
    }

    const passwordsMatch = user && await bcrypt.compare(password, user.password);

    if (passwordsMatch) {     
      return this.generateToken(user);
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

  private generateToken(user: UserEntity): string {
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
       TOKEN_KEY!,
      { expiresIn: '2h' }
    );
    return token;
  }
}