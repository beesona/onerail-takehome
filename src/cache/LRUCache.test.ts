import { LRUCache } from "./LRUCache";

describe("LRUCache", () => {
  let cache: LRUCache<string>;

  beforeEach(() => {
    cache = new LRUCache<string>(3);
  });

  test("should set and get values", () => {
    cache.set("key1", "value1");
    expect(cache.get("key1")).toBe("value1");
  });

  test("should evict least recently used item", () => {
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.set("key3", "value3");
    cache.set("key4", "value4");
    expect(cache.get("key1")).toBeUndefined();
    expect(cache.get("key4")).toBe("value4");
  });
  test("should search values", () => {
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.set("key3", "value3");

    expect(cache.search("value")).toEqual(["value1", "value2", "value3"]);
    expect(cache.search("3")).toEqual(["value3"]);
    expect(cache.search("nonexistent")).toEqual([]);
  });

  test("should delete values", () => {
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.set("key3", "value3");

    cache.delete("key2");
    expect(cache.get("key2")).toBeUndefined();
    expect(cache.get("key1")).toBe("value1");
    expect(cache.get("key3")).toBe("value3");
  });

  test("should handle deleting non-existent keys gracefully", () => {
    cache.set("key1", "value1");
    cache.delete("nonexistentKey");
    expect(cache.get("key1")).toBe("value1");
  });

  test("should update usage order on get", () => {
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.set("key3", "value3");

    cache.get("key1");
    cache.set("key4", "value4");

    expect(cache.get("key2")).toBeUndefined();
    expect(cache.get("key1")).toBe("value1");
    expect(cache.get("key3")).toBe("value3");
    expect(cache.get("key4")).toBe("value4");
  });

  test("should update usage order on search", () => {
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.set("key3", "value3");

    cache.search("value1");
    cache.set("key4", "value4");

    expect(cache.get("key2")).toBeUndefined();
    expect(cache.get("key1")).toBe("value1");
    expect(cache.get("key3")).toBe("value3");
    expect(cache.get("key4")).toBe("value4");
  });
});
