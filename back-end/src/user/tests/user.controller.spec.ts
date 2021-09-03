import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/User.entity';
import { UserModule } from '../user.module';
import { users } from '../../fixtures/users';
import { UserService } from '../user.service';

describe('User', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let userService: UserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5432,
          username: 'postgres',
          password: 'prodpassword',
          database: 'pet_project',
          entities: ['./**/*.entity.ts'],
          synchronize: false,
        })
      ],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get('UserRepository');
    userService = module.get('UserService');
    await app.init();
  });

  afterEach(async () => {
    await userRepository.query('DELETE FROM users;');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('SUCCESS CASE', () => {
    it('should register user', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/user/register')
        .send(users[0])
        .set('Accept', 'application/json');

      const userDB = await userRepository.findOne({ email: users[0].email });

      expect(status).toStrictEqual(200);
      expect(body.email).toStrictEqual(userDB.email);
      expect(body.countryCode).toStrictEqual(userDB.countryCode);
      expect(body.password).not.toStrictEqual(users[0].password);
      expect(body.password).toStrictEqual(userDB.password);
    });
    it('should login user', async () => {
      await userService.registerUser(users[1]);

      const { status, body } = await request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: users[1].email,
          password: users[1].password
        })
        .set('Accept', 'application/json');

      expect(status).toStrictEqual(200);
      expect(body.email).toStrictEqual(users[1].email);
      expect(body.countryCode).toStrictEqual(users[1].countryCode);
    });
    it('should return data about user', async () => {
      await userService.registerUser(users[2]);

      const { status, body } = await request(app.getHttpServer())
        .get('/user/get-info')
        .send({ email: users[2].email })
        .set('Accept', 'application/json');

      expect(status).toStrictEqual(200);
      expect(body.email).toStrictEqual(users[2].email);
      expect(body.countryCode).toStrictEqual(users[2].countryCode);
    });
    it('should update user', async () => {
      await userService.registerUser(users[3]);

      const updatedUser = {
        email: users[3].email,
        countryCode: '4',
        password: 'password'
      };

      const { status } = await request(app.getHttpServer())
        .patch('/user')
        .send(updatedUser)
        .set('Accept', 'application/json');

      const userDB = await userRepository.findOne({ email: users[3].email });

      expect(status).toStrictEqual(200);
      expect(userDB.countryCode).toStrictEqual(updatedUser.countryCode);
      expect(userDB.password).not.toBe(updatedUser.password);
    });
    it('should delete user', async () => {
      await userService.registerUser(users[4]);

      const { status, body } = await request(app.getHttpServer())
        .delete('/user')
        .send({ email: users[4].email })
        .set('Accept', 'application/json');

      const userDB = await userRepository.findOne({ email: users[4].email });

      expect(status).toStrictEqual(200);
      expect(body.delete).toStrictEqual(true);
      expect(userDB).toBe(undefined);
    });
  });
});