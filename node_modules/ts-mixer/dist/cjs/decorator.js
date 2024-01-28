"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorate = exports.getDecoratorsForClass = exports.directDecoratorSearch = exports.deepDecoratorSearch = void 0;
const util_1 = require("./util");
const mixin_tracking_1 = require("./mixin-tracking");
const mergeObjectsOfDecorators = (o1, o2) => {
    var _a, _b;
    const allKeys = (0, util_1.unique)([...Object.getOwnPropertyNames(o1), ...Object.getOwnPropertyNames(o2)]);
    const mergedObject = {};
    for (let key of allKeys)
        mergedObject[key] = (0, util_1.unique)([...((_a = o1 === null || o1 === void 0 ? void 0 : o1[key]) !== null && _a !== void 0 ? _a : []), ...((_b = o2 === null || o2 === void 0 ? void 0 : o2[key]) !== null && _b !== void 0 ? _b : [])]);
    return mergedObject;
};
const mergePropertyAndMethodDecorators = (d1, d2) => {
    var _a, _b, _c, _d;
    return ({
        property: mergeObjectsOfDecorators((_a = d1 === null || d1 === void 0 ? void 0 : d1.property) !== null && _a !== void 0 ? _a : {}, (_b = d2 === null || d2 === void 0 ? void 0 : d2.property) !== null && _b !== void 0 ? _b : {}),
        method: mergeObjectsOfDecorators((_c = d1 === null || d1 === void 0 ? void 0 : d1.method) !== null && _c !== void 0 ? _c : {}, (_d = d2 === null || d2 === void 0 ? void 0 : d2.method) !== null && _d !== void 0 ? _d : {}),
    });
};
const mergeDecorators = (d1, d2) => {
    var _a, _b, _c, _d, _e, _f;
    return ({
        class: (0, util_1.unique)([...(_a = d1 === null || d1 === void 0 ? void 0 : d1.class) !== null && _a !== void 0 ? _a : [], ...(_b = d2 === null || d2 === void 0 ? void 0 : d2.class) !== null && _b !== void 0 ? _b : []]),
        static: mergePropertyAndMethodDecorators((_c = d1 === null || d1 === void 0 ? void 0 : d1.static) !== null && _c !== void 0 ? _c : {}, (_d = d2 === null || d2 === void 0 ? void 0 : d2.static) !== null && _d !== void 0 ? _d : {}),
        instance: mergePropertyAndMethodDecorators((_e = d1 === null || d1 === void 0 ? void 0 : d1.instance) !== null && _e !== void 0 ? _e : {}, (_f = d2 === null || d2 === void 0 ? void 0 : d2.instance) !== null && _f !== void 0 ? _f : {}),
    });
};
const decorators = new Map();
const findAllConstituentClasses = (...classes) => {
    var _a;
    const allClasses = new Set();
    const frontier = new Set([...classes]);
    while (frontier.size > 0) {
        for (let clazz of frontier) {
            const protoChainClasses = (0, util_1.protoChain)(clazz.prototype).map(proto => proto.constructor);
            const mixinClasses = (_a = (0, mixin_tracking_1.getMixinsForClass)(clazz)) !== null && _a !== void 0 ? _a : [];
            const potentiallyNewClasses = [...protoChainClasses, ...mixinClasses];
            const newClasses = potentiallyNewClasses.filter(c => !allClasses.has(c));
            for (let newClass of newClasses)
                frontier.add(newClass);
            allClasses.add(clazz);
            frontier.delete(clazz);
        }
    }
    return [...allClasses];
};
const deepDecoratorSearch = (...classes) => {
    const decoratorsForClassChain = findAllConstituentClasses(...classes)
        .map(clazz => decorators.get(clazz))
        .filter(decorators => !!decorators);
    if (decoratorsForClassChain.length == 0)
        return {};
    if (decoratorsForClassChain.length == 1)
        return decoratorsForClassChain[0];
    return decoratorsForClassChain.reduce((d1, d2) => mergeDecorators(d1, d2));
};
exports.deepDecoratorSearch = deepDecoratorSearch;
const directDecoratorSearch = (...classes) => {
    const classDecorators = classes.map(clazz => (0, exports.getDecoratorsForClass)(clazz));
    if (classDecorators.length === 0)
        return {};
    if (classDecorators.length === 1)
        return classDecorators[0];
    return classDecorators.reduce((d1, d2) => mergeDecorators(d1, d2));
};
exports.directDecoratorSearch = directDecoratorSearch;
const getDecoratorsForClass = (clazz) => {
    let decoratorsForClass = decorators.get(clazz);
    if (!decoratorsForClass) {
        decoratorsForClass = {};
        decorators.set(clazz, decoratorsForClass);
    }
    return decoratorsForClass;
};
exports.getDecoratorsForClass = getDecoratorsForClass;
const decorateClass = (decorator) => ((clazz) => {
    const decoratorsForClass = (0, exports.getDecoratorsForClass)(clazz);
    let classDecorators = decoratorsForClass.class;
    if (!classDecorators) {
        classDecorators = [];
        decoratorsForClass.class = classDecorators;
    }
    classDecorators.push(decorator);
    return decorator(clazz);
});
const decorateMember = (decorator) => ((object, key, ...otherArgs) => {
    var _a, _b, _c;
    const decoratorTargetType = typeof object === 'function' ? 'static' : 'instance';
    const decoratorType = typeof object[key] === 'function' ? 'method' : 'property';
    const clazz = decoratorTargetType === 'static' ? object : object.constructor;
    const decoratorsForClass = (0, exports.getDecoratorsForClass)(clazz);
    const decoratorsForTargetType = (_a = decoratorsForClass === null || decoratorsForClass === void 0 ? void 0 : decoratorsForClass[decoratorTargetType]) !== null && _a !== void 0 ? _a : {};
    decoratorsForClass[decoratorTargetType] = decoratorsForTargetType;
    let decoratorsForType = (_b = decoratorsForTargetType === null || decoratorsForTargetType === void 0 ? void 0 : decoratorsForTargetType[decoratorType]) !== null && _b !== void 0 ? _b : {};
    decoratorsForTargetType[decoratorType] = decoratorsForType;
    let decoratorsForKey = (_c = decoratorsForType === null || decoratorsForType === void 0 ? void 0 : decoratorsForType[key]) !== null && _c !== void 0 ? _c : [];
    decoratorsForType[key] = decoratorsForKey;
    // @ts-ignore: array is type `A[] | B[]` and item is type `A | B`, so technically a type error, but it's fine
    decoratorsForKey.push(decorator);
    // @ts-ignore
    return decorator(object, key, ...otherArgs);
});
const decorate = (decorator) => ((...args) => {
    if (args.length === 1)
        return decorateClass(decorator)(args[0]);
    return decorateMember(decorator)(...args);
});
exports.decorate = decorate;
