"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  calculateShardId: () => calculateShardId,
  getUserAgentAppendix: () => getUserAgentAppendix,
  isEquatable: () => isEquatable,
  isJSONEncodable: () => isJSONEncodable,
  lazy: () => lazy,
  range: () => range,
  shouldUseGlobalFetchAndWebSocket: () => shouldUseGlobalFetchAndWebSocket
});
module.exports = __toCommonJS(src_exports);

// src/functions/lazy.ts
function lazy(cb) {
  let defaultValue;
  return () => defaultValue ??= cb();
}
__name(lazy, "lazy");

// src/functions/range.ts
function* range(range2) {
  let rangeEnd;
  let start = 0;
  let step = 1;
  if (typeof range2 === "number") {
    rangeEnd = range2;
  } else {
    start = range2.start;
    rangeEnd = range2.end;
    step = range2.step ?? 1;
  }
  for (let index = start; index < rangeEnd; index += step) {
    yield index;
  }
}
__name(range, "range");

// src/functions/calculateShardId.ts
function calculateShardId(guildId, shardCount) {
  return Number(BigInt(guildId) >> 22n) % shardCount;
}
__name(calculateShardId, "calculateShardId");

// src/functions/runtime.ts
function shouldUseGlobalFetchAndWebSocket() {
  if (typeof globalThis.process === "undefined") {
    return "fetch" in globalThis && "WebSocket" in globalThis;
  }
  if ("versions" in globalThis.process) {
    return "deno" in globalThis.process.versions || "bun" in globalThis.process.versions;
  }
  return false;
}
__name(shouldUseGlobalFetchAndWebSocket, "shouldUseGlobalFetchAndWebSocket");

// src/functions/userAgentAppendix.ts
function getUserAgentAppendix() {
  if (typeof globalThis.EdgeRuntime !== "undefined") {
    return "Vercel-Edge-Functions";
  }
  if (typeof globalThis.R2 !== "undefined" && typeof globalThis.WebSocketPair !== "undefined") {
    return "Cloudflare-Workers";
  }
  if (typeof globalThis.Netlify !== "undefined") {
    return "Netlify-Edge-Functions";
  }
  if (typeof globalThis.process !== "object") {
    if (typeof globalThis.navigator === "object") {
      return globalThis.navigator.userAgent;
    }
    return "UnknownEnvironment";
  }
  if ("versions" in globalThis.process) {
    if ("deno" in globalThis.process.versions) {
      return `Deno/${globalThis.process.versions.deno}`;
    }
    if ("bun" in globalThis.process.versions) {
      return `Bun/${globalThis.process.versions.bun}`;
    }
    if ("node" in globalThis.process.versions) {
      return `Node.js/${globalThis.process.versions.node}`;
    }
  }
  return "UnknownEnvironment";
}
__name(getUserAgentAppendix, "getUserAgentAppendix");

// src/JSONEncodable.ts
function isJSONEncodable(maybeEncodable) {
  return maybeEncodable !== null && typeof maybeEncodable === "object" && "toJSON" in maybeEncodable;
}
__name(isJSONEncodable, "isJSONEncodable");

// src/Equatable.ts
function isEquatable(maybeEquatable) {
  return maybeEquatable !== null && typeof maybeEquatable === "object" && "equals" in maybeEquatable;
}
__name(isEquatable, "isEquatable");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calculateShardId,
  getUserAgentAppendix,
  isEquatable,
  isJSONEncodable,
  lazy,
  range,
  shouldUseGlobalFetchAndWebSocket
});
//# sourceMappingURL=index.js.map