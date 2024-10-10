export interface Cache<T> {
  set(key: string, value: T): void;
  get(key: string): T | undefined;
  search(value: string): T[];
  delete(key: string): void;
}
