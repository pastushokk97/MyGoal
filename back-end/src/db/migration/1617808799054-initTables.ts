/* eslint-disable quotes */
/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTables1617808799054 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TYPE results AS ENUM('home_win','draw','outside_win','technical_defeat');`
    );
    await queryRunner.query(
      `CREATE TABLE users(user_id uuid DEFAULT uuid_generate_v4(), email varchar(96) NOT NULL, password varchar(255) NOT NULL, country_code varchar(4) NOT NULL, created_at DATE NOT NULL DEFAULT CURRENT_DATE, updated_at DATE, PRIMARY KEY(user_id));`
    );
    await queryRunner.query(
      `CREATE TABLE competitions(competition_id uuid DEFAULT uuid_generate_v4(), sport varchar(255) NOT NULL, team_at_home varchar(255) NOT NULL, team_outside varchar(255) NOT NULL, result results, competition_date DATE NOT NULL, PRIMARY KEY(competition_id));`
    );
    await queryRunner.query(
      `CREATE TABLE bets(bet_id uuid DEFAULT uuid_generate_v4(), user_id uuid REFERENCES users(user_id) ON DELETE CASCADE, competition_id uuid REFERENCES competitions(competition_id) ON DELETE CASCADE, result results, created_at DATE NOT NULL DEFAULT CURRENT_DATE, updated_at DATE, CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(user_id),CONSTRAINT fk_competitions FOREIGN KEY(competition_id) REFERENCES competitions(competition_id));`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // eslint-disable-next-line quotes
    await queryRunner.query(`DROP EXTENSION IF EXIST "uuid-ossp";`);
    await queryRunner.query(`DROP TYPE IF EXIST results`);
    await queryRunner.query(`DROP TABLE IF EXIST users;`);
    await queryRunner.query(`DROP TABLE IF EXIST competition;`);
    await queryRunner.query(`DROP TABLE IF EXIST bets;`);
  }

}
