interface BaseCache {
  setItem(key: string, value: any, ttl?: number): void;
  getItem(key: string): any;
  deleteItem(key: string): void;
  clearCache(): void;
  cleanupExpiredKeys(): void;
  stopCleanup(): void;
}

class InMemoryCache implements BaseCache {
  /**
   * Initializes the in-memory cache with a specified capacity.
   * @param {number} capacity - The maximum number of items the cache can hold.
   */
  constructor(capacity = 100) {
    // TODO: Initialize necessary data structures (e.g., Map for storage, pointers for LRU)
  }

  /**
   * Sets a key-value pair in the cache with an optional TTL.
   * @param {string} key - The key to be stored.
   * @param {*} value - The value associated with the key.
   * @param {number} [ttl=undefined] - Time-To-Live in seconds.
   */
  setItem(key, value, ttl = undefined) {
    // TODO
  }

  /**
   * Retrieves the value associated with a given key.
   * @param {string} key - The key whose value is to be retrieved.
   * @returns {*} The value if the key exists and has not expired; otherwise, null.
   */
  getItem(key) {
    // TODO
  }

  /**
   * Deletes a key-value pair from the cache.
   * @param {string} key - The key to be deleted.
   */
  deleteItem(key) {
    // TODO
  }

  /**
   * Clears all entries from the cache.
   */
  clearCache() {
    // TODO
  }

  /**
   * Periodically cleans up expired keys from the cache.
   * This method is intended to be called at regular intervals.
   */
  cleanupExpiredKeys() {
    // TODO
  }

  /**
   * Stops the cleanup interval.
   * Useful for testing purposes to prevent the interval from running indefinitely.
   */
  stopCleanup() {
    // TODO
  }
}

export { InMemoryCache, BaseCache };
