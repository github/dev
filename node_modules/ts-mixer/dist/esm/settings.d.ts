export type Settings = {
    initFunction: string | null;
    staticsStrategy: 'copy' | 'proxy';
    prototypeStrategy: 'copy' | 'proxy';
    decoratorInheritance: 'deep' | 'direct' | 'none';
};
export declare const settings: Settings;
