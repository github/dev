"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMixin = exports.registerMixins = exports.getMixinsForClass = void 0;
const util_1 = require("./util");
// Keeps track of constituent classes for every mixin class created by ts-mixer.
const mixins = new Map();
const getMixinsForClass = (clazz) => mixins.get(clazz);
exports.getMixinsForClass = getMixinsForClass;
const registerMixins = (mixedClass, constituents) => mixins.set(mixedClass, constituents);
exports.registerMixins = registerMixins;
const hasMixin = (instance, mixin) => {
    if (instance instanceof mixin)
        return true;
    const constructor = instance.constructor;
    const visited = new Set();
    let frontier = new Set();
    frontier.add(constructor);
    while (frontier.size > 0) {
        // check if the frontier has the mixin we're looking for.  if not, we can say we visited every item in the frontier
        if (frontier.has(mixin))
            return true;
        frontier.forEach(item => visited.add(item));
        // build a new frontier based on the associated mixin classes and prototype chains of each frontier item
        const newFrontier = new Set();
        frontier.forEach(item => {
            var _a;
            const itemConstituents = (_a = mixins.get(item)) !== null && _a !== void 0 ? _a : (0, util_1.protoChain)(item.prototype).map(proto => proto.constructor).filter(item => item !== null);
            if (itemConstituents)
                itemConstituents.forEach(constituent => {
                    if (!visited.has(constituent) && !frontier.has(constituent))
                        newFrontier.add(constituent);
                });
        });
        // we have a new frontier, now search again
        frontier = newFrontier;
    }
    // if we get here, we couldn't find the mixin anywhere in the prototype chain or associated mixin classes
    return false;
};
exports.hasMixin = hasMixin;
