"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Collection: () => Collection,
  version: () => version
});
module.exports = __toCommonJS(src_exports);

// src/collection.ts
var Collection = class _Collection extends Map {
  static {
    __name(this, "Collection");
  }
  /**
   * Obtains the value of the given key if it exists, otherwise sets and returns the value provided by the default value generator.
   *
   * @param key - The key to get if it exists, or set otherwise
   * @param defaultValueGenerator - A function that generates the default value
   * @example
   * ```ts
   * collection.ensure(guildId, () => defaultGuildConfig);
   * ```
   */
  ensure(key, defaultValueGenerator) {
    if (this.has(key))
      return this.get(key);
    if (typeof defaultValueGenerator !== "function")
      throw new TypeError(`${defaultValueGenerator} is not a function`);
    const defaultValue = defaultValueGenerator(key, this);
    this.set(key, defaultValue);
    return defaultValue;
  }
  /**
   * Checks if all of the elements exist in the collection.
   *
   * @param keys - The keys of the elements to check for
   * @returns `true` if all of the elements exist, `false` if at least one does not exist.
   */
  hasAll(...keys) {
    return keys.every((key) => super.has(key));
  }
  /**
   * Checks if any of the elements exist in the collection.
   *
   * @param keys - The keys of the elements to check for
   * @returns `true` if any of the elements exist, `false` if none exist.
   */
  hasAny(...keys) {
    return keys.some((key) => super.has(key));
  }
  first(amount) {
    if (amount === void 0)
      return this.values().next().value;
    if (amount < 0)
      return this.last(amount * -1);
    amount = Math.min(this.size, amount);
    const iter = this.values();
    return Array.from({ length: amount }, () => iter.next().value);
  }
  firstKey(amount) {
    if (amount === void 0)
      return this.keys().next().value;
    if (amount < 0)
      return this.lastKey(amount * -1);
    amount = Math.min(this.size, amount);
    const iter = this.keys();
    return Array.from({ length: amount }, () => iter.next().value);
  }
  last(amount) {
    const arr = [...this.values()];
    if (amount === void 0)
      return arr[arr.length - 1];
    if (amount < 0)
      return this.first(amount * -1);
    if (!amount)
      return [];
    return arr.slice(-amount);
  }
  lastKey(amount) {
    const arr = [...this.keys()];
    if (amount === void 0)
      return arr[arr.length - 1];
    if (amount < 0)
      return this.firstKey(amount * -1);
    if (!amount)
      return [];
    return arr.slice(-amount);
  }
  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at | Array.at()}.
   * Returns the item at a given index, allowing for positive and negative integers.
   * Negative integers count back from the last item in the collection.
   *
   * @param index - The index of the element to obtain
   */
  at(index) {
    index = Math.floor(index);
    const arr = [...this.values()];
    return arr.at(index);
  }
  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at | Array.at()}.
   * Returns the key at a given index, allowing for positive and negative integers.
   * Negative integers count back from the last item in the collection.
   *
   * @param index - The index of the key to obtain
   */
  keyAt(index) {
    index = Math.floor(index);
    const arr = [...this.keys()];
    return arr.at(index);
  }
  random(amount) {
    const arr = [...this.values()];
    if (amount === void 0)
      return arr[Math.floor(Math.random() * arr.length)];
    if (!arr.length || !amount)
      return [];
    return Array.from(
      { length: Math.min(amount, arr.length) },
      () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
    );
  }
  randomKey(amount) {
    const arr = [...this.keys()];
    if (amount === void 0)
      return arr[Math.floor(Math.random() * arr.length)];
    if (!arr.length || !amount)
      return [];
    return Array.from(
      { length: Math.min(amount, arr.length) },
      () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
    );
  }
  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse | Array.reverse()}
   * but returns a Collection instead of an Array.
   */
  reverse() {
    const entries = [...this.entries()].reverse();
    this.clear();
    for (const [key, value] of entries)
      this.set(key, value);
    return this;
  }
  find(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (fn(val, key, this))
        return val;
    }
    return void 0;
  }
  findKey(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (fn(val, key, this))
        return key;
    }
    return void 0;
  }
  findLast(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    const entries = [...this.entries()];
    for (let index = entries.length - 1; index >= 0; index--) {
      const val = entries[index][1];
      const key = entries[index][0];
      if (fn(val, key, this))
        return val;
    }
    return void 0;
  }
  findLastKey(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    const entries = [...this.entries()];
    for (let index = entries.length - 1; index >= 0; index--) {
      const key = entries[index][0];
      const val = entries[index][1];
      if (fn(val, key, this))
        return key;
    }
    return void 0;
  }
  sweep(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    const previousSize = this.size;
    for (const [key, val] of this) {
      if (fn(val, key, this))
        this.delete(key);
    }
    return previousSize - this.size;
  }
  filter(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    const results = new this.constructor[Symbol.species]();
    for (const [key, val] of this) {
      if (fn(val, key, this))
        results.set(key, val);
    }
    return results;
  }
  partition(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    const results = [
      new this.constructor[Symbol.species](),
      new this.constructor[Symbol.species]()
    ];
    for (const [key, val] of this) {
      if (fn(val, key, this)) {
        results[0].set(key, val);
      } else {
        results[1].set(key, val);
      }
    }
    return results;
  }
  flatMap(fn, thisArg) {
    const collections = this.map(fn, thisArg);
    return new this.constructor[Symbol.species]().concat(...collections);
  }
  map(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    const iter = this.entries();
    return Array.from({ length: this.size }, () => {
      const [key, value] = iter.next().value;
      return fn(value, key, this);
    });
  }
  mapValues(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    const coll = new this.constructor[Symbol.species]();
    for (const [key, val] of this)
      coll.set(key, fn(val, key, this));
    return coll;
  }
  some(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (fn(val, key, this))
        return true;
    }
    return false;
  }
  every(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (!fn(val, key, this))
        return false;
    }
    return true;
  }
  /**
   * Applies a function to produce a single value. Identical in behavior to
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce | Array.reduce()}.
   *
   * @param fn - Function used to reduce, taking four arguments; `accumulator`, `currentValue`, `currentKey`,
   * and `collection`
   * @param initialValue - Starting value for the accumulator
   * @example
   * ```ts
   * collection.reduce((acc, guild) => acc + guild.memberCount, 0);
   * ```
   */
  reduce(fn, initialValue) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    let accumulator;
    const iterator = this.entries();
    if (initialValue === void 0) {
      if (this.size === 0)
        throw new TypeError("Reduce of empty collection with no initial value");
      accumulator = iterator.next().value[1];
    } else {
      accumulator = initialValue;
    }
    for (const [key, value] of iterator) {
      accumulator = fn(accumulator, value, key, this);
    }
    return accumulator;
  }
  /**
   * Applies a function to produce a single value. Identical in behavior to
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight | Array.reduceRight()}.
   *
   * @param fn - Function used to reduce, taking four arguments; `accumulator`, `value`, `key`, and `collection`
   * @param initialValue - Starting value for the accumulator
   */
  reduceRight(fn, initialValue) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    const entries = [...this.entries()];
    let accumulator;
    let index;
    if (initialValue === void 0) {
      if (entries.length === 0)
        throw new TypeError("Reduce of empty collection with no initial value");
      accumulator = entries[entries.length - 1][1];
      index = entries.length - 1;
    } else {
      accumulator = initialValue;
      index = entries.length;
    }
    while (--index >= 0) {
      const key = entries[index][0];
      const val = entries[index][1];
      accumulator = fn(accumulator, val, key, this);
    }
    return accumulator;
  }
  each(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    for (const [key, value] of this) {
      fn(value, key, this);
    }
    return this;
  }
  tap(fn, thisArg) {
    if (typeof fn !== "function")
      throw new TypeError(`${fn} is not a function`);
    if (thisArg !== void 0)
      fn = fn.bind(thisArg);
    fn(this);
    return this;
  }
  /**
   * Creates an identical shallow copy of this collection.
   *
   * @example
   * ```ts
   * const newColl = someColl.clone();
   * ```
   */
  clone() {
    return new this.constructor[Symbol.species](this);
  }
  /**
   * Combines this collection with others into a new collection. None of the source collections are modified.
   *
   * @param collections - Collections to merge
   * @example
   * ```ts
   * const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
   * ```
   */
  concat(...collections) {
    const newColl = this.clone();
    for (const coll of collections) {
      for (const [key, val] of coll)
        newColl.set(key, val);
    }
    return newColl;
  }
  /**
   * Checks if this collection shares identical items with another.
   * This is different to checking for equality using equal-signs, because
   * the collections may be different objects, but contain the same data.
   *
   * @param collection - Collection to compare with
   * @returns Whether the collections have identical contents
   */
  equals(collection) {
    if (!collection)
      return false;
    if (this === collection)
      return true;
    if (this.size !== collection.size)
      return false;
    for (const [key, value] of this) {
      if (!collection.has(key) || value !== collection.get(key)) {
        return false;
      }
    }
    return true;
  }
  /**
   * The sort method sorts the items of a collection in place and returns it.
   * The sort is not necessarily stable in Node 10 or older.
   * The default sort order is according to string Unicode code points.
   *
   * @param compareFunction - Specifies a function that defines the sort order.
   * If omitted, the collection is sorted according to each character's Unicode code point value, according to the string conversion of each element.
   * @example
   * ```ts
   * collection.sort((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
   * ```
   */
  sort(compareFunction = _Collection.defaultSort) {
    const entries = [...this.entries()];
    entries.sort((a, b) => compareFunction(a[1], b[1], a[0], b[0]));
    super.clear();
    for (const [key, value] of entries) {
      super.set(key, value);
    }
    return this;
  }
  /**
   * The intersection method returns a new collection containing the items where the key is present in both collections.
   *
   * @param other - The other Collection to filter against
   * @example
   * ```ts
   * const col1 = new Collection([['a', 1], ['b', 2]]);
   * const col2 = new Collection([['a', 1], ['c', 3]]);
   * const intersection = col1.intersection(col2);
   * console.log(col1.intersection(col2));
   * // => Collection { 'a' => 1 }
   * ```
   */
  intersection(other) {
    const coll = new this.constructor[Symbol.species]();
    for (const [key, value] of this) {
      if (other.has(key))
        coll.set(key, value);
    }
    return coll;
  }
  /**
   * Returns a new collection containing the items where the key is present in either of the collections.
   *
   * @remarks
   *
   * If the collections have any items with the same key, the value from the first collection will be used.
   * @param other - The other Collection to filter against
   * @example
   * ```ts
   * const col1 = new Collection([['a', 1], ['b', 2]]);
   * const col2 = new Collection([['a', 1], ['b', 3], ['c', 3]]);
   * const union = col1.union(col2);
   * console.log(union);
   * // => Collection { 'a' => 1, 'b' => 2, 'c' => 3 }
   * ```
   */
  union(other) {
    const coll = new this.constructor[Symbol.species](this);
    for (const [key, value] of other) {
      if (!coll.has(key))
        coll.set(key, value);
    }
    return coll;
  }
  /**
   * Returns a new collection containing the items where the key is present in this collection but not the other.
   *
   * @param other - The other Collection to filter against
   * @example
   * ```ts
   * const col1 = new Collection([['a', 1], ['b', 2]]);
   * const col2 = new Collection([['a', 1], ['c', 3]]);
   * console.log(col1.difference(col2));
   * // => Collection { 'b' => 2 }
   * console.log(col2.difference(col1));
   * // => Collection { 'c' => 3 }
   * ```
   */
  difference(other) {
    const coll = new this.constructor[Symbol.species]();
    for (const [key, value] of this) {
      if (!other.has(key))
        coll.set(key, value);
    }
    return coll;
  }
  /**
   * Returns a new collection containing only the items where the keys are present in either collection, but not both.
   *
   * @param other - The other Collection to filter against
   * @example
   * ```ts
   * const col1 = new Collection([['a', 1], ['b', 2]]);
   * const col2 = new Collection([['a', 1], ['c', 3]]);
   * const symmetricDifference = col1.symmetricDifference(col2);
   * console.log(col1.symmetricDifference(col2));
   * // => Collection { 'b' => 2, 'c' => 3 }
   * ```
   */
  symmetricDifference(other) {
    const coll = new this.constructor[Symbol.species]();
    for (const [key, value] of this) {
      if (!other.has(key))
        coll.set(key, value);
    }
    for (const [key, value] of other) {
      if (!this.has(key))
        coll.set(key, value);
    }
    return coll;
  }
  /**
   * Merges two Collections together into a new Collection.
   *
   * @param other - The other Collection to merge with
   * @param whenInSelf - Function getting the result if the entry only exists in this Collection
   * @param whenInOther - Function getting the result if the entry only exists in the other Collection
   * @param whenInBoth - Function getting the result if the entry exists in both Collections
   * @example
   * ```ts
   * // Sums up the entries in two collections.
   * coll.merge(
   *  other,
   *  x => ({ keep: true, value: x }),
   *  y => ({ keep: true, value: y }),
   *  (x, y) => ({ keep: true, value: x + y }),
   * );
   * ```
   * @example
   * ```ts
   * // Intersects two collections in a left-biased manner.
   * coll.merge(
   *  other,
   *  x => ({ keep: false }),
   *  y => ({ keep: false }),
   *  (x, _) => ({ keep: true, value: x }),
   * );
   * ```
   */
  merge(other, whenInSelf, whenInOther, whenInBoth) {
    const coll = new this.constructor[Symbol.species]();
    const keys = /* @__PURE__ */ new Set([...this.keys(), ...other.keys()]);
    for (const key of keys) {
      const hasInSelf = this.has(key);
      const hasInOther = other.has(key);
      if (hasInSelf && hasInOther) {
        const result = whenInBoth(this.get(key), other.get(key), key);
        if (result.keep)
          coll.set(key, result.value);
      } else if (hasInSelf) {
        const result = whenInSelf(this.get(key), key);
        if (result.keep)
          coll.set(key, result.value);
      } else if (hasInOther) {
        const result = whenInOther(other.get(key), key);
        if (result.keep)
          coll.set(key, result.value);
      }
    }
    return coll;
  }
  /**
   * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed | Array.toReversed()}
   * but returns a Collection instead of an Array.
   */
  toReversed() {
    return new this.constructor[Symbol.species](this).reverse();
  }
  /**
   * The sorted method sorts the items of a collection and returns it.
   * The sort is not necessarily stable in Node 10 or older.
   * The default sort order is according to string Unicode code points.
   *
   * @param compareFunction - Specifies a function that defines the sort order.
   * If omitted, the collection is sorted according to each character's Unicode code point value,
   * according to the string conversion of each element.
   * @example
   * ```ts
   * collection.sorted((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
   * ```
   */
  toSorted(compareFunction = _Collection.defaultSort) {
    return new this.constructor[Symbol.species](this).sort((av, bv, ak, bk) => compareFunction(av, bv, ak, bk));
  }
  toJSON() {
    return [...this.entries()];
  }
  static defaultSort(firstValue, secondValue) {
    return Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1;
  }
  /**
   * Creates a Collection from a list of entries.
   *
   * @param entries - The list of entries
   * @param combine - Function to combine an existing entry with a new one
   * @example
   * ```ts
   * Collection.combineEntries([["a", 1], ["b", 2], ["a", 2]], (x, y) => x + y);
   * // returns Collection { "a" => 3, "b" => 2 }
   * ```
   */
  static combineEntries(entries, combine) {
    const coll = new _Collection();
    for (const [key, value] of entries) {
      if (coll.has(key)) {
        coll.set(key, combine(coll.get(key), value, key));
      } else {
        coll.set(key, value);
      }
    }
    return coll;
  }
};

// src/index.ts
var version = "2.0.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Collection,
  version
});
//# sourceMappingURL=index.js.map