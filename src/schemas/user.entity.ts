import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface UserEntity extends Document {
    email: string;
    password: string;
    role: string;
}

const UserSchema: Schema = new Schema({
    _id: { type: String, default: uuidv4, alias: 'id' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { versionKey: false }
);
  
  const UserModel = mongoose.model<UserEntity>('User', UserSchema);
  export default UserModel;