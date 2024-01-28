"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/utils/WorkerBootstrapper.ts
var import_node_worker_threads3 = require("worker_threads");
var import_collection7 = require("@discordjs/collection");

// src/strategies/context/WorkerContextFetchingStrategy.ts
var import_node_worker_threads2 = require("worker_threads");
var import_collection2 = require("@discordjs/collection");

// src/strategies/sharding/WorkerShardingStrategy.ts
var import_node_events = require("events");
var import_node_path = require("path");
var import_node_worker_threads = require("worker_threads");
var import_collection = require("@discordjs/collection");

// src/strategies/context/IContextFetchingStrategy.ts
async function managerToFetchingStrategyOptions(manager) {
  const {
    buildIdentifyThrottler,
    buildStrategy,
    retrieveSessionInfo,
    updateSessionInfo,
    shardCount,
    shardIds,
    rest,
    ...managerOptions
  } = manager.options;
  return {
    ...managerOptions,
    gatewayInformation: await manager.fetchGatewayInformation(),
    shardCount: await manager.getShardCount()
  };
}
__name(managerToFetchingStrategyOptions, "managerToFetchingStrategyOptions");

// src/strategies/context/WorkerContextFetchingStrategy.ts
var WorkerContextFetchingStrategy = class {
  constructor(options) {
    this.options = options;
    if (import_node_worker_threads2.isMainThread) {
      throw new Error("Cannot instantiate WorkerContextFetchingStrategy on the main thread");
    }
    import_node_worker_threads2.parentPort.on("message", (payload) => {
      if (payload.op === 3 /* SessionInfoResponse */) {
        this.sessionPromises.get(payload.nonce)?.(payload.session);
        this.sessionPromises.delete(payload.nonce);
      }
      if (payload.op === 4 /* ShardIdentifyResponse */) {
        const promise = this.waitForIdentifyPromises.get(payload.nonce);
        if (payload.ok) {
          promise?.resolve();
        } else {
          promise?.reject(promise.signal.reason);
        }
        this.waitForIdentifyPromises.delete(payload.nonce);
      }
    });
  }
  static {
    __name(this, "WorkerContextFetchingStrategy");
  }
  sessionPromises = new import_collection2.Collection();
  waitForIdentifyPromises = new import_collection2.Collection();
  async retrieveSessionInfo(shardId) {
    const nonce = Math.random();
    const payload = {
      op: 3 /* RetrieveSessionInfo */,
      shardId,
      nonce
    };
    const promise = new Promise((resolve2) => this.sessionPromises.set(nonce, resolve2));
    import_node_worker_threads2.parentPort.postMessage(payload);
    return promise;
  }
  updateSessionInfo(shardId, sessionInfo) {
    const payload = {
      op: 4 /* UpdateSessionInfo */,
      shardId,
      session: sessionInfo
    };
    import_node_worker_threads2.parentPort.postMessage(payload);
  }
  async waitForIdentify(shardId, signal) {
    const nonce = Math.random();
    const payload = {
      op: 5 /* WaitForIdentify */,
      nonce,
      shardId
    };
    const promise = new Promise(
      (resolve2, reject) => (
        // eslint-disable-next-line no-promise-executor-return
        this.waitForIdentifyPromises.set(nonce, { signal, resolve: resolve2, reject })
      )
    );
    import_node_worker_threads2.parentPort.postMessage(payload);
    const listener = /* @__PURE__ */ __name(() => {
      const payload2 = {
        op: 8 /* CancelIdentify */,
        nonce
      };
      import_node_worker_threads2.parentPort.postMessage(payload2);
    }, "listener");
    signal.addEventListener("abort", listener);
    try {
      await promise;
    } finally {
      signal.removeEventListener("abort", listener);
    }
  }
};

// src/ws/WebSocketShard.ts
var import_node_buffer = require("buffer");
var import_node_events2 = require("events");
var import_node_timers = require("timers");
var import_promises2 = require("timers/promises");
var import_node_url = require("url");
var import_node_util = require("util");
var import_node_zlib = require("zlib");
var import_collection6 = require("@discordjs/collection");
var import_util2 = require("@discordjs/util");
var import_async_queue2 = require("@sapphire/async-queue");
var import_async_event_emitter = require("@vladfrangu/async_event_emitter");
var import_v102 = require("discord-api-types/v10");
var import_ws = require("ws");

// src/utils/constants.ts
var import_node_process = __toESM(require("process"));
var import_collection5 = require("@discordjs/collection");
var import_util = require("@discordjs/util");
var import_v10 = require("discord-api-types/v10");

