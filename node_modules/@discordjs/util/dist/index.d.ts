/**
 * Represents a type that may or may not be a promise
 */
type Awaitable<Value> = PromiseLike<Value> | Value;

/**
 * Lazy is a wrapper around a value that is computed lazily. It is useful for
 * cases where the value is expensive to compute and the computation may not
 * be needed at all.
 *
 * @param cb - The callback to lazily evaluate
 * @typeParam Value - The type of the value
 * @example
 * ```ts
 * const value = lazy(() => computeExpensiveValue());
 * ```
 */
declare function lazy<Value>(cb: () => Value): () => Value;

/**
 * Options for creating a range
 */
interface RangeOptions {
    /**
     * The end of the range (exclusive)
     */
    end: number;
    /**
     * The start of the range (inclusive)
     */
    start: number;
    /**
     * The amount to increment by
     *
     * @defaultValue `1`
     */
    step?: number;
}
/**
 * A generator to yield numbers in a given range
 *
 * @remarks
 * This method is end-exclusive, for example the last number yielded by `range(5)` is 4. If you
 * prefer for the end to be included add 1 to the range or `end` option.
 * @param range - A number representing the the range to yield (exclusive) or an object with start, end and step
 * @example
 * Basic range
 * ```ts
 * for (const number of range(5)) {
 *  console.log(number);
 * }
 * // Prints 0, 1, 2, 3, 4
 * ```
 * @example
 * Range with a step
 * ```ts
 * for (const number of range({ start: 3, end: 10, step: 2 })) {
 * 	console.log(number);
 * }
 * // Prints 3, 5, 7, 9
 * ```
 */
declare function range(range: RangeOptions | number): Generator<number, void, unknown>;

/**
 * Calculates the shard id for a given guild id.
 *
 * @param guildId - The guild id to calculate the shard id for
 * @param shardCount - The total number of shards
 */
declare function calculateShardId(guildId: string, shardCount: number): number;

declare function shouldUseGlobalFetchAndWebSocket(): boolean;

/**
 * Resolves the user agent appendix string for the current environment.
 */
declare function getUserAgentAppendix(): string;

/**
 * Represents an object capable of representing itself as a JSON object
 *
 * @typeParam Value - The JSON type corresponding to {@link JSONEncodable.toJSON} outputs.
 */
interface JSONEncodable<Value> {
    /**
     * Transforms this object to its JSON format
     */
    toJSON(): Value;
}
/**
 * Indicates if an object is encodable or not.
 *
 * @param maybeEncodable - The object to check against
 */
declare function isJSONEncodable(maybeEncodable: unknown): maybeEncodable is JSONEncodable<unknown>;

/**
 * Represents a structure that can be checked against another
 * given structure for equality
 *
 * @typeParam Value - The type of object to compare the current object to
 */
interface Equatable<Value> {
    /**
     * Whether or not this is equal to another structure
     */
    equals(other: Value): boolean;
}
/**
 * Indicates if an object is equatable or not.
 *
 * @param maybeEquatable - The object to check against
 */
declare function isEquatable(maybeEquatable: unknown): maybeEquatable is Equatable<unknown>;

export { Awaitable, Equatable, JSONEncodable, RangeOptions, calculateShardId, getUserAgentAppendix, isEquatable, isJSONEncodable, lazy, range, shouldUseGlobalFetchAndWebSocket };
