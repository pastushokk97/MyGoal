export interface IData {
  saveData(file: string): void;
  getData(file: string, data: string): void;
}