// src/strategies/sharding/SimpleShardingStrategy.ts
var import_collection3 = require("@discordjs/collection");

// src/strategies/context/SimpleContextFetchingStrategy.ts
var SimpleContextFetchingStrategy = class _SimpleContextFetchingStrategy {
  constructor(manager, options) {
    this.manager = manager;
    this.options = options;
  }
  static {
    __name(this, "SimpleContextFetchingStrategy");
  }
  // This strategy assumes every shard is running under the same process - therefore we need a single
  // IdentifyThrottler per manager.
  static throttlerCache = /* @__PURE__ */ new WeakMap();
  static async ensureThrottler(manager) {
    const throttler = _SimpleContextFetchingStrategy.throttlerCache.get(manager);
    if (throttler) {
      return throttler;
    }
    const newThrottler = await manager.options.buildIdentifyThrottler(manager);
    _SimpleContextFetchingStrategy.throttlerCache.set(manager, newThrottler);
    return newThrottler;
  }
  async retrieveSessionInfo(shardId) {
    return this.manager.options.retrieveSessionInfo(shardId);
  }
  updateSessionInfo(shardId, sessionInfo) {
    return this.manager.options.updateSessionInfo(shardId, sessionInfo);
  }
  async waitForIdentify(shardId, signal) {
    const throttler = await _SimpleContextFetchingStrategy.ensureThrottler(this.manager);
    await throttler.waitForIdentify(shardId, signal);
  }
};

// src/strategies/sharding/SimpleShardingStrategy.ts
var SimpleShardingStrategy = class {
  static {
    __name(this, "SimpleShardingStrategy");
  }
  manager;
  shards = new import_collection3.Collection();
  constructor(manager) {
    this.manager = manager;
  }
  /**
   * {@inheritDoc IShardingStrategy.spawn}
   */
  async spawn(shardIds) {
    const strategyOptions = await managerToFetchingStrategyOptions(this.manager);
    for (const shardId of shardIds) {
      const strategy = new SimpleContextFetchingStrategy(this.manager, strategyOptions);
      const shard = new WebSocketShard(strategy, shardId);
      for (const event of Object.values(WebSocketShardEvents)) {
        shard.on(event, (payload) => this.manager.emit(event, { ...payload, shardId }));
      }
      this.shards.set(shardId, shard);
    }
  }
  /**
   * {@inheritDoc IShardingStrategy.connect}
   */
  async connect() {
    const promises = [];
    for (const shard of this.shards.values()) {
      promises.push(shard.connect());
    }
    await Promise.all(promises);
  }
  /**
   * {@inheritDoc IShardingStrategy.destroy}
   */
  async destroy(options) {
    const promises = [];
    for (const shard of this.shards.values()) {
      promises.push(shard.destroy(options));
    }
    await Promise.all(promises);
    this.shards.clear();
  }
  /**
   * {@inheritDoc IShardingStrategy.send}
   */
  async send(shardId, payload) {
    const shard = this.shards.get(shardId);
    if (!shard) {
      throw new RangeError(`Shard ${shardId} not found`);
    }
    return shard.send(payload);
  }
  /**
   * {@inheritDoc IShardingStrategy.fetchStatus}
   */
  async fetchStatus() {
    return this.shards.mapValues((shard) => shard.status);
  }
};

// src/throttling/SimpleIdentifyThrottler.ts
var import_promises = require("timers/promises");
var import_collection4 = require("@discordjs/collection");
var import_async_queue = require("@sapphire/async-queue");
var SimpleIdentifyThrottler = class {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
  }
  static {
    __name(this, "SimpleIdentifyThrottler");
  }
  states = new import_collection4.Collection();
  /**
   * {@inheritDoc IIdentifyThrottler.waitForIdentify}
   */
  async waitForIdentify(shardId, signal) {
    const key = shardId % this.maxConcurrency;
    const state = this.states.ensure(key, () => {
      return {
        queue: new import_async_queue.AsyncQueue(),
        resetsAt: Number.POSITIVE_INFINITY
      };
    });
    await state.queue.wait({ signal });
    try {
      const diff = state.resetsAt - Date.now();
      if (diff <= 5e3) {
        const time = diff + Math.random() * 1500;
        await (0, import_promises.setTimeout)(time);
      }
      state.resetsAt = Date.now() + 5e3;
    } finally {
      state.queue.shift();
    }
  }
};

