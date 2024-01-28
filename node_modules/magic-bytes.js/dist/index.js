"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filetypeextension = exports.filetypemime = exports.filetypename = exports.filetypeinfo = void 0;
const pattern_tree_1 = __importDefault(require("./model/pattern-tree"));
const toHex_1 = require("./model/toHex");
const patternTree = pattern_tree_1.default();
const filetypeinfo = (bytes) => {
    let tree = patternTree;
    for (const k of Object.keys(tree.offset)) {
        const offset = toHex_1.fromHex(k);
        const offsetExceedsFile = offset >= bytes.length;
        if (offsetExceedsFile) {
            continue;
        }
        const node = patternTree.offset[k];
        const guessed = walkTree(offset, bytes, node);
        if (guessed.length > 0) {
            return guessed;
        }
    }
    if (tree.noOffset === null) {
        return [];
    }
    return walkTree(0, bytes, tree.noOffset);
};
exports.filetypeinfo = filetypeinfo;
const walkTree = (index, bytes, node) => {
    let step = node;
    let guessFile = [];
    while (true) {
        const currentByte = toHex_1.toHex(bytes[index]);
        if (step.bytes["?"] && !step.bytes[currentByte]) {
            step = step.bytes["?"];
        }
        else {
            step = step.bytes[currentByte];
        }
        if (!step) {
            return guessFile;
        }
        if (step && step.matches) {
            guessFile = step.matches.slice(0);
        }
        index += 1;
    }
};
exports.default = exports.filetypeinfo;
const filetypename = (bytes) => exports.filetypeinfo(bytes).map((e) => e.typename);
exports.filetypename = filetypename;
const filetypemime = (bytes) => exports.filetypeinfo(bytes)
    .map((e) => (e.mime ? e.mime : null))
    .filter((x) => x !== null);
exports.filetypemime = filetypemime;
const filetypeextension = (bytes) => exports.filetypeinfo(bytes)
    .map((e) => (e.extension ? e.extension : null))
    .filter((x) => x !== null);
exports.filetypeextension = filetypeextension;
