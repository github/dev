import { Class } from './types';
export declare const getMixinsForClass: (clazz: Class) => Function[] | undefined;
export declare const registerMixins: (mixedClass: any, constituents: Function[]) => Map<any, Function[]>;
export declare const hasMixin: <M>(instance: any, mixin: abstract new (...args: any[]) => M) => instance is M;