// src/utils/constants.ts
var DefaultDeviceProperty = `@discordjs/ws 1.0.2`;
var getDefaultSessionStore = (0, import_util.lazy)(() => new import_collection5.Collection());
var DefaultWebSocketManagerOptions = {
  async buildIdentifyThrottler(manager) {
    const info = await manager.fetchGatewayInformation();
    return new SimpleIdentifyThrottler(info.session_start_limit.max_concurrency);
  },
  buildStrategy: (manager) => new SimpleShardingStrategy(manager),
  shardCount: null,
  shardIds: null,
  largeThreshold: null,
  initialPresence: null,
  identifyProperties: {
    browser: DefaultDeviceProperty,
    device: DefaultDeviceProperty,
    os: import_node_process.default.platform
  },
  version: import_v10.APIVersion,
  encoding: "json" /* JSON */,
  compression: null,
  retrieveSessionInfo(shardId) {
    const store = getDefaultSessionStore();
    return store.get(shardId) ?? null;
  },
  updateSessionInfo(shardId, info) {
    const store = getDefaultSessionStore();
    if (info) {
      store.set(shardId, info);
    } else {
      store.delete(shardId);
    }
  },
  handshakeTimeout: 3e4,
  helloTimeout: 6e4,
  readyTimeout: 15e3
};
var ImportantGatewayOpcodes = /* @__PURE__ */ new Set([
  import_v10.GatewayOpcodes.Heartbeat,
  import_v10.GatewayOpcodes.Identify,
  import_v10.GatewayOpcodes.Resume
]);
function getInitialSendRateLimitState() {
  return {
    remaining: 120,
    resetAt: Date.now() + 6e4
  };
}
__name(getInitialSendRateLimitState, "getInitialSendRateLimitState");

