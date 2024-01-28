var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/environment.ts
var defaultStrategy;
function setDefaultStrategy(newStrategy) {
  defaultStrategy = newStrategy;
}
__name(setDefaultStrategy, "setDefaultStrategy");
function getDefaultStrategy() {
  return defaultStrategy;
}
__name(getDefaultStrategy, "getDefaultStrategy");

// src/lib/utils/constants.ts
import { getUserAgentAppendix } from "@discordjs/util";
import { APIVersion } from "discord-api-types/v10";
var DefaultUserAgent = `DiscordBot (https://discord.js.org, 2.2.0)`;
var DefaultUserAgentAppendix = getUserAgentAppendix();
var DefaultRestOptions = {
  agent: null,
  api: "https://discord.com/api",
  authPrefix: "Bot",
  cdn: "https://cdn.discordapp.com",
  headers: {},
  invalidRequestWarningInterval: 0,
  globalRequestsPerSecond: 50,
  offset: 50,
  rejectOnRateLimit: null,
  retries: 3,
  timeout: 15e3,
  userAgentAppendix: DefaultUserAgentAppendix,
  version: APIVersion,
  hashSweepInterval: 144e5,
  // 4 Hours
  hashLifetime: 864e5,
  // 24 Hours
  handlerSweepInterval: 36e5,
  // 1 Hour
  async makeRequest(...args) {
    return getDefaultStrategy()(...args);
  }
};
var RESTEvents = /* @__PURE__ */ ((RESTEvents2) => {
  RESTEvents2["Debug"] = "restDebug";
  RESTEvents2["HandlerSweep"] = "handlerSweep";
  RESTEvents2["HashSweep"] = "hashSweep";
  RESTEvents2["InvalidRequestWarning"] = "invalidRequestWarning";
  RESTEvents2["RateLimited"] = "rateLimited";
  RESTEvents2["Response"] = "response";
  return RESTEvents2;
})(RESTEvents || {});
var ALLOWED_EXTENSIONS = ["webp", "png", "jpg", "jpeg", "gif"];
var ALLOWED_STICKER_EXTENSIONS = ["png", "json", "gif"];
var ALLOWED_SIZES = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
var OverwrittenMimeTypes = {
  // https://github.com/discordjs/discord.js/issues/8557
  "image/apng": "image/png"
};
var BurstHandlerMajorIdKey = "burst";
var DEPRECATION_WARNING_PREFIX = "DeprecationWarning";

// src/lib/errors/RateLimitError.ts
var RateLimitError = class _RateLimitError extends Error {
  static {
    __name(this, "RateLimitError");
  }
  timeToReset;
  limit;
  method;
  hash;
  url;
  route;
  majorParameter;
  global;
  retryAfter;
  sublimitTimeout;
  scope;
  constructor({
    timeToReset,
    limit,
    method,
    hash,
    url,
    route,
    majorParameter,
    global,
    retryAfter,
    sublimitTimeout,
    scope
  }) {
    super();
    this.timeToReset = timeToReset;
    this.limit = limit;
    this.method = method;
    this.hash = hash;
    this.url = url;
    this.route = route;
    this.majorParameter = majorParameter;
    this.global = global;
    this.retryAfter = retryAfter;
    this.sublimitTimeout = sublimitTimeout;
    this.scope = scope;
  }
  /**
   * The name of the error
   */
  get name() {
    return `${_RateLimitError.name}[${this.route}]`;
  }
};

// src/lib/utils/types.ts
var RequestMethod = /* @__PURE__ */ ((RequestMethod2) => {
  RequestMethod2["Delete"] = "DELETE";
  RequestMethod2["Get"] = "GET";
  RequestMethod2["Patch"] = "PATCH";
  RequestMethod2["Post"] = "POST";
  RequestMethod2["Put"] = "PUT";
  return RequestMethod2;
})(RequestMethod || {});

// src/lib/utils/utils.ts
function serializeSearchParam(value) {
  switch (typeof value) {
    case "string":
      return value;
    case "number":
    case "bigint":
    case "boolean":
      return value.toString();
    case "object":
      if (value === null)
        return null;
      if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value.toISOString();
      }
      if (typeof value.toString === "function" && value.toString !== Object.prototype.toString)
        return value.toString();
      return null;
    default:
      return null;
  }
}
__name(serializeSearchParam, "serializeSearchParam");
function makeURLSearchParams(options) {
  const params = new URLSearchParams();
  if (!options)
    return params;
  for (const [key, value] of Object.entries(options)) {
    const serialized = serializeSearchParam(value);
    if (serialized !== null)
      params.append(key, serialized);
  }
  return params;
}
__name(makeURLSearchParams, "makeURLSearchParams");
async function parseResponse(res) {
  if (res.headers.get("Content-Type")?.startsWith("application/json")) {
    return res.json();
  }
  return res.arrayBuffer();
}
__name(parseResponse, "parseResponse");
function hasSublimit(bucketRoute, body, method) {
  if (bucketRoute === "/channels/:id") {
    if (typeof body !== "object" || body === null)
      return false;
    if (method !== "PATCH" /* Patch */)
      return false;
    const castedBody = body;
    return ["name", "topic"].some((key) => Reflect.has(castedBody, key));
  }
  return true;
}
__name(hasSublimit, "hasSublimit");
function shouldRetry(error) {
  if (error.name === "AbortError")
    return true;
  return "code" in error && error.code === "ECONNRESET" || error.message.includes("ECONNRESET");
}
__name(shouldRetry, "shouldRetry");
async function onRateLimit(manager, rateLimitData) {
  const { options } = manager;
  if (!options.rejectOnRateLimit)
    return;
  const shouldThrow = typeof options.rejectOnRateLimit === "function" ? await options.rejectOnRateLimit(rateLimitData) : options.rejectOnRateLimit.some((route) => rateLimitData.route.startsWith(route.toLowerCase()));
  if (shouldThrow) {
    throw new RateLimitError(rateLimitData);
  }
}
__name(onRateLimit, "onRateLimit");
function calculateUserDefaultAvatarIndex(userId) {
  return Number(BigInt(userId) >> 22n) % 6;
}
__name(calculateUserDefaultAvatarIndex, "calculateUserDefaultAvatarIndex");
async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
__name(sleep, "sleep");
function isBufferLike(value) {
  return value instanceof ArrayBuffer || value instanceof Uint8Array || value instanceof Uint8ClampedArray;
}
__name(isBufferLike, "isBufferLike");
function deprecationWarning(message) {
  if (typeof globalThis.process === "undefined") {
    console.warn(`${DEPRECATION_WARNING_PREFIX}: ${message}`);
  } else {
    process.emitWarning(message, DEPRECATION_WARNING_PREFIX);
  }
}
__name(deprecationWarning, "deprecationWarning");

