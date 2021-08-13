import { Injectable } from '@nestjs/common';
import { IData } from './interfaces/uploadData.interface';
import { FileCSV } from '../helpers/uploadData.helper';

@Injectable()
export class UploadDataService implements IData{
    private file: IData;

    setExtension(name: string) {
      const extension = this.determineExtension(name);
      this.file = this.determineStrategy(extension);
    }

    saveData(file: string): void {
      return this.file.saveData(file);
    }

    getData(file: string, data: string): void {
      return this.file.getData(file, data);
    }

    determineExtension(fileName: string): string {
      return fileName.split('.')[fileName.split('.').length - 1];
    }
    determineStrategy(extension: string): IData {
      const fileModule: {[typesModule: string]: any} = {
        csv: FileCSV
      };
      return new fileModule[extension]();
    }
}