// src/ws/WebSocketShard.ts
var getZlibSync = (0, import_util2.lazy)(async () => import("zlib-sync").then((mod) => mod.default).catch(() => null));
var WebSocketShardEvents = /* @__PURE__ */ ((WebSocketShardEvents2) => {
  WebSocketShardEvents2["Closed"] = "closed";
  WebSocketShardEvents2["Debug"] = "debug";
  WebSocketShardEvents2["Dispatch"] = "dispatch";
  WebSocketShardEvents2["Error"] = "error";
  WebSocketShardEvents2["HeartbeatComplete"] = "heartbeat";
  WebSocketShardEvents2["Hello"] = "hello";
  WebSocketShardEvents2["Ready"] = "ready";
  WebSocketShardEvents2["Resumed"] = "resumed";
  return WebSocketShardEvents2;
})(WebSocketShardEvents || {});
var WebSocketShardDestroyRecovery = /* @__PURE__ */ ((WebSocketShardDestroyRecovery2) => {
  WebSocketShardDestroyRecovery2[WebSocketShardDestroyRecovery2["Reconnect"] = 0] = "Reconnect";
  WebSocketShardDestroyRecovery2[WebSocketShardDestroyRecovery2["Resume"] = 1] = "Resume";
  return WebSocketShardDestroyRecovery2;
})(WebSocketShardDestroyRecovery || {});
var WebSocketConstructor = import_ws.WebSocket;
var WebSocketShard = class extends import_async_event_emitter.AsyncEventEmitter {
  static {
    __name(this, "WebSocketShard");
  }
  connection = null;
  useIdentifyCompress = false;
  inflate = null;
  textDecoder = new import_node_util.TextDecoder();
  replayedEvents = 0;
  isAck = true;
  sendRateLimitState = getInitialSendRateLimitState();
  initialHeartbeatTimeoutController = null;
  heartbeatInterval = null;
  lastHeartbeatAt = -1;
  // Indicates whether the shard has already resolved its original connect() call
  initialConnectResolved = false;
  // Indicates if we failed to connect to the ws url (ECONNREFUSED/ECONNRESET)
  failedToConnectDueToNetworkError = false;
  sendQueue = new import_async_queue2.AsyncQueue();
  timeoutAbortControllers = new import_collection6.Collection();
  strategy;
  id;
  #status = 0 /* Idle */;
  get status() {
    return this.#status;
  }
  constructor(strategy, id) {
    super();
    this.strategy = strategy;
    this.id = id;
  }
  async connect() {
    const controller = new AbortController();
    let promise;
    if (!this.initialConnectResolved) {
      promise = Promise.race([
        (0, import_node_events2.once)(this, "ready" /* Ready */, { signal: controller.signal }),
        (0, import_node_events2.once)(this, "resumed" /* Resumed */, { signal: controller.signal })
      ]);
    }
    void this.internalConnect();
    try {
      await promise;
    } catch ({ error }) {
      throw error;
    } finally {
      controller.abort();
    }
    this.initialConnectResolved = true;
  }
  async internalConnect() {
    if (this.#status !== 0 /* Idle */) {
      throw new Error("Tried to connect a shard that wasn't idle");
    }
    const { version, encoding, compression } = this.strategy.options;
    const params = new import_node_url.URLSearchParams({ v: version, encoding });
    if (compression) {
      const zlib = await getZlibSync();
      if (zlib) {
        params.append("compress", compression);
        this.inflate = new zlib.Inflate({
          chunkSize: 65535,
          to: "string"
        });
      } else if (!this.useIdentifyCompress) {
        this.useIdentifyCompress = true;
        console.warn(
          "WebSocketShard: Compression is enabled but zlib-sync is not installed, falling back to identify compress"
        );
      }
    }
    const session = await this.strategy.retrieveSessionInfo(this.id);
    const url = `${session?.resumeURL ?? this.strategy.options.gatewayInformation.url}?${params.toString()}`;
    this.debug([`Connecting to ${url}`]);
    const connection = new WebSocketConstructor(url, {
      handshakeTimeout: this.strategy.options.handshakeTimeout ?? void 0
    });
    connection.binaryType = "arraybuffer";
    connection.onmessage = (event) => {
      void this.onMessage(event.data, event.data instanceof ArrayBuffer);
    };
    connection.onerror = (event) => {
      this.onError(event.error);
    };
    connection.onclose = (event) => {
      void this.onClose(event.code);
    };
    this.connection = connection;
    this.#status = 1 /* Connecting */;
    this.sendRateLimitState = getInitialSendRateLimitState();
    const { ok } = await this.waitForEvent("hello" /* Hello */, this.strategy.options.helloTimeout);
    if (!ok) {
      return;
    }
    if (session?.shardCount === this.strategy.options.shardCount) {
      await this.resume(session);
    } else {
      await this.identify();
    }
  }
  async destroy(options = {}) {
    if (this.#status === 0 /* Idle */) {
      this.debug(["Tried to destroy a shard that was idle"]);
      return;
    }
    if (!options.code) {
      options.code = options.recover === 1 /* Resume */ ? 4200 /* Resuming */ : 1e3 /* Normal */;
    }
    this.debug([
      "Destroying shard",
      `Reason: ${options.reason ?? "none"}`,
      `Code: ${options.code}`,
      `Recover: ${options.recover === void 0 ? "none" : WebSocketShardDestroyRecovery[options.recover]}`
    ]);
    this.isAck = true;
    if (this.heartbeatInterval) {
      (0, import_node_timers.clearInterval)(this.heartbeatInterval);
    }
    if (this.initialHeartbeatTimeoutController) {
      this.initialHeartbeatTimeoutController.abort();
      this.initialHeartbeatTimeoutController = null;
    }
    this.lastHeartbeatAt = -1;
    for (const controller of this.timeoutAbortControllers.values()) {
      controller.abort();
    }
    this.timeoutAbortControllers.clear();
    this.failedToConnectDueToNetworkError = false;
    if (options.recover !== 1 /* Resume */) {
      await this.strategy.updateSessionInfo(this.id, null);
    }
    if (this.connection) {
      this.connection.onmessage = null;
      this.connection.onclose = null;
      const shouldClose = this.connection.readyState === import_ws.WebSocket.OPEN;
      this.debug([
        "Connection status during destroy",
        `Needs closing: ${shouldClose}`,
        `Ready state: ${this.connection.readyState}`
      ]);
      if (shouldClose) {
        let outerResolve;
        const promise = new Promise((resolve2) => {
          outerResolve = resolve2;
        });
        this.connection.onclose = outerResolve;
        this.connection.close(options.code, options.reason);
        await promise;
        this.emit("closed" /* Closed */, { code: options.code });
      }
      this.connection.onerror = null;
    } else {
      this.debug(["Destroying a shard that has no connection; please open an issue on GitHub"]);
    }
    this.#status = 0 /* Idle */;
    if (options.recover !== void 0) {
      await (0, import_promises2.setTimeout)(500);
      return this.internalConnect();
    }
  }
  async waitForEvent(event, timeoutDuration) {
    this.debug([`Waiting for event ${event} ${timeoutDuration ? `for ${timeoutDuration}ms` : "indefinitely"}`]);
    const timeoutController = new AbortController();
    const timeout = timeoutDuration ? (0, import_node_timers.setTimeout)(() => timeoutController.abort(), timeoutDuration).unref() : null;
    this.timeoutAbortControllers.set(event, timeoutController);
    const closeController = new AbortController();
    try {
      const closed = await Promise.race([
        (0, import_node_events2.once)(this, event, { signal: timeoutController.signal }).then(() => false),
        (0, import_node_events2.once)(this, "closed" /* Closed */, { signal: closeController.signal }).then(() => true)
      ]);
      return { ok: !closed };
    } catch {
      void this.destroy({
        code: 1e3 /* Normal */,
        reason: "Something timed out or went wrong while waiting for an event",
        recover: 0 /* Reconnect */
      });
      return { ok: false };
    } finally {
      if (timeout) {
        (0, import_node_timers.clearTimeout)(timeout);
      }
      this.timeoutAbortControllers.delete(event);
      if (!closeController.signal.aborted) {
        closeController.abort();
      }
    }
  }
  async send(payload) {
    if (!this.connection) {
      throw new Error("WebSocketShard wasn't connected");
    }
    if (this.#status !== 3 /* Ready */ && !ImportantGatewayOpcodes.has(payload.op)) {
      this.debug(["Tried to send a non-crucial payload before the shard was ready, waiting"]);
      try {
        await (0, import_node_events2.once)(this, "ready" /* Ready */);
      } catch {
        return this.send(payload);
      }
    }
    await this.sendQueue.wait();
    if (--this.sendRateLimitState.remaining <= 0) {
      const now = Date.now();
      if (this.sendRateLimitState.resetAt > now) {
        const sleepFor = this.sendRateLimitState.resetAt - now;
        this.debug([`Was about to hit the send rate limit, sleeping for ${sleepFor}ms`]);
        const controller = new AbortController();
        const interrupted = await Promise.race([
          (0, import_promises2.setTimeout)(sleepFor).then(() => false),
          (0, import_node_events2.once)(this, "closed" /* Closed */, { signal: controller.signal }).then(() => true)
        ]);
        if (interrupted) {
          this.debug(["Connection closed while waiting for the send rate limit to reset, re-queueing payload"]);
          this.sendQueue.shift();
          return this.send(payload);
        }
        controller.abort();
      }
      this.sendRateLimitState = getInitialSendRateLimitState();
    }
    this.sendQueue.shift();
    this.connection.send(JSON.stringify(payload));
  }
  async identify() {
    this.debug(["Waiting for identify throttle"]);
    const controller = new AbortController();
    const closeHandler = /* @__PURE__ */ __name(() => {
      controller.abort();
    }, "closeHandler");
    this.on("closed" /* Closed */, closeHandler);
    try {
      await this.strategy.waitForIdentify(this.id, controller.signal);
    } catch {
      if (controller.signal.aborted) {
        this.debug(["Was waiting for an identify, but the shard closed in the meantime"]);
        return;
      }
      this.debug([
        "IContextFetchingStrategy#waitForIdentify threw an unknown error.",
        "If you're using a custom strategy, this is probably nothing to worry about.",
        "If you're not, please open an issue on GitHub."
      ]);
      await this.destroy({
        reason: "Identify throttling logic failed",
        recover: 1 /* Resume */
      });
    } finally {
      this.off("closed" /* Closed */, closeHandler);
    }
    this.debug([
      "Identifying",
      `shard id: ${this.id.toString()}`,
      `shard count: ${this.strategy.options.shardCount}`,
      `intents: ${this.strategy.options.intents}`,
      `compression: ${this.inflate ? "zlib-stream" : this.useIdentifyCompress ? "identify" : "none"}`
    ]);
    const d = {
      token: this.strategy.options.token,
      properties: this.strategy.options.identifyProperties,
      intents: this.strategy.options.intents,
      compress: this.useIdentifyCompress,
      shard: [this.id, this.strategy.options.shardCount]
    };
    if (this.strategy.options.largeThreshold) {
      d.large_threshold = this.strategy.options.largeThreshold;
    }
    if (this.strategy.options.initialPresence) {
      d.presence = this.strategy.options.initialPresence;
    }
    await this.send({
      op: import_v102.GatewayOpcodes.Identify,
      d
    });
    await this.waitForEvent("ready" /* Ready */, this.strategy.options.readyTimeout);
  }
  async resume(session) {
    this.debug([
      "Resuming session",
      `resume url: ${session.resumeURL}`,
      `sequence: ${session.sequence}`,
      `shard id: ${this.id.toString()}`
    ]);
    this.#status = 2 /* Resuming */;
    this.replayedEvents = 0;
    return this.send({
      op: import_v102.GatewayOpcodes.Resume,
      d: {
        token: this.strategy.options.token,
        seq: session.sequence,
        session_id: session.sessionId
      }
    });
  }
  async heartbeat(requested = false) {
    if (!this.isAck && !requested) {
      return this.destroy({ reason: "Zombie connection", recover: 1 /* Resume */ });
    }
    const session = await this.strategy.retrieveSessionInfo(this.id);
    await this.send({
      op: import_v102.GatewayOpcodes.Heartbeat,
      d: session?.sequence ?? null
    });
    this.lastHeartbeatAt = Date.now();
    this.isAck = false;
  }
  async unpackMessage(data, isBinary) {
    if (!isBinary) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
    const decompressable = new Uint8Array(data);
    if (this.useIdentifyCompress) {
      return new Promise((resolve2, reject) => {
        (0, import_node_zlib.inflate)(decompressable, { chunkSize: 65535 }, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve2(JSON.parse(this.textDecoder.decode(result)));
        });
      });
    }
    if (this.inflate) {
      const l = decompressable.length;
      const flush = l >= 4 && decompressable[l - 4] === 0 && decompressable[l - 3] === 0 && decompressable[l - 2] === 255 && decompressable[l - 1] === 255;
      const zlib = await getZlibSync();
      this.inflate.push(import_node_buffer.Buffer.from(decompressable), flush ? zlib.Z_SYNC_FLUSH : zlib.Z_NO_FLUSH);
      if (this.inflate.err) {
        this.emit("error" /* Error */, {
          error: new Error(`${this.inflate.err}${this.inflate.msg ? `: ${this.inflate.msg}` : ""}`)
        });
      }
      if (!flush) {
        return null;
      }
      const { result } = this.inflate;
      if (!result) {
        return null;
      }
      return JSON.parse(typeof result === "string" ? result : this.textDecoder.decode(result));
    }
    this.debug([
      "Received a message we were unable to decompress",
      `isBinary: ${isBinary.toString()}`,
      `useIdentifyCompress: ${this.useIdentifyCompress.toString()}`,
      `inflate: ${Boolean(this.inflate).toString()}`
    ]);
    return null;
  }
  async onMessage(data, isBinary) {
    const payload = await this.unpackMessage(data, isBinary);
    if (!payload) {
      return;
    }
    switch (payload.op) {
      case import_v102.GatewayOpcodes.Dispatch: {
        if (this.#status === 2 /* Resuming */) {
          this.replayedEvents++;
        }
        switch (payload.t) {
          case import_v102.GatewayDispatchEvents.Ready: {
            this.#status = 3 /* Ready */;
            const session2 = {
              sequence: payload.s,
              sessionId: payload.d.session_id,
              shardId: this.id,
              shardCount: this.strategy.options.shardCount,
              resumeURL: payload.d.resume_gateway_url
            };
            await this.strategy.updateSessionInfo(this.id, session2);
            this.emit("ready" /* Ready */, { data: payload.d });
            break;
          }
          case import_v102.GatewayDispatchEvents.Resumed: {
            this.#status = 3 /* Ready */;
            this.debug([`Resumed and replayed ${this.replayedEvents} events`]);
            this.emit("resumed" /* Resumed */);
            break;
          }
          default: {
            break;
          }
        }
        const session = await this.strategy.retrieveSessionInfo(this.id);
        if (session) {
          if (payload.s > session.sequence) {
            await this.strategy.updateSessionInfo(this.id, { ...session, sequence: payload.s });
          }
        } else {
          this.debug([
            `Received a ${payload.t} event but no session is available. Session information cannot be re-constructed in this state without a full reconnect`
          ]);
        }
        this.emit("dispatch" /* Dispatch */, { data: payload });
        break;
      }
      case import_v102.GatewayOpcodes.Heartbeat: {
        await this.heartbeat(true);
        break;
      }
      case import_v102.GatewayOpcodes.Reconnect: {
        await this.destroy({
          reason: "Told to reconnect by Discord",
          recover: 1 /* Resume */
        });
        break;
      }
      case import_v102.GatewayOpcodes.InvalidSession: {
        this.debug([`Invalid session; will attempt to resume: ${payload.d.toString()}`]);
        const session = await this.strategy.retrieveSessionInfo(this.id);
        if (payload.d && session) {
          await this.resume(session);
        } else {
          await this.destroy({
            reason: "Invalid session",
            recover: 0 /* Reconnect */
          });
        }
        break;
      }
      case import_v102.GatewayOpcodes.Hello: {
        this.emit("hello" /* Hello */);
        const jitter = Math.random();
        const firstWait = Math.floor(payload.d.heartbeat_interval * jitter);
        this.debug([`Preparing first heartbeat of the connection with a jitter of ${jitter}; waiting ${firstWait}ms`]);
        try {
          const controller = new AbortController();
          this.initialHeartbeatTimeoutController = controller;
          await (0, import_promises2.setTimeout)(firstWait, void 0, { signal: controller.signal });
        } catch {
          this.debug(["Cancelled initial heartbeat due to #destroy being called"]);
          return;
        } finally {
          this.initialHeartbeatTimeoutController = null;
        }
        await this.heartbeat();
        this.debug([`First heartbeat sent, starting to beat every ${payload.d.heartbeat_interval}ms`]);
        this.heartbeatInterval = (0, import_node_timers.setInterval)(() => void this.heartbeat(), payload.d.heartbeat_interval);
        break;
      }
      case import_v102.GatewayOpcodes.HeartbeatAck: {
        this.isAck = true;
        const ackAt = Date.now();
        this.emit("heartbeat" /* HeartbeatComplete */, {
          ackAt,
          heartbeatAt: this.lastHeartbeatAt,
          latency: ackAt - this.lastHeartbeatAt
        });
        break;
      }
    }
  }
  onError(error) {
    if ("code" in error && ["ECONNRESET", "ECONNREFUSED"].includes(error.code)) {
      this.debug(["Failed to connect to the gateway URL specified due to a network error"]);
      this.failedToConnectDueToNetworkError = true;
      return;
    }
    this.emit("error" /* Error */, { error });
  }
  async onClose(code) {
    this.emit("closed" /* Closed */, { code });
    switch (code) {
      case 1e3 /* Normal */: {
        return this.destroy({
          code,
          reason: "Got disconnected by Discord",
          recover: 0 /* Reconnect */
        });
      }
      case 4200 /* Resuming */: {
        break;
      }
      case import_v102.GatewayCloseCodes.UnknownError: {
        this.debug([`An unknown error occurred: ${code}`]);
        return this.destroy({ code, recover: 1 /* Resume */ });
      }
      case import_v102.GatewayCloseCodes.UnknownOpcode: {
        this.debug(["An invalid opcode was sent to Discord."]);
        return this.destroy({ code, recover: 1 /* Resume */ });
      }
      case import_v102.GatewayCloseCodes.DecodeError: {
        this.debug(["An invalid payload was sent to Discord."]);
        return this.destroy({ code, recover: 1 /* Resume */ });
      }
      case import_v102.GatewayCloseCodes.NotAuthenticated: {
        this.debug(["A request was somehow sent before the identify/resume payload."]);
        return this.destroy({ code, recover: 0 /* Reconnect */ });
      }
      case import_v102.GatewayCloseCodes.AuthenticationFailed: {
        this.emit("error" /* Error */, {
          error: new Error("Authentication failed")
        });
        return this.destroy({ code });
      }
      case import_v102.GatewayCloseCodes.AlreadyAuthenticated: {
        this.debug(["More than one auth payload was sent."]);
        return this.destroy({ code, recover: 0 /* Reconnect */ });
      }
      case import_v102.GatewayCloseCodes.InvalidSeq: {
        this.debug(["An invalid sequence was sent."]);
        return this.destroy({ code, recover: 0 /* Reconnect */ });
      }
      case import_v102.GatewayCloseCodes.RateLimited: {
        this.debug(["The WebSocket rate limit has been hit, this should never happen"]);
        return this.destroy({ code, recover: 0 /* Reconnect */ });
      }
      case import_v102.GatewayCloseCodes.SessionTimedOut: {
        this.debug(["Session timed out."]);
        return this.destroy({ code, recover: 1 /* Resume */ });
      }
      case import_v102.GatewayCloseCodes.InvalidShard: {
        this.emit("error" /* Error */, {
          error: new Error("Invalid shard")
        });
        return this.destroy({ code });
      }
      case import_v102.GatewayCloseCodes.ShardingRequired: {
        this.emit("error" /* Error */, {
          error: new Error("Sharding is required")
        });
        return this.destroy({ code });
      }
      case import_v102.GatewayCloseCodes.InvalidAPIVersion: {
        this.emit("error" /* Error */, {
          error: new Error("Used an invalid API version")
        });
        return this.destroy({ code });
      }
      case import_v102.GatewayCloseCodes.InvalidIntents: {
        this.emit("error" /* Error */, {
          error: new Error("Used invalid intents")
        });
        return this.destroy({ code });
      }
      case import_v102.GatewayCloseCodes.DisallowedIntents: {
        this.emit("error" /* Error */, {
          error: new Error("Used disallowed intents")
        });
        return this.destroy({ code });
      }
      default: {
        this.debug([
          `The gateway closed with an unexpected code ${code}, attempting to ${this.failedToConnectDueToNetworkError ? "reconnect" : "resume"}.`
        ]);
        return this.destroy({
          code,
          recover: this.failedToConnectDueToNetworkError ? 0 /* Reconnect */ : 1 /* Resume */
        });
      }
    }
  }
  debug(messages) {
    const message = `${messages[0]}${messages.length > 1 ? `
${messages.slice(1).map((m) => `	${m}`).join("\n")}` : ""}`;
    this.emit("debug" /* Debug */, { message });
  }
};

