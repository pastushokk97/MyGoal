import { appendFileSync, createReadStream } from 'fs';
import { IData } from '../uploadData/interfaces/uploadData.interface';
import { inputFolder } from '../app-constants/uploadData';
import * as csv from 'csv-parser';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { users } from '../fixtures/users';

@Injectable()
export class FileCSV implements IData {
  constructor(private readonly userService: UserService) {
  }

  async saveData(file: string): Promise<void> {
    const data: any[] = [];
    createReadStream(`${inputFolder}/${file}`)
      .pipe(csv())
      .on('data', chunk => data.push(chunk))
      .on('end',  async () => {
      }).on('error', err => {
        console.error('ERROR:',err);
      });
    console.log(users[0].email, 'filecsv')
    await this.userService.registerUser(users[0]);
  }

  getData(file:string, data: string): void {
    appendFileSync(file, data);
  }
}
