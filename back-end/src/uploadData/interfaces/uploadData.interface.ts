export interface IData {
  getData(file: string): string;
  saveData(file: string, data: string): void;
}