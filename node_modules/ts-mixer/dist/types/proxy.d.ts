/**
 * Finds the ingredient with the given prop, searching in reverse order and breadth-first if searching ingredient
 * prototypes is required.
 */
export declare const getIngredientWithProp: (prop: string | number | symbol, ingredients: any[]) => object | undefined;
/**
 * "Mixes" ingredients by wrapping them in a Proxy.  The optional prototype argument allows the mixed object to sit
 * downstream of an existing prototype chain.  Note that "properties" cannot be added, deleted, or modified.
 */
export declare const proxyMix: (ingredients: any[], prototype?: Object) => {};
/**
 * Creates a new proxy-prototype object that is a "soft" mixture of the given prototypes.  The mixing is achieved by
 * proxying all property access to the ingredients.  This is not ES5 compatible and less performant.  However, any
 * changes made to the source prototypes will be reflected in the proxy-prototype, which may be desirable.
 */
export declare const softMixProtos: (ingredients: any[], constructor: Function) => object;
