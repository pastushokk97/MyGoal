import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDataService } from './uploadData.service';
import { UserService } from '../user/user.service';

@Controller('upload')
export class UploadDataController {
  constructor(
    private uploadDataService: UploadDataService,
    private readonly userService: UserService
  ) {
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.uploadDataService.setExtension(file.originalname);

    return this.uploadDataService.saveData(
      file.filename,
      this.userService.handleUsers,
    );
  }
}
