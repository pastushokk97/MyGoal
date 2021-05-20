import * as crypto from "crypto";
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';

interface IUser {
  email: string;
  countryCode: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  private hashPassword(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  async registerUser(user: IUser): Promise<User> {

    const isRegistered = await this.userRepository.findOne({ email: user.email });

    if (isRegistered) throw new UnauthorizedException('This user is already exists');

    const hash = await this.hashPassword(user.password)

    return this.userRepository.save({
      ...user,
      password: hash
    });
  }

  async login(user: Partial<IUser>) {
    const userInDB = await this.findOne(user.email)

    if(!userInDB) throw new UnauthorizedException('User was not found');

    const hash = await this.hashPassword(user.password);

    if(userInDB.password !== hash) throw new ForbiddenException('Password doesn\'t match');

    return {
      user: userInDB.email,
      countryCode: userInDB.countryCode,
    }
  }
  async getInfo(email: string) {
    const user = await this.findOne(email);
    return {
        user: user.email,
        countryCode: user.countryCode,
      }
  }

  async updateUser(user: IUser) {
    if (user.password) user.password = await this.hashPassword(user.password)

    return this.userRepository.createQueryBuilder()
    .update(User)
    .set({ ...user })
    .where({ email: user.email })
    .execute();
  }

  async deleteUser(email: string) {
    return await this.userRepository.delete({ email })
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ email })
  }
}
