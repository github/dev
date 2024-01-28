import { InspectOptionsStylized } from 'util';

declare class Result<T, E extends Error = Error> {
    readonly success: boolean;
    readonly value?: T;
    readonly error?: E;
    private constructor();
    isOk(): this is {
        success: true;
        value: T;
    };
    isErr(): this is {
        success: false;
        error: E;
    };
    unwrap(): T;
    static ok<T, E extends Error = Error>(value: T): Result<T, E>;
    static err<T, E extends Error = Error>(error: E): Result<T, E>;
}

type ArrayConstraintName = `s.array(T).${'unique' | `length${'LessThan' | 'LessThanOrEqual' | 'GreaterThan' | 'GreaterThanOrEqual' | 'Equal' | 'NotEqual' | 'Range' | 'RangeInclusive' | 'RangeExclusive'}`}`;
declare function arrayLengthLessThan<T>(value: number): IConstraint<T[]>;
declare function arrayLengthLessThanOrEqual<T>(value: number): IConstraint<T[]>;
declare function arrayLengthGreaterThan<T>(value: number): IConstraint<T[]>;
declare function arrayLengthGreaterThanOrEqual<T>(value: number): IConstraint<T[]>;
declare function arrayLengthEqual<T>(value: number): IConstraint<T[]>;
declare function arrayLengthNotEqual<T>(value: number): IConstraint<T[]>;
declare function arrayLengthRange<T>(start: number, endBefore: number): IConstraint<T[]>;
declare function arrayLengthRangeInclusive<T>(start: number, end: number): IConstraint<T[]>;
declare function arrayLengthRangeExclusive<T>(startAfter: number, endBefore: number): IConstraint<T[]>;

type BigIntConstraintName = `s.bigint.${'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'equal' | 'notEqual' | 'divisibleBy'}`;
declare function bigintLessThan(value: bigint): IConstraint<bigint>;
declare function bigintLessThanOrEqual(value: bigint): IConstraint<bigint>;
declare function bigintGreaterThan(value: bigint): IConstraint<bigint>;
declare function bigintGreaterThanOrEqual(value: bigint): IConstraint<bigint>;
declare function bigintEqual(value: bigint): IConstraint<bigint>;
declare function bigintNotEqual(value: bigint): IConstraint<bigint>;
declare function bigintDivisibleBy(divider: bigint): IConstraint<bigint>;

type BooleanConstraintName = `s.boolean.${boolean}`;
declare const booleanTrue: IConstraint<boolean, true>;
declare const booleanFalse: IConstraint<boolean, false>;

type DateConstraintName = `s.date.${'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'equal' | 'notEqual' | 'valid' | 'invalid'}`;
declare function dateLessThan(value: Date): IConstraint<Date>;
declare function dateLessThanOrEqual(value: Date): IConstraint<Date>;
declare function dateGreaterThan(value: Date): IConstraint<Date>;
declare function dateGreaterThanOrEqual(value: Date): IConstraint<Date>;
declare function dateEqual(value: Date): IConstraint<Date>;
declare function dateNotEqual(value: Date): IConstraint<Date>;
declare const dateInvalid: IConstraint<Date>;
declare const dateValid: IConstraint<Date>;

type NumberConstraintName = `s.number.${'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'equal' | 'equal(NaN)' | 'notEqual' | 'notEqual(NaN)' | 'int' | 'safeInt' | 'finite' | 'divisibleBy'}`;
declare function numberLessThan(value: number): IConstraint<number>;
declare function numberLessThanOrEqual(value: number): IConstraint<number>;
declare function numberGreaterThan(value: number): IConstraint<number>;
declare function numberGreaterThanOrEqual(value: number): IConstraint<number>;
declare function numberEqual(value: number): IConstraint<number>;
declare function numberNotEqual(value: number): IConstraint<number>;
declare const numberInt: IConstraint<number>;
declare const numberSafeInt: IConstraint<number>;
declare const numberFinite: IConstraint<number>;
declare const numberNaN: IConstraint<number>;
declare const numberNotNaN: IConstraint<number>;
declare function numberDivisibleBy(divider: number): IConstraint<number>;

