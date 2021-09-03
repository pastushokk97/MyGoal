import { User } from '../../entities/User.entity';
import { UpdateResult } from 'typeorm';

export interface IUser {
  email: string;
  countryCode: string;
  password: string;
}

export interface IUserService {
  registerUser(user: IUser): Promise<User>;
  login(user: Partial<IUser>): Promise<{ email: string, countryCode: string}>;
  getInfo(email: string): Promise<{ email: string, countryCode: string}>;
  updateUser(user: IUser): Promise<UpdateResult>;
  deleteUser(email: string): Promise<{
    delete: boolean
  }>;
  handleUsers(keys: string[], data: string[]): Promise<any>
}
