import { BaseCache, InMemoryCache } from '.';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test Suite
function runTests() {
  console.log('Running Tests...');

  const mockCache: BaseCache = {
    setItem: () => {},
    getItem: () => {},
    deleteItem: () => {},
    clearCache: () => {},
    cleanupExpiredKeys: () => {},
    stopCleanup: () => {}
  };

  const cacheProvider = (
    ttl = 2,
    cacheType: 'mock' | 'implementation' = 'implementation'
  ) => {
    return cacheType === 'mock' ? mockCache : new InMemoryCache(ttl);
  };

  // Test 1: Basic Set and Get
  const cache1 = cacheProvider();
  cache1.setItem('a', 1);
  cache1.setItem('b', 2);
  assert(cache1.getItem('a') === 1, "Test 1 Failed: Get 'a' should return 1");
  assert(cache1.getItem('b') === 2, "Test 1 Failed: Get 'b' should return 2");
  console.log('Test 1 Passed: Basic Set and Get');

  // Test 2: Overwrite Existing Key
  cache1.setItem('a', 10);
  assert(
    cache1.getItem('a') === 10,
    "Test 2 Failed: Get 'a' should return 10 after overwrite"
  );
  console.log('Test 2 Passed: Overwrite Existing Key');

  // Test 3: LRU Eviction
  cache1.setItem('c', 3); // Should evict 'b'
  assert(
    cache1.getItem('b') === null,
    "Test 3 Failed: 'b' should have been evicted"
  );
  assert(
    cache1.getItem('a') === 10,
    "Test 3 Failed: 'a' should still be present"
  );
  assert(cache1.getItem('c') === 3, "Test 3 Failed: 'c' should be present");
  console.log('Test 3 Passed: LRU Eviction');

  // Test 4: TTL Expiration
  const cache2 = cacheProvider(2);
  cache2.setItem('x', 100, 1); // TTL = 1 second
  cache2.setItem('y', 200);
  assert(
    cache2.getItem('x') === 100,
    "Test 4 Failed: Get 'x' should return 100 before TTL"
  );
  setTimeout(() => {
    assert(
      cache2.getItem('x') === null,
      "Test 4 Failed: 'x' should have expired"
    );
    assert(
      cache2.getItem('y') === 200,
      "Test 4 Failed: 'y' should still be present"
    );
    console.log('Test 4 Passed: TTL Expiration');

    // Test 5: Delete Operation
    cache2.deleteItem('y');
    assert(
      cache2.getItem('y') === null,
      "Test 5 Failed: 'y' should have been deleted"
    );
    console.log('Test 5 Passed: Delete Operation');

    // Test 6: Clear Cache
    cache2.setItem('m', 300);
    cache2.setItem('n', 400);
    cache2.clearCache();
    assert(
      cache2.getItem('m') === null && cache2.getItem('n') === null,
      'Test 6 Failed: Cache should be cleared'
    );
    console.log('Test 6 Passed: Clear Cache');

    // Test 7: Edge Case - Zero TTL
    const cache3 = cacheProvider();
    cache3.setItem('p', 500);
    assert(
      cache3.getItem('p') === null,
      "Test 7 Failed: 'p' with TTL=0 should expire immediately"
    );
    console.log('Test 7 Passed: Edge Case - Zero TTL');

    // Test 8: High Concurrency Simulation
    const cache4 = cacheProvider(1000);
    let success = true;
    const operations = 10000;
    for (let i = 0; i < operations; i++) {
      cache4.setItem(`key${i}`, i);
      if (cache4.getItem(`key${i}`) !== i) {
        success = false;
        break;
      }
    }
    assert(success, 'Test 8 Failed: High concurrency simulation');
    console.log('Test 8 Passed: High Concurrency Simulation');

    // Cleanup
    cache1.stopCleanup();
    cache2.stopCleanup();
    cache3.stopCleanup();
    cache4.stopCleanup();

    console.log('All Tests Passed Successfully!');
  }, 1500); // Wait 1.5 seconds for TTL to expire
}

runTests();
