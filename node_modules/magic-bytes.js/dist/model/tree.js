"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComplexNode = exports.createNode = exports.merge = void 0;
const createMatch = (leaf) => ({
    typename: leaf.typename,
    mime: leaf.info.mime,
    extension: leaf.info.extension,
});
const isMatchingNode = (tree, path) => tree && path.length === 0;
const head = (arr) => arr[0];
const tail = (arr) => arr.slice(1, arr.length);
const merge = (node, tree) => {
    if (node.bytes.length === 0)
        return tree;
    const currentByte = head(node.bytes); // 0
    const path = tail(node.bytes); // [1,2]
    const currentTree = tree.bytes[currentByte];
    // traversed to end. Just add key to leaf.
    if (isMatchingNode(currentTree, path)) {
        const matchingNode = tree.bytes[currentByte];
        tree.bytes[currentByte] = {
            ...matchingNode,
            matches: [
                ...(matchingNode.matches ? matchingNode.matches : []),
                createMatch(node),
            ],
        };
        return tree;
    }
    // Path exists already, Merge subtree
    if (tree.bytes[currentByte]) {
        tree.bytes[currentByte] = exports.merge(exports.createNode(node.typename, path, node.info), tree.bytes[currentByte]);
        return tree;
    }
    // Tree did not exist before
    if (!tree.bytes[currentByte]) {
        tree.bytes[currentByte] = {
            ...tree.bytes[currentByte],
            ...exports.createComplexNode(node.typename, path, node.info),
        };
    }
    return tree;
};
exports.merge = merge;
const createNode = (typename, bytes, info) => {
    return { typename, bytes, info: info ? info : {} };
};
exports.createNode = createNode;
const createComplexNode = (typename, bytes, info) => {
    let obj = {
        bytes: {},
        matches: undefined,
    };
    const currentKey = head(bytes); // 0
    const path = tail(bytes); // [1,2]
    if (bytes.length === 0) {
        return {
            matches: [
                createMatch({
                    typename: typename,
                    info: info ? { extension: info.extension, mime: info.mime } : {},
                }),
            ],
            bytes: {},
        };
    }
    obj.bytes[currentKey] = exports.createComplexNode(typename, path, info);
    return obj;
};
exports.createComplexNode = createComplexNode;
