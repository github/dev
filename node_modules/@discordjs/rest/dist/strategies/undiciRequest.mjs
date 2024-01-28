var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/strategies/undiciRequest.ts
import { STATUS_CODES } from "node:http";
import { URLSearchParams } from "node:url";
import { types } from "node:util";
import { request, Headers } from "undici";
async function makeRequest(url, init) {
  const options = {
    ...init,
    body: await resolveBody(init.body)
  };
  const res = await request(url, options);
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
    headers: new Headers(res.headers),
    status: res.statusCode,
    statusText: STATUS_CODES[res.statusCode],
    ok: res.statusCode >= 200 && res.statusCode < 300
  };
}
__name(makeRequest, "makeRequest");
async function resolveBody(body) {
  if (body == null) {
    return null;
  } else if (typeof body === "string") {
    return body;
  } else if (types.isUint8Array(body)) {
    return body;
  } else if (types.isArrayBuffer(body)) {
    return new Uint8Array(body);
  } else if (body instanceof URLSearchParams) {
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
export {
  makeRequest,
  resolveBody
};
//# sourceMappingURL=undiciRequest.mjs.map