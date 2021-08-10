import { Module } from '@nestjs/common';
import { UploadDataController } from './uploadData.controller';
import { UploadDataService } from './uploadData.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: `/uploadData`,
  }),],
  controllers: [UploadDataController],
  providers: [UploadDataService],
})
export class UploadDataModule {}
