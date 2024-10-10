# onerail-takehome

## Description
Using Typescript, we need to implement a couple different versions of a "Cache"; our cache really is just an enumerable or object that stores unique keys that contain a value. Ideally this value can be anything and implementing the cache object with a type that looks like <string, T> would be the best.

## Requirements
We need a simple application to use our cache. ExpressJS or something similar would be probably best leveraged. This layer of the project doesn't need to conform to best practices or super efficient practices as its just a use case for our Cache Service.
As mentioned, the cache object stored should allow for any type of data being stored in the cache with string key.
We want to POC 2 types of Caches:
- A LRU Cache (Least Recently Used): This cache should store 10 records and evict the least recently used (updated, created, or read constitutes usage) when a new object is created and the cache already has 10 records.
- A TTL Cache (Time to Live): This cache should store any number of records but evict any that haven't been used (updated, created, or read) in the time defined by the app (Let's use 10000ms as an example).
- Each Cache should expose a Create, GetById, Update, SearchByValue, and Delete function.
- Create should overwrite existing records if they already exist, and Update should really just use the create logic to avoid duplication of code.
- SearchByValue should return any records that have a partial match of the provided search value. in the case of strings, it should be case insensitive.

## Considerations
The example should conform to best Typescript practices and strongly typed objects.

## Stretch Goals
If time allows (please don't spend more than an hour or two on this 🙂) consider adding the following:
- Unit tests
- Extra requirement- Data resiliency: leveraging the fs library, make the application capable of writing data to disk in the case of an application faliure.
The app should look to this file store when starting to preload the cache.
The app should write a disk copy of the cache at a set interval.
