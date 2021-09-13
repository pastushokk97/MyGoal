import {
  Controller, HttpStatus,
  Post, Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
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
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response) {
    if (file.size === 0)
      return res.json('File can\'t be empty').status(HttpStatus.BAD_REQUEST);

    this.uploadDataService.setExtension(file.originalname);

    return res.json(await this.uploadDataService.saveData(
      file.filename,
      this.userService.handleUsers,
    )).status(HttpStatus.OK);
  }
}
