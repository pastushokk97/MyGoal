import { Module } from '@nestjs/common';
import { UploadDataController } from './uploadData.controller';
import { UploadDataService } from './uploadData.service';
import { MulterModule } from '@nestjs/platform-express';
import { inputFolder } from '../app-constants/uploadData';
import { FileCSV } from '../helpers/uploadData.helper';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MulterModule.register({
      dest: inputFolder,
    }),
    UserModule
  ],
  controllers: [UploadDataController],
  providers: [UploadDataService, FileCSV]
})
export class UploadDataModule {}