// src/lib/CDN.ts
var deprecationEmittedForEmoji = false;
var CDN = class {
  constructor(base = DefaultRestOptions.cdn) {
    this.base = base;
  }
  static {
    __name(this, "CDN");
  }
  /**
   * Generates an app asset URL for a client's asset.
   *
   * @param clientId - The client id that has the asset
   * @param assetHash - The hash provided by Discord for this asset
   * @param options - Optional options for the asset
   */
  appAsset(clientId, assetHash, options) {
    return this.makeURL(`/app-assets/${clientId}/${assetHash}`, options);
  }
  /**
   * Generates an app icon URL for a client's icon.
   *
   * @param clientId - The client id that has the icon
   * @param iconHash - The hash provided by Discord for this icon
   * @param options - Optional options for the icon
   */
  appIcon(clientId, iconHash, options) {
    return this.makeURL(`/app-icons/${clientId}/${iconHash}`, options);
  }
  /**
   * Generates an avatar URL, e.g. for a user or a webhook.
   *
   * @param id - The id that has the icon
   * @param avatarHash - The hash provided by Discord for this avatar
   * @param options - Optional options for the avatar
   */
  avatar(id, avatarHash, options) {
    return this.dynamicMakeURL(`/avatars/${id}/${avatarHash}`, avatarHash, options);
  }
  /**
   * Generates a user avatar decoration URL.
   *
   * @param userId - The id of the user
   * @param userAvatarDecoration - The hash provided by Discord for this avatar decoration
   * @param options - Optional options for the avatar decoration
   */
  avatarDecoration(userId, userAvatarDecoration, options) {
    return this.makeURL(`/avatar-decorations/${userId}/${userAvatarDecoration}`, options);
  }
  /**
   * Generates a banner URL, e.g. for a user or a guild.
   *
   * @param id - The id that has the banner splash
   * @param bannerHash - The hash provided by Discord for this banner
   * @param options - Optional options for the banner
   */
  banner(id, bannerHash, options) {
    return this.dynamicMakeURL(`/banners/${id}/${bannerHash}`, bannerHash, options);
  }
  /**
   * Generates an icon URL for a channel, e.g. a group DM.
   *
   * @param channelId - The channel id that has the icon
   * @param iconHash - The hash provided by Discord for this channel
   * @param options - Optional options for the icon
   */
  channelIcon(channelId, iconHash, options) {
    return this.makeURL(`/channel-icons/${channelId}/${iconHash}`, options);
  }
  /**
   * Generates a default avatar URL
   *
   * @param index - The default avatar index
   * @remarks
   * To calculate the index for a user do `(userId >> 22) % 6`,
   * or `discriminator % 5` if they're using the legacy username system.
   */
  defaultAvatar(index) {
    return this.makeURL(`/embed/avatars/${index}`, { extension: "png" });
  }
  /**
   * Generates a discovery splash URL for a guild's discovery splash.
   *
   * @param guildId - The guild id that has the discovery splash
   * @param splashHash - The hash provided by Discord for this splash
   * @param options - Optional options for the splash
   */
  discoverySplash(guildId, splashHash, options) {
    return this.makeURL(`/discovery-splashes/${guildId}/${splashHash}`, options);
  }
  emoji(emojiId, options) {
    let resolvedOptions;
    if (typeof options === "string") {
      if (!deprecationEmittedForEmoji) {
        deprecationWarning(
          "Passing a string for the second parameter of CDN#emoji() is deprecated. Use an object instead."
        );
        deprecationEmittedForEmoji = true;
      }
      resolvedOptions = { extension: options };
    } else {
      resolvedOptions = options;
    }
    return this.makeURL(`/emojis/${emojiId}`, resolvedOptions);
  }
  /**
   * Generates a guild member avatar URL.
   *
   * @param guildId - The id of the guild
   * @param userId - The id of the user
   * @param avatarHash - The hash provided by Discord for this avatar
   * @param options - Optional options for the avatar
   */
  guildMemberAvatar(guildId, userId, avatarHash, options) {
    return this.dynamicMakeURL(`/guilds/${guildId}/users/${userId}/avatars/${avatarHash}`, avatarHash, options);
  }
  /**
   * Generates a guild member banner URL.
   *
   * @param guildId - The id of the guild
   * @param userId - The id of the user
   * @param bannerHash - The hash provided by Discord for this banner
   * @param options - Optional options for the banner
   */
  guildMemberBanner(guildId, userId, bannerHash, options) {
    return this.dynamicMakeURL(`/guilds/${guildId}/users/${userId}/banner`, bannerHash, options);
  }
  /**
   * Generates an icon URL, e.g. for a guild.
   *
   * @param id - The id that has the icon splash
   * @param iconHash - The hash provided by Discord for this icon
   * @param options - Optional options for the icon
   */
  icon(id, iconHash, options) {
    return this.dynamicMakeURL(`/icons/${id}/${iconHash}`, iconHash, options);
  }
  /**
   * Generates a URL for the icon of a role
   *
   * @param roleId - The id of the role that has the icon
   * @param roleIconHash - The hash provided by Discord for this role icon
   * @param options - Optional options for the role icon
   */
  roleIcon(roleId, roleIconHash, options) {
    return this.makeURL(`/role-icons/${roleId}/${roleIconHash}`, options);
  }
  /**
   * Generates a guild invite splash URL for a guild's invite splash.
   *
   * @param guildId - The guild id that has the invite splash
   * @param splashHash - The hash provided by Discord for this splash
   * @param options - Optional options for the splash
   */
  splash(guildId, splashHash, options) {
    return this.makeURL(`/splashes/${guildId}/${splashHash}`, options);
  }
  /**
   * Generates a sticker URL.
   *
   * @param stickerId - The sticker id
   * @param extension - The extension of the sticker
   * @privateRemarks
   * Stickers cannot have a `.webp` extension, so we default to a `.png`
   */
  sticker(stickerId, extension = "png") {
    return this.makeURL(`/stickers/${stickerId}`, { allowedExtensions: ALLOWED_STICKER_EXTENSIONS, extension });
  }
  /**
   * Generates a sticker pack banner URL.
   *
   * @param bannerId - The banner id
   * @param options - Optional options for the banner
   */
  stickerPackBanner(bannerId, options) {
    return this.makeURL(`/app-assets/710982414301790216/store/${bannerId}`, options);
  }
  /**
   * Generates a team icon URL for a team's icon.
   *
   * @param teamId - The team id that has the icon
   * @param iconHash - The hash provided by Discord for this icon
   * @param options - Optional options for the icon
   */
  teamIcon(teamId, iconHash, options) {
    return this.makeURL(`/team-icons/${teamId}/${iconHash}`, options);
  }
  /**
   * Generates a cover image for a guild scheduled event.
   *
   * @param scheduledEventId - The scheduled event id
   * @param coverHash - The hash provided by discord for this cover image
   * @param options - Optional options for the cover image
   */
  guildScheduledEventCover(scheduledEventId, coverHash, options) {
    return this.makeURL(`/guild-events/${scheduledEventId}/${coverHash}`, options);
  }
  /**
   * Constructs the URL for the resource, checking whether or not `hash` starts with `a_` if `dynamic` is set to `true`.
   *
   * @param route - The base cdn route
   * @param hash - The hash provided by Discord for this icon
   * @param options - Optional options for the link
   */
  dynamicMakeURL(route, hash, { forceStatic = false, ...options } = {}) {
    return this.makeURL(route, !forceStatic && hash.startsWith("a_") ? { ...options, extension: "gif" } : options);
  }
  /**
   * Constructs the URL for the resource
   *
   * @param route - The base cdn route
   * @param options - The extension/size options for the link
   */
  makeURL(route, { allowedExtensions = ALLOWED_EXTENSIONS, extension = "webp", size } = {}) {
    extension = String(extension).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      throw new RangeError(`Invalid extension provided: ${extension}
Must be one of: ${allowedExtensions.join(", ")}`);
    }
    if (size && !ALLOWED_SIZES.includes(size)) {
      throw new RangeError(`Invalid size provided: ${size}
Must be one of: ${ALLOWED_SIZES.join(", ")}`);
    }
    const url = new URL(`${this.base}${route}.${extension}`);
    if (size) {
      url.searchParams.set("size", String(size));
    }
    return url.toString();
  }
};

// src/lib/errors/DiscordAPIError.ts
function isErrorGroupWrapper(error) {
  return Reflect.has(error, "_errors");
}
__name(isErrorGroupWrapper, "isErrorGroupWrapper");
function isErrorResponse(error) {
  return typeof Reflect.get(error, "message") === "string";
}
__name(isErrorResponse, "isErrorResponse");
var DiscordAPIError = class _DiscordAPIError extends Error {
  /**
   * @param rawError - The error reported by Discord
   * @param code - The error code reported by Discord
   * @param status - The status code of the response
   * @param method - The method of the request that erred
   * @param url - The url of the request that erred
   * @param bodyData - The unparsed data for the request that errored
   */
  constructor(rawError, code, status, method, url, bodyData) {
    super(_DiscordAPIError.getMessage(rawError));
    this.rawError = rawError;
    this.code = code;
    this.status = status;
    this.method = method;
    this.url = url;
    this.requestBody = { files: bodyData.files, json: bodyData.body };
  }
  static {
    __name(this, "DiscordAPIError");
  }
  requestBody;
  /**
   * The name of the error
   */
  get name() {
    return `${_DiscordAPIError.name}[${this.code}]`;
  }
  static getMessage(error) {
    let flattened = "";
    if ("code" in error) {
      if (error.errors) {
        flattened = [...this.flattenDiscordError(error.errors)].join("\n");
      }
      return error.message && flattened ? `${error.message}
${flattened}` : error.message || flattened || "Unknown Error";
    }
    return error.error_description ?? "No Description";
  }
  static *flattenDiscordError(obj, key = "") {
    if (isErrorResponse(obj)) {
      return yield `${key.length ? `${key}[${obj.code}]` : `${obj.code}`}: ${obj.message}`.trim();
    }
    for (const [otherKey, val] of Object.entries(obj)) {
      const nextKey = otherKey.startsWith("_") ? key : key ? Number.isNaN(Number(otherKey)) ? `${key}.${otherKey}` : `${key}[${otherKey}]` : otherKey;
      if (typeof val === "string") {
        yield val;
      } else if (isErrorGroupWrapper(val)) {
        for (const error of val._errors) {
          yield* this.flattenDiscordError(error, nextKey);
        }
      } else {
        yield* this.flattenDiscordError(val, nextKey);
      }
    }
  }
};

