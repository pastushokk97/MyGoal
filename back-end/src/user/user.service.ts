import * as crypto from 'crypto';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/User.entity';
import { IUser, IUserService } from './interface/user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  static hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  async registerUser(user: IUser): Promise<User> {
    const isRegistered = await User.findOne({
      email: user.email
    });

    if (isRegistered) {
      throw new UnauthorizedException('This user is already exists');
    }

    const hash = UserService.hashPassword(user.password);

    return User.save(User.create({
      ...user,
      password: hash
    }));
  }

  async login(user: Partial<IUser>)
    : Promise<{ email: string, countryCode: string}> {
    const userInDB = await User.findOne({ email: user.email });

    if (!userInDB) throw new UnauthorizedException('User was not found');

    const hash = UserService.hashPassword(user.password);

    if (userInDB.password !== hash) {
      throw new ForbiddenException('Password doesn\'t match');
    }

    return {
      email: userInDB.email,
      countryCode: userInDB.countryCode,
    };
  }

  async getInfo(email: string): Promise<{ email: string, countryCode: string}> {
    try {
      const user = await User.findOne({ email });

      return {
        email: user.email,
        countryCode: user.countryCode,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(user: IUser): Promise<UpdateResult> {
    if (user.password) user.password = UserService.hashPassword(user.password);

    return User.createQueryBuilder()
      .update(User)
      .set({
        countryCode: user.countryCode,
        password: user.password
      })
      .where({ email: user.email })
      .execute();
  }

  async deleteUser(email: string): Promise<{
    delete: boolean
  }> {
    const deleteUser = await User.delete({ email });

    return {
      delete: deleteUser.affected === 1
    };
  }

  async handleUsers(keys: string[], data: string[]): Promise<any> {
    const user = {};

    for (let i = 0; i < keys.length; i++) {
      user[keys[i]] = data[i];
    }
    console.log(user, 'user');
    const isRegistered = await User.findOne({ email: user['email'] });

    if (isRegistered) {
      return new UnauthorizedException('This user is already exists');
    }

    const hash = UserService.hashPassword(user['password']);

    try {
      await User.save(
        User.create({ ...user, password: hash })
      );
    } catch (err) {
      return err;
    }
  }
}
