import { Body, Controller, Delete, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { Response } from 'express';
import { BetService } from "./bet.service";
import { IdDTO, BetDTO } from './dto/bet.dto'

@Controller('bet')
export class BetController {
    constructor(private betService: BetService) {
    }

    @Get()
    async getInfo(@Query() query: IdDTO, @Res() res: Response) {
      const information = await this.betService.getInfo(query.betId);
    
      return information ?
        res.status(HttpStatus.OK).json(information) :
        res.status(HttpStatus.NOT_FOUND);
    }

    @Delete()
    async deleteBet(@Query() query: IdDTO, @Res() res: Response) {
      const remove = await this.betService.deleteBet(query.betId);
    
      return remove ?
        res.status(HttpStatus.OK) :
        res.status(HttpStatus.NOT_FOUND);
    }

    @Post()
    async registerBet(@Body() bet: BetDTO, @Res() res: Response) {
        const register = await this.betService.registerBet(
            bet
        );
      
        return res.status(HttpStatus.OK).json(register);
    }
}