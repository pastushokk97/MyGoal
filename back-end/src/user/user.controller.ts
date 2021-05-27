import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDTO, UserDTO, UpdateUserDTO, EmailDTO } from './dto/user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get('get-info')
  async getInfo(@Body() body: EmailDTO, @Res() res: Response) {
    const { email } = body;
    const information = await this.userService.getInfo(email);

    return information ?
      res.status(HttpStatus.OK).json(information) :
      res.status(HttpStatus.NOT_FOUND);
  }

  @Post('register')
  async register(@Body() body: UserDTO, @Res() res: Response) {
    const user = await this.userService.registerUser(body);

    return res.status(HttpStatus.OK).json(user);
  }

  @Post('login')
  async login(@Body() body: LoginDTO, @Res() res: Response) {
    const user = await this.userService.login(body);

    return res.status(HttpStatus.OK).json(user);
  }

  @Patch()
  async updateUser(@Body() body: UpdateUserDTO, @Res() res: Response) {
    const updatedUser = this.userService.updateUser(body);

    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete()
  async deleteUser(@Body() body: EmailDTO, @Res() res: Response) {
    const { email } = body;
    const deletedUser = await this.userService.deleteUser(email);

    return deletedUser ?
      res.status(HttpStatus.OK).json(deletedUser) :
      res.status(HttpStatus.NOT_FOUND);
  }
}
