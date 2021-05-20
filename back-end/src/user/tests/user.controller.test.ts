import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/User.entity';
import { UserModule } from '../user.module';
import { users } from '../../fixtures/users';

describe('User', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5433,
          username: 'postgres',
          password: 'prodpassword',
          database: 'pet_project',
          entities: ['./**/*.entity.ts'],
          synchronize: false,
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get('UserRepository');
    await app.init();
  });

  afterEach(async () => {
    await userRepository.query(`DELETE FROM users;`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('SUCCESS CASE', () => {
    it('should register user', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/user/register')
        .send(users[0])
        .set('Accept', 'application/json')

        const user = await userRepository.findOne(users[0].email)

        expect(status).toStrictEqual(200);
        expect(body.email).toStrictEqual(user.email);
        expect(body.countryCode).toStrictEqual(user.countryCode);
        expect(body.password).not.toStrictEqual(user.password);
    });
  });
});