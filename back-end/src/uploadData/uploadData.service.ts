import { Injectable } from '@nestjs/common';
import { IData } from './interfaces/uploadData.interface';
import { CsvService } from './CsvService.service';

@Injectable()
export class UploadDataService implements IData {
  private file: IData;

  setExtension(name: string) {
    const extension = this.determineExtension(name);
    this.file = this.determineStrategy(extension);
  }

  async saveData(file: string, process: any): Promise<any> {
    return this.file.saveData(file, process);
  }

  getData(file: string, data: string): void {
    return this.file.getData(file, data);
  }

  private determineExtension(fileName: string): string {
    return fileName.split('.')[fileName.split('.').length - 1];
  }

  private determineStrategy(extension: string): IData {
    const fileModule: {[typesModule: string]: any} = {
      csv: CsvService
    };
    return new fileModule[extension]();
  }
}
