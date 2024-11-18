# onerail-practical

## Description

Interview Question: Implement an In-Memory Cache with TTL and LRU Eviction
Scenario: You are tasked with developing an in-memory caching system for a
high-performance web application. The cache should store key-value pairs to
reduce the latency of data retrieval operations. Given the constraints of
limited memory and the need for efficient access, the cache must support
the following features:

## Requirements

============= Basic Operations =============

1. Set: Store a key-value pair in the cache.
2. Get: Retrieve the value associated with a given key.
3. Delete: Remove a key-value pair from the cache.

============= Time-To-Live (TTL) =============
Each key-value pair can have an optional TTL (in seconds).
Once the TTL expires, the key-value pair should be automatically removed
from the cache.

============= Least Recently Used (LRU) Eviction =============
The cache has a fixed maximum capacity.
When the cache reaches its maximum capacity, inserting a new key-value
pair should evict the least recently used item to make space.

## Considerations

The example should conform to best Typescript practices and strongly typed objects.

## Completing the exercise

When your code is complete, running npm run test should pass all of our tests.
