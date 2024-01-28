/**
 * Utility function that works like `Object.apply`, but copies getters and setters properly as well.  Additionally gives
 * the option to exclude properties by name.
 */
export declare const copyProps: (dest: object, src: object, exclude?: string[]) => void;
/**
 * Returns the full chain of prototypes up until Object.prototype given a starting object.  The order of prototypes will
 * be closest to farthest in the chain.
 */
export declare const protoChain: (obj: object, currentChain?: object[]) => object[];
/**
 * Identifies the nearest ancestor common to all the given objects in their prototype chains.  For most unrelated
 * objects, this function should return Object.prototype.
 */
export declare const nearestCommonProto: (...objs: object[]) => object | undefined;
/**
 * Creates a new prototype object that is a mixture of the given prototypes.  The mixing is achieved by first
 * identifying the nearest common ancestor and using it as the prototype for a new object.  Then all properties/methods
 * downstream of this prototype (ONLY downstream) are copied into the new object.
 *
 * The resulting prototype is more performant than softMixProtos(...), as well as ES5 compatible.  However, it's not as
 * flexible as updates to the source prototypes aren't captured by the mixed result.  See softMixProtos for why you may
 * want to use that instead.
 */
export declare const hardMixProtos: (ingredients: any[], constructor: Function | null, exclude?: string[]) => object;
export declare const unique: <T>(arr: T[]) => T[];
export declare const flatten: <T>(arr: T[][]) => T[];
