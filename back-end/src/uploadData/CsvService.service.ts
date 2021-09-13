import { readFile } from 'fs';
import { IData } from './interfaces/uploadData.interface';
import { Injectable } from '@nestjs/common';
import { inputFolder, encoding } from '../app-constants/uploadData';

@Injectable()
export class CsvService implements IData {
  async saveData(file: string, process: any): Promise<any> {
    const errors = [];
    // return new Promise(((resolve, reject) => {
    //  readFile(`${inputFolder}/${file}`, encoding, async (err, data: any) => {
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
    return new Promise(((resolve, reject) => {
      readFile(`${inputFolder}/${file}`, encoding, async (err, data: any) => {
        try {
          const lineArray = [];
          let line = '';
          let keys = '';
          let count = 0;
          for (let i = 0; i < data.length; i += 5) {
            const chunk = data.slice(i, i + 5).split('\n');

            for (let j = 0; j < chunk.length; j++) {
              if (j === chunk.length - 1) {
                line += chunk[j];
              } else {
                line += chunk[j];
                lineArray.push(line);
                line = '';
              }
            }

            if (count === 0 && lineArray[0]) {
              keys = lineArray[0].replace(/"/g, '').split(',');
              count++;
            } else if (count > 0 && lineArray[count]) {
              const formatData = lineArray[count].replace(/"/g, '').split(',');
              const error = await process(keys, formatData);
              if (error) errors.push(error);
              count++;
            }
          }

          lineArray.push(line);
          const formatData = lineArray[lineArray.length - 1]
            .replace(/"/g, '')
            .split(',');
          const error = await process(keys, formatData);
          if (error) errors.push(error);
          resolve(errors);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    }));
  }

  getData(file: string, data: string): void {
    //appendFileSync(file, data);
    console.log('here in get data');
  }
}