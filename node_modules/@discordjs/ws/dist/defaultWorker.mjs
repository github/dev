var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/utils/WorkerBootstrapper.ts
import { isMainThread as isMainThread2, parentPort as parentPort2, workerData } from "node:worker_threads";
import { Collection as Collection7 } from "@discordjs/collection";

// src/strategies/context/WorkerContextFetchingStrategy.ts
import { isMainThread, parentPort } from "node:worker_threads";
import { Collection as Collection2 } from "@discordjs/collection";

// src/strategies/sharding/WorkerShardingStrategy.ts
import { once } from "node:events";
import { join, isAbsolute, resolve } from "node:path";
import { Worker } from "node:worker_threads";
import { Collection } from "@discordjs/collection";

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
    if (isMainThread) {
      throw new Error("Cannot instantiate WorkerContextFetchingStrategy on the main thread");
    }
    parentPort.on("message", (payload) => {
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
  sessionPromises = new Collection2();
  waitForIdentifyPromises = new Collection2();
  async retrieveSessionInfo(shardId) {
    const nonce = Math.random();
    const payload = {
      op: 3 /* RetrieveSessionInfo */,
      shardId,
      nonce
    };
    const promise = new Promise((resolve2) => this.sessionPromises.set(nonce, resolve2));
    parentPort.postMessage(payload);
    return promise;
  }
  updateSessionInfo(shardId, sessionInfo) {
    const payload = {
      op: 4 /* UpdateSessionInfo */,
      shardId,
      session: sessionInfo
    };
    parentPort.postMessage(payload);
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
    parentPort.postMessage(payload);
    const listener = /* @__PURE__ */ __name(() => {
      const payload2 = {
        op: 8 /* CancelIdentify */,
        nonce
      };
      parentPort.postMessage(payload2);
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
import { Buffer as Buffer2 } from "node:buffer";
import { once as once2 } from "node:events";
import { clearInterval, clearTimeout, setInterval, setTimeout } from "node:timers";
import { setTimeout as sleep2 } from "node:timers/promises";
import { URLSearchParams } from "node:url";
import { TextDecoder } from "node:util";
import { inflate } from "node:zlib";
import { Collection as Collection6 } from "@discordjs/collection";
import { lazy as lazy2 } from "@discordjs/util";
import { AsyncQueue as AsyncQueue2 } from "@sapphire/async-queue";
import { AsyncEventEmitter } from "@vladfrangu/async_event_emitter";
import {
  GatewayCloseCodes,
  GatewayDispatchEvents,
  GatewayOpcodes as GatewayOpcodes2
} from "discord-api-types/v10";
import { WebSocket } from "ws";

// src/utils/constants.ts
import process from "node:process";
import { Collection as Collection5 } from "@discordjs/collection";
import { lazy } from "@discordjs/util";
import { APIVersion, GatewayOpcodes } from "discord-api-types/v10";

// src/strategies/sharding/SimpleShardingStrategy.ts
import { Collection as Collection3 } from "@discordjs/collection";

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
  shards = new Collection3();
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
import { setTimeout as sleep } from "node:timers/promises";
import { Collection as Collection4 } from "@discordjs/collection";
import { AsyncQueue } from "@sapphire/async-queue";
var SimpleIdentifyThrottler = class {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
  }
  static {
    __name(this, "SimpleIdentifyThrottler");
  }
  states = new Collection4();
  /**
   * {@inheritDoc IIdentifyThrottler.waitForIdentify}
   */
  async waitForIdentify(shardId, signal) {
    const key = shardId % this.maxConcurrency;
    const state = this.states.ensure(key, () => {
      return {
        queue: new AsyncQueue(),
        resetsAt: Number.POSITIVE_INFINITY
      };
    });
    await state.queue.wait({ signal });
    try {
      const diff = state.resetsAt - Date.now();
      if (diff <= 5e3) {
        const time = diff + Math.random() * 1500;
        await sleep(time);
      }
      state.resetsAt = Date.now() + 5e3;
    } finally {
      state.queue.shift();
    }
  }
};

// src/utils/constants.ts
var DefaultDeviceProperty = `@discordjs/ws 1.0.2`;
var getDefaultSessionStore = lazy(() => new Collection5());
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
    os: process.platform
  },
  version: APIVersion,
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
  GatewayOpcodes.Heartbeat,
  GatewayOpcodes.Identify,
  GatewayOpcodes.Resume
]);
function getInitialSendRateLimitState() {
  return {
    remaining: 120,
    resetAt: Date.now() + 6e4
  };
}
__name(getInitialSendRateLimitState, "getInitialSendRateLimitState");

// src/ws/WebSocketShard.ts
var getZlibSync = lazy2(async () => import("zlib-sync").then((mod) => mod.default).catch(() => null));
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
var WebSocketConstructor = WebSocket;
var WebSocketShard = class extends AsyncEventEmitter {
  static {
    __name(this, "WebSocketShard");
  }
  connection = null;
  useIdentifyCompress = false;
  inflate = null;
  textDecoder = new TextDecoder();
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
  sendQueue = new AsyncQueue2();
  timeoutAbortControllers = new Collection6();
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
        once2(this, "ready" /* Ready */, { signal: controller.signal }),
        once2(this, "resumed" /* Resumed */, { signal: controller.signal })
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
    const params = new URLSearchParams({ v: version, encoding });
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
      clearInterval(this.heartbeatInterval);
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
      const shouldClose = this.connection.readyState === WebSocket.OPEN;
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
      await sleep2(500);
      return this.internalConnect();
    }
  }
  async waitForEvent(event, timeoutDuration) {
    this.debug([`Waiting for event ${event} ${timeoutDuration ? `for ${timeoutDuration}ms` : "indefinitely"}`]);
    const timeoutController = new AbortController();
    const timeout = timeoutDuration ? setTimeout(() => timeoutController.abort(), timeoutDuration).unref() : null;
    this.timeoutAbortControllers.set(event, timeoutController);
    const closeController = new AbortController();
    try {
      const closed = await Promise.race([
        once2(this, event, { signal: timeoutController.signal }).then(() => false),
        once2(this, "closed" /* Closed */, { signal: closeController.signal }).then(() => true)
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
        clearTimeout(timeout);
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
        await once2(this, "ready" /* Ready */);
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
          sleep2(sleepFor).then(() => false),
          once2(this, "closed" /* Closed */, { signal: controller.signal }).then(() => true)
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
      op: GatewayOpcodes2.Identify,
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
      op: GatewayOpcodes2.Resume,
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
      op: GatewayOpcodes2.Heartbeat,
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
        inflate(decompressable, { chunkSize: 65535 }, (err, result) => {
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
      this.inflate.push(Buffer2.from(decompressable), flush ? zlib.Z_SYNC_FLUSH : zlib.Z_NO_FLUSH);
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
      case GatewayOpcodes2.Dispatch: {
        if (this.#status === 2 /* Resuming */) {
          this.replayedEvents++;
        }
        switch (payload.t) {
          case GatewayDispatchEvents.Ready: {
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
          case GatewayDispatchEvents.Resumed: {
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
      case GatewayOpcodes2.Heartbeat: {
        await this.heartbeat(true);
        break;
      }
      case GatewayOpcodes2.Reconnect: {
        await this.destroy({
          reason: "Told to reconnect by Discord",
          recover: 1 /* Resume */
        });
        break;
      }
      case GatewayOpcodes2.InvalidSession: {
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
      case GatewayOpcodes2.Hello: {
        this.emit("hello" /* Hello */);
        const jitter = Math.random();
        const firstWait = Math.floor(payload.d.heartbeat_interval * jitter);
        this.debug([`Preparing first heartbeat of the connection with a jitter of ${jitter}; waiting ${firstWait}ms`]);
        try {
          const controller = new AbortController();
          this.initialHeartbeatTimeoutController = controller;
          await sleep2(firstWait, void 0, { signal: controller.signal });
        } catch {
          this.debug(["Cancelled initial heartbeat due to #destroy being called"]);
          return;
        } finally {
          this.initialHeartbeatTimeoutController = null;
        }
        await this.heartbeat();
        this.debug([`First heartbeat sent, starting to beat every ${payload.d.heartbeat_interval}ms`]);
        this.heartbeatInterval = setInterval(() => void this.heartbeat(), payload.d.heartbeat_interval);
        break;
      }
      case GatewayOpcodes2.HeartbeatAck: {
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
      case GatewayCloseCodes.UnknownError: {
        this.debug([`An unknown error occurred: ${code}`]);
        return this.destroy({ code, recover: 1 /* Resume */ });
      }
      case GatewayCloseCodes.UnknownOpcode: {
        this.debug(["An invalid opcode was sent to Discord."]);
        return this.destroy({ code, recover: 1 /* Resume */ });
      }
      case GatewayCloseCodes.DecodeError: {
        this.debug(["An invalid payload was sent to Discord."]);
        return this.destroy({ code, recover: 1 /* Resume */ });
      }
      case GatewayCloseCodes.NotAuthenticated: {
        this.debug(["A request was somehow sent before the identify/resume payload."]);
        return this.destroy({ code, recover: 0 /* Reconnect */ });
      }
      case GatewayCloseCodes.AuthenticationFailed: {
        this.emit("error" /* Error */, {
          error: new Error("Authentication failed")
        });
        return this.destroy({ code });
      }
      case GatewayCloseCodes.AlreadyAuthenticated: {
        this.debug(["More than one auth payload was sent."]);
        return this.destroy({ code, recover: 0 /* Reconnect */ });
      }
      case GatewayCloseCodes.InvalidSeq: {
        this.debug(["An invalid sequence was sent."]);
        return this.destroy({ code, recover: 0 /* Reconnect */ });
      }
      case GatewayCloseCodes.RateLimited: {
        this.debug(["The WebSocket rate limit has been hit, this should never happen"]);
        return this.destroy({ code, recover: 0 /* Reconnect */ });
      }
      case GatewayCloseCodes.SessionTimedOut: {
        this.debug(["Session timed out."]);
        return this.destroy({ code, recover: 1 /* Resume */ });
      }
      case GatewayCloseCodes.InvalidShard: {
        this.emit("error" /* Error */, {
          error: new Error("Invalid shard")
        });
        return this.destroy({ code });
      }
      case GatewayCloseCodes.ShardingRequired: {
        this.emit("error" /* Error */, {
          error: new Error("Sharding is required")
        });
        return this.destroy({ code });
      }
      case GatewayCloseCodes.InvalidAPIVersion: {
        this.emit("error" /* Error */, {
          error: new Error("Used an invalid API version")
        });
        return this.destroy({ code });
      }
      case GatewayCloseCodes.InvalidIntents: {
        this.emit("error" /* Error */, {
          error: new Error("Used invalid intents")
        });
        return this.destroy({ code });
      }
      case GatewayCloseCodes.DisallowedIntents: {
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
  data = workerData;
  /**
   * The shards that are managed by this worker
   */
  shards = new Collection7();
  constructor() {
    if (isMainThread2) {
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
    parentPort2.on("messageerror", (err) => {
      throw err;
    }).on("message", async (payload) => {
      switch (payload.op) {
        case 0 /* Connect */: {
          await this.connect(payload.shardId);
          const response = {
            op: 0 /* Connected */,
            shardId: payload.shardId
          };
          parentPort2.postMessage(response);
          break;
        }
        case 1 /* Destroy */: {
          await this.destroy(payload.shardId, payload.options);
          const response = {
            op: 1 /* Destroyed */,
            shardId: payload.shardId
          };
          parentPort2.postMessage(response);
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
          parentPort2.postMessage(response);
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
          parentPort2.postMessage(payload);
        });
      }
      await options.shardCallback?.(shard);
      this.shards.set(shardId, shard);
    }
    this.setupThreadEvents();
    const message = {
      op: 7 /* WorkerReady */
    };
    parentPort2.postMessage(message);
  }
};

// src/strategies/sharding/defaultWorker.ts
var bootstrapper = new WorkerBootstrapper();
void bootstrapper.bootstrap();
//# sourceMappingURL=defaultWorker.mjs.map