// src/utils/WorkerBootstrapper.ts
var WorkerBootstrapper = class {
  static {
    __name(this, "WorkerBootstrapper");
  }
  /**
   * The data passed to the worker thread
   */
  data = import_node_worker_threads3.workerData;
  /**
   * The shards that are managed by this worker
   */
  shards = new import_collection7.Collection();
  constructor() {
    if (import_node_worker_threads3.isMainThread) {
      throw new Error("Expected WorkerBootstrap to not be used within the main thread");
    }
  }
  /**
   * Helper method to initiate a shard's connection process
   */
  async connect(shardId) {
    const shard = this.shards.get(shardId);
    if (!shard) {
      throw new RangeError(`Shard ${shardId} does not exist`);
    }
    await shard.connect();
  }
  /**
   * Helper method to destroy a shard
   */
  async destroy(shardId, options) {
    const shard = this.shards.get(shardId);
    if (!shard) {
      throw new RangeError(`Shard ${shardId} does not exist`);
    }
    await shard.destroy(options);
  }
  /**
   * Helper method to attach event listeners to the parentPort
   */
  setupThreadEvents() {
    import_node_worker_threads3.parentPort.on("messageerror", (err) => {
      throw err;
    }).on("message", async (payload) => {
      switch (payload.op) {
        case 0 /* Connect */: {
          await this.connect(payload.shardId);
          const response = {
            op: 0 /* Connected */,
            shardId: payload.shardId
          };
          import_node_worker_threads3.parentPort.postMessage(response);
          break;
        }
        case 1 /* Destroy */: {
          await this.destroy(payload.shardId, payload.options);
          const response = {
            op: 1 /* Destroyed */,
            shardId: payload.shardId
          };
          import_node_worker_threads3.parentPort.postMessage(response);
          break;
        }
        case 2 /* Send */: {
          const shard = this.shards.get(payload.shardId);
          if (!shard) {
            throw new RangeError(`Shard ${payload.shardId} does not exist`);
          }
          await shard.send(payload.payload);
          break;
        }
        case 3 /* SessionInfoResponse */: {
          break;
        }
        case 4 /* ShardIdentifyResponse */: {
          break;
        }
        case 5 /* FetchStatus */: {
          const shard = this.shards.get(payload.shardId);
          if (!shard) {
            throw new Error(`Shard ${payload.shardId} does not exist`);
          }
          const response = {
            op: 6 /* FetchStatusResponse */,
            status: shard.status,
            nonce: payload.nonce
          };
          import_node_worker_threads3.parentPort.postMessage(response);
          break;
        }
      }
    });
  }
  /**
   * Bootstraps the worker thread with the provided options
   */
  async bootstrap(options = {}) {
    for (const shardId of this.data.shardIds) {
      const shard = new WebSocketShard(new WorkerContextFetchingStrategy(this.data), shardId);
      for (const event of options.forwardEvents ?? Object.values(WebSocketShardEvents)) {
        shard.on(event, (data) => {
          const payload = {
            op: 2 /* Event */,
            event,
            data,
            shardId
          };
          import_node_worker_threads3.parentPort.postMessage(payload);
        });
      }
      await options.shardCallback?.(shard);
      this.shards.set(shardId, shard);
    }
    this.setupThreadEvents();
    const message = {
      op: 7 /* WorkerReady */
    };
    import_node_worker_threads3.parentPort.postMessage(message);
  }
};

// src/strategies/sharding/defaultWorker.ts
var bootstrapper = new WorkerBootstrapper();
void bootstrapper.bootstrap();
//# sourceMappingURL=defaultWorker.js.map