import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import {
  CompetitionDTO,
  UpdateCompetitionDTO,
  IdDTO
} from './dto/competition.dto';
import { CompetitonService } from './competition.service';


@Controller('competition')
export class CompetitionController {
  constructor(private competitionService: CompetitonService) {
  }

  @Get()
  async getInfo(@Query() query: IdDTO, @Res() res: Response) {
    const information = await this.competitionService.getInfo(
      query.competitionId
    );

    return information ?
      res.status(HttpStatus.OK).json(information) :
      res.status(HttpStatus.NOT_FOUND);
  }

  @Post('register')
  async register(@Body() competition: CompetitionDTO, @Res() res: Response) {
    const register = await this.competitionService.registerCompetition(
      competition
    );

    return res.status(HttpStatus.OK).json(register);
  }

  @Patch()
  async updateCompetition(
      @Query() query: IdDTO,
      @Body() competition: UpdateCompetitionDTO,
      @Res() res: Response
  ) {
    const { competitionId } = query;
    const updated = await this.competitionService.updateCompetition(
      competitionId,
      competition
    );

    return res.status(HttpStatus.OK).json(updated);
  }

  @Delete()
  async deleteCompetition(@Body() body: IdDTO, @Res() res: Response) {
    const { competitionId } = body;

    const deleted = await this.competitionService.deleteCompetition(
      competitionId
    );

    return deleted ?
      res.status(HttpStatus.OK).json() :
      res.status(HttpStatus.NOT_FOUND);
  }
}
