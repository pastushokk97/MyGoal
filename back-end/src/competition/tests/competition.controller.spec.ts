import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Competition } from '../../entities/Competition.entity';
import { CompetitionModule } from '../competition.module';
import { competitions } from '../../fixtures/competitions';
import { CompetitonService } from '../competition.service';
import { Results } from "../../app-constants/enums"

describe('Competition', () => {
  let app: INestApplication;
  let competitionRepository: Repository<Competition>;
  let competitonService: CompetitonService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CompetitionModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5433,
          username: 'postgres',
          password: 'prodpassword',
          database: 'pet_project',
          entities: ['./**/*.entity.ts'],
          synchronize: false,
        })
      ],
    }).compile();

    app = module.createNestApplication();
    competitionRepository = module.get('CompetitionRepository');
    competitonService = module.get('CompetitonService');
    await app.init();
  });

  afterEach(async () => {
    await competitionRepository.query('DELETE FROM competitions;');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('SUCCESS CASE', () => {
    it('should register competition', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/competition/register')
        .send(competitions[0])
        .set('Accept', 'application/json');

      const competition = await competitionRepository.findOne(body.competitionId);

      expect(status).toStrictEqual(200);
      expect(body.sport).toStrictEqual(competition.sport);
      expect(body.teamAtHome).toStrictEqual(competition.teamAtHome);
      expect(body.teamOutside).toStrictEqual(competition.teamOutside);
    });
    it('should return data about competition', async () => {
      const { competitionId } = await competitonService.registerCompetition({
          ...competitions[2],
          result: Results.homeWin
      });

      const { status, body } = await request(app.getHttpServer())
        .get(`/competition`)
        .query({ competitionId })
        .set('Accept', 'application/json');

      expect(status).toStrictEqual(200);
      expect(body.sport).toStrictEqual(competitions[2].sport);
      expect(body.teamAtHome).toStrictEqual(competitions[2].teamAtHome);
      expect(body.teamOutside).toStrictEqual(competitions[2].teamOutside);
      expect(body.result).toStrictEqual(Results.homeWin);
    });
    it('should update competition', async () => {
        const { competitionId } = await competitonService.registerCompetition({ ...competitions[3], result: Results.technicalDefeat});

      const updatedCompetiton = {
        result: Results.homeWin
      };

      const { status } = await request(app.getHttpServer())
        .patch(`/competition?competitionId=${competitionId}`)
        .send(updatedCompetiton)
        .set('Accept', 'application/json');

      const competition = await competitionRepository.findOne({ competitionId });

      expect(status).toStrictEqual(200);
      expect(competition.result).toStrictEqual(updatedCompetiton.result);
      expect(competition.competitionId).toStrictEqual(competitionId);
    });
    it('should delete competition', async () => {
      const { competitionId } = await competitonService.registerCompetition({ ...competitions[3], result: Results.draw});

      const { status } = await request(app.getHttpServer())
        .delete('/competition')
        .send({ competitionId })
        .set('Accept', 'application/json');

      const competition = await competitionRepository.findOne({ competitionId });

      expect(status).toStrictEqual(200);
      expect(competition).toBe(undefined);
    });
  });
});