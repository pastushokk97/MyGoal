import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CompetitionModule } from './competition/competition.module';
import { BetModule } from './bet/bet.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UserModule,
    CompetitionModule,
    BetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
