import {readFileSync, appendFileSync} from 'fs';
import { IData } from '../uploadData/interfaces/uploadData.interface';
import { encoding, inputFolder } from '../app-constants/uploadData';

class FileCSV implements IData {
  public getData(file: string): string {
    return readFileSync(`/uploadData/${file}`, encoding);
  }

  public saveData(file:string, data: string): void {
    appendFileSync(file, data);
  }
}

class FileText implements IData {
  public getData(file: string): string {
    return readFileSync(file, encoding);
  }

  public saveData(file: string, data: string): void {
    appendFileSync(file, data);
  }
}

export function determineExtension(fileName: string): string {
  return fileName.split('.')[fileName.split('.').length - 1];
}

export function determineStrategy(extension: string): IData {
  const fileModule: {[typesModule: string]: any} = {
    csv: FileCSV,
    text: FileText
  };
  return new fileModule[extension]();
}
