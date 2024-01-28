/**
 * @internal
 */
interface CollectionConstructor {
    new (): Collection<unknown, unknown>;
    new <Key, Value>(entries?: readonly (readonly [Key, Value])[] | null): Collection<Key, Value>;
    new <Key, Value>(iterable: Iterable<readonly [Key, Value]>): Collection<Key, Value>;
    readonly prototype: Collection<unknown, unknown>;
    readonly [Symbol.species]: CollectionConstructor;
}
/**
 * Represents an immutable version of a collection
 */
type ReadonlyCollection<Key, Value> = Omit<Collection<Key, Value>, 'delete' | 'ensure' | 'forEach' | 'get' | 'reverse' | 'set' | 'sort' | 'sweep'> & ReadonlyMap<Key, Value>;
/**
 * Separate interface for the constructor so that emitted js does not have a constructor that overwrites itself
 *
 * @internal
 */
interface Collection<Key, Value> extends Map<Key, Value> {
    constructor: CollectionConstructor;
}
/**
 * A Map with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has
 * an ID, for significantly improved performance and ease-of-use.
 *
 * @typeParam Key - The key type this collection holds
 * @typeParam Value - The value type this collection holds
 */
declare class Collection<Key, Value> extends Map<Key, Value> {
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
    ensure(key: Key, defaultValueGenerator: (key: Key, collection: this) => Value): Value;
    /**
     * Checks if all of the elements exist in the collection.
     *
     * @param keys - The keys of the elements to check for
     * @returns `true` if all of the elements exist, `false` if at least one does not exist.
     */
    hasAll(...keys: Key[]): boolean;
    /**
     * Checks if any of the elements exist in the collection.
     *
     * @param keys - The keys of the elements to check for
     * @returns `true` if any of the elements exist, `false` if none exist.
     */
    hasAny(...keys: Key[]): boolean;
    /**
     * Obtains the first value(s) in this collection.
     *
     * @param amount - Amount of values to obtain from the beginning
     * @returns A single value if no amount is provided or an array of values, starting from the end if amount is negative
     */
    first(): Value | undefined;
    first(amount: number): Value[];
    /**
     * Obtains the first key(s) in this collection.
     *
     * @param amount - Amount of keys to obtain from the beginning
     * @returns A single key if no amount is provided or an array of keys, starting from the end if
     * amount is negative
     */
    firstKey(): Key | undefined;
    firstKey(amount: number): Key[];
    /**
     * Obtains the last value(s) in this collection.
     *
     * @param amount - Amount of values to obtain from the end
     * @returns A single value if no amount is provided or an array of values, starting from the start if
     * amount is negative
     */
    last(): Value | undefined;
    last(amount: number): Value[];
    /**
     * Obtains the last key(s) in this collection.
     *
     * @param amount - Amount of keys to obtain from the end
     * @returns A single key if no amount is provided or an array of keys, starting from the start if
     * amount is negative
     */
    lastKey(): Key | undefined;
    lastKey(amount: number): Key[];
    /**
     * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at | Array.at()}.
     * Returns the item at a given index, allowing for positive and negative integers.
     * Negative integers count back from the last item in the collection.
     *
     * @param index - The index of the element to obtain
     */
    at(index: number): Value | undefined;
    /**
     * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at | Array.at()}.
     * Returns the key at a given index, allowing for positive and negative integers.
     * Negative integers count back from the last item in the collection.
     *
     * @param index - The index of the key to obtain
     */
    keyAt(index: number): Key | undefined;
    /**
     * Obtains unique random value(s) from this collection.
     *
     * @param amount - Amount of values to obtain randomly
     * @returns A single value if no amount is provided or an array of values
     */
    random(): Value | undefined;
    random(amount: number): Value[];
    /**
     * Obtains unique random key(s) from this collection.
     *
     * @param amount - Amount of keys to obtain randomly
     * @returns A single key if no amount is provided or an array
     */
    randomKey(): Key | undefined;
    randomKey(amount: number): Key[];
    /**
     * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse | Array.reverse()}
     * but returns a Collection instead of an Array.
     */
    reverse(): this;
    /**
     * Searches for a single item where the given function returns a truthy value. This behaves like
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find | Array.find()}.
     * All collections used in Discord.js are mapped using their `id` property, and if you want to find by id you
     * should use the `get` method. See
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get | MDN} for details.
     *
     * @param fn - The function to test with (should return a boolean)
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection.find(user => user.username === 'Bob');
     * ```
     */
    find<NewValue extends Value>(fn: (value: Value, key: Key, collection: this) => value is NewValue): NewValue | undefined;
    find(fn: (value: Value, key: Key, collection: this) => unknown): Value | undefined;
    find<This, NewValue extends Value>(fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This): NewValue | undefined;
    find<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): Value | undefined;
    /**
     * Searches for the key of a single item where the given function returns a truthy value. This behaves like
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex | Array.findIndex()},
     * but returns the key rather than the positional index.
     *
     * @param fn - The function to test with (should return a boolean)
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection.findKey(user => user.username === 'Bob');
     * ```
     */
    findKey<NewKey extends Key>(fn: (value: Value, key: Key, collection: this) => key is NewKey): NewKey | undefined;
    findKey(fn: (value: Value, key: Key, collection: this) => unknown): Key | undefined;
    findKey<This, NewKey extends Key>(fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This): NewKey | undefined;
    findKey<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): Key | undefined;
    /**
     * Searches for a last item where the given function returns a truthy value. This behaves like
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast | Array.findLast()}.
     *
     * @param fn - The function to test with (should return a boolean)
     * @param thisArg - Value to use as `this` when executing the function
     */
    findLast<NewValue extends Value>(fn: (value: Value, key: Key, collection: this) => value is NewValue): NewValue | undefined;
    findLast(fn: (value: Value, key: Key, collection: this) => unknown): Value | undefined;
    findLast<This, NewValue extends Value>(fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This): NewValue | undefined;
    findLast<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): Value | undefined;
    /**
     * Searches for the key of a last item where the given function returns a truthy value. This behaves like
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex | Array.findLastIndex()},
     * but returns the key rather than the positional index.
     *
     * @param fn - The function to test with (should return a boolean)
     * @param thisArg - Value to use as `this` when executing the function
     */
    findLastKey<NewKey extends Key>(fn: (value: Value, key: Key, collection: this) => key is NewKey): NewKey | undefined;
    findLastKey(fn: (value: Value, key: Key, collection: this) => unknown): Key | undefined;
    findLastKey<This, NewKey extends Key>(fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This): NewKey | undefined;
    findLastKey<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): Key | undefined;
    /**
     * Removes items that satisfy the provided filter function.
     *
     * @param fn - Function used to test (should return a boolean)
     * @param thisArg - Value to use as `this` when executing the function
     * @returns The number of removed entries
     */
    sweep(fn: (value: Value, key: Key, collection: this) => unknown): number;
    sweep<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): number;
    /**
     * Identical to
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter | Array.filter()},
     * but returns a Collection instead of an Array.
     *
     * @param fn - The function to test with (should return a boolean)
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection.filter(user => user.username === 'Bob');
     * ```
     */
    filter<NewKey extends Key>(fn: (value: Value, key: Key, collection: this) => key is NewKey): Collection<NewKey, Value>;
    filter<NewValue extends Value>(fn: (value: Value, key: Key, collection: this) => value is NewValue): Collection<Key, NewValue>;
    filter(fn: (value: Value, key: Key, collection: this) => unknown): Collection<Key, Value>;
    filter<This, NewKey extends Key>(fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This): Collection<NewKey, Value>;
    filter<This, NewValue extends Value>(fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This): Collection<Key, NewValue>;
    filter<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): Collection<Key, Value>;
    /**
     * Partitions the collection into two collections where the first collection
     * contains the items that passed and the second contains the items that failed.
     *
     * @param fn - Function used to test (should return a boolean)
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * const [big, small] = collection.partition(guild => guild.memberCount > 250);
     * ```
     */
    partition<NewKey extends Key>(fn: (value: Value, key: Key, collection: this) => key is NewKey): [Collection<NewKey, Value>, Collection<Exclude<Key, NewKey>, Value>];
    partition<NewValue extends Value>(fn: (value: Value, key: Key, collection: this) => value is NewValue): [Collection<Key, NewValue>, Collection<Key, Exclude<Value, NewValue>>];
    partition(fn: (value: Value, key: Key, collection: this) => unknown): [Collection<Key, Value>, Collection<Key, Value>];
    partition<This, NewKey extends Key>(fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This): [Collection<NewKey, Value>, Collection<Exclude<Key, NewKey>, Value>];
    partition<This, NewValue extends Value>(fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This): [Collection<Key, NewValue>, Collection<Key, Exclude<Value, NewValue>>];
    partition<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): [Collection<Key, Value>, Collection<Key, Value>];
    /**
     * Maps each item into a Collection, then joins the results into a single Collection. Identical in behavior to
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap | Array.flatMap()}.
     *
     * @param fn - Function that produces a new Collection
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection.flatMap(guild => guild.members.cache);
     * ```
     */
    flatMap<NewValue>(fn: (value: Value, key: Key, collection: this) => Collection<Key, NewValue>): Collection<Key, NewValue>;
    flatMap<NewValue, This>(fn: (this: This, value: Value, key: Key, collection: this) => Collection<Key, NewValue>, thisArg: This): Collection<Key, NewValue>;
    /**
     * Maps each item to another value into an array. Identical in behavior to
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map | Array.map()}.
     *
     * @param fn - Function that produces an element of the new array, taking three arguments
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection.map(user => user.tag);
     * ```
     */
    map<NewValue>(fn: (value: Value, key: Key, collection: this) => NewValue): NewValue[];
    map<This, NewValue>(fn: (this: This, value: Value, key: Key, collection: this) => NewValue, thisArg: This): NewValue[];
    /**
     * Maps each item to another value into a collection. Identical in behavior to
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map | Array.map()}.
     *
     * @param fn - Function that produces an element of the new collection, taking three arguments
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection.mapValues(user => user.tag);
     * ```
     */
    mapValues<NewValue>(fn: (value: Value, key: Key, collection: this) => NewValue): Collection<Key, NewValue>;
    mapValues<This, NewValue>(fn: (this: This, value: Value, key: Key, collection: this) => NewValue, thisArg: This): Collection<Key, NewValue>;
    /**
     * Checks if there exists an item that passes a test. Identical in behavior to
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some | Array.some()}.
     *
     * @param fn - Function used to test (should return a boolean)
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection.some(user => user.discriminator === '0000');
     * ```
     */
    some(fn: (value: Value, key: Key, collection: this) => unknown): boolean;
    some<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): boolean;
    /**
     * Checks if all items passes a test. Identical in behavior to
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every | Array.every()}.
     *
     * @param fn - Function used to test (should return a boolean)
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection.every(user => !user.bot);
     * ```
     */
    every<NewKey extends Key>(fn: (value: Value, key: Key, collection: this) => key is NewKey): this is Collection<NewKey, Value>;
    every<NewValue extends Value>(fn: (value: Value, key: Key, collection: this) => value is NewValue): this is Collection<Key, NewValue>;
    every(fn: (value: Value, key: Key, collection: this) => unknown): boolean;
    every<This, NewKey extends Key>(fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This): this is Collection<NewKey, Value>;
    every<This, NewValue extends Value>(fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This): this is Collection<Key, NewValue>;
    every<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): boolean;
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
    reduce<InitialValue = Value>(fn: (accumulator: InitialValue, value: Value, key: Key, collection: this) => InitialValue, initialValue?: InitialValue): InitialValue;
    /**
     * Applies a function to produce a single value. Identical in behavior to
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight | Array.reduceRight()}.
     *
     * @param fn - Function used to reduce, taking four arguments; `accumulator`, `value`, `key`, and `collection`
     * @param initialValue - Starting value for the accumulator
     */
    reduceRight<InitialValue>(fn: (accumulator: InitialValue, value: Value, key: Key, collection: this) => InitialValue, initialValue?: InitialValue): InitialValue;
    /**
     * Identical to
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach | Map.forEach()},
     * but returns the collection instead of undefined.
     *
     * @param fn - Function to execute for each element
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection
     *  .each(user => console.log(user.username))
     *  .filter(user => user.bot)
     *  .each(user => console.log(user.username));
     * ```
     */
    each(fn: (value: Value, key: Key, collection: this) => void): this;
    each<This>(fn: (this: This, value: Value, key: Key, collection: this) => void, thisArg: This): this;
    /**
     * Runs a function on the collection and returns the collection.
     *
     * @param fn - Function to execute
     * @param thisArg - Value to use as `this` when executing the function
     * @example
     * ```ts
     * collection
     *  .tap(coll => console.log(coll.size))
     *  .filter(user => user.bot)
     *  .tap(coll => console.log(coll.size))
     * ```
     */
    tap(fn: (collection: this) => void): this;
    tap<This>(fn: (this: This, collection: this) => void, thisArg: This): this;
    /**
     * Creates an identical shallow copy of this collection.
     *
     * @example
     * ```ts
     * const newColl = someColl.clone();
     * ```
     */
    clone(): Collection<Key, Value>;
    /**
     * Combines this collection with others into a new collection. None of the source collections are modified.
     *
     * @param collections - Collections to merge
     * @example
     * ```ts
     * const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
     * ```
     */
    concat(...collections: ReadonlyCollection<Key, Value>[]): Collection<Key, Value>;
    /**
     * Checks if this collection shares identical items with another.
     * This is different to checking for equality using equal-signs, because
     * the collections may be different objects, but contain the same data.
     *
     * @param collection - Collection to compare with
     * @returns Whether the collections have identical contents
     */
    equals(collection: ReadonlyCollection<Key, Value>): boolean;
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
    sort(compareFunction?: Comparator<Key, Value>): this;
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
    intersection(other: ReadonlyCollection<Key, any>): Collection<Key, Value>;
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
    union<OtherValue>(other: ReadonlyCollection<Key, OtherValue>): Collection<Key, OtherValue | Value>;
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
    difference(other: ReadonlyCollection<Key, any>): Collection<Key, Value>;
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
    symmetricDifference<OtherValue>(other: ReadonlyCollection<Key, OtherValue>): Collection<Key, OtherValue | Value>;
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
    merge<OtherValue, ResultValue>(other: ReadonlyCollection<Key, OtherValue>, whenInSelf: (value: Value, key: Key) => Keep<ResultValue>, whenInOther: (valueOther: OtherValue, key: Key) => Keep<ResultValue>, whenInBoth: (value: Value, valueOther: OtherValue, key: Key) => Keep<ResultValue>): Collection<Key, ResultValue>;
    /**
     * Identical to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed | Array.toReversed()}
     * but returns a Collection instead of an Array.
     */
    toReversed(): Collection<Key, Value>;
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
    toSorted(compareFunction?: Comparator<Key, Value>): Collection<Key, Value>;
    toJSON(): [Key, Value][];
    private static defaultSort;
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
    static combineEntries<Key, Value>(entries: Iterable<[Key, Value]>, combine: (firstValue: Value, secondValue: Value, key: Key) => Value): Collection<Key, Value>;
}
/**
 * @internal
 */
type Keep<Value> = {
    keep: false;
} | {
    keep: true;
    value: Value;
};
/**
 * @internal
 */
type Comparator<Key, Value> = (firstValue: Value, secondValue: Value, firstKey: Key, secondKey: Key) => number;

/**
 * The {@link https://github.com/discordjs/discord.js/blob/main/packages/collection/#readme | @discordjs/collection} version
 * that you are currently using.
 */
declare const version: string;

export { Collection, CollectionConstructor, Comparator, Keep, ReadonlyCollection, version };