declare const customInspectSymbol: unique symbol;
declare const customInspectSymbolStackLess: unique symbol;
declare abstract class BaseError extends Error {
    protected [customInspectSymbol](depth: number, options: InspectOptionsStylized): string;
    protected abstract [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class CombinedError extends BaseError {
    readonly errors: readonly BaseError[];
    constructor(errors: readonly BaseError[]);
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class ValidationError extends BaseError {
    readonly validator: string;
    readonly given: unknown;
    constructor(validator: string, message: string, given: unknown);
    toJSON(): {
        name: string;
        validator: string;
        given: unknown;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class ExpectedValidationError<T> extends ValidationError {
    readonly expected: T;
    constructor(validator: string, message: string, given: unknown, expected: T);
    toJSON(): {
        name: string;
        validator: string;
        given: unknown;
        expected: T;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class MissingPropertyError extends BaseError {
    readonly property: PropertyKey;
    constructor(property: PropertyKey);
    toJSON(): {
        name: string;
        property: PropertyKey;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class MultiplePossibilitiesConstraintError<T = unknown> extends BaseConstraintError<T> {
    readonly expected: readonly string[];
    constructor(constraint: ConstraintErrorNames, message: string, given: T, expected: readonly string[]);
    toJSON(): {
        name: string;
        constraint: ConstraintErrorNames;
        given: T;
        expected: readonly string[];
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class UnknownEnumValueError extends BaseError {
    readonly value: string | number;
    readonly enumKeys: string[];
    readonly enumMappings: Map<string | number, string | number>;
    constructor(value: string | number, keys: string[], enumMappings: Map<string | number, string | number>);
    toJSON(): {
        name: string;
        value: string | number;
        enumKeys: string[];
        enumMappings: [string | number, string | number][];
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class UnknownPropertyError extends BaseError {
    readonly property: PropertyKey;
    readonly value: unknown;
    constructor(property: PropertyKey, value: unknown);
    toJSON(): {
        name: string;
        property: PropertyKey;
        value: unknown;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class BigIntValidator<T extends bigint> extends BaseValidator<T> {
    lessThan(number: bigint): this;
    lessThanOrEqual(number: bigint): this;
    greaterThan(number: bigint): this;
    greaterThanOrEqual(number: bigint): this;
    equal<N extends bigint>(number: N): BigIntValidator<N>;
    notEqual(number: bigint): this;
    get positive(): this;
    get negative(): this;
    divisibleBy(number: bigint): this;
    get abs(): this;
    intN(bits: number): this;
    uintN(bits: number): this;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class BooleanValidator<T extends boolean = boolean> extends BaseValidator<T> {
    get true(): BooleanValidator<true>;
    get false(): BooleanValidator<false>;
    equal<R extends true | false>(value: R): BooleanValidator<R>;
    notEqual<R extends true | false>(value: R): BooleanValidator<R>;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class DateValidator extends BaseValidator<Date> {
    lessThan(date: Date | number | string): this;
    lessThanOrEqual(date: Date | number | string): this;
    greaterThan(date: Date | number | string): this;
    greaterThanOrEqual(date: Date | number | string): this;
    equal(date: Date | number | string): this;
    notEqual(date: Date | number | string): this;
    get valid(): this;
    get invalid(): this;
    protected handle(value: unknown): Result<Date, ValidationError>;
}

declare class DefaultValidator<T> extends BaseValidator<T> {
    private readonly validator;
    private defaultValue;
    constructor(validator: BaseValidator<T>, value: T | (() => T), constraints?: readonly IConstraint<T>[]);
    default(value: Exclude<T, undefined> | (() => Exclude<T, undefined>)): DefaultValidator<Exclude<T, undefined>>;
    protected handle(value: unknown): Result<T, ValidatorError>;
    protected clone(): this;
}

declare class InstanceValidator<T> extends BaseValidator<T> {
    readonly expected: Constructor<T>;
    constructor(expected: Constructor<T>, constraints?: readonly IConstraint<T>[]);
    protected handle(value: unknown): Result<T, ExpectedValidationError<Constructor<T>>>;
    protected clone(): this;
}

declare class LiteralValidator<T> extends BaseValidator<T> {
    readonly expected: T;
    constructor(literal: T, constraints?: readonly IConstraint<T>[]);
    protected handle(value: unknown): Result<T, ExpectedValidationError<T>>;
    protected clone(): this;
}

declare class CombinedPropertyError extends BaseError {
    readonly errors: [PropertyKey, BaseError][];
    constructor(errors: [PropertyKey, BaseError][]);
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
    private static formatProperty;
}

declare class MapValidator<K, V> extends BaseValidator<Map<K, V>> {
    private readonly keyValidator;
    private readonly valueValidator;
    constructor(keyValidator: BaseValidator<K>, valueValidator: BaseValidator<V>, constraints?: readonly IConstraint<Map<K, V>>[]);
    protected clone(): this;
    protected handle(value: unknown): Result<Map<K, V>, ValidationError | CombinedPropertyError>;
}

declare class NativeEnumValidator<T extends NativeEnumLike> extends BaseValidator<T[keyof T]> {
    readonly enumShape: T;
    readonly hasNumericElements: boolean;
    private readonly enumKeys;
    private readonly enumMapping;
    constructor(enumShape: T);
    protected handle(value: unknown): Result<T[keyof T], ValidationError | UnknownEnumValueError>;
    protected clone(): this;
}
interface NativeEnumLike {
    [key: string]: string | number;
    [key: number]: string;
}

declare class NeverValidator extends BaseValidator<never> {
    protected handle(value: unknown): Result<never, ValidationError>;
}

declare class NullishValidator extends BaseValidator<undefined | null> {
    protected handle(value: unknown): Result<undefined | null, ValidationError>;
}

declare class NumberValidator<T extends number> extends BaseValidator<T> {
    lessThan(number: number): this;
    lessThanOrEqual(number: number): this;
    greaterThan(number: number): this;
    greaterThanOrEqual(number: number): this;
    equal<N extends number>(number: N): NumberValidator<N>;
    notEqual(number: number): this;
    get int(): this;
    get safeInt(): this;
    get finite(): this;
    get positive(): this;
    get negative(): this;
    divisibleBy(divider: number): this;
    get abs(): this;
    get sign(): this;
    get trunc(): this;
    get floor(): this;
    get fround(): this;
    get round(): this;
    get ceil(): this;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class ObjectValidator<T extends object, I = UndefinedToOptional<T>> extends BaseValidator<I> {
    readonly shape: MappedObjectValidator<T>;
    readonly strategy: ObjectValidatorStrategy;
    private readonly keys;
    private readonly handleStrategy;
    private readonly requiredKeys;
    private readonly possiblyUndefinedKeys;
    private readonly possiblyUndefinedKeysWithDefaults;
    constructor(shape: MappedObjectValidator<T>, strategy?: ObjectValidatorStrategy, constraints?: readonly IConstraint<I>[]);
    get strict(): this;
    get ignore(): this;
    get passthrough(): this;
    get partial(): ObjectValidator<{
        [Key in keyof I]?: I[Key];
    }>;
    get required(): ObjectValidator<{
        [Key in keyof I]-?: I[Key];
    }>;
    extend<ET extends object>(schema: ObjectValidator<ET> | MappedObjectValidator<ET>): ObjectValidator<T & ET>;
    pick<K extends keyof I>(keys: readonly K[]): ObjectValidator<{
        [Key in keyof Pick<I, K>]: I[Key];
    }>;
    omit<K extends keyof I>(keys: readonly K[]): ObjectValidator<{
        [Key in keyof Omit<I, K>]: I[Key];
    }>;
    protected handle(value: unknown): Result<I, ValidationError | CombinedPropertyError>;
    protected clone(): this;
    private handleIgnoreStrategy;
    private handleStrictStrategy;
    private handlePassthroughStrategy;
}
declare enum ObjectValidatorStrategy {
    Ignore = 0,
    Strict = 1,
    Passthrough = 2
}

declare class PassthroughValidator<T extends any | unknown> extends BaseValidator<T> {
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class RecordValidator<T> extends BaseValidator<Record<string, T>> {
    private readonly validator;
    constructor(validator: BaseValidator<T>, constraints?: readonly IConstraint<Record<string, T>>[]);
    protected clone(): this;
    protected handle(value: unknown): Result<Record<string, T>, ValidationError | CombinedPropertyError>;
}

declare class SetValidator<T> extends BaseValidator<Set<T>> {
    private readonly validator;
    constructor(validator: BaseValidator<T>, constraints?: readonly IConstraint<Set<T>>[]);
    protected clone(): this;
    protected handle(values: unknown): Result<Set<T>, ValidationError | CombinedError>;
}

type StringConstraintName = `s.string.${`length${'LessThan' | 'LessThanOrEqual' | 'GreaterThan' | 'GreaterThanOrEqual' | 'Equal' | 'NotEqual'}` | 'regex' | 'url' | 'uuid' | 'email' | `ip${'v4' | 'v6' | ''}` | 'date' | 'phone'}`;
type StringProtocol = `${string}:`;
type StringDomain = `${string}.${string}`;
interface UrlOptions {
    allowedProtocols?: StringProtocol[];
    allowedDomains?: StringDomain[];
}
type UUIDVersion = 1 | 3 | 4 | 5;
interface StringUuidOptions {
    version?: UUIDVersion | `${UUIDVersion}-${UUIDVersion}` | null;
    nullable?: boolean;
}
declare function stringLengthLessThan(length: number): IConstraint<string>;
declare function stringLengthLessThanOrEqual(length: number): IConstraint<string>;
declare function stringLengthGreaterThan(length: number): IConstraint<string>;
declare function stringLengthGreaterThanOrEqual(length: number): IConstraint<string>;
declare function stringLengthEqual(length: number): IConstraint<string>;
declare function stringLengthNotEqual(length: number): IConstraint<string>;
declare function stringEmail(): IConstraint<string>;
declare function stringUrl(options?: UrlOptions): IConstraint<string>;
declare function stringIp(version?: 4 | 6): IConstraint<string>;
declare function stringRegex(regex: RegExp): IConstraint<string, string>;
declare function stringUuid({ version, nullable }?: StringUuidOptions): IConstraint<string, string>;

declare class StringValidator<T extends string> extends BaseValidator<T> {
    lengthLessThan(length: number): this;
    lengthLessThanOrEqual(length: number): this;
    lengthGreaterThan(length: number): this;
    lengthGreaterThanOrEqual(length: number): this;
    lengthEqual(length: number): this;
    lengthNotEqual(length: number): this;
    get email(): this;
    url(options?: UrlOptions): this;
    uuid(options?: StringUuidOptions): this;
    regex(regex: RegExp): this;
    get date(): this;
    get ipv4(): this;
    get ipv6(): this;
    ip(version?: 4 | 6): this;
    phone(): this;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class TupleValidator<T extends any[]> extends BaseValidator<[...T]> {
    private readonly validators;
    constructor(validators: BaseValidator<[...T]>[], constraints?: readonly IConstraint<[...T]>[]);
    protected clone(): this;
    protected handle(values: unknown): Result<[...T], ValidationError | CombinedPropertyError>;
}

type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
declare const TypedArrays: {
    readonly Int8Array: (x: unknown) => x is Int8Array;
    readonly Uint8Array: (x: unknown) => x is Uint8Array;
    readonly Uint8ClampedArray: (x: unknown) => x is Uint8ClampedArray;
    readonly Int16Array: (x: unknown) => x is Int16Array;
    readonly Uint16Array: (x: unknown) => x is Uint16Array;
    readonly Int32Array: (x: unknown) => x is Int32Array;
    readonly Uint32Array: (x: unknown) => x is Uint32Array;
    readonly Float32Array: (x: unknown) => x is Float32Array;
    readonly Float64Array: (x: unknown) => x is Float64Array;
    readonly BigInt64Array: (x: unknown) => x is BigInt64Array;
    readonly BigUint64Array: (x: unknown) => x is BigUint64Array;
    readonly TypedArray: (x: unknown) => x is TypedArray;
};
type TypedArrayName = keyof typeof TypedArrays;

declare class TypedArrayValidator<T extends TypedArray> extends BaseValidator<T> {
    private readonly type;
    constructor(type: TypedArrayName, constraints?: readonly IConstraint<T>[]);
    byteLengthLessThan(length: number): this;
    byteLengthLessThanOrEqual(length: number): this;
    byteLengthGreaterThan(length: number): this;
    byteLengthGreaterThanOrEqual(length: number): this;
    byteLengthEqual(length: number): this;
    byteLengthNotEqual(length: number): this;
    byteLengthRange(start: number, endBefore: number): this;
    byteLengthRangeInclusive(startAt: number, endAt: number): this;
    byteLengthRangeExclusive(startAfter: number, endBefore: number): this;
    lengthLessThan(length: number): this;
    lengthLessThanOrEqual(length: number): this;
    lengthGreaterThan(length: number): this;
    lengthGreaterThanOrEqual(length: number): this;
    lengthEqual(length: number): this;
    lengthNotEqual(length: number): this;
    lengthRange(start: number, endBefore: number): this;
    lengthRangeInclusive(startAt: number, endAt: number): this;
    lengthRangeExclusive(startAfter: number, endBefore: number): this;
    protected clone(): this;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class UnionValidator<T> extends BaseValidator<T> {
    private validators;
    constructor(validators: readonly BaseValidator<T>[], constraints?: readonly IConstraint<T>[]);
    get optional(): UnionValidator<T | undefined>;
    get required(): UnionValidator<Exclude<T, undefined>>;
    get nullable(): UnionValidator<T | null>;
    get nullish(): UnionValidator<T | null | undefined>;
    or<O>(...predicates: readonly BaseValidator<O>[]): UnionValidator<T | O>;
    protected clone(): this;
    protected handle(value: unknown): Result<T, ValidationError | CombinedError>;
}

type ObjectConstraintName = `s.object(T.when)`;
type WhenKey = PropertyKey | PropertyKey[];
interface WhenOptions<T extends BaseValidator<any>, Key extends WhenKey> {
    is?: boolean | ((value: Key extends Array<any> ? any[] : any) => boolean);
    then: (predicate: T) => T;
    otherwise?: (predicate: T) => T;
}

declare class ExpectedConstraintError<T = unknown> extends BaseConstraintError<T> {
    readonly expected: string;
    constructor(constraint: ConstraintErrorNames, message: string, given: T, expected: string);
    toJSON(): {
        name: string;
        constraint: ConstraintErrorNames;
        given: T;
        expected: string;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

type TypedArrayConstraintName = `s.typedArray(T).${'byteLength' | 'length'}${'LessThan' | 'LessThanOrEqual' | 'GreaterThan' | 'GreaterThanOrEqual' | 'Equal' | 'NotEqual' | 'Range' | 'RangeInclusive' | 'RangeExclusive'}`;
declare function typedArrayByteLengthLessThan<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthLessThanOrEqual<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthGreaterThan<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthGreaterThanOrEqual<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthEqual<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthNotEqual<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthRange<T extends TypedArray>(start: number, endBefore: number): IConstraint<T>;
declare function typedArrayByteLengthRangeInclusive<T extends TypedArray>(start: number, end: number): {
    run(input: T): Result<T, Error> | Result<unknown, ExpectedConstraintError<T>>;
};
declare function typedArrayByteLengthRangeExclusive<T extends TypedArray>(startAfter: number, endBefore: number): IConstraint<T>;
declare function typedArrayLengthLessThan<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthLessThanOrEqual<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthGreaterThan<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthGreaterThanOrEqual<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthEqual<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthNotEqual<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthRange<T extends TypedArray>(start: number, endBefore: number): IConstraint<T>;
declare function typedArrayLengthRangeInclusive<T extends TypedArray>(start: number, end: number): IConstraint<T>;
declare function typedArrayLengthRangeExclusive<T extends TypedArray>(startAfter: number, endBefore: number): IConstraint<T>;

type ConstraintErrorNames = TypedArrayConstraintName | ArrayConstraintName | BigIntConstraintName | BooleanConstraintName | DateConstraintName | NumberConstraintName | ObjectConstraintName | StringConstraintName;
declare abstract class BaseConstraintError<T = unknown> extends BaseError {
    readonly constraint: ConstraintErrorNames;
    readonly given: T;
    constructor(constraint: ConstraintErrorNames, message: string, given: T);
}

interface IConstraint<Input, Return extends Input = Input> {
    run(input: Input, parent?: any): Result<Return, BaseConstraintError<Input>>;
}

declare class ArrayValidator<T extends unknown[], I = T[number]> extends BaseValidator<T> {
    private readonly validator;
    constructor(validator: BaseValidator<I>, constraints?: readonly IConstraint<T>[]);
    lengthLessThan<N extends number>(length: N): ArrayValidator<ExpandSmallerTuples<UnshiftTuple<[...Tuple<I, N>]>>>;
    lengthLessThanOrEqual<N extends number>(length: N): ArrayValidator<ExpandSmallerTuples<[...Tuple<I, N>]>>;
    lengthGreaterThan<N extends number>(length: N): ArrayValidator<[...Tuple<I, N>, I, ...T]>;
    lengthGreaterThanOrEqual<N extends number>(length: N): ArrayValidator<[...Tuple<I, N>, ...T]>;
    lengthEqual<N extends number>(length: N): ArrayValidator<[...Tuple<I, N>]>;
    lengthNotEqual(length: number): ArrayValidator<[...T]>;
    lengthRange<S extends number, E extends number>(start: S, endBefore: E): ArrayValidator<Exclude<ExpandSmallerTuples<UnshiftTuple<[...Tuple<I, E>]>>, ExpandSmallerTuples<UnshiftTuple<[...Tuple<I, S>]>>>>;
    lengthRangeInclusive<S extends number, E extends number>(startAt: S, endAt: E): ArrayValidator<Exclude<ExpandSmallerTuples<[...Tuple<I, E>]>, ExpandSmallerTuples<UnshiftTuple<[...Tuple<I, S>]>>>>;
    lengthRangeExclusive<S extends number, E extends number>(startAfter: S, endBefore: E): ArrayValidator<Exclude<ExpandSmallerTuples<UnshiftTuple<[...Tuple<I, E>]>>, ExpandSmallerTuples<[...Tuple<T, S>]>>>;
    get unique(): this;
    protected clone(): this;
    protected handle(values: unknown): Result<T, ValidationError | CombinedPropertyError>;
}

declare abstract class BaseValidator<T> {
    description?: string;
    protected parent?: object;
    protected constraints: readonly IConstraint<T>[];
    protected isValidationEnabled: boolean | (() => boolean) | null;
    constructor(constraints?: readonly IConstraint<T>[]);
    setParent(parent: object): this;
    get optional(): UnionValidator<T | undefined>;
    get nullable(): UnionValidator<T | null>;
    get nullish(): UnionValidator<T | null | undefined>;
    get array(): ArrayValidator<T[]>;
    get set(): SetValidator<T>;
    or<O>(...predicates: readonly BaseValidator<O>[]): UnionValidator<T | O>;
    transform(cb: (value: T) => T): this;
    transform<O>(cb: (value: T) => O): BaseValidator<O>;
    reshape(cb: (input: T) => Result<T>): this;
    reshape<R extends Result<unknown>, O = InferResultType<R>>(cb: (input: T) => R): BaseValidator<O>;
    default(value: Exclude<T, undefined> | (() => Exclude<T, undefined>)): DefaultValidator<Exclude<T, undefined>>;
    when<Key extends WhenKey, This extends BaseValidator<any> = this>(key: Key, options: WhenOptions<This, Key>): this;
    describe(description: string): this;
    run(value: unknown): Result<T, BaseError>;
    parse<R extends T = T>(value: unknown): R;
    is<R extends T = T>(value: unknown): value is R;
    /**
     * Sets if the validator should also run constraints or just do basic checks.
     * @param isValidationEnabled Whether this validator should be enabled or disabled. You can pass boolean or a function returning boolean which will be called just before parsing.
     * Set to `null` to go off of the global configuration.
     */
    setValidationEnabled(isValidationEnabled: boolean | (() => boolean) | null): this;
    getValidationEnabled(): boolean | null;
    protected get shouldRunConstraints(): boolean;
    protected clone(): this;
    protected abstract handle(value: unknown): Result<T, ValidatorError>;
    protected addConstraint(constraint: IConstraint<T>): this;
}
type ValidatorError = ValidationError | CombinedError | CombinedPropertyError | UnknownEnumValueError;

type Constructor<T> = (new (...args: readonly any[]) => T) | (abstract new (...args: readonly any[]) => T);
type Type<V> = V extends BaseValidator<infer T> ? T : never;
/**
 * @deprecated Use `object` instead.
 */
type NonNullObject = {} & object;
/**
 * @deprecated This type is no longer used and will be removed in the next major version.
 */
type PickDefined<T> = {
    [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};
/**
 * @deprecated This type is no longer used and will be removed in the next major version.
 */
type PickUndefinedMakeOptional<T> = {
    [K in keyof T as undefined extends T[K] ? K : never]+?: Exclude<T[K], undefined>;
};
type FilterDefinedKeys<TObj extends object> = Exclude<{
    [TKey in keyof TObj]: undefined extends TObj[TKey] ? never : TKey;
}[keyof TObj], undefined>;
type UndefinedToOptional<T extends object> = Pick<T, FilterDefinedKeys<T>> & {
    [k in keyof Omit<T, FilterDefinedKeys<T>>]?: Exclude<T[k], undefined>;
};
type MappedObjectValidator<T> = {
    [key in keyof T]: BaseValidator<T[key]>;
};
/**
 * An alias of {@link ObjectValidator} with a name more common among object validation libraries.
 * This is the type of a schema after using `s.object({ ... })`
 * @example
 * ```typescript
 * import { s, SchemaOf } from '@sapphire/shapeshift';
 *
 * interface IIngredient {
 * 	ingredientId: string | undefined;
 * 	name: string | undefined;
 * }
 *
 * interface IInstruction {
 * 	instructionId: string | undefined;
 * 	message: string | undefined;
 * }
 *
 * interface IRecipe {
 * 	recipeId: string | undefined;
 * 	title: string;
 * 	description: string;
 * 	instructions: IInstruction[];
 * 	ingredients: IIngredient[];
 * }
 *
 * type InstructionSchemaType = SchemaOf<IInstruction>;
 * // Expected Type: ObjectValidator<IInstruction>
 *
 * type IngredientSchemaType = SchemaOf<IIngredient>;
 * // Expected Type: ObjectValidator<IIngredient>
 *
 * type RecipeSchemaType = SchemaOf<IRecipe>;
 * // Expected Type: ObjectValidator<IRecipe>
 *
 * const instructionSchema: InstructionSchemaType = s.object({
 * 	instructionId: s.string.optional,
 * 	message: s.string
 * });
 *
 * const ingredientSchema: IngredientSchemaType = s.object({
 * 	ingredientId: s.string.optional,
 * 	name: s.string
 * });
 *
 * const recipeSchema: RecipeSchemaType = s.object({
 * 	recipeId: s.string.optional,
 * 	title: s.string,
 * 	description: s.string,
 * 	instructions: s.array(instructionSchema),
 * 	ingredients: s.array(ingredientSchema)
 * });
 * ```
 */
type SchemaOf<T extends object> = ObjectValidator<T>;
/**
 * Infers the type of a schema object given `typeof schema`.
 * The schema has to extend {@link ObjectValidator}.
 * @example
 * ```typescript
 * import { InferType, s } from '@sapphire/shapeshift';
 *
 * const schema = s.object({
 * 	foo: s.string,
 * 	bar: s.number,
 * 	baz: s.boolean,
 * 	qux: s.bigint,
 * 	quux: s.date
 * });
 *
 * type Inferredtype = InferType<typeof schema>;
 * // Expected type:
 * // type Inferredtype = {
 * // 	foo: string;
 * // 	bar: number;
 * // 	baz: boolean;
 * // 	qux: bigint;
 * // 	quux: Date;
 * // };
 * ```
 */
type InferType<T extends ObjectValidator<any>> = T extends ObjectValidator<any, infer U> ? U : never;
type InferResultType<T extends Result<any>> = T extends Result<infer U> ? U : never;
type UnwrapTuple<T extends [...any[]]> = T extends [infer Head, ...infer Tail] ? [Unwrap<Head>, ...UnwrapTuple<Tail>] : [];
type Unwrap<T> = T extends BaseValidator<infer V> ? V : never;
type UnshiftTuple<T extends [...any[]]> = T extends [T[0], ...infer Tail] ? Tail : never;
type ExpandSmallerTuples<T extends [...any[]]> = T extends [T[0], ...infer Tail] ? T | ExpandSmallerTuples<Tail> : [];
type Shift<A extends Array<any>> = ((...args: A) => void) extends (...args: [A[0], ...infer R]) => void ? R : never;
type GrowExpRev<A extends Array<any>, N extends number, P extends Array<Array<any>>> = A['length'] extends N ? A : GrowExpRev<[...A, ...P[0]][N] extends undefined ? [...A, ...P[0]] : A, N, Shift<P>>;
type GrowExp<A extends Array<any>, N extends number, P extends Array<Array<any>>> = [...A, ...A][N] extends undefined ? GrowExp<[...A, ...A], N, [A, ...P]> : GrowExpRev<A, N, P>;
type Tuple<T, N extends number> = N extends number ? number extends N ? Array<T> : N extends 0 ? [] : N extends 1 ? [T] : GrowExp<[T], N, [[]]> : never;

declare class LazyValidator<T extends BaseValidator<unknown>, R = Unwrap<T>> extends BaseValidator<R> {
    private readonly validator;
    constructor(validator: (value: unknown) => T, constraints?: readonly IConstraint<R>[]);
    protected clone(): this;
    protected handle(values: unknown): Result<R, ValidatorError>;
}

declare class Shapes {
    get string(): StringValidator<string>;
    get number(): NumberValidator<number>;
    get bigint(): BigIntValidator<bigint>;
    get boolean(): BooleanValidator<boolean>;
    get date(): DateValidator;
    object<T extends object>(shape: MappedObjectValidator<T>): ObjectValidator<T, UndefinedToOptional<T>>;
    get undefined(): BaseValidator<undefined>;
    get null(): BaseValidator<null>;
    get nullish(): NullishValidator;
    get any(): PassthroughValidator<any>;
    get unknown(): PassthroughValidator<unknown>;
    get never(): NeverValidator;
    enum<T>(...values: readonly T[]): UnionValidator<T>;
    nativeEnum<T extends NativeEnumLike>(enumShape: T): NativeEnumValidator<T>;
    literal<T>(value: T): BaseValidator<T>;
    instance<T>(expected: Constructor<T>): InstanceValidator<T>;
    union<T extends [...BaseValidator<any>[]]>(...validators: [...T]): UnionValidator<Unwrap<T[number]>>;
    array<T>(validator: BaseValidator<T[][number]>): ArrayValidator<T[], T[][number]>;
    array<T extends unknown[]>(validator: BaseValidator<T[number]>): ArrayValidator<T, T[number]>;
    typedArray<T extends TypedArray>(type?: TypedArrayName): TypedArrayValidator<T>;
    get int8Array(): TypedArrayValidator<Int8Array>;
    get uint8Array(): TypedArrayValidator<Uint8Array>;
    get uint8ClampedArray(): TypedArrayValidator<Uint8ClampedArray>;
    get int16Array(): TypedArrayValidator<Int16Array>;
    get uint16Array(): TypedArrayValidator<Uint16Array>;
    get int32Array(): TypedArrayValidator<Int32Array>;
    get uint32Array(): TypedArrayValidator<Uint32Array>;
    get float32Array(): TypedArrayValidator<Float32Array>;
    get float64Array(): TypedArrayValidator<Float64Array>;
    get bigInt64Array(): TypedArrayValidator<BigInt64Array>;
    get bigUint64Array(): TypedArrayValidator<BigUint64Array>;
    tuple<T extends [...BaseValidator<any>[]]>(validators: [...T]): TupleValidator<UnwrapTuple<T>>;
    set<T>(validator: BaseValidator<T>): SetValidator<T>;
    record<T>(validator: BaseValidator<T>): RecordValidator<T>;
    map<T, U>(keyValidator: BaseValidator<T>, valueValidator: BaseValidator<U>): MapValidator<T, U>;
    lazy<T extends BaseValidator<unknown>>(validator: (value: unknown) => T): LazyValidator<T, Unwrap<T>>;
}

/**
 * Sets whether validators should run on the input, or if the input should be passed through.
 * @param enabled Whether validation should be done on inputs
 */
declare function setGlobalValidationEnabled(enabled: boolean): void;
/**
 * @returns Whether validation is enabled
 */
declare function getGlobalValidationEnabled(): boolean;

declare const s: Shapes;

export { type ArrayConstraintName, ArrayValidator, BaseConstraintError, BaseError, BaseValidator, type BigIntConstraintName, BigIntValidator, type BooleanConstraintName, BooleanValidator, CombinedError, CombinedPropertyError, type ConstraintErrorNames, type Constructor, type DateConstraintName, DateValidator, DefaultValidator, type ExpandSmallerTuples, ExpectedConstraintError, ExpectedValidationError, type GrowExp, type GrowExpRev, type IConstraint, type InferResultType, type InferType, InstanceValidator, LiteralValidator, MapValidator, type MappedObjectValidator, MissingPropertyError, MultiplePossibilitiesConstraintError, type NativeEnumLike, NativeEnumValidator, NeverValidator, type NonNullObject, NullishValidator, type NumberConstraintName, NumberValidator, ObjectValidator, ObjectValidatorStrategy, PassthroughValidator, type PickDefined, type PickUndefinedMakeOptional, RecordValidator, Result, type SchemaOf, SetValidator, Shapes, type Shift, type StringConstraintName, type StringDomain, type StringProtocol, type StringUuidOptions, StringValidator, type Tuple, TupleValidator, type Type, type TypedArrayConstraintName, TypedArrayValidator, type UUIDVersion, type UndefinedToOptional, UnionValidator, UnknownEnumValueError, UnknownPropertyError, type UnshiftTuple, type Unwrap, type UnwrapTuple, type UrlOptions, ValidationError, type ValidatorError, arrayLengthEqual, arrayLengthGreaterThan, arrayLengthGreaterThanOrEqual, arrayLengthLessThan, arrayLengthLessThanOrEqual, arrayLengthNotEqual, arrayLengthRange, arrayLengthRangeExclusive, arrayLengthRangeInclusive, bigintDivisibleBy, bigintEqual, bigintGreaterThan, bigintGreaterThanOrEqual, bigintLessThan, bigintLessThanOrEqual, bigintNotEqual, booleanFalse, booleanTrue, customInspectSymbol, customInspectSymbolStackLess, dateEqual, dateGreaterThan, dateGreaterThanOrEqual, dateInvalid, dateLessThan, dateLessThanOrEqual, dateNotEqual, dateValid, getGlobalValidationEnabled, numberDivisibleBy, numberEqual, numberFinite, numberGreaterThan, numberGreaterThanOrEqual, numberInt, numberLessThan, numberLessThanOrEqual, numberNaN, numberNotEqual, numberNotNaN, numberSafeInt, s, setGlobalValidationEnabled, stringEmail, stringIp, stringLengthEqual, stringLengthGreaterThan, stringLengthGreaterThanOrEqual, stringLengthLessThan, stringLengthLessThanOrEqual, stringLengthNotEqual, stringRegex, stringUrl, stringUuid, typedArrayByteLengthEqual, typedArrayByteLengthGreaterThan, typedArrayByteLengthGreaterThanOrEqual, typedArrayByteLengthLessThan, typedArrayByteLengthLessThanOrEqual, typedArrayByteLengthNotEqual, typedArrayByteLengthRange, typedArrayByteLengthRangeExclusive, typedArrayByteLengthRangeInclusive, typedArrayLengthEqual, typedArrayLengthGreaterThan, typedArrayLengthGreaterThanOrEqual, typedArrayLengthLessThan, typedArrayLengthLessThanOrEqual, typedArrayLengthNotEqual, typedArrayLengthRange, typedArrayLengthRangeExclusive, typedArrayLengthRangeInclusive };
