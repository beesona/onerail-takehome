import { Cache } from "./Cache";
import * as fs from "fs";
import * as path from "path";

interface TTLItem<T> {
  value: T;
  expiry: number;
}

export class TTLCache<T> implements Cache<T> {
  private cache = new Map<string, TTLItem<T>>();
  private saveInterval: NodeJS.Timeout;

  constructor(
    private ttl: number = 10000,
    private filePath: string = "cache.json"
  ) {
    this.loadFromDisk();
    this.saveInterval = setInterval(() => this.saveToDisk(), 1000);
    this.saveInterval.unref();
  }

  private isExpired(item: TTLItem<T>): boolean {
    return Date.now() > item.expiry;
  }

  private cleanup(): void {
    for (const [key, item] of this.cache.entries()) {
      if (this.isExpired(item)) this.cache.delete(key);
    }
  }

  set(key: string, value: T): void {
    this.cleanup();
    this.cache.set(key, { value, expiry: Date.now() + this.ttl });
  }

  get(key: string): T | undefined {
    this.cleanup();
    const item = this.cache.get(key);
    if (item && !this.isExpired(item)) {
      item.expiry = Date.now() + this.ttl;
      return item.value;
    }
    return undefined;
  }

  search(searchValue: string): T[] {
    this.cleanup();
    return Array.from(this.cache.values())
      .filter(
        (item) =>
          !this.isExpired(item) &&
          JSON.stringify(item.value)
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )
      .map((item) => {
        item.expiry = Date.now() + this.ttl;
        return item.value;
      });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  private saveToDisk(): void {
    const data = JSON.stringify(Array.from(this.cache.entries()));
    fs.writeFileSync(this.filePath, data);
  }

  private loadFromDisk(): void {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, "utf-8");
      const entries: [string, TTLItem<T>][] = JSON.parse(data);
      this.cache = new Map(entries);
    }
  }

  stopSaving(): void {
    clearInterval(this.saveInterval);
  }
}
