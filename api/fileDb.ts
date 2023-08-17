import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';
import { IMessage, TMessageWithoutId } from "./types";

const pathName = './db.json';
let data: IMessage[] = [];

const fileDb = {
  async init () {
    try {
      const fileContents = await fs.readFile(pathName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      console.error(e);
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item: TMessageWithoutId) {
    const message: IMessage = {
      ...item,
      id: randomUUID(),
    };

    data.push(message);
    await this.save();
    return message.id;
  },
  async save() {
    await fs.writeFile(pathName, JSON.stringify(data));
  },
}

export default fileDb;