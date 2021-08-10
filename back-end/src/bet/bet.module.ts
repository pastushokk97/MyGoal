import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetService } from './bet.service';
import { BetController } from './bet.controller';
import { Bet } from '../entities/Bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bet])],
  controllers: [BetController],
  providers: [BetService],
})
export class BetModule {}