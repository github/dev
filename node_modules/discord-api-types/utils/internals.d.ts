export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
export type AddUndefinedToPossiblyUndefinedPropertiesOfInterface<Base> = {
    [K in keyof Base]: Base[K] extends Exclude<Base[K], undefined> ? AddUndefinedToPossiblyUndefinedPropertiesOfInterface<Base[K]> : AddUndefinedToPossiblyUndefinedPropertiesOfInterface<Base[K]> | undefined;
};
export type StrictPartial<Base> = AddUndefinedToPossiblyUndefinedPropertiesOfInterface<Partial<Base>>;
export type StrictRequired<Base> = Required<{
    [K in keyof Base]: Exclude<Base[K], undefined>;
}>;
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type Keys<T> = keyof T;
type DistributiveKeys<T> = T extends unknown ? Keys<T> : never;
/**
 * Allows picking of keys from unions that are disjoint
 */
export type DistributivePick<T, K extends DistributiveKeys<T>> = T extends unknown ? keyof Pick_<T, K> extends never ? never : {
    [P in keyof Pick_<T, K>]: Pick_<T, K>[P];
} : never;
type Pick_<T, K> = Pick<T, Extract<keyof T, K>>;
/**
 * Allows omitting of keys from unions that are disjoint
 */
export type DistributiveOmit<T, K extends DistributiveKeys<T>> = T extends unknown ? {
    [P in keyof Omit_<T, K>]: Omit_<T, K>[P];
} : never;
type Omit_<T, K> = Omit<T, Extract<keyof T, K>>;
export {};
//# sourceMappingURL=internals.d.ts.map