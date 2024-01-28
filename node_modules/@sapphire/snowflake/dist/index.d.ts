declare const IncrementSymbol: unique symbol;
declare const EpochSymbol: unique symbol;
declare const ProcessIdSymbol: unique symbol;
declare const WorkerIdSymbol: unique symbol;
/**
 * The maximum value the `workerId` field accepts in snowflakes.
 */
declare const MaximumWorkerId = 31n;
/**
 * The maximum value the `processId` field accepts in snowflakes.
 */
declare const MaximumProcessId = 31n;
/**
 * The maximum value the `increment` field accepts in snowflakes.
 */
declare const MaximumIncrement = 4095n;
/**
 * A class for generating and deconstructing Twitter snowflakes.
 *
 * A {@link https://developer.twitter.com/en/docs/twitter-ids Twitter snowflake}
 * is a 64-bit unsigned integer with 4 fields that have a fixed epoch value.
 *
 * If we have a snowflake `266241948824764416` we can represent it as binary:
 * ```
 * 64                                          22     17     12          0
 *  000000111011000111100001101001000101000000  00001  00000  000000000000
 *           number of ms since epoch           worker  pid    increment
 * ```
 */
declare class Snowflake {
    /**
     * Alias for {@link deconstruct}
     */
    decode: (id: string | bigint) => DeconstructedSnowflake;
    /**
     * Internal reference of the epoch passed in the constructor
     * @internal
     */
    private readonly [EpochSymbol];
    /**
     * Internal incrementor for generating snowflakes
     * @internal
     */
    private [IncrementSymbol];
    /**
     * The process ID that will be used by default in the generate method
     * @internal
     */
    private [ProcessIdSymbol];
    /**
     * The worker ID that will be used by default in the generate method
     * @internal
     */
    private [WorkerIdSymbol];
    /**
     * @param epoch the epoch to use
     */
    constructor(epoch: number | bigint | Date);
    /**
     * The epoch for this snowflake
     */
    get epoch(): bigint;
    /**
     * Gets the configured process ID
     */
    get processId(): bigint;
    /**
     * Sets the process ID that will be used by default for the {@link generate} method
     * @param value The new value, will be coerced to BigInt and masked with `0b11111n`
     */
    set processId(value: number | bigint);
    /**
     * Gets the configured worker ID
     */
    get workerId(): bigint;
    /**
     * Sets the worker ID that will be used by default for the {@link generate} method
     * @param value The new value, will be coerced to BigInt and masked with `0b11111n`
     */
    set workerId(value: number | bigint);
    /**
     * Generates a snowflake given an epoch and optionally a timestamp
     * @param options options to pass into the generator, see {@link SnowflakeGenerateOptions}
     *
     * **note** when `increment` is not provided it defaults to the private `increment` of the instance
     * @example
     * ```typescript
     * const epoch = new Date('2000-01-01T00:00:00.000Z');
     * const snowflake = new Snowflake(epoch).generate();
     * ```
     * @returns A unique snowflake
     */
    generate({ increment, timestamp, workerId, processId }?: SnowflakeGenerateOptions): bigint;
    /**
     * Deconstructs a snowflake given a snowflake ID
     * @param id the snowflake to deconstruct
     * @returns a deconstructed snowflake
     * @example
     * ```typescript
     * const epoch = new Date('2000-01-01T00:00:00.000Z');
     * const snowflake = new Snowflake(epoch).deconstruct('3971046231244935168');
     * ```
     */
    deconstruct(id: string | bigint): DeconstructedSnowflake;
    /**
     * Retrieves the timestamp field's value from a snowflake.
     * @param id The snowflake to get the timestamp value from.
     * @returns The UNIX timestamp that is stored in `id`.
     */
    timestampFrom(id: string | bigint): number;
    /**
     * Returns a number indicating whether a reference snowflake comes before, or after, or is same as the given
     * snowflake in sort order.
     * @param a The first snowflake to compare.
     * @param b The second snowflake to compare.
     * @returns `-1` if `a` is older than `b`, `0` if `a` and `b` are equals, `1` if `a` is newer than `b`.
     * @example Sort snowflakes in ascending order
     * ```typescript
     * const ids = ['737141877803057244', '1056191128120082432', '254360814063058944'];
     * console.log(ids.sort((a, b) => Snowflake.compare(a, b)));
     * // → ['254360814063058944', '737141877803057244', '1056191128120082432'];
     * ```
     * @example Sort snowflakes in descending order
     * ```typescript
     * const ids = ['737141877803057244', '1056191128120082432', '254360814063058944'];
     * console.log(ids.sort((a, b) => -Snowflake.compare(a, b)));
     * // → ['1056191128120082432', '737141877803057244', '254360814063058944'];
     * ```
     */
    static compare(a: string | bigint, b: string | bigint): -1 | 0 | 1;
}
/**
 * Options for Snowflake#generate
 */
interface SnowflakeGenerateOptions {
    /**
     * Timestamp or date of the snowflake to generate
     * @default Date.now()
     */
    timestamp?: number | bigint | Date;
    /**
     * The increment to use
     * @default 0n
     * @remark keep in mind that this bigint is auto-incremented between generate calls
     */
    increment?: bigint;
    /**
     * The worker ID to use, will be truncated to 5 bits (0-31)
     * @default 0n
     */
    workerId?: bigint;
    /**
     * The process ID to use, will be truncated to 5 bits (0-31)
     * @default 1n
     */
    processId?: bigint;
}
/**
 * Object returned by Snowflake#deconstruct
 */
interface DeconstructedSnowflake {
    /**
     * The id in BigInt form
     */
    id: bigint;
    /**
     * The timestamp stored in the snowflake
     */
    timestamp: bigint;
    /**
     * The worker id stored in the snowflake
     */
    workerId: bigint;
    /**
     * The process id stored in the snowflake
     */
    processId: bigint;
    /**
     * The increment stored in the snowflake
     */
    increment: bigint;
    /**
     * The epoch to use in the snowflake
     */
    epoch: bigint;
}

/**
 * A class for parsing snowflake ids using Discord's snowflake epoch
 *
 * Which is 2015-01-01 at 00:00:00.000 UTC+0, {@linkplain https://discord.com/developers/docs/reference#snowflakes}
 */
declare const DiscordSnowflake: Snowflake;

/**
 * A class for parsing snowflake ids using Twitter's snowflake epoch
 *
 * Which is 2010-11-04 at 01:42:54.657 UTC+0, found in the archived snowflake repository {@linkplain https://github.com/twitter-archive/snowflake/blob/b3f6a3c6ca8e1b6847baa6ff42bf72201e2c2231/src/main/scala/com/twitter/service/snowflake/IdWorker.scala#L25}
 */
declare const TwitterSnowflake: Snowflake;

export { DeconstructedSnowflake, DiscordSnowflake, MaximumIncrement, MaximumProcessId, MaximumWorkerId, Snowflake, SnowflakeGenerateOptions, TwitterSnowflake };
