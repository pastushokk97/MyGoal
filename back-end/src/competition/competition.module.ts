import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionService } from './competition.service';
import { CompetitionController } from './competition.controller';
import { Competition } from '../entities/Competition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Competition])],
  controllers: [CompetitionController],
  providers: [CompetitionService],
})
export class CompetitionModule {}
