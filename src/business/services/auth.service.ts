import bcrypt from 'bcrypt';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { findByEmail, create, generateToken, findById } from '../../data/repositories/user.repository';

export const register: RequestHandler = async (req, res) => {
  const { email, password, role } = req.body;

  try{
    const user = await findByEmail(email);
    if (user) {
      return res.status(400).json({ data: null, message: 'Email is not valid' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await create(email, hashedPassword, role);

    return res.status(200).json({ 
      data:{
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      },
      error: null
    });
  }catch(error){
    console.error('Internal Server error:', error);
    return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findByEmail(email);
    const passwordsMatch = user && await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      const token = generateToken(user.id);
      return res.status(200).json({ data: { token }, error: null });
    } else {
      return res.status(404).json({ data: null, error: { message: 'No user found with such email or password' } });
    }
  } catch(error) {
    console.error('Internal Server error:', error);
    return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id');
  
  if (!userId) {
    return res.status(403).send({ error: 'You must be authorized user' });
  }

  const user = findById(userId);
  
  if (!user) {
    return res.status(401).send({ error: 'User is not authorized' });
  }
  
  next();
};