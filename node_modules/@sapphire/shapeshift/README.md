<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

# @sapphire/shapeshift

**Shapeshift**

Blazing fast input validation and transformation ⚡

[![GitHub](https://img.shields.io/github/license/sapphiredev/shapeshift)](https://github.com/sapphiredev/shapeshift/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/shapeshift/branch/main/graph/badge.svg?token=RF4mMKx6lL)](https://codecov.io/gh/sapphiredev/shapeshift)
[![npm](https://img.shields.io/npm/v/@sapphire/shapeshift?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/shapeshift)

</div>

## Table of Contents

- [@sapphire/shapeshift](#sapphireshapeshift)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Usage](#usage)
    - [Basic usage](#basic-usage)
    - [Defining validations](#defining-validations)
      - [Primitives](#primitives)
      - [Literals](#literals)
      - [Strings](#strings)
      - [Numbers](#numbers)
      - [BigInts](#bigints)
      - [Booleans](#booleans)
      - [Arrays](#arrays)
      - [Tuples](#tuples)
      - [Unions](#unions)
      - [Enums](#enums)
      - [Maps](#maps)
      - [Sets](#sets)
      - [Instances](#instances)
      - [Records](#records)
      - [Functions // TODO](#functions--todo)
      - [TypedArray](#typedarray)
    - [Defining schemas (objects)](#defining-schemas-objects)
      - [Utility types for TypeScript](#utility-types-for-typescript)
        - [Extracting an interface from a schema](#extracting-an-interface-from-a-schema)
        - [Defining the structure of a schema through an interface](#defining-the-structure-of-a-schema-through-an-interface)
      - [`.extend`:](#extend)
      - [`.pick` / `.omit`:](#pick--omit)
      - [`.partial`](#partial)
      - [`.required`](#required)
    - [Handling unrecognized keys](#handling-unrecognized-keys)
      - [`.strict`](#strict)
      - [`.ignore`](#ignore)
      - [`.passthrough`](#passthrough)
    - [BaseValidator: methods and properties](#basevalidator-methods-and-properties)
      - [`.run`](#rundata-unknown-resultt-error-given-a-validation-you-can-call-this-method-to-check-whether-or-not-the)
      - [`.parse`](#parsedata-unknown-t-given-a-validations-you-can-call-this-method-to-check-whether-or-not-the-input-is-valid)
      - [`.transform`](#transformrvalue-t--r-nopvalidatorr-adds-a-constraint-that-modifies-the-input)
      - [`.reshape`](#reshapervalue-t--resultr-error--iconstraint-nopvalidatorr-adds-a-constraint-able-to-both-validate)
      - [`.default`](#defaultvalue-t----t-transform-undefined-into-the-given-value-or-the-callbacks-returned-value)
      - [`.optional`](#optional-a-convenience-method-that-returns-a-union-of-the-type-with-sundefined)
      - [`.nullable`](#nullable-a-convenience-method-that-returns-a-union-of-the-type-with-snullable)
      - [`.nullish`](#nullish-a-convenience-method-that-returns-a-union-of-the-type-with-snullish)
      - [`.array`](#array-a-convenience-method-that-returns-an-arrayvalidator-with-the-type)
      - [`.or`](#or-a-convenience-method-that-returns-an-unionvalidator-with-the-type-this-method-is-also-overridden-in)
      - [`.when`](#when-adjust-the-schema-based-on-a-sibling-or-sinbling-children-fields)
        - [Available options for providing `is`](#available-options-for-providing-is)
        - [Resolving of the `key` (first) parameter](#resolving-of-the-key-first-parameter)
        - [Examples](#examples)
    - [Enabling and disabling validation](#enabling-and-disabling-validation)
  - [Buy us some doughnuts](#buy-us-some-doughnuts)
  - [Contributors](#contributors)

## Description

[Back to top][toc]

A very fast and lightweight input validation and transformation library for JavaScript.

> **Note**: Shapeshift requires Node.js v14.0.0 or higher to work.

## Features

[Back to top][toc]

- TypeScript friendly
- Offers CJS, ESM and UMD builds
- API similar to [`zod`]
- Faster than ⚡

## Usage

[Back to top][toc]

**_For complete usages, please dive into our [documentation]_**

### Basic usage

[Back to top][toc]

Creating a simple string validation

```typescript
import { s } from '@sapphire/shapeshift';

const myStringValidation = s.string;

// Parse
myStringValidation.parse('sapphire'); // => returns 'sapphire'
myStringValidation.parse(12); // throws ValidationError
```

Creating an object schema

```typescript
import { s } from '@sapphire/shapeshift';

const user = s.object({
  username: s.string
});

user.parse({ username: 'Sapphire' });
```

### Defining validations

[Back to top][toc]

#### Primitives

[Back to top][toc]

```typescript
import { s } from '@sapphire/shapeshift';

// Primitives
s.string;
s.number;
s.bigint;
s.boolean;
s.date;

// Empty Types
s.undefined;
s.null;
s.nullish; // Accepts undefined | null

// Catch-all Types
s.any;
s.unknown;

// Never Type
s.never;
```

#### Literals

[Back to top][toc]

```typescript
s.literal('sapphire');
s.literal(12);
s.literal(420n);
s.literal(true);
s.literal(new Date(1639278160000)); // s.date.equal(1639278160000);
```

#### Strings

[Back to top][toc]

Shapeshift includes a handful of string-specific validations:

```typescript
s.string.lengthLessThan(5);
s.string.lengthLessThanOrEqual(5);
s.string.lengthGreaterThan(5);
s.string.lengthGreaterThanOrEqual(5);
s.string.lengthEqual(5);
s.string.lengthNotEqual(5);
s.string.email;
s.string.url();
s.string.uuid();
s.string.regex(regex);
s.string.ip();
s.string.ipv4;
s.string.ipv6;
s.string.phone();
```

#### Numbers

[Back to top][toc]

Shapeshift includes a handful of number-specific validations:

```typescript
s.number.greaterThan(5); // > 5
s.number.greaterThanOrEqual(5); // >= 5
s.number.lessThan(5); // < 5
s.number.lessThanOrEqual(5); // <= 5
s.number.equal(5); // === 5
s.number.notEqual(5); // !== 5

s.number.equal(NaN); // special case: Number.isNaN
s.number.notEqual(NaN); // special case: !Number.isNaN

s.number.int; // value must be an integer
s.number.safeInt; // value must be a safe integer
s.number.finite; // value must be finite

s.number.positive; // .greaterThanOrEqual(0)
s.number.negative; // .lessThan(0)

s.number.divisibleBy(5); // Divisible by 5
```

And transformations:

```typescript
s.number.abs; // Transforms the number to an absolute number
s.number.sign; // Gets the number's sign

s.number.trunc; // Transforms the number to the result of `Math.trunc`
s.number.floor; // Transforms the number to the result of `Math.floor`
s.number.fround; // Transforms the number to the result of `Math.fround`
s.number.round; // Transforms the number to the result of `Math.round`
s.number.ceil; // Transforms the number to the result of `Math.ceil`
```

#### BigInts

[Back to top][toc]

Shapeshift includes a handful of number-specific validations:

```typescript
s.bigint.greaterThan(5n); // > 5n
s.bigint.greaterThanOrEqual(5n); // >= 5n
s.bigint.lessThan(5n); // < 5n
s.bigint.lessThanOrEqual(5n); // <= 5n
s.bigint.equal(5n); // === 5n
s.bigint.notEqual(5n); // !== 5n

s.bigint.positive; // .greaterThanOrEqual(0n)
s.bigint.negative; // .lessThan(0n)

s.bigint.divisibleBy(5n); // Divisible by 5n
```

And transformations:

```typescript
s.bigint.abs; // Transforms the bigint to an absolute bigint

s.bigint.intN(5); // Clamps to a bigint to a signed bigint with 5 digits, see BigInt.asIntN
s.bigint.uintN(5); // Clamps to a bigint to an unsigned bigint with 5 digits, see BigInt.asUintN
```

#### Booleans

[Back to top][toc]

Shapeshift includes a few boolean-specific validations:

```typescript
s.boolean.true; // value must be true
s.boolean.false; // value must be false

s.boolean.equal(true); // s.boolean.true
s.boolean.equal(false); // s.boolean.false

s.boolean.notEqual(true); // s.boolean.false
s.boolean.notEqual(false); // s.boolean.true
```

#### Arrays

[Back to top][toc]

```typescript
const stringArray = s.array(s.string);
const stringArray = s.string.array;
```

Shapeshift includes a handful of array-specific validations:

```typescript
s.string.array.lengthLessThan(5); // Must have less than 5 elements
s.string.array.lengthLessThanOrEqual(5); // Must have 5 or less elements
s.string.array.lengthGreaterThan(5); // Must have more than 5 elements
s.string.array.lengthGreaterThanOrEqual(5); // Must have 5 or more elements
s.string.array.lengthEqual(5); // Must have exactly 5 elements
s.string.array.lengthNotEqual(5); // Must not have exactly 5 elements
s.string.array.lengthRange(0, 4); // Must have at least 0 elements and less than 4 elements (in math, that is [0, 4))
s.string.array.lengthRangeInclusive(0, 4); // Must have at least 0 elements and at most 4 elements (in math, that is [0, 4])
s.string.array.lengthRangeExclusive(0, 4); // Must have more than 0 element and less than 4 elements (in math, that is (0, 4))
s.string.array.unique; // All elements must be unique. Deep equality is used to check for uniqueness.
```

> **Note**: All `.length` methods define tuple types with the given amount of elements. For example,
> `s.string.array.lengthGreaterThanOrEqual(2)`'s inferred type is `[string, string, ...string[]]`

#### Tuples

[Back to top][toc]

Unlike arrays, tuples have a fixed number of elements and each element can have a different type:

```typescript
const dish = s.tuple([
  s.string, // Dish's name
  s.number.int, // Table's number
  s.date // Date the dish was ready for delivery
]);

dish.parse(['Iberian ham', 10, new Date()]);
```

#### Unions

[Back to top][toc]

Shapeshift includes a built-in method for composing OR types:

```typescript
const stringOrNumber = s.union(s.string, s.number);

stringOrNumber.parse('Sapphire'); // => 'Sapphire'
stringOrNumber.parse(42); // => 42
stringOrNumber.parse({}); // => throws CombinedError
```

#### Enums

[Back to top][toc]

Enums are a convenience method that aliases `s.union(s.literal(a), s.literal(b), ...)`:

```typescript
s.enum('Red', 'Green', 'Blue');
// s.union(s.literal('Red'), s.literal('Green'), s.literal('Blue'));
```

#### Maps

[Back to top][toc]

```typescript
const map = s.map(s.string, s.number);
// Map<string, number>
```

#### Sets

[Back to top][toc]

```typescript
const set = s.set(s.number);
// Set<number>
```

#### Instances

[Back to top][toc]

You can use `s.instance(Class)` to check that the input is an instance of a class. This is useful to validate inputs
against classes:

```typescript
class User {
  public constructor(public name: string) {}
}

const userInstanceValidation = s.instance(User);
userInstanceValidation.parse(new User('Sapphire')); // => User { name: 'Sapphire' }
userInstanceValidation.parse('oops'); // => throws ValidatorError
```

#### Records

[Back to top][toc]

Record validations are similar to objects, but validate `Record<string, T>` types. Keep in mind this does not check for
the keys, and cannot support validation for specific ones:

```typescript
const tags = s.record(s.string);

tags.parse({ foo: 'bar', hello: 'world' }); // => { foo: 'bar', hello: 'world' }
tags.parse({ foo: 42 }); // => throws CombinedError
tags.parse('Hello'); // => throws ValidateError
```

---

_**Function validation is not yet implemented and will be made available starting v2.1.0**_

#### Functions // TODO

[Back to top][toc]

You can define function validations. This checks for whether or not an input is a function:

```typescript
s.function; // () => unknown
```

You can define arguments by passing an array as the first argument, as well as the return type as the second:

```typescript
s.function([s.string]); // (arg0: string) => unknown
s.function([s.string, s.number], s.string); // (arg0: string, arg1: number) => string
```

> **Note**: Shapeshift will transform the given function into one with validation on arguments and output. You can
> access the `.raw` property of the function to get the unchecked function.

---

#### TypedArray

[Back to top][toc]

```ts
const typedArray = s.typedArray();
const int16Array = s.int16Array;
const uint16Array = s.uint16Array;
const uint8ClampedArray = s.uint8ClampedArray;
const int16Array = s.int16Array;
const uint16Array = s.uint16Array;
const int32Array = s.int32Array;
const uint32Array = s.uint32Array;
const float32Array = s.float32Array;
const float64Array = s.float64Array;
const bigInt64Array = s.bigInt64Array;
const bigUint64Array = s.bigUint64Array;
```

Shapeshift includes a handful of validations specific to typed arrays.

```typescript
s.typedArray().lengthLessThan(5); // Length must be less than 5
s.typedArray().lengthLessThanOrEqual(5); // Length must be 5 or less
s.typedArray().lengthGreaterThan(5); // Length must be more than 5
s.typedArray().lengthGreaterThanOrEqual(5); // Length must be 5 or more
s.typedArray().lengthEqual(5); // Length must be exactly 5
s.typedArray().lengthNotEqual(5); // Length must not be 5
s.typedArray().lengthRange(0, 4); // Length L must satisfy 0 <= L < 4
s.typedArray().lengthRangeInclusive(0, 4); // Length L must satisfy 0 <= L <= 4
s.typedArray().lengthRangeExclusive(0, 4); // Length L must satisfy 0 < L < 4
```

Note that all of these methods have analogous methods for working with the typed array's byte length,
`s.typedArray().byteLengthX()` - for instance, `s.typedArray().byteLengthLessThan(5)` is the same as
`s.typedArray().lengthLessThan(5)` but for the array's byte length.

---

### Defining schemas (objects)

[Back to top][toc]

```typescript
// Properties are required by default:
const animal = s.object({
  name: s.string,
  age: s.number
});
```

#### Utility types for TypeScript

[Back to top][toc]

For object validation Shapeshift exports 2 utility types that can be used to extract interfaces from schemas and define
the structure of a schema as an interface beforehand respectively.

##### Extracting an interface from a schema

[Back to top][toc]

You can use the `InferType` type to extract the interface from a schema, for example:

```typescript
import { InferType, s } from '@sapphire/shapeshift';

const schema = s.object({
  foo: s.string,
  bar: s.number,
  baz: s.boolean,
  qux: s.bigint,
  quux: s.date
});

type Inferredtype = InferType<typeof schema>;

// Expected type:
type Inferredtype = {
  foo: string;
  bar: number;
  baz: boolean;
  qux: bigint;
  quux: Date;
};
```

##### Defining the structure of a schema through an interface

[Back to top][toc]

You can use the `SchemaOf` type to define the structure of a schema before defining the actual schema, for example:

```typescript
import { s, SchemaOf } from '@sapphire/shapeshift';

interface IIngredient {
  ingredientId: string | undefined;
  name: string | undefined;
}

interface IInstruction {
  instructionId: string | undefined;
  message: string | undefined;
}

interface IRecipe {
  recipeId: string | undefined;
  title: string;
  description: string;
  instructions: IInstruction[];
  ingredients: IIngredient[];
}

type InstructionSchemaType = SchemaOf<IInstruction>;
// Expected Type: ObjectValidator<IInstruction>

type IngredientSchemaType = SchemaOf<IIngredient>;
// Expected Type: ObjectValidator<IIngredient>

type RecipeSchemaType = SchemaOf<IRecipe>;
// Expected Type: ObjectValidator<IRecipe>

const instructionSchema: InstructionSchemaType = s.object({
  instructionId: s.string.optional,
  message: s.string
});

const ingredientSchema: IngredientSchemaType = s.object({
  ingredientId: s.string.optional,
  name: s.string
});

const recipeSchema: RecipeSchemaType = s.object({
  recipeId: s.string.optional,
  title: s.string,
  description: s.string,
  instructions: s.array(instructionSchema),
  ingredients: s.array(ingredientSchema)
});
```

#### `.extend`:

[Back to top][toc]

You can add additional fields using either an object or an ObjectValidator, in this case, you will get a new object
validator with the merged properties:

```typescript
const animal = s.object({
  name: s.string.optional,
  age: s.number
});

const pet = animal.extend({
  owner: s.string.nullish
});

const pet = animal.extend(
  s.object({
    owner: s.string.nullish
  })
);
```

> If both schemas share keys, an error will be thrown. Please use `.omit` on the first object if you desire this
> behaviour.

#### `.pick` / `.omit`:

[Back to top][toc]

Inspired by TypeScript's built-in `Pick` and `Omit` utility types, all object schemas have the aforementioned methods
that return a modifier version:

```typescript
const pkg = s.object({
  name: s.string,
  description: s.string,
  dependencies: s.string.array
});

const justTheName = pkg.pick(['name']);
// s.object({ name: s.string });

const noDependencies = pkg.omit(['dependencies']);
// s.object({ name: s.string, description: s.string });
```

#### `.partial`

[Back to top][toc]

Inspired by TypeScript's built-in `Partial` utility type, all object schemas have the aforementioned method that makes
all properties optional:

```typescript
const user = s.object({
  username: s.string,
  password: s.string
}).partial;
```

Which is the same as doing:

```typescript
const user = s.object({
  username: s.string.optional,
  password: s.string.optional
});
```

---

#### `.required`

[Back to top][toc]

Inspired by TypeScript's built-in `Required` utility type, all object schemas have the aforementioned method that makes
all properties required:

```typescript
const user = s.object({
  username: s.string.optional,
  password: s.string.optional
}).required;
```

Which is the same as doing:

```typescript
const user = s.object({
  username: s.string,
  password: s.string
});
```

---

### Handling unrecognized keys

[Back to top][toc]

By default, Shapeshift will not include keys that are not defined by the schema during parsing:

```typescript
const person = s.object({
  framework: s.string
});

person.parse({
  framework: 'Sapphire',
  awesome: true
});
// => { name: 'Sapphire' }
```

#### `.strict`

[Back to top][toc]

You can disallow unknown keys with `.strict`. If the input includes any unknown keys, an error will be thrown.

```typescript
const person = s.object({
  framework: s.string
}).strict;

person.parse({
  framework: 'Sapphire',
  awesome: true
});
// => throws ValidationError
```

#### `.ignore`

[Back to top][toc]

You can use the `.ignore` getter to reset an object schema to the default behaviour (ignoring unrecognized keys).

#### `.passthrough`

[Back to top][toc]

You can use the `.passthrough` getter to make the validator add the unrecognized properties the shape does not have,
from the input.

---

### BaseValidator: methods and properties

[Back to top][toc]

All validations in Shapeshift contain certain methods.

- #### `.run(data: unknown): Result<T, Error>`: given a validation, you can call this method to check whether or not the

  input is valid. If it is, a `Result` with `success: true` and a deep-cloned value will be returned with the given
  constraints and transformations. Otherwise, a `Result` with `success: false` and an error is returned.

- #### `.parse(data: unknown): T`: given a validations, you can call this method to check whether or not the input is valid.

  If it is, a deep-cloned value will be returned with the given constraints and transformations. Otherwise, an error is
  thrown.

- #### `.transform<R>((value: T) => R): NopValidator<R>`: adds a constraint that modifies the input:

```typescript
import { s } from '@sapphire/shapeshift';

const getLength = s.string.transform((value) => value.length);
getLength.parse('Hello There'); // => 11
```

> :warning: `.transform`'s functions **must not throw**. If a validation error is desired to be thrown, `.reshape`
> instead.

- #### `.reshape<R>((value: T) => Result<R, Error> | IConstraint): NopValidator<R>`: adds a constraint able to both validate
  and modify the input:

```typescript
import { s, Result } from '@sapphire/shapeshift';

const getLength = s.string.reshape((value) => Result.ok(value.length));
getLength.parse('Hello There'); // => 11
```

> :warning: `.reshape`'s functions **must not throw**. If a validation error is desired to be thrown, use
> `Result.err(error)` instead.

- #### `.default(value: T | (() => T))`: transform `undefined` into the given value or the callback's returned value:

```typescript
const name = s.string.default('Sapphire');
name.parse('Hello'); // => 'Hello'
name.parse(undefined); // => 'Sapphire'
```

```typescript
const number = s.number.default(Math.random);
number.parse(12); // => 12
number.parse(undefined); // => 0.989911985608602
number.parse(undefined); // => 0.3224350185068794
```

> :warning: The default values are not validated.

- #### `.optional`: a convenience method that returns a union of the type with `s.undefined`.

```typescript
s.string.optional; // s.union(s.string, s.undefined)
```

- #### `.nullable`: a convenience method that returns a union of the type with `s.nullable`.

```typescript
s.string.nullable; // s.union(s.string, s.nullable)
```

- #### `.nullish`: a convenience method that returns a union of the type with `s.nullish`.

```typescript
s.string.nullish; // s.union(s.string, s.nullish)
```

- #### `.array`: a convenience method that returns an ArrayValidator with the type.

```typescript
s.string.array; // s.array(s.string)
```

- #### `.or`: a convenience method that returns an UnionValidator with the type. This method is also overridden in
  UnionValidator to just append one more entry.

```typescript
s.string.or(s.number);
// => s.union(s.string, s.number)

s.object({ name: s.string }).or(s.string, s.number);
// => s.union(s.object({ name: s.string }), s.string, s.number)
```

- #### `.when`: Adjust the schema based on a sibling or sinbling children fields.

For using when you provide an object literal where the key `is` is undefined, a value, or a matcher function; `then`
provides the schema when `is` resolves truthy, and `otherwise` provides the schema when `is` resolves falsey.

##### Available options for providing `is`

When `is` is not provided (`=== undefined`) it is strictly resolved as `Boolean(value)` wherein `value` is the current
value of the referenced sibling. Note that if multiple siblings are referenced then all the values of the array need to
resolve truthy for the `is` to resolve truthy.

When `is` is a primitive literal it is strictly compared (`===`) to the current value.

If you want to use a different form of equality you can provide a function like: `is: (value) => value === true`.

##### Resolving of the `key` (first) parameter

For resolving the `key` parameter to its respective value we use [lodash/get](https://lodash.com/docs#get). This means
that every way that Lodash supports resolving a key to its respective value is also supported by Shapeshift. This
includes:

- Simply providing a string or number like `'name'` or `1`.
- Providing a string or number with a dot notation like `'name.first'` (representative of a nested object structure of
  `{ 'name': { 'first': 'Sapphire' } }` => resolves to `Sapphire`).
- Providing a string or number with a bracket notation like `'name[0]'` (representative of an array structure of
  `{ 'name': ['Sapphire', 'Framework'] }` => resolves to `Sapphire`).
- Providing a string or number with a dot and bracket notation like `'name[1].first'` (representative of a nested object
  structure of `{ 'name': [{ 'first': 'Sapphire' }, { 'first': 'Framework' }] }` => resolves to `Framework`).

##### Examples

Let's start with a basic example:

```typescript
const whenPredicate = s.object({
  booleanLike: s.boolean,
  numberLike: s.number.when('booleanLike', {
    then: (schema) => schema.greaterThanOrEqual(5),
    otherwise: (schema) => schema.lessThanOrEqual(5)
  })
});

whenPredicate.parse({ booleanLike: true, numberLike: 6 });
// => { booleanLike: true, numberLike: 6 }

whenPredicate.parse({ booleanLike: true, numberLike: 4 });
// => ExpectedConstraintError('s.number.greaterThanOrEqual', 'Invalid number value', 4, 'expected >= 5')

whenPredicate.parse({ booleanLike: false, numberLike: 4 });
// => { booleanLike: false, numberLike: 4 }
```

The provided key can also be an array of sibling children:

```typescript
const whenPredicate = s.object({
  booleanLike: s.boolean,
  stringLike: s.string,
  numberLike: s.number.when(['booleanLike', 'stringLike'], {
	is: ([booleanLikeValue, stringLikeValue]) => booleanLikeValue === true && stringLikeValue === 'foobar',
    then: (schema) => schema.greaterThanOrEqual(5),
    otherwise: (schema) => schema.lessThanOrEqual(5)
  })
});

whenPredicate.parse({ booleanLike: true, stringLike: 'foobar', numberLike: 6 });
// => { booleanLike: true, numberLike: 6 }

whenPredicate.parse({ booleanLike: true, stringLike: 'barfoo', numberLike: 4 });
// => ExpectedConstraintError('s.number.greaterThanOrEqual', 'Invalid number value', 4, 'expected >= 5')

whenPredicate.parse({ booleanLike: false, stringLike: 'foobar' numberLike: 4 });
// => ExpectedConstraintError('s.number.greaterThanOrEqual', 'Invalid number value', 4, 'expected >= 5')
```

### Enabling and disabling validation

[Back to top][toc]

At times, you might want to have a consistent code base with validation, but would like to keep validation to the strict
necessities instead of the in-depth constraints available in shapeshift. By calling `setGlobalValidationEnabled` you can
disable validation at a global level, and by calling `setValidationEnabled` you can disable validation on a
per-validator level.

> When setting the validation enabled status per-validator, you can also set it to `null` to use the global setting.

```typescript
import { setGlobalValidationEnabled } from '@sapphire/shapeshift';

setGlobalValidationEnabled(false);
```

```typescript
import { s } from '@sapphire/shapeshift';

const predicate = s.string.lengthGreaterThan(5).setValidationEnabled(false);
```

## Buy us some doughnuts

[Back to top][toc]

Sapphire Community is and always will be open source, even if we don't get donations. That being said, we know there are
amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, Paypal, Patreon and GitHub Sponsorships. You can use the buttons
below to donate through your method of choice.

|   Donate With   |                       Address                       |
| :-------------: | :-------------------------------------------------: |
| Open Collective | [Click Here](https://sapphirejs.dev/opencollective) |
|      Ko-fi      |      [Click Here](https://sapphirejs.dev/kofi)      |
|     Patreon     |    [Click Here](https://sapphirejs.dev/patreon)     |
|     PayPal      |     [Click Here](https://sapphirejs.dev/paypal)     |

## Contributors

[Back to top][toc]

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to Sapphire!

<a href="https://github.com/sapphiredev/shapeshift/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sapphiredev/shapeshift" />
</a>

[contributing]: https://github.com/sapphiredev/.github/blob/main/.github/CONTRIBUTING.md
[`zod`]: https://github.com/colinhacks/zod
[documentation]: https://www.sapphirejs.dev/docs/Documentation/api-shapeshift/
[toc]: #table-of-contents
