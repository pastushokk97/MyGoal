import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDataService } from './uploadData.service';
import { UserService } from '../user/user.service';
import { users } from '../fixtures/users';

@Controller('upload')
export class UploadDataController {
  constructor(private uploadDataService: UploadDataService,
    private userService: UserService) {
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.uploadDataService.setExtension(file.originalname);
    // await this.userService.registerUser(users[1]);
    return this.uploadDataService.saveData(file.filename);
  }
}