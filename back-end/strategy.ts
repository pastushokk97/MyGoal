import * as fs from 'fs';

const csvDataForReading = './users_202105281225.csv';
const csvDataForWriting = './users.csv';
const txtDataForReading = './users.txt';
const txtDataForWriting = './users_writing.txt';
const encoding = 'utf-8';

class ImportData {
    private file: IData;

    constructor(file: IData) {
        this.file = file;
    }

    public setExtension(file: IData) {
        this.file = file;
    }

    public getData(): string {
        return this.file.getData();
    }

    public saveData(data: string): void {
        return this.file.saveData(data);
    }
}

interface IData {
    getData(): string;
    saveData(data: string): void;
}

class FileCSV implements IData {
    public getData(): string {
        return fs.readFileSync(csvDataForReading, encoding);
    }

    public saveData(data: string): void {
        fs.appendFileSync(csvDataForWriting, data);
    }
}

class FileText implements IData {
    public getData(): string {
        return fs.readFileSync(txtDataForReading, encoding);
    }

    public saveData(data: string): void {
        fs.appendFileSync(txtDataForWriting, data);
    }
}


function determineExtension(fileName: string): string {
    return fileName.split('.')[fileName.split('.').length - 1];
}

function determineStrategy(extension: string): IData {
    const q: {[x: string]: any} = {
        csv: FileCSV,
        text: FileText
    }
    return new q[extension]();
}


console.log(determineStrategy(determineExtension(csvDataForReading)).getData());