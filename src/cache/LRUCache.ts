import { Cache } from "./Cache";

export class LRUCache<T> implements Cache<T> {
  private cache = new Map<string, T>();
  private usage: string[] = [];

  constructor(private maxSize: number = 10) {}

  private touch(key: string): void {
    this.usage = [...this.usage.filter((k) => k !== key), key];
  }

  set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const leastUsed = this.usage.shift();
      if (leastUsed) this.cache.delete(leastUsed);
    }
    this.cache.set(key, value);
    this.touch(key);
  }

  get(key: string): T | undefined {
    const value = this.cache.get(key);
    if (value) this.touch(key);
    return value;
  }

  search(searchValue: string): T[] {
    return Array.from(this.cache.entries())
      .filter(([_, value]) =>
        JSON.stringify(value).toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(([key, value]) => {
        this.touch(key);
        return value;
      });
  }

  delete(key: string): void {
    this.cache.delete(key);
    this.usage = this.usage.filter((k) => k !== key);
  }
}
