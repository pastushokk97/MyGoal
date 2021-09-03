import { readFile } from 'fs';
import { IData } from './interfaces/uploadData.interface';
import { Injectable } from '@nestjs/common';
import { inputFolder } from '../app-constants/uploadData';

@Injectable()
export class CsvService implements IData {
  async saveData(file: string, process: any): Promise<any> {
    const errors = [];
    // return new Promise(((resolve, reject) => {
    //   readFile(`${inputFolder}/${file}`, 'utf8', async (err, data: any) => {
    //     const lines = data.split(/\r?\n/);
    //     const keys = lines[0].replace(/"/g,'').split(',');
    //     for (let i = 1; i < lines.length; i++) {
    //       const formatData = lines[i].replace(/"/g,'').split(',');
    //       const tests = await process(keys, formatData);
    //       if (tests) errors.push(tests);
    //     }
    //     resolve(errors);
    //   });
    // }));

    readFile(`${inputFolder}/${file}`, 'utf8', async (err, data: any) => {
      let str = '';
      let strArray = [];
      for (let i = 0; i < data.length; i += 5) {
        const result = data.slice(i, i + 5).split('\n');
        for (let j = 0; j < result.length; j++) {
          if (j === result.length - 1) {
            str += result[j];
          } else {
            str += result[j];
            strArray.push(str);
            str = '';
          }
        }
        console.log(strArray[0]);
      }

      strArray.push(str);
      console.log(strArray);
    });
  }

  getData(file: string, data: string): void {
    //appendFileSync(file, data);
    console.log('here in get data');
  }
}