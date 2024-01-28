"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = exports.unique = exports.hardMixProtos = exports.nearestCommonProto = exports.protoChain = exports.copyProps = void 0;
/**
 * Utility function that works like `Object.apply`, but copies getters and setters properly as well.  Additionally gives
 * the option to exclude properties by name.
 */
const copyProps = (dest, src, exclude = []) => {
    const props = Object.getOwnPropertyDescriptors(src);
    for (let prop of exclude)
        delete props[prop];
    Object.defineProperties(dest, props);
};
exports.copyProps = copyProps;
/**
 * Returns the full chain of prototypes up until Object.prototype given a starting object.  The order of prototypes will
 * be closest to farthest in the chain.
 */
const protoChain = (obj, currentChain = [obj]) => {
    const proto = Object.getPrototypeOf(obj);
    if (proto === null)
        return currentChain;
    return (0, exports.protoChain)(proto, [...currentChain, proto]);
};
exports.protoChain = protoChain;
/**
 * Identifies the nearest ancestor common to all the given objects in their prototype chains.  For most unrelated
 * objects, this function should return Object.prototype.
 */
const nearestCommonProto = (...objs) => {
    if (objs.length === 0)
        return undefined;
    let commonProto = undefined;
    const protoChains = objs.map(obj => (0, exports.protoChain)(obj));
    while (protoChains.every(protoChain => protoChain.length > 0)) {
        const protos = protoChains.map(protoChain => protoChain.pop());
        const potentialCommonProto = protos[0];
        if (protos.every(proto => proto === potentialCommonProto))
            commonProto = potentialCommonProto;
        else
            break;
    }
    return commonProto;
};
exports.nearestCommonProto = nearestCommonProto;
/**
 * Creates a new prototype object that is a mixture of the given prototypes.  The mixing is achieved by first
 * identifying the nearest common ancestor and using it as the prototype for a new object.  Then all properties/methods
 * downstream of this prototype (ONLY downstream) are copied into the new object.
 *
 * The resulting prototype is more performant than softMixProtos(...), as well as ES5 compatible.  However, it's not as
 * flexible as updates to the source prototypes aren't captured by the mixed result.  See softMixProtos for why you may
 * want to use that instead.
 */
const hardMixProtos = (ingredients, constructor, exclude = []) => {
    var _a;
    const base = (_a = (0, exports.nearestCommonProto)(...ingredients)) !== null && _a !== void 0 ? _a : Object.prototype;
    const mixedProto = Object.create(base);
    // Keeps track of prototypes we've already visited to avoid copying the same properties multiple times.  We init the
    // list with the proto chain below the nearest common ancestor because we don't want any of those methods mixed in
    // when they will already be accessible via prototype access.
    const visitedProtos = (0, exports.protoChain)(base);
    for (let prototype of ingredients) {
        let protos = (0, exports.protoChain)(prototype);
        // Apply the prototype chain in reverse order so that old methods don't override newer ones.
        for (let i = protos.length - 1; i >= 0; i--) {
            let newProto = protos[i];
            if (visitedProtos.indexOf(newProto) === -1) {
                (0, exports.copyProps)(mixedProto, newProto, ['constructor', ...exclude]);
                visitedProtos.push(newProto);
            }
        }
    }
    mixedProto.constructor = constructor;
    return mixedProto;
};
exports.hardMixProtos = hardMixProtos;
const unique = (arr) => arr.filter((e, i) => arr.indexOf(e) == i);
exports.unique = unique;
const flatten = (arr) => arr.length === 0
    ? []
    : arr.length === 1
        ? arr[0]
        : arr.reduce((a1, a2) => [...a1, ...a2]);
exports.flatten = flatten;
