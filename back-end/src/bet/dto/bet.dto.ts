import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Results } from '../../app-constants/enums';
import { Competition } from '../../entities/Competition.entity';
import { User } from '../../entities/User.entity';

export class IdDTO {
    @IsNotEmpty()
    @IsUUID(4)
    betId: string;
}

export class BetDTO {
    @IsNotEmpty()
    @IsUUID(4)
    userId: User;

    @IsNotEmpty()
    @IsUUID(4)
    competitionId: Competition;

    @IsNotEmpty()
    @IsEnum(Results)
    result: Results;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}
