"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromHex = exports.toHex = void 0;
const hex = (num) => new Number(num).toString(16).toLowerCase();
const toHex = (num) => `0x${hex(num).length === 1 ? "0" + hex(num) : hex(num)}`;
exports.toHex = toHex;
const fromHex = (hex) => new Number(hex);
exports.fromHex = fromHex;
