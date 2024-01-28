# ts-mixer
[version-badge]: https://badgen.net/npm/v/ts-mixer
[version-link]: https://npmjs.com/package/ts-mixer
[build-link]: https://github.com/tannerntannern/ts-mixer/actions
[ts-versions]: https://badgen.net/badge/icon/4.2,4.4,4.6,4.8?icon=typescript&label&list=|
[node-versions]: https://badgen.net/badge/node/12%2C14%2C16%2C18/blue/?list=|
[![npm version][version-badge]][version-link]
[![TS Versions][ts-versions]][build-link]
[![Node.js Versions][node-versions]][build-link]
[![Minified Size](https://badgen.net/bundlephobia/min/ts-mixer)](https://bundlephobia.com/result?p=ts-mixer)
[![Conventional Commits](https://badgen.net/badge/conventional%20commits/1.0.0/yellow)](https://conventionalcommits.org)

## Overview
`ts-mixer` brings mixins to TypeScript.  "Mixins" to `ts-mixer` are just classes, so you already know how to write them, and you can probably mix classes from your favorite library without trouble.

The mixin problem is more nuanced than it appears.  I've seen countless code snippets that work for certain situations, but fail in others.  `ts-mixer` tries to take the best from all these solutions while accounting for the situations you might not have considered.

[Quick start guide](#quick-start)

### Features
* mixes plain classes
* mixes classes that extend other classes
* mixes classes that were mixed with `ts-mixer`
* supports static properties
* supports protected/private properties (the popular function-that-returns-a-class solution does not)
* mixes abstract classes (requires TypeScript >= 4.2)
* mixes generic classes (with caveats [[1](#caveats)])
* supports class, method, and property decorators (with caveats [[2, 5](#caveats)])
* mostly supports the complexity presented by constructor functions (with caveats [[3](#caveats)])
* comes with an `instanceof`-like replacement (with caveats [[4, 5](#caveats)])
* [multiple mixing strategies](#settings) (ES6 proxies vs hard copy)

### Caveats
1. Mixing generic classes requires a more cumbersome notation, but it's still possible.  See [mixing generic classes](#mixing-generic-classes) below.
2. Using decorators in mixed classes also requires a more cumbersome notation.  See [mixing with decorators](#mixing-with-decorators) below.
3. ES6 made it impossible to use `.apply(...)` on class constructors (or any means of calling them without `new`), which makes it impossible for `ts-mixer` to pass the proper `this` to your constructors.  This may or may not be an issue for your code, but there are options to work around it.  See [dealing with constructors](#dealing-with-constructors) below.
4. `ts-mixer` does not support `instanceof` for mixins, but it does offer a replacement.  See the [hasMixin function](#hasmixin) for more details.
5. Certain features (specifically, `@decorator` and `hasMixin`) make use of ES6 `Map`s, which means you must either use ES6+ or polyfill `Map` to use them.  If you don't need these features, you should be fine without.

## Quick Start
### Installation
```
$ npm install ts-mixer
```

or if you prefer [Yarn](https://yarnpkg.com):

```
$ yarn add ts-mixer
```

### Basic Example
```typescript
import { Mixin } from 'ts-mixer';

class Foo {
    protected makeFoo() {
        return 'foo';
    }
}

class Bar {
    protected makeBar() {
        return 'bar';
    }
}

class FooBar extends Mixin(Foo, Bar) {
    public makeFooBar() {
        return this.makeFoo() + this.makeBar();
    }
}

const fooBar = new FooBar();

console.log(fooBar.makeFooBar());  // "foobar"
```

## Special Cases
### Mixing Generic Classes
Frustratingly, it is _impossible_ for generic parameters to be referenced in base class expressions.  No matter what, you will eventually run into `Base class expressions cannot reference class type parameters.`

The way to get around this is to leverage [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html), and a slightly different mixing function from ts-mixer: `mix`.  It works exactly like `Mixin`, except it's a decorator, which means it doesn't affect the type information of the class being decorated.  See it in action below:

```typescript
import { mix } from 'ts-mixer';

class Foo<T> {
    public fooMethod(input: T): T {
        return input;
    }
}

class Bar<T> {
    public barMethod(input: T): T {
        return input;
    }
}

interface FooBar<T1, T2> extends Foo<T1>, Bar<T2> { }
@mix(Foo, Bar)
class FooBar<T1, T2> {
    public fooBarMethod(input1: T1, input2: T2) {
        return [this.fooMethod(input1), this.barMethod(input2)];
    }
}
```

Key takeaways from this example:
* `interface FooBar<T1, T2> extends Foo<T1>, Bar<T2> { }` makes sure `FooBar` has the typing we want, thanks to declaration merging
* `@mix(Foo, Bar)` wires things up "on the JavaScript side", since the interface declaration has nothing to do with runtime behavior.
* The reason we have to use the `mix` decorator is that the typing produced by `Mixin(Foo, Bar)` would conflict with the typing of the interface.  `mix` has no effect "on the TypeScript side," thus avoiding type conflicts.

### Mixing with Decorators
Popular libraries such as [class-validator](https://github.com/typestack/class-validator) and [TypeORM](https://github.com/typeorm/typeorm) use decorators to add functionality.  Unfortunately, `ts-mixer` has no way of knowing what these libraries do with the decorators behind the scenes.  So if you want these decorators to be "inherited" with classes you plan to mix, you first have to wrap them with a special `decorate` function exported by `ts-mixer`.  Here's an example using `class-validator`:

```typescript
import { IsBoolean, IsIn, validate } from 'class-validator';
import { Mixin, decorate } from 'ts-mixer';

class Disposable {
    @decorate(IsBoolean())  // instead of @IsBoolean()
    isDisposed: boolean = false;
}

class Statusable {
    @decorate(IsIn(['red', 'green']))  // instead of @IsIn(['red', 'green'])
    status: string = 'green';
}

class ExtendedObject extends Mixin(Disposable, Statusable) {}

const extendedObject = new ExtendedObject();
extendedObject.status = 'blue';

validate(extendedObject).then(errors => {
    console.log(errors);
});
```

### Dealing with Constructors
As mentioned in the [caveats section](#caveats), ES6 disallowed calling constructor functions without `new`.  This means that the only way for `ts-mixer` to mix instance properties is to instantiate each base class separately, then copy the instance properties into a common object.  The consequence of this is that constructors mixed by `ts-mixer` will _not_ receive the proper `this`.

**This very well may not be an issue for you!**  It only means that your constructors need to be "mostly pure" in terms of how they handle `this`.  Specifically, your constructors cannot produce [side effects](https://en.wikipedia.org/wiki/Side_effect_%28computer_science%29) involving `this`, _other than adding properties to `this`_ (the most common side effect in JavaScript constructors).

If you simply cannot eliminate `this` side effects from your constructor, there is a workaround available:  `ts-mixer` will automatically forward constructor parameters to a predesignated init function (`settings.initFunction`) if it's present on the class.  Unlike constructors, functions can be called with an arbitrary `this`, so this predesignated init function _will_ have the proper `this`.  Here's a basic example:

```typescript
import { Mixin, settings } from 'ts-mixer';

settings.initFunction = 'init';

class Person {
    public static allPeople: Set<Person> = new Set();
    
    protected init() {
        Person.allPeople.add(this);
    }
}

type PartyAffiliation = 'democrat' | 'republican';

class PoliticalParticipant {
    public static democrats: Set<PoliticalParticipant> = new Set();
    public static republicans: Set<PoliticalParticipant> = new Set();
    
    public party: PartyAffiliation;
    
    // note that these same args will also be passed to init function
    public constructor(party: PartyAffiliation) {
        this.party = party;
    }
    
    protected init(party: PartyAffiliation) {
        if (party === 'democrat')
            PoliticalParticipant.democrats.add(this);
        else
            PoliticalParticipant.republicans.add(this);
    }
}

class Voter extends Mixin(Person, PoliticalParticipant) {}

const v1 = new Voter('democrat');
const v2 = new Voter('democrat');
const v3 = new Voter('republican');
const v4 = new Voter('republican');
```

Note the above `.add(this)` statements.  These would not work as expected if they were placed in the constructor instead, since `this` is not the same between the constructor and `init`, as explained above.

## Other Features
### hasMixin
As mentioned above, `ts-mixer` does not support `instanceof` for mixins.  While it is possible to implement [custom `instanceof` behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance), this library does not do so because it would require modifying the source classes, which is deliberately avoided.

You can fill this missing functionality with `hasMixin(instance, mixinClass)` instead.  See the below example:

```typescript
import { Mixin, hasMixin } from 'ts-mixer';

class Foo {}
class Bar {}
class FooBar extends Mixin(Foo, Bar) {}

const instance = new FooBar();

// doesn't work with instanceof...
console.log(instance instanceof FooBar)  // true
console.log(instance instanceof Foo)     // false
console.log(instance instanceof Bar)     // false

// but everything works nicely with hasMixin!
console.log(hasMixin(instance, FooBar))  // true
console.log(hasMixin(instance, Foo))     // true
console.log(hasMixin(instance, Bar))     // true
```

`hasMixin(instance, mixinClass)` will work anywhere that `instance instanceof mixinClass` works.  Additionally, like `instanceof`, you get the same [type narrowing benefits](https://www.typescriptlang.org/docs/handbook/advanced-types.html#instanceof-type-guards):

```typescript
if (hasMixin(instance, Foo)) {
    // inferred type of instance is "Foo"
}

if (hasMixin(instance, Bar)) {
    // inferred type of instance of "Bar"
}
```

## Settings
ts-mixer has multiple strategies for mixing classes which can be configured by modifying `settings` from ts-mixer.  For example:

```typescript
import { settings, Mixin } from 'ts-mixer';

settings.prototypeStrategy = 'proxy';

// then use `Mixin` as normal...
```

### `settings.prototypeStrategy`
* Determines how ts-mixer will mix class prototypes together
* Possible values:
    - `'copy'` (default) - Copies all methods from the classes being mixed into a new prototype object.  (This will include all methods up the prototype chains as well.)  This is the default for ES5 compatibility, but it has the downside of stale references.  For example, if you mix `Foo` and `Bar` to make `FooBar`, then redefine a method on `Foo`, `FooBar` will not have the latest methods from `Foo`.  If this is not a concern for you, `'copy'` is the best value for this setting.
    - `'proxy'` - Uses an ES6 Proxy to "soft mix" prototypes.  Unlike `'copy'`, updates to the base classes _will_ be reflected in the mixed class, which may be desirable.  The downside is that method access is not as performant, nor is it ES5 compatible.

### `settings.staticsStrategy`
* Determines how static properties are inherited
* Possible values:
    - `'copy'` (default) - Simply copies all properties (minus `prototype`) from the base classes/constructor functions onto the mixed class.  Like `settings.prototypeStrategy = 'copy'`, this strategy also suffers from stale references, but shouldn't be a concern if you don't redefine static methods after mixing.
    - `'proxy'` - Similar to `settings.prototypeStrategy`, proxy's static method access to base classes.  Has the same benefits/downsides.

### `settings.initFunction`
* If set, `ts-mixer` will automatically call the function with this name upon construction
* Possible values:
    - `null` (default) - disables the behavior
    - a string - function name to call upon construction
* Read more about why you would want this in [dealing with constructors](#dealing-with-constructors)

### `settings.decoratorInheritance`
* Determines how decorators are inherited from classes passed to `Mixin(...)`
* Possible values:
    - `'deep'` (default) - Deeply inherits decorators from all given classes and their ancestors
    - `'direct'` - Only inherits decorators defined directly on the given classes
    - `'none'` - Skips decorator inheritance

# Author
Tanner Nielsen <tannerntannern@gmail.com>
* Website - [tannernielsen.com](http://tannernielsen.com)
* Github - [tannerntannern](https://github.com/tannerntannern)
