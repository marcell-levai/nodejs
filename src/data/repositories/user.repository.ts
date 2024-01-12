import fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../../schemas/user.entity';
import jwt from 'jsonwebtoken';

const filePath = path.join(__dirname, '../../data/users.json');

function findAll(): UserEntity[] {
  try {
    const users = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(users);
  } catch (error) {
    console.error('Error reading or parsing JSON:', error.message);
    return [];
  }
}

function findByEmail(email: string): UserEntity | undefined {
  const users = findAll();
  return users.find((user) => user.email === email);
}

function findById(id: string): UserEntity | undefined {
  const users = findAll();
  return users.find((user) => user.id === id);
}

function create(email: string, password: string, role: string): UserEntity {
  const users = findAll();
  const newUser : UserEntity = {
    id: uuidv4(),
    email: email,
    password: password,
    role: role
  };
  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return newUser;
}

function generateToken(userId: string): string {
  const secretKey = 'secret123'; //Of course this should be hidden
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1d' });
  return token;
}

export { findAll, findByEmail, findById, create, generateToken };