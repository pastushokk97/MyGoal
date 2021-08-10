import { Injectable } from '@nestjs/common';
import { IData } from './interfaces/uploadData.interface';

// const csvDataForReading = '../../users_202105281225.csv';
// const csvDataForWriting = './users.csv';
// const txtDataForReading = './users.txt';
// const txtDataForWriting = './users_writing.txt';
// const encoding = 'utf-8';

@Injectable()
export class UploadDataService {
    private file: IData;

    // constructor(private file: IData) {
    //   this.file = file;
    // }

    public setExtension(file: IData) {
      this.file = file;
    }

    public getData(file: string): string {
      return this.file.getData(file);
    }

    public saveData(file: string, data: string): void {
      return this.file.saveData(file, data);
    }
}

