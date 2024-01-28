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

// src/strategies/undiciRequest.ts
var undiciRequest_exports = {};
__export(undiciRequest_exports, {
  makeRequest: () => makeRequest,
  resolveBody: () => resolveBody
});
module.exports = __toCommonJS(undiciRequest_exports);
var import_node_http = require("http");
var import_node_url = require("url");
var import_node_util = require("util");
var import_undici = require("undici");
async function makeRequest(url, init) {
  const options = {
    ...init,
    body: await resolveBody(init.body)
  };
  const res = await (0, import_undici.request)(url, options);
  return {
    body: res.body,
    async arrayBuffer() {
      return res.body.arrayBuffer();
    },
    async json() {
      return res.body.json();
    },
    async text() {
      return res.body.text();
    },
    get bodyUsed() {
      return res.body.bodyUsed;
    },
    headers: new import_undici.Headers(res.headers),
    status: res.statusCode,
    statusText: import_node_http.STATUS_CODES[res.statusCode],
    ok: res.statusCode >= 200 && res.statusCode < 300
  };
}
__name(makeRequest, "makeRequest");
async function resolveBody(body) {
  if (body == null) {
    return null;
  } else if (typeof body === "string") {
    return body;
  } else if (import_node_util.types.isUint8Array(body)) {
    return body;
  } else if (import_node_util.types.isArrayBuffer(body)) {
    return new Uint8Array(body);
  } else if (body instanceof import_node_url.URLSearchParams) {
    return body.toString();
  } else if (body instanceof DataView) {
    return new Uint8Array(body.buffer);
  } else if (body instanceof Blob) {
    return new Uint8Array(await body.arrayBuffer());
  } else if (body instanceof FormData) {
    return body;
  } else if (body[Symbol.iterator]) {
    const chunks = [...body];
    return Buffer.concat(chunks);
  } else if (body[Symbol.asyncIterator]) {
    const chunks = [];
    for await (const chunk of body) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
  throw new TypeError(`Unable to resolve body.`);
}
__name(resolveBody, "resolveBody");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeRequest,
  resolveBody
});
//# sourceMappingURL=undiciRequest.js.map