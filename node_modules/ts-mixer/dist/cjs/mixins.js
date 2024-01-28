"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mix = exports.Mixin = void 0;
const proxy_1 = require("./proxy");
const settings_1 = require("./settings");
const util_1 = require("./util");
const decorator_1 = require("./decorator");
const mixin_tracking_1 = require("./mixin-tracking");
function Mixin(...constructors) {
    var _a, _b, _c;
    const prototypes = constructors.map(constructor => constructor.prototype);
    // Here we gather up the init functions of the ingredient prototypes, combine them into one init function, and
    // attach it to the mixed class prototype.  The reason we do this is because we want the init functions to mix
    // similarly to constructors -- not methods, which simply override each other.
    const initFunctionName = settings_1.settings.initFunction;
    if (initFunctionName !== null) {
        const initFunctions = prototypes
            .map(proto => proto[initFunctionName])
            .filter(func => typeof func === 'function');
        const combinedInitFunction = function (...args) {
            for (let initFunction of initFunctions)
                initFunction.apply(this, args);
        };
        const extraProto = { [initFunctionName]: combinedInitFunction };
        prototypes.push(extraProto);
    }
    function MixedClass(...args) {
        for (const constructor of constructors)
            // @ts-ignore: potentially abstract class
            (0, util_1.copyProps)(this, new constructor(...args));
        if (initFunctionName !== null && typeof this[initFunctionName] === 'function')
            this[initFunctionName].apply(this, args);
    }
    MixedClass.prototype = settings_1.settings.prototypeStrategy === 'copy'
        ? (0, util_1.hardMixProtos)(prototypes, MixedClass)
        : (0, proxy_1.softMixProtos)(prototypes, MixedClass);
    Object.setPrototypeOf(MixedClass, settings_1.settings.staticsStrategy === 'copy'
        ? (0, util_1.hardMixProtos)(constructors, null, ['prototype'])
        : (0, proxy_1.proxyMix)(constructors, Function.prototype));
    let DecoratedMixedClass = MixedClass;
    if (settings_1.settings.decoratorInheritance !== 'none') {
        const classDecorators = settings_1.settings.decoratorInheritance === 'deep'
            ? (0, decorator_1.deepDecoratorSearch)(...constructors)
            : (0, decorator_1.directDecoratorSearch)(...constructors);
        for (let decorator of (_a = classDecorators === null || classDecorators === void 0 ? void 0 : classDecorators.class) !== null && _a !== void 0 ? _a : []) {
            const result = decorator(DecoratedMixedClass);
            if (result) {
                DecoratedMixedClass = result;
            }
        }
        applyPropAndMethodDecorators((_b = classDecorators === null || classDecorators === void 0 ? void 0 : classDecorators.static) !== null && _b !== void 0 ? _b : {}, DecoratedMixedClass);
        applyPropAndMethodDecorators((_c = classDecorators === null || classDecorators === void 0 ? void 0 : classDecorators.instance) !== null && _c !== void 0 ? _c : {}, DecoratedMixedClass.prototype);
    }
    (0, mixin_tracking_1.registerMixins)(DecoratedMixedClass, constructors);
    return DecoratedMixedClass;
}
exports.Mixin = Mixin;
const applyPropAndMethodDecorators = (propAndMethodDecorators, target) => {
    const propDecorators = propAndMethodDecorators.property;
    const methodDecorators = propAndMethodDecorators.method;
    if (propDecorators)
        for (let key in propDecorators)
            for (let decorator of propDecorators[key])
                decorator(target, key);
    if (methodDecorators)
        for (let key in methodDecorators)
            for (let decorator of methodDecorators[key])
                decorator(target, key, Object.getOwnPropertyDescriptor(target, key));
};
/**
 * A decorator version of the `Mixin` function.  You'll want to use this instead of `Mixin` for mixing generic classes.
 */
const mix = (...ingredients) => decoratedClass => {
    // @ts-ignore
    const mixedClass = Mixin(...ingredients.concat([decoratedClass]));
    Object.defineProperty(mixedClass, 'name', {
        value: decoratedClass.name,
        writable: false,
    });
    return mixedClass;
};
exports.mix = mix;
