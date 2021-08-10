import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDataService } from './uploadData.service';
import {
  determineExtension,
  determineStrategy
} from '../helpers/uploadData.helper';

@Controller('upload')
export class UploadDataController {
  constructor(private uploadDataService: UploadDataService) {
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const extension = determineExtension(file.originalname);
    const strategy = determineStrategy(extension);
    this.uploadDataService.setExtension(strategy);

    console.log(file);
    return this.uploadDataService.getData(file.filename);
  }
}