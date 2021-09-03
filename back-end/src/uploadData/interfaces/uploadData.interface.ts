export interface IData {
  saveData(file: string, process: any): Promise<any>;
  getData(file: string, data: string): void;
}
