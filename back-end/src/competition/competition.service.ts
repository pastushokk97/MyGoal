import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Results } from '../app-constants/enums';
import { Competition } from '../entities/Competition.entity';

interface ICompetition {
  sport: string;
  teamAtHome: string;
  teamOutside: string;
  competitionDate: Date;
  result?: Results;
}

@Injectable()
export class CompetitonService {
  constructor(
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>
  ) {}

  async registerCompetition(competition: ICompetition): Promise<Competition> {

    const isExist = await this.competitionRepository.findOne({
      sport: competition.sport,
      teamAtHome: competition.teamAtHome,
      teamOutside: competition.teamOutside
    });

    if (isExist) {
      throw new UnauthorizedException('This competition is already exists');
    }

    return this.competitionRepository.save(competition);
  }

  async getInfo(competitionId: string) {
    return this.findOne(competitionId);
  }

  async updateCompetition(competitionId: string, competition: ICompetition) {
    return this.competitionRepository.createQueryBuilder()
      .update(Competition)
      .set({ ...competition })
      .where({ competitionId })
      .execute();
  }

  async deleteCompetition(competitionId: string) {
    const deleteCompetition = await this.competitionRepository.delete({
      competitionId
    });
    return deleteCompetition.affected === 1;
  }

  async findOne(competitionId: string) {
    return await this.competitionRepository.findOne({ competitionId });
  }
}
