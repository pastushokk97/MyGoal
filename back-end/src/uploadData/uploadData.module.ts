import { Module } from '@nestjs/common';
import { UploadDataController } from './uploadData.controller';
import { UploadDataService } from './uploadData.service';
import { MulterModule } from '@nestjs/platform-express';
import { inputFolder } from '../app-constants/uploadData';
import { UserModule } from '../user/user.module';
import { CsvService } from './CsvService.service';

@Module({
  imports: [
    MulterModule.register({
      dest: inputFolder,
    }),
    UserModule
  ],
  controllers: [UploadDataController],
  providers: [UploadDataService, CsvService]
})
export class UploadDataModule {}
