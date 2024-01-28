/**
 * Returns the longer of the two tuples.  Indefinite tuples will always be considered longest.
 */
type _Longest<T1 extends any[], T2 extends any[]> = any[] extends T1 ? T1 : any[] extends T2 ? T2 : Exclude<keyof T1, keyof T2> extends never ? T2 : T1;
/**
 * Returns the longest of up to 10 different tuples.
 */
export type Longest<T1 extends any[], T2 extends any[] = [], T3 extends any[] = [], T4 extends any[] = [], T5 extends any[] = [], T6 extends any[] = [], T7 extends any[] = [], T8 extends any[] = [], T9 extends any[] = [], T10 extends any[] = []> = _Longest<_Longest<_Longest<_Longest<T1, T2>, _Longest<T3, T4>>, _Longest<_Longest<T5, T6>, _Longest<T7, T8>>>, _Longest<T9, T10>>;
/**
 * A rigorous type alias for a class.
 */
export type Class<CtorArgs extends any[] = any[], InstanceType = {}, StaticType = {}, IsAbstract = false> = (abstract new (...args: any[]) => InstanceType) & StaticType;
export {};
