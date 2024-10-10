import { TTLCache } from "./TTLCache";
import * as fs from "fs";

describe("TTLCache", () => {
  let cache: TTLCache<string>;
  const testFilePath = "testCache.json";

  beforeEach(() => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
    cache = new TTLCache<string>(100, testFilePath);
  });

  afterEach(() => {
    cache.stopSaving();
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test("should set and get a value", () => {
    cache.set("key1", "value1");
    expect(cache.get("key1")).toBe("value1");
  });

  test("should delete a value", () => {
    cache.set("key1", "value1");
    cache.delete("key1");
    expect(cache.get("key1")).toBeUndefined();
  });

  test("should search for values", () => {
    cache.set("key1", "value1");
    cache.set("key2", "anotherValue");
    const results = cache.search("value");
    expect(results).toContain("value1");
    expect(results).toContain("anotherValue");
  });

  test("should save and load cache from disk", () => {
    cache = new TTLCache<string>(100, testFilePath);
    cache.set("key1", "value1");
    cache.set("key2", "value2");

    cache.stopSaving();

    expect(cache.get("key1")).toBe("value1");
    expect(cache.get("key2")).toBe("value2");
  });

  test("should extend expiry on search", (done) => {
    cache = new TTLCache<string>(65, testFilePath);
    cache.set("key1", "value1");

    setTimeout(() => {
      cache.search("value1");
    }, 5);

    setTimeout(() => {
      expect(cache.get("key1")).toBe("value1");
      done();
    }, 10);
  });
});
