import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { LoginDTO, UserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get('get-info')
  getInfo(@Body() body: { email : string }) {
    const { email } = body;
    return this.userService.getInfo(email);
  }

  @Post('register')
  register(@Body() user: UserDTO) {
    return this.userService.registerUser(user);
  }

  @Post('login')
  login(@Body() user: LoginDTO) {
    return this.userService.login(user);
  }

  @Patch()
  updateUser(@Body() user: UpdateUserDTO) {
    return this.userService.updateUser(user);
  }

  @Delete()
  async deleteUser(@Body() body: { email : string }) {
    const { email } = body;
    return {
      delete : await this.userService.deleteUser(email)
    };
  }
}
