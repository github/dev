var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/lib/Snowflake.ts
var IncrementSymbol = Symbol("@sapphire/snowflake.increment");
var EpochSymbol = Symbol("@sapphire/snowflake.epoch");
var ProcessIdSymbol = Symbol("@sapphire/snowflake.processId");
var WorkerIdSymbol = Symbol("@sapphire/snowflake.workerId");
var MaximumWorkerId = 0b11111n;
var MaximumProcessId = 0b11111n;
var MaximumIncrement = 0b111111111111n;
var _a, _b, _c, _d;
var Snowflake = class {
  /**
   * @param epoch the epoch to use
   */
  constructor(epoch) {
    /**
     * Alias for {@link deconstruct}
     */
    // eslint-disable-next-line @typescript-eslint/unbound-method
    __publicField(this, "decode", this.deconstruct);
    /**
     * Internal reference of the epoch passed in the constructor
     * @internal
     */
    __publicField(this, _a);
    /**
     * Internal incrementor for generating snowflakes
     * @internal
     */
    __publicField(this, _b, 0n);
    /**
     * The process ID that will be used by default in the generate method
     * @internal
     */
    __publicField(this, _c, 1n);
    /**
     * The worker ID that will be used by default in the generate method
     * @internal
     */
    __publicField(this, _d, 0n);
    this[EpochSymbol] = BigInt(epoch instanceof Date ? epoch.getTime() : epoch);
  }
  /**
   * The epoch for this snowflake
   */
  get epoch() {
    return this[EpochSymbol];
  }
  /**
   * Gets the configured process ID
   */
  get processId() {
    return this[ProcessIdSymbol];
  }
  /**
   * Sets the process ID that will be used by default for the {@link generate} method
   * @param value The new value, will be coerced to BigInt and masked with `0b11111n`
   */
  set processId(value) {
    this[ProcessIdSymbol] = BigInt(value) & MaximumProcessId;
  }
  /**
   * Gets the configured worker ID
   */
  get workerId() {
    return this[WorkerIdSymbol];
  }
  /**
   * Sets the worker ID that will be used by default for the {@link generate} method
   * @param value The new value, will be coerced to BigInt and masked with `0b11111n`
   */
  set workerId(value) {
    this[WorkerIdSymbol] = BigInt(value) & MaximumWorkerId;
  }
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
  generate({
    increment,
    timestamp = Date.now(),
    workerId = this[WorkerIdSymbol],
    processId = this[ProcessIdSymbol]
  } = {}) {
    if (timestamp instanceof Date)
      timestamp = BigInt(timestamp.getTime());
    else if (typeof timestamp === "number")
      timestamp = BigInt(timestamp);
    else if (typeof timestamp !== "bigint") {
      throw new TypeError(`"timestamp" argument must be a number, bigint, or Date (received ${typeof timestamp})`);
    }
    if (typeof increment !== "bigint") {
      increment = this[IncrementSymbol];
      this[IncrementSymbol] = increment + 1n & MaximumIncrement;
    }
    return timestamp - this[EpochSymbol] << 22n | (workerId & MaximumWorkerId) << 17n | (processId & MaximumProcessId) << 12n | increment & MaximumIncrement;
  }
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
  deconstruct(id) {
    const bigIntId = BigInt(id);
    const epoch = this[EpochSymbol];
    return {
      id: bigIntId,
      timestamp: (bigIntId >> 22n) + epoch,
      workerId: bigIntId >> 17n & MaximumWorkerId,
      processId: bigIntId >> 12n & MaximumProcessId,
      increment: bigIntId & MaximumIncrement,
      epoch
    };
  }
  /**
   * Retrieves the timestamp field's value from a snowflake.
   * @param id The snowflake to get the timestamp value from.
   * @returns The UNIX timestamp that is stored in `id`.
   */
  timestampFrom(id) {
    return Number((BigInt(id) >> 22n) + this[EpochSymbol]);
  }
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
  static compare(a, b) {
    const typeA = typeof a;
    return typeA === typeof b ? typeA === "string" ? cmpString(a, b) : cmpBigInt(a, b) : cmpBigInt(BigInt(a), BigInt(b));
  }
};
__name(Snowflake, "Snowflake");
_a = EpochSymbol, _b = IncrementSymbol, _c = ProcessIdSymbol, _d = WorkerIdSymbol;
function cmpBigInt(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}
__name(cmpBigInt, "cmpBigInt");
function cmpString(a, b) {
  return a === b ? 0 : a.length < b.length ? -1 : a.length > b.length ? 1 : a < b ? -1 : 1;
}
__name(cmpString, "cmpString");

// src/lib/DiscordSnowflake.ts
var DiscordSnowflake = new Snowflake(1420070400000n);

// src/lib/TwitterSnowflake.ts
var TwitterSnowflake = new Snowflake(1288834974657n);

export { DiscordSnowflake, MaximumIncrement, MaximumProcessId, MaximumWorkerId, Snowflake, TwitterSnowflake };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map