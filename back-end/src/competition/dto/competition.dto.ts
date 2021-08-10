import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsUUID
} from 'class-validator';
import { Results } from '../../app-constants/enums';

export class CompetitionDTO {
    @IsString()
    @IsNotEmpty()
    sport: string;

    @IsString()
    @IsNotEmpty()
    teamAtHome: string;

    @IsString()
    @IsNotEmpty()
    teamOutside: string;

    @IsString   ()
    @IsOptional()
    competitionDate: Date;

    @IsString()
    @IsOptional()
    @IsEnum(Results)
    result: Results;
}

export class UpdateCompetitionDTO {
    @IsString()
    @IsOptional()
    sport: string;

    @IsString()
    @IsOptional()
    teamAtHome: string;

    @IsString()
    @IsOptional()
    teamOutside: string;

    @IsDate()
    @IsOptional()
    competitionDate: Date;

    @IsString()
    @IsOptional()
    @IsEnum(Results)
    result: Results;
}

export class IdDTO {
    @IsNotEmpty()
    @IsUUID(4)
    competitionId: string;
}