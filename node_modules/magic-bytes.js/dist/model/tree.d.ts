export declare type PathlessNewNode = {
    info: Info;
    typename: string;
};
export declare type NewNode = PathlessNewNode & {
    bytes: string[];
};
export declare type GuessedFile = Info & {
    typename: string;
};
export declare type Info = {
    mime?: string;
    extension?: string;
};
export declare type Node = {
    matches?: GuessedFile[];
    bytes: {
        [nextbyte: string]: Node;
    };
};
export declare type Tree = {
    noOffset: Node | null;
    offset: {
        [offsetByte: string]: Node;
    };
};
export declare const merge: (node: NewNode, tree: Node) => Node;
export declare const createNode: (typename: string, bytes: string[], info?: Info | undefined) => NewNode;
export declare const createComplexNode: (typename: string, bytes: string[], info?: Info | undefined) => Node;
//# sourceMappingURL=tree.d.ts.map