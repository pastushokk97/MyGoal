import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Results } from '../app-constants/enums';
import { Bet } from '../entities/Bet.entity';
import { User } from '../entities/User.entity';
import { Competition } from '../entities/Competition.entity';

interface IBet {
  userId: User;
  competitionId: Competition;
  result: Results;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable()
export class BetService {
  constructor(
      @InjectRepository(Bet)
      private BetRepository: Repository<Bet>
  ) {}

  async registerBet(bet: IBet): Promise<Bet> {
    const isExist = await Bet.findOneOrFail({
      userId: bet.userId,
      competitionId: bet.competitionId
    });

    if (isExist) {
      throw new UnauthorizedException('This bet is already exists');
    }

    return Bet.save(Bet.create(bet));
  }

  async getInfo(betId: string) {
    return this.findOne(betId);
  }

  async deleteBet(betId: string) {
    const deleteBet = await Bet.delete({ betId });

    return deleteBet.affected === 1;
  }

  async findOne(betId: string) {
    return await Bet.findOne({ betId });
  }
}