// src/lib/errors/HTTPError.ts
var HTTPError = class _HTTPError extends Error {
  /**
   * @param status - The status code of the response
   * @param statusText - The status text of the response
   * @param method - The method of the request that erred
   * @param url - The url of the request that erred
   * @param bodyData - The unparsed data for the request that errored
   */
  constructor(status, statusText, method, url, bodyData) {
    super(statusText);
    this.status = status;
    this.method = method;
    this.url = url;
    this.requestBody = { files: bodyData.files, json: bodyData.body };
  }
  static {
    __name(this, "HTTPError");
  }
  requestBody;
  name = _HTTPError.name;
};

// src/lib/REST.ts
import { Collection } from "@discordjs/collection";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { AsyncEventEmitter } from "@vladfrangu/async_event_emitter";
import { filetypeinfo } from "magic-bytes.js";

// src/lib/handlers/Shared.ts
var invalidCount = 0;
var invalidCountResetTime = null;
function incrementInvalidCount(manager) {
  if (!invalidCountResetTime || invalidCountResetTime < Date.now()) {
    invalidCountResetTime = Date.now() + 1e3 * 60 * 10;
    invalidCount = 0;
  }
  invalidCount++;
  const emitInvalid = manager.options.invalidRequestWarningInterval > 0 && invalidCount % manager.options.invalidRequestWarningInterval === 0;
  if (emitInvalid) {
    manager.emit("invalidRequestWarning" /* InvalidRequestWarning */, {
      count: invalidCount,
      remainingTime: invalidCountResetTime - Date.now()
    });
  }
}
__name(incrementInvalidCount, "incrementInvalidCount");
async function makeNetworkRequest(manager, routeId, url, options, requestData, retries) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), manager.options.timeout);
  if (requestData.signal) {
    if (requestData.signal.aborted)
      controller.abort();
    else
      requestData.signal.addEventListener("abort", () => controller.abort());
  }
  let res;
  try {
    res = await manager.options.makeRequest(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (!(error instanceof Error))
      throw error;
    if (shouldRetry(error) && retries !== manager.options.retries) {
      return null;
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
  if (manager.listenerCount("response" /* Response */)) {
    manager.emit(
      "response" /* Response */,
      {
        method: options.method ?? "get",
        path: routeId.original,
        route: routeId.bucketRoute,
        options,
        data: requestData,
        retries
      },
      res instanceof Response ? res.clone() : { ...res }
    );
  }
  return res;
}
__name(makeNetworkRequest, "makeNetworkRequest");
async function handleErrors(manager, res, method, url, requestData, retries) {
  const status = res.status;
  if (status >= 500 && status < 600) {
    if (retries !== manager.options.retries) {
      return null;
    }
    throw new HTTPError(status, res.statusText, method, url, requestData);
  } else {
    if (status >= 400 && status < 500) {
      if (status === 401 && requestData.auth) {
        manager.setToken(null);
      }
      const data = await parseResponse(res);
      throw new DiscordAPIError(data, "code" in data ? data.code : data.error, status, method, url, requestData);
    }
    return res;
  }
}
__name(handleErrors, "handleErrors");

// src/lib/handlers/BurstHandler.ts
var BurstHandler = class {
  /**
   * @param manager - The request manager
   * @param hash - The hash that this RequestHandler handles
   * @param majorParameter - The major parameter for this handler
   */
  constructor(manager, hash, majorParameter) {
    this.manager = manager;
    this.hash = hash;
    this.majorParameter = majorParameter;
    this.id = `${hash}:${majorParameter}`;
  }
  static {
    __name(this, "BurstHandler");
  }
  /**
   * {@inheritdoc IHandler.id}
   */
  id;
  /**
   * {@inheritDoc IHandler.inactive}
   */
  inactive = false;
  /**
   * Emits a debug message
   *
   * @param message - The message to debug
   */
  debug(message) {
    this.manager.emit("restDebug" /* Debug */, `[REST ${this.id}] ${message}`);
  }
  /**
   * {@inheritDoc IHandler.queueRequest}
   */
  async queueRequest(routeId, url, options, requestData) {
    return this.runRequest(routeId, url, options, requestData);
  }
  /**
   * The method that actually makes the request to the API, and updates info about the bucket accordingly
   *
   * @param routeId - The generalized API route with literal ids for major parameters
   * @param url - The fully resolved URL to make the request to
   * @param options - The fetch options needed to make the request
   * @param requestData - Extra data from the user's request needed for errors and additional processing
   * @param retries - The number of retries this request has already attempted (recursion)
   */
  async runRequest(routeId, url, options, requestData, retries = 0) {
    const method = options.method ?? "get";
    const res = await makeNetworkRequest(this.manager, routeId, url, options, requestData, retries);
    if (res === null) {
      return this.runRequest(routeId, url, options, requestData, ++retries);
    }
    const status = res.status;
    let retryAfter = 0;
    const retry = res.headers.get("Retry-After");
    if (retry)
      retryAfter = Number(retry) * 1e3 + this.manager.options.offset;
    if (status === 401 || status === 403 || status === 429) {
      incrementInvalidCount(this.manager);
    }
    if (status >= 200 && status < 300) {
      return res;
    } else if (status === 429) {
      const isGlobal = res.headers.has("X-RateLimit-Global");
      const scope = res.headers.get("X-RateLimit-Scope") ?? "user";
      await onRateLimit(this.manager, {
        global: isGlobal,
        method,
        url,
        route: routeId.bucketRoute,
        majorParameter: this.majorParameter,
        hash: this.hash,
        limit: Number.POSITIVE_INFINITY,
        timeToReset: retryAfter,
        retryAfter,
        sublimitTimeout: 0,
        scope
      });
      this.debug(
        [
          "Encountered unexpected 429 rate limit",
          `  Global         : ${isGlobal}`,
          `  Method         : ${method}`,
          `  URL            : ${url}`,
          `  Bucket         : ${routeId.bucketRoute}`,
          `  Major parameter: ${routeId.majorParameter}`,
          `  Hash           : ${this.hash}`,
          `  Limit          : ${Number.POSITIVE_INFINITY}`,
          `  Retry After    : ${retryAfter}ms`,
          `  Sublimit       : None`,
          `  Scope          : ${scope}`
        ].join("\n")
      );
      await sleep(retryAfter);
      return this.runRequest(routeId, url, options, requestData, retries);
    } else {
      const handled = await handleErrors(this.manager, res, method, url, requestData, retries);
      if (handled === null) {
        return this.runRequest(routeId, url, options, requestData, ++retries);
      }
      return handled;
    }
  }
};

// src/lib/handlers/SequentialHandler.ts
import { AsyncQueue } from "@sapphire/async-queue";
var SequentialHandler = class {
  /**
   * @param manager - The request manager
   * @param hash - The hash that this RequestHandler handles
   * @param majorParameter - The major parameter for this handler
   */
  constructor(manager, hash, majorParameter) {
    this.manager = manager;
    this.hash = hash;
    this.majorParameter = majorParameter;
    this.id = `${hash}:${majorParameter}`;
  }
  static {
    __name(this, "SequentialHandler");
  }
  /**
   * {@inheritDoc IHandler.id}
   */
  id;
  /**
   * The time this rate limit bucket will reset
   */
  reset = -1;
  /**
   * The remaining requests that can be made before we are rate limited
   */
  remaining = 1;
  /**
   * The total number of requests that can be made before we are rate limited
   */
  limit = Number.POSITIVE_INFINITY;
  /**
   * The interface used to sequence async requests sequentially
   */
  #asyncQueue = new AsyncQueue();
  /**
   * The interface used to sequence sublimited async requests sequentially
   */
  #sublimitedQueue = null;
  /**
   * A promise wrapper for when the sublimited queue is finished being processed or null when not being processed
   */
  #sublimitPromise = null;
  /**
   * Whether the sublimit queue needs to be shifted in the finally block
   */
  #shiftSublimit = false;
  /**
   * {@inheritDoc IHandler.inactive}
   */
  get inactive() {
    return this.#asyncQueue.remaining === 0 && (this.#sublimitedQueue === null || this.#sublimitedQueue.remaining === 0) && !this.limited;
  }
  /**
   * If the rate limit bucket is currently limited by the global limit
   */
  get globalLimited() {
    return this.manager.globalRemaining <= 0 && Date.now() < this.manager.globalReset;
  }
  /**
   * If the rate limit bucket is currently limited by its limit
   */
  get localLimited() {
    return this.remaining <= 0 && Date.now() < this.reset;
  }
  /**
   * If the rate limit bucket is currently limited
   */
  get limited() {
    return this.globalLimited || this.localLimited;
  }
  /**
   * The time until queued requests can continue
   */
  get timeToReset() {
    return this.reset + this.manager.options.offset - Date.now();
  }
  /**
   * Emits a debug message
   *
   * @param message - The message to debug
   */
  debug(message) {
    this.manager.emit("restDebug" /* Debug */, `[REST ${this.id}] ${message}`);
  }
  /**
   * Delay all requests for the specified amount of time, handling global rate limits
   *
   * @param time - The amount of time to delay all requests for
   */
  async globalDelayFor(time) {
    await sleep(time);
    this.manager.globalDelay = null;
  }
  /**
   * {@inheritDoc IHandler.queueRequest}
   */
  async queueRequest(routeId, url, options, requestData) {
    let queue = this.#asyncQueue;
    let queueType = 0 /* Standard */;
    if (this.#sublimitedQueue && hasSublimit(routeId.bucketRoute, requestData.body, options.method)) {
      queue = this.#sublimitedQueue;
      queueType = 1 /* Sublimit */;
    }
    await queue.wait({ signal: requestData.signal });
    if (queueType === 0 /* Standard */) {
      if (this.#sublimitedQueue && hasSublimit(routeId.bucketRoute, requestData.body, options.method)) {
        queue = this.#sublimitedQueue;
        const wait = queue.wait();
        this.#asyncQueue.shift();
        await wait;
      } else if (this.#sublimitPromise) {
        await this.#sublimitPromise.promise;
      }
    }
    try {
      return await this.runRequest(routeId, url, options, requestData);
    } finally {
      queue.shift();
      if (this.#shiftSublimit) {
        this.#shiftSublimit = false;
        this.#sublimitedQueue?.shift();
      }
      if (this.#sublimitedQueue?.remaining === 0) {
        this.#sublimitPromise?.resolve();
        this.#sublimitedQueue = null;
      }
    }
  }
  /**
   * The method that actually makes the request to the api, and updates info about the bucket accordingly
   *
   * @param routeId - The generalized api route with literal ids for major parameters
   * @param url - The fully resolved url to make the request to
   * @param options - The fetch options needed to make the request
   * @param requestData - Extra data from the user's request needed for errors and additional processing
   * @param retries - The number of retries this request has already attempted (recursion)
   */
  async runRequest(routeId, url, options, requestData, retries = 0) {
    while (this.limited) {
      const isGlobal = this.globalLimited;
      let limit2;
      let timeout;
      let delay;
      if (isGlobal) {
        limit2 = this.manager.options.globalRequestsPerSecond;
        timeout = this.manager.globalReset + this.manager.options.offset - Date.now();
        if (!this.manager.globalDelay) {
          this.manager.globalDelay = this.globalDelayFor(timeout);
        }
        delay = this.manager.globalDelay;
      } else {
        limit2 = this.limit;
        timeout = this.timeToReset;
        delay = sleep(timeout);
      }
      const rateLimitData = {
        global: isGlobal,
        method: options.method ?? "get",
        url,
        route: routeId.bucketRoute,
        majorParameter: this.majorParameter,
        hash: this.hash,
        limit: limit2,
        timeToReset: timeout,
        retryAfter: timeout,
        sublimitTimeout: 0,
        scope: "user"
      };
      this.manager.emit("rateLimited" /* RateLimited */, rateLimitData);
      await onRateLimit(this.manager, rateLimitData);
      if (isGlobal) {
        this.debug(`Global rate limit hit, blocking all requests for ${timeout}ms`);
      } else {
        this.debug(`Waiting ${timeout}ms for rate limit to pass`);
      }
      await delay;
    }
    if (!this.manager.globalReset || this.manager.globalReset < Date.now()) {
      this.manager.globalReset = Date.now() + 1e3;
      this.manager.globalRemaining = this.manager.options.globalRequestsPerSecond;
    }
    this.manager.globalRemaining--;
    const method = options.method ?? "get";
    const res = await makeNetworkRequest(this.manager, routeId, url, options, requestData, retries);
    if (res === null) {
      return this.runRequest(routeId, url, options, requestData, ++retries);
    }
    const status = res.status;
    let retryAfter = 0;
    const limit = res.headers.get("X-RateLimit-Limit");
    const remaining = res.headers.get("X-RateLimit-Remaining");
    const reset = res.headers.get("X-RateLimit-Reset-After");
    const hash = res.headers.get("X-RateLimit-Bucket");
    const retry = res.headers.get("Retry-After");
    const scope = res.headers.get("X-RateLimit-Scope") ?? "user";
    this.limit = limit ? Number(limit) : Number.POSITIVE_INFINITY;
    this.remaining = remaining ? Number(remaining) : 1;
    this.reset = reset ? Number(reset) * 1e3 + Date.now() + this.manager.options.offset : Date.now();
    if (retry)
      retryAfter = Number(retry) * 1e3 + this.manager.options.offset;
    if (hash && hash !== this.hash) {
      this.debug(["Received bucket hash update", `  Old Hash  : ${this.hash}`, `  New Hash  : ${hash}`].join("\n"));
      this.manager.hashes.set(`${method}:${routeId.bucketRoute}`, { value: hash, lastAccess: Date.now() });
    } else if (hash) {
      const hashData = this.manager.hashes.get(`${method}:${routeId.bucketRoute}`);
      if (hashData) {
        hashData.lastAccess = Date.now();
      }
    }
    let sublimitTimeout = null;
    if (retryAfter > 0) {
      if (res.headers.has("X-RateLimit-Global")) {
        this.manager.globalRemaining = 0;
        this.manager.globalReset = Date.now() + retryAfter;
      } else if (!this.localLimited) {
        sublimitTimeout = retryAfter;
      }
    }
    if (status === 401 || status === 403 || status === 429) {
      incrementInvalidCount(this.manager);
    }
    if (res.ok) {
      return res;
    } else if (status === 429) {
      const isGlobal = this.globalLimited;
      let limit2;
      let timeout;
      if (isGlobal) {
        limit2 = this.manager.options.globalRequestsPerSecond;
        timeout = this.manager.globalReset + this.manager.options.offset - Date.now();
      } else {
        limit2 = this.limit;
        timeout = this.timeToReset;
      }
      await onRateLimit(this.manager, {
        global: isGlobal,
        method,
        url,
        route: routeId.bucketRoute,
        majorParameter: this.majorParameter,
        hash: this.hash,
        limit: limit2,
        timeToReset: timeout,
        retryAfter,
        sublimitTimeout: sublimitTimeout ?? 0,
        scope
      });
      this.debug(
        [
          "Encountered unexpected 429 rate limit",
          `  Global         : ${isGlobal.toString()}`,
          `  Method         : ${method}`,
          `  URL            : ${url}`,
          `  Bucket         : ${routeId.bucketRoute}`,
          `  Major parameter: ${routeId.majorParameter}`,
          `  Hash           : ${this.hash}`,
          `  Limit          : ${limit2}`,
          `  Retry After    : ${retryAfter}ms`,
          `  Sublimit       : ${sublimitTimeout ? `${sublimitTimeout}ms` : "None"}`,
          `  Scope          : ${scope}`
        ].join("\n")
      );
      if (sublimitTimeout) {
        const firstSublimit = !this.#sublimitedQueue;
        if (firstSublimit) {
          this.#sublimitedQueue = new AsyncQueue();
          void this.#sublimitedQueue.wait();
          this.#asyncQueue.shift();
        }
        this.#sublimitPromise?.resolve();
        this.#sublimitPromise = null;
        await sleep(sublimitTimeout);
        let resolve;
        const promise = new Promise((res2) => resolve = res2);
        this.#sublimitPromise = { promise, resolve };
        if (firstSublimit) {
          await this.#asyncQueue.wait();
          this.#shiftSublimit = true;
        }
      }
      return this.runRequest(routeId, url, options, requestData, retries);
    } else {
      const handled = await handleErrors(this.manager, res, method, url, requestData, retries);
      if (handled === null) {
        return this.runRequest(routeId, url, options, requestData, ++retries);
      }
      return handled;
    }
  }
};

// src/lib/REST.ts
var REST = class _REST extends AsyncEventEmitter {
  static {
    __name(this, "REST");
  }
  /**
   * The {@link https://undici.nodejs.org/#/docs/api/Agent | Agent} for all requests
   * performed by this manager.
   */
  agent = null;
  cdn;
  /**
   * The number of requests remaining in the global bucket
   */
  globalRemaining;
  /**
   * The promise used to wait out the global rate limit
   */
  globalDelay = null;
  /**
   * The timestamp at which the global bucket resets
   */
  globalReset = -1;
  /**
   * API bucket hashes that are cached from provided routes
   */
  hashes = new Collection();
  /**
   * Request handlers created from the bucket hash and the major parameters
   */
  handlers = new Collection();
  #token = null;
  hashTimer;
  handlerTimer;
  options;
  constructor(options = {}) {
    super();
    this.cdn = new CDN(options.cdn ?? DefaultRestOptions.cdn);
    this.options = { ...DefaultRestOptions, ...options };
    this.options.offset = Math.max(0, this.options.offset);
    this.globalRemaining = Math.max(1, this.options.globalRequestsPerSecond);
    this.agent = options.agent ?? null;
    this.setupSweepers();
  }
  setupSweepers() {
    const validateMaxInterval = /* @__PURE__ */ __name((interval) => {
      if (interval > 144e5) {
        throw new Error("Cannot set an interval greater than 4 hours");
      }
    }, "validateMaxInterval");
    if (this.options.hashSweepInterval !== 0 && this.options.hashSweepInterval !== Number.POSITIVE_INFINITY) {
      validateMaxInterval(this.options.hashSweepInterval);
      this.hashTimer = setInterval(() => {
        const sweptHashes = new Collection();
        const currentDate = Date.now();
        this.hashes.sweep((val, key) => {
          if (val.lastAccess === -1)
            return false;
          const shouldSweep = Math.floor(currentDate - val.lastAccess) > this.options.hashLifetime;
          if (shouldSweep) {
            sweptHashes.set(key, val);
            this.emit("restDebug" /* Debug */, `Hash ${val.value} for ${key} swept due to lifetime being exceeded`);
          }
          return shouldSweep;
        });
        this.emit("hashSweep" /* HashSweep */, sweptHashes);
      }, this.options.hashSweepInterval);
      this.hashTimer.unref?.();
    }
    if (this.options.handlerSweepInterval !== 0 && this.options.handlerSweepInterval !== Number.POSITIVE_INFINITY) {
      validateMaxInterval(this.options.handlerSweepInterval);
      this.handlerTimer = setInterval(() => {
        const sweptHandlers = new Collection();
        this.handlers.sweep((val, key) => {
          const { inactive } = val;
          if (inactive) {
            sweptHandlers.set(key, val);
            this.emit("restDebug" /* Debug */, `Handler ${val.id} for ${key} swept due to being inactive`);
          }
          return inactive;
        });
        this.emit("handlerSweep" /* HandlerSweep */, sweptHandlers);
      }, this.options.handlerSweepInterval);
      this.handlerTimer.unref?.();
    }
  }
  /**
   * Runs a get request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async get(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "GET" /* Get */ });
  }
  /**
   * Runs a delete request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async delete(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "DELETE" /* Delete */ });
  }
  /**
   * Runs a post request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async post(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "POST" /* Post */ });
  }
  /**
   * Runs a put request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async put(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "PUT" /* Put */ });
  }
  /**
   * Runs a patch request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  async patch(fullRoute, options = {}) {
    return this.request({ ...options, fullRoute, method: "PATCH" /* Patch */ });
  }
  /**
   * Runs a request from the api
   *
   * @param options - Request options
   */
  async request(options) {
    const response = await this.queueRequest(options);
    return parseResponse(response);
  }
  /**
   * Sets the default agent to use for requests performed by this manager
   *
   * @param agent - The agent to use
   */
  setAgent(agent) {
    this.agent = agent;
    return this;
  }
  /**
   * Sets the authorization token that should be used for requests
   *
   * @param token - The authorization token to use
   */
  setToken(token) {
    this.#token = token;
    return this;
  }
  /**
   * Queues a request to be sent
   *
   * @param request - All the information needed to make a request
   * @returns The response from the api request
   */
  async queueRequest(request) {
    const routeId = _REST.generateRouteData(request.fullRoute, request.method);
    const hash = this.hashes.get(`${request.method}:${routeId.bucketRoute}`) ?? {
      value: `Global(${request.method}:${routeId.bucketRoute})`,
      lastAccess: -1
    };
    const handler = this.handlers.get(`${hash.value}:${routeId.majorParameter}`) ?? this.createHandler(hash.value, routeId.majorParameter);
    const { url, fetchOptions } = await this.resolveRequest(request);
    return handler.queueRequest(routeId, url, fetchOptions, {
      body: request.body,
      files: request.files,
      auth: request.auth !== false,
      signal: request.signal
    });
  }
  /**
   * Creates a new rate limit handler from a hash, based on the hash and the major parameter
   *
   * @param hash - The hash for the route
   * @param majorParameter - The major parameter for this handler
   * @internal
   */
  createHandler(hash, majorParameter) {
    const queue = majorParameter === BurstHandlerMajorIdKey ? new BurstHandler(this, hash, majorParameter) : new SequentialHandler(this, hash, majorParameter);
    this.handlers.set(queue.id, queue);
    return queue;
  }
  /**
   * Formats the request data to a usable format for fetch
   *
   * @param request - The request data
   */
  async resolveRequest(request) {
    const { options } = this;
    let query = "";
    if (request.query) {
      const resolvedQuery = request.query.toString();
      if (resolvedQuery !== "") {
        query = `?${resolvedQuery}`;
      }
    }
    const headers = {
      ...this.options.headers,
      "User-Agent": `${DefaultUserAgent} ${options.userAgentAppendix}`.trim()
    };
    if (request.auth !== false) {
      if (!this.#token) {
        throw new Error("Expected token to be set for this request, but none was present");
      }
      headers.Authorization = `${request.authPrefix ?? this.options.authPrefix} ${this.#token}`;
    }
    if (request.reason?.length) {
      headers["X-Audit-Log-Reason"] = encodeURIComponent(request.reason);
    }
    const url = `${options.api}${request.versioned === false ? "" : `/v${options.version}`}${request.fullRoute}${query}`;
    let finalBody;
    let additionalHeaders = {};
    if (request.files?.length) {
      const formData = new FormData();
      for (const [index, file] of request.files.entries()) {
        const fileKey = file.key ?? `files[${index}]`;
        if (isBufferLike(file.data)) {
          let contentType = file.contentType;
          if (!contentType) {
            const [parsedType] = filetypeinfo(file.data);
            if (parsedType) {
              contentType = OverwrittenMimeTypes[parsedType.mime] ?? parsedType.mime ?? "application/octet-stream";
            }
          }
          formData.append(fileKey, new Blob([file.data], { type: contentType }), file.name);
        } else {
          formData.append(fileKey, new Blob([`${file.data}`], { type: file.contentType }), file.name);
        }
      }
      if (request.body != null) {
        if (request.appendToFormData) {
          for (const [key, value] of Object.entries(request.body)) {
            formData.append(key, value);
          }
        } else {
          formData.append("payload_json", JSON.stringify(request.body));
        }
      }
      finalBody = formData;
    } else if (request.body != null) {
      if (request.passThroughBody) {
        finalBody = request.body;
      } else {
        finalBody = JSON.stringify(request.body);
        additionalHeaders = { "Content-Type": "application/json" };
      }
    }
    const method = request.method.toUpperCase();
    const fetchOptions = {
      // Set body to null on get / head requests. This does not follow fetch spec (likely because it causes subtle bugs) but is aligned with what request was doing
      body: ["GET", "HEAD"].includes(method) ? null : finalBody,
      headers: { ...request.headers, ...additionalHeaders, ...headers },
      method,
      // Prioritize setting an agent per request, use the agent for this instance otherwise.
      dispatcher: request.dispatcher ?? this.agent ?? void 0
    };
    return { url, fetchOptions };
  }
  /**
   * Stops the hash sweeping interval
   */
  clearHashSweeper() {
    clearInterval(this.hashTimer);
  }
  /**
   * Stops the request handler sweeping interval
   */
  clearHandlerSweeper() {
    clearInterval(this.handlerTimer);
  }
  /**
   * Generates route data for an endpoint:method
   *
   * @param endpoint - The raw endpoint to generalize
   * @param method - The HTTP method this endpoint is called without
   * @internal
   */
  static generateRouteData(endpoint, method) {
    if (endpoint.startsWith("/interactions/") && endpoint.endsWith("/callback")) {
      return {
        majorParameter: BurstHandlerMajorIdKey,
        bucketRoute: "/interactions/:id/:token/callback",
        original: endpoint
      };
    }
    const majorIdMatch = /(?:^\/webhooks\/(\d{17,19}\/[^/?]+))|(?:^\/(?:channels|guilds|webhooks)\/(\d{17,19}))/.exec(
      endpoint
    );
    const majorId = majorIdMatch?.[2] ?? majorIdMatch?.[1] ?? "global";
    const baseRoute = endpoint.replaceAll(/\d{17,19}/g, ":id").replace(/\/reactions\/(.*)/, "/reactions/:reaction").replace(/\/webhooks\/:id\/[^/?]+/, "/webhooks/:id/:token");
    let exceptions = "";
    if (method === "DELETE" /* Delete */ && baseRoute === "/channels/:id/messages/:id") {
      const id = /\d{17,19}$/.exec(endpoint)[0];
      const timestamp = DiscordSnowflake.timestampFrom(id);
      if (Date.now() - timestamp > 1e3 * 60 * 60 * 24 * 14) {
        exceptions += "/Delete Old Message";
      }
    }
    return {
      majorParameter: majorId,
      bucketRoute: baseRoute + exceptions,
      original: endpoint
    };
  }
};

// src/shared.ts
var version = "2.2.0";

// src/web.ts
setDefaultStrategy(fetch);
export {
  ALLOWED_EXTENSIONS,
  ALLOWED_SIZES,
  ALLOWED_STICKER_EXTENSIONS,
  BurstHandlerMajorIdKey,
  CDN,
  DEPRECATION_WARNING_PREFIX,
  DefaultRestOptions,
  DefaultUserAgent,
  DefaultUserAgentAppendix,
  DiscordAPIError,
  HTTPError,
  OverwrittenMimeTypes,
  REST,
  RESTEvents,
  RateLimitError,
  RequestMethod,
  calculateUserDefaultAvatarIndex,
  makeURLSearchParams,
  parseResponse,
  version
};
//# sourceMappingURL=web.mjs.map