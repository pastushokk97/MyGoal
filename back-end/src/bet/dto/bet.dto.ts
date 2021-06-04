import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Results } from 'src/app-constants/enums';
import { Competition } from 'src/entities/Competition.entity';
import { User } from 'src/entities/User.entity';

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