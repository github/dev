import * as _discordjs_util from '@discordjs/util';
import { Awaitable } from '@discordjs/util';
import { GatewayDispatchPayload, GatewayReadyDispatchData, GatewaySendPayload, GatewayOpcodes, GatewayIntentBits, GatewayIdentifyProperties, GatewayPresenceUpdateData, APIGatewayBotInfo } from 'discord-api-types/v10';
import * as _discordjs_collection from '@discordjs/collection';
import { Collection } from '@discordjs/collection';
import { AsyncEventEmitter } from '@vladfrangu/async_event_emitter';
import { REST } from '@discordjs/rest';
import { AsyncQueue } from '@sapphire/async-queue';

declare enum WebSocketShardEvents {
    Closed = "closed",
    Debug = "debug",
    Dispatch = "dispatch",
    Error = "error",
    HeartbeatComplete = "heartbeat",
    Hello = "hello",
    Ready = "ready",
    Resumed = "resumed"
}
declare enum WebSocketShardStatus {
    Idle = 0,
    Connecting = 1,
    Resuming = 2,
    Ready = 3
}
declare enum WebSocketShardDestroyRecovery {
    Reconnect = 0,
    Resume = 1
}
type WebSocketShardEventsMap = {
    [WebSocketShardEvents.Closed]: [{
        code: number;
    }];
    [WebSocketShardEvents.Debug]: [payload: {
        message: string;
    }];
    [WebSocketShardEvents.Dispatch]: [payload: {
        data: GatewayDispatchPayload;
    }];
    [WebSocketShardEvents.Error]: [payload: {
        error: Error;
    }];
    [WebSocketShardEvents.Hello]: [];
    [WebSocketShardEvents.Ready]: [payload: {
        data: GatewayReadyDispatchData;
    }];
    [WebSocketShardEvents.Resumed]: [];
    [WebSocketShardEvents.HeartbeatComplete]: [payload: {
        ackAt: number;
        heartbeatAt: number;
        latency: number;
    }];
};
interface WebSocketShardDestroyOptions {
    code?: number;
    reason?: string;
    recover?: WebSocketShardDestroyRecovery;
}
declare enum CloseCodes {
    Normal = 1000,
    Resuming = 4200
}
interface SendRateLimitState {
    remaining: number;
    resetAt: number;
}
declare class WebSocketShard extends AsyncEventEmitter<WebSocketShardEventsMap> {
    #private;
    private connection;
    private useIdentifyCompress;
    private inflate;
    private readonly textDecoder;
    private replayedEvents;
    private isAck;
    private sendRateLimitState;
    private initialHeartbeatTimeoutController;
    private heartbeatInterval;
    private lastHeartbeatAt;
    private initialConnectResolved;
    private failedToConnectDueToNetworkError;
    private readonly sendQueue;
    private readonly timeoutAbortControllers;
    private readonly strategy;
    readonly id: number;
    get status(): WebSocketShardStatus;
    constructor(strategy: IContextFetchingStrategy, id: number);
    connect(): Promise<void>;
    private internalConnect;
    destroy(options?: WebSocketShardDestroyOptions): Promise<void>;
    private waitForEvent;
    send(payload: GatewaySendPayload): Promise<void>;
    private identify;
    private resume;
    private heartbeat;
    private unpackMessage;
    private onMessage;
    private onError;
    private onClose;
    private debug;
}

/**
 * Strategies responsible for spawning, initializing connections, destroying shards, and relaying events
 */
interface IShardingStrategy {
    /**
     * Initializes all the shards
     */
    connect(): Awaitable<void>;
    /**
     * Destroys all the shards
     */
    destroy(options?: Omit<WebSocketShardDestroyOptions, 'recover'>): Awaitable<void>;
    /**
     * Fetches the status of all the shards
     */
    fetchStatus(): Awaitable<Collection<number, WebSocketShardStatus>>;
    /**
     * Sends a payload to a shard
     */
    send(shardId: number, payload: GatewaySendPayload): Awaitable<void>;
    /**
     * Spawns all the shards
     */
    spawn(shardIds: number[]): Awaitable<void>;
}

/**
 * IdentifyThrottlers are responsible for dictating when a shard is allowed to identify.
 *
 * @see {@link https://discord.com/developers/docs/topics/gateway#sharding-max-concurrency}
 */
interface IIdentifyThrottler {
    /**
     * Resolves once the given shard should be allowed to identify, or rejects if the operation was aborted.
     */
    waitForIdentify(shardId: number, signal: AbortSignal): Promise<void>;
}

/**
 * Simple strategy that just spawns shards in the current process
 */
declare class SimpleShardingStrategy implements IShardingStrategy {
    private readonly manager;
    private readonly shards;
    constructor(manager: WebSocketManager);
    /**
     * {@inheritDoc IShardingStrategy.spawn}
     */
    spawn(shardIds: number[]): Promise<void>;
    /**
     * {@inheritDoc IShardingStrategy.connect}
     */
    connect(): Promise<void>;
    /**
     * {@inheritDoc IShardingStrategy.destroy}
     */
    destroy(options?: Omit<WebSocketShardDestroyOptions, 'recover'>): Promise<void>;
    /**
     * {@inheritDoc IShardingStrategy.send}
     */
    send(shardId: number, payload: GatewaySendPayload): Promise<void>;
    /**
     * {@inheritDoc IShardingStrategy.fetchStatus}
     */
    fetchStatus(): Promise<Collection<number, WebSocketShardStatus>>;
}

/**
 * The state of a rate limit key's identify queue.
 */
interface IdentifyState {
    queue: AsyncQueue;
    resetsAt: number;
}
/**
 * Local, in-memory identify throttler.
 */
declare class SimpleIdentifyThrottler implements IIdentifyThrottler {
    private readonly maxConcurrency;
    private readonly states;
    constructor(maxConcurrency: number);
    /**
     * {@inheritDoc IIdentifyThrottler.waitForIdentify}
     */
    waitForIdentify(shardId: number, signal: AbortSignal): Promise<void>;
}

/**
 * Valid encoding types
 */
declare enum Encoding {
    JSON = "json"
}
/**
 * Valid compression methods
 */
declare enum CompressionMethod {
    ZlibStream = "zlib-stream"
}
declare const DefaultDeviceProperty: `@discordjs/ws ${string}`;
/**
 * Default options used by the manager
 */
declare const DefaultWebSocketManagerOptions: {
    readonly buildIdentifyThrottler: (manager: WebSocketManager) => Promise<SimpleIdentifyThrottler>;
    readonly buildStrategy: (manager: WebSocketManager) => SimpleShardingStrategy;
    readonly shardCount: null;
    readonly shardIds: null;
    readonly largeThreshold: null;
    readonly initialPresence: null;
    readonly identifyProperties: {
        readonly browser: `@discordjs/ws ${string}`;
        readonly device: `@discordjs/ws ${string}`;
        readonly os: NodeJS.Platform;
    };
    readonly version: "10";
    readonly encoding: Encoding;
    readonly compression: null;
    readonly retrieveSessionInfo: (shardId: number) => SessionInfo | null;
    readonly updateSessionInfo: (shardId: number, info: SessionInfo | null) => void;
    readonly handshakeTimeout: 30000;
    readonly helloTimeout: 60000;
    readonly readyTimeout: 15000;
};
declare const ImportantGatewayOpcodes: Set<GatewayOpcodes>;
declare function getInitialSendRateLimitState(): SendRateLimitState;

/**
 * Represents a range of shard ids
 */
interface ShardRange {
    end: number;
    start: number;
}
/**
 * Session information for a given shard, used to resume a session
 */
interface SessionInfo {
    /**
     * URL to use when resuming
     */
    resumeURL: string;
    /**
     * The sequence number of the last message sent by the shard
     */
    sequence: number;
    /**
     * Session id for this shard
     */
    sessionId: string;
    /**
     * The total number of shards at the time of this shard identifying
     */
    shardCount: number;
    /**
     * The id of the shard
     */
    shardId: number;
}
/**
 * Required options for the WebSocketManager
 */
interface RequiredWebSocketManagerOptions {
    /**
     * The intents to request
     */
    intents: GatewayIntentBits | 0;
    /**
     * The REST instance to use for fetching gateway information
     */
    rest: REST;
    /**
     * The token to use for identifying with the gateway
     */
    token: string;
}
/**
 * Optional additional configuration for the WebSocketManager
 */
interface OptionalWebSocketManagerOptions {
    /**
     * Builds an identify throttler to use for this manager's shards
     */
    buildIdentifyThrottler(manager: WebSocketManager): Awaitable<IIdentifyThrottler>;
    /**
     * Builds the strategy to use for sharding
     *
     * @example
     * ```ts
     * const manager = new WebSocketManager({
     *  token: process.env.DISCORD_TOKEN,
     *  intents: 0, // for no intents
     *  rest,
     *  buildStrategy: (manager) => new WorkerShardingStrategy(manager, { shardsPerWorker: 2 }),
     * });
     * ```
     */
    buildStrategy(manager: WebSocketManager): IShardingStrategy;
    /**
     * The compression method to use
     *
     * @defaultValue `null` (no compression)
     */
    compression: CompressionMethod | null;
    /**
     * The encoding to use
     *
     * @defaultValue `'json'`
     */
    encoding: Encoding;
    /**
     * How long to wait for a shard to connect before giving up
     */
    handshakeTimeout: number | null;
    /**
     * How long to wait for a shard's HELLO packet before giving up
     */
    helloTimeout: number | null;
    /**
     * Properties to send to the gateway when identifying
     */
    identifyProperties: GatewayIdentifyProperties;
    /**
     * Initial presence data to send to the gateway when identifying
     */
    initialPresence: GatewayPresenceUpdateData | null;
    /**
     * Value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list
     */
    largeThreshold: number | null;
    /**
     * How long to wait for a shard's READY packet before giving up
     */
    readyTimeout: number | null;
    /**
     * Function used to retrieve session information (and attempt to resume) for a given shard
     *
     * @example
     * ```ts
     * const manager = new WebSocketManager({
     *   async retrieveSessionInfo(shardId): Awaitable<SessionInfo | null> {
     *     // Fetch this info from redis or similar
     *     return { sessionId: string, sequence: number };
     *     // Return null if no information is found
     *   },
     * });
     * ```
     */
    retrieveSessionInfo(shardId: number): Awaitable<SessionInfo | null>;
    /**
     * The total number of shards across all WebsocketManagers you intend to instantiate.
     * Use `null` to use Discord's recommended shard count
     */
    shardCount: number | null;
    /**
     * The ids of the shards this WebSocketManager should manage.
     * Use `null` to simply spawn 0 through `shardCount - 1`
     *
     * @example
     * ```ts
     * const manager = new WebSocketManager({
     *   shardIds: [1, 3, 7], // spawns shard 1, 3, and 7, nothing else
     * });
     * ```
     * @example
     * ```ts
     * const manager = new WebSocketManager({
     *   shardIds: {
     *     start: 3,
     *     end: 6,
     *   }, // spawns shards 3, 4, 5, and 6
     * });
     * ```
     */
    shardIds: number[] | ShardRange | null;
    /**
     * Function used to store session information for a given shard
     */
    updateSessionInfo(shardId: number, sessionInfo: SessionInfo | null): Awaitable<void>;
    /**
     * The gateway version to use
     *
     * @defaultValue `'10'`
     */
    version: string;
}
type WebSocketManagerOptions = OptionalWebSocketManagerOptions & RequiredWebSocketManagerOptions;
type ManagerShardEventsMap = {
    [K in keyof WebSocketShardEventsMap]: [
        WebSocketShardEventsMap[K] extends [] ? {
            shardId: number;
        } : WebSocketShardEventsMap[K][0] & {
            shardId: number;
        }
    ];
};
declare class WebSocketManager extends AsyncEventEmitter<ManagerShardEventsMap> {
    /**
     * The options being used by this manager
     */
    readonly options: WebSocketManagerOptions;
    /**
     * Internal cache for a GET /gateway/bot result
     */
    private gatewayInformation;
    /**
     * Internal cache for the shard ids
     */
    private shardIds;
    /**
     * Strategy used to manage shards
     *
     * @defaultValue `SimpleShardingStrategy`
     */
    private readonly strategy;
    constructor(options: Partial<OptionalWebSocketManagerOptions> & RequiredWebSocketManagerOptions);
    /**
     * Fetches the gateway information from Discord - or returns it from cache if available
     *
     * @param force - Whether to ignore the cache and force a fresh fetch
     */
    fetchGatewayInformation(force?: boolean): Promise<APIGatewayBotInfo>;
    /**
     * Updates your total shard count on-the-fly, spawning shards as needed
     *
     * @param shardCount - The new shard count to use
     */
    updateShardCount(shardCount: number | null): Promise<this>;
    /**
     * Yields the total number of shards across for your bot, accounting for Discord recommendations
     */
    getShardCount(): Promise<number>;
    /**
     * Yields the ids of the shards this manager should manage
     */
    getShardIds(force?: boolean): Promise<number[]>;
    connect(): Promise<void>;
    destroy(options?: Omit<WebSocketShardDestroyOptions, 'recover'>): Awaitable<void>;
    send(shardId: number, payload: GatewaySendPayload): Awaitable<void>;
    fetchStatus(): Awaitable<_discordjs_collection.Collection<number, WebSocketShardStatus>>;
}

interface FetchingStrategyOptions extends Omit<WebSocketManagerOptions, 'buildIdentifyThrottler' | 'buildStrategy' | 'rest' | 'retrieveSessionInfo' | 'shardCount' | 'shardIds' | 'updateSessionInfo'> {
    readonly gatewayInformation: APIGatewayBotInfo;
    readonly shardCount: number;
}
/**
 * Strategies responsible solely for making manager information accessible
 */
interface IContextFetchingStrategy {
    readonly options: FetchingStrategyOptions;
    retrieveSessionInfo(shardId: number): Awaitable<SessionInfo | null>;
    updateSessionInfo(shardId: number, sessionInfo: SessionInfo | null): Awaitable<void>;
    /**
     * Resolves once the given shard should be allowed to identify
     * This should correctly handle the signal and reject with an abort error if the operation is aborted.
     * Other errors will cause the shard to reconnect.
     */
    waitForIdentify(shardId: number, signal: AbortSignal): Promise<void>;
}
declare function managerToFetchingStrategyOptions(manager: WebSocketManager): Promise<FetchingStrategyOptions>;

declare class SimpleContextFetchingStrategy implements IContextFetchingStrategy {
    private readonly manager;
    readonly options: FetchingStrategyOptions;
    private static throttlerCache;
    private static ensureThrottler;
    constructor(manager: WebSocketManager, options: FetchingStrategyOptions);
    retrieveSessionInfo(shardId: number): Promise<SessionInfo | null>;
    updateSessionInfo(shardId: number, sessionInfo: SessionInfo | null): _discordjs_util.Awaitable<void>;
    waitForIdentify(shardId: number, signal: AbortSignal): Promise<void>;
}

declare class WorkerContextFetchingStrategy implements IContextFetchingStrategy {
    readonly options: FetchingStrategyOptions;
    private readonly sessionPromises;
    private readonly waitForIdentifyPromises;
    constructor(options: FetchingStrategyOptions);
    retrieveSessionInfo(shardId: number): Promise<SessionInfo | null>;
    updateSessionInfo(shardId: number, sessionInfo: SessionInfo | null): void;
    waitForIdentify(shardId: number, signal: AbortSignal): Promise<void>;
}

interface WorkerData extends FetchingStrategyOptions {
    shardIds: number[];
}
declare enum WorkerSendPayloadOp {
    Connect = 0,
    Destroy = 1,
    Send = 2,
    SessionInfoResponse = 3,
    ShardIdentifyResponse = 4,
    FetchStatus = 5
}
type WorkerSendPayload = {
    nonce: number;
    ok: boolean;
    op: WorkerSendPayloadOp.ShardIdentifyResponse;
} | {
    nonce: number;
    op: WorkerSendPayloadOp.FetchStatus;
    shardId: number;
} | {
    nonce: number;
    op: WorkerSendPayloadOp.SessionInfoResponse;
    session: SessionInfo | null;
} | {
    op: WorkerSendPayloadOp.Connect;
    shardId: number;
} | {
    op: WorkerSendPayloadOp.Destroy;
    options?: WebSocketShardDestroyOptions;
    shardId: number;
} | {
    op: WorkerSendPayloadOp.Send;
    payload: GatewaySendPayload;
    shardId: number;
};
declare enum WorkerReceivePayloadOp {
    Connected = 0,
    Destroyed = 1,
    Event = 2,
    RetrieveSessionInfo = 3,
    UpdateSessionInfo = 4,
    WaitForIdentify = 5,
    FetchStatusResponse = 6,
    WorkerReady = 7,
    CancelIdentify = 8
}
type WorkerReceivePayload = {
    data: any;
    event: WebSocketShardEvents;
    op: WorkerReceivePayloadOp.Event;
    shardId: number;
} | {
    nonce: number;
    op: WorkerReceivePayloadOp.CancelIdentify;
} | {
    nonce: number;
    op: WorkerReceivePayloadOp.FetchStatusResponse;
    status: WebSocketShardStatus;
} | {
    nonce: number;
    op: WorkerReceivePayloadOp.RetrieveSessionInfo;
    shardId: number;
} | {
    nonce: number;
    op: WorkerReceivePayloadOp.WaitForIdentify;
    shardId: number;
} | {
    op: WorkerReceivePayloadOp.Connected;
    shardId: number;
} | {
    op: WorkerReceivePayloadOp.Destroyed;
    shardId: number;
} | {
    op: WorkerReceivePayloadOp.UpdateSessionInfo;
    session: SessionInfo | null;
    shardId: number;
} | {
    op: WorkerReceivePayloadOp.WorkerReady;
};
/**
 * Options for a {@link WorkerShardingStrategy}
 */
interface WorkerShardingStrategyOptions {
    /**
     * Dictates how many shards should be spawned per worker thread.
     */
    shardsPerWorker: number | 'all';
    /**
     * Path to the worker file to use. The worker requires quite a bit of setup, it is recommended you leverage the {@link WorkerBootstrapper} class.
     */
    workerPath?: string;
}
/**
 * Strategy used to spawn threads in worker_threads
 */
declare class WorkerShardingStrategy implements IShardingStrategy {
    #private;
    private readonly manager;
    private readonly options;
    private readonly connectPromises;
    private readonly destroyPromises;
    private readonly fetchStatusPromises;
    private readonly waitForIdentifyControllers;
    private throttler?;
    constructor(manager: WebSocketManager, options: WorkerShardingStrategyOptions);
    /**
     * {@inheritDoc IShardingStrategy.spawn}
     */
    spawn(shardIds: number[]): Promise<void>;
    /**
     * {@inheritDoc IShardingStrategy.connect}
     */
    connect(): Promise<void>;
    /**
     * {@inheritDoc IShardingStrategy.destroy}
     */
    destroy(options?: Omit<WebSocketShardDestroyOptions, 'recover'>): Promise<void>;
    /**
     * {@inheritDoc IShardingStrategy.send}
     */
    send(shardId: number, data: GatewaySendPayload): void;
    /**
     * {@inheritDoc IShardingStrategy.fetchStatus}
     */
    fetchStatus(): Promise<Collection<number, WebSocketShardStatus>>;
    private setupWorker;
    private resolveWorkerPath;
    private waitForWorkerReady;
    private onMessage;
    private ensureThrottler;
}

/**
 * Options for bootstrapping the worker
 */
interface BootstrapOptions {
    /**
     * Shard events to just arbitrarily forward to the parent thread for the manager to emit
     * Note: By default, this will include ALL events
     * you most likely want to handle dispatch within the worker itself
     */
    forwardEvents?: WebSocketShardEvents[];
    /**
     * Function to call when a shard is created for additional setup
     */
    shardCallback?(shard: WebSocketShard): Awaitable<void>;
}
/**
 * Utility class for bootstrapping a worker thread to be used for sharding
 */
declare class WorkerBootstrapper {
    /**
     * The data passed to the worker thread
     */
    protected readonly data: WorkerData;
    /**
     * The shards that are managed by this worker
     */
    protected readonly shards: Collection<number, WebSocketShard>;
    constructor();
    /**
     * Helper method to initiate a shard's connection process
     */
    protected connect(shardId: number): Promise<void>;
    /**
     * Helper method to destroy a shard
     */
    protected destroy(shardId: number, options?: WebSocketShardDestroyOptions): Promise<void>;
    /**
     * Helper method to attach event listeners to the parentPort
     */
    protected setupThreadEvents(): void;
    /**
     * Bootstraps the worker thread with the provided options
     */
    bootstrap(options?: Readonly<BootstrapOptions>): Promise<void>;
}

/**
 * The {@link https://github.com/discordjs/discord.js/blob/main/packages/ws/#readme | @discordjs/ws} version
 * that you are currently using.
 */
declare const version: string;

export { BootstrapOptions, CloseCodes, CompressionMethod, DefaultDeviceProperty, DefaultWebSocketManagerOptions, Encoding, FetchingStrategyOptions, IContextFetchingStrategy, IIdentifyThrottler, IShardingStrategy, IdentifyState, ImportantGatewayOpcodes, ManagerShardEventsMap, OptionalWebSocketManagerOptions, RequiredWebSocketManagerOptions, SendRateLimitState, SessionInfo, ShardRange, SimpleContextFetchingStrategy, SimpleIdentifyThrottler, SimpleShardingStrategy, WebSocketManager, WebSocketManagerOptions, WebSocketShard, WebSocketShardDestroyOptions, WebSocketShardDestroyRecovery, WebSocketShardEvents, WebSocketShardEventsMap, WebSocketShardStatus, WorkerBootstrapper, WorkerContextFetchingStrategy, WorkerData, WorkerReceivePayload, WorkerReceivePayloadOp, WorkerSendPayload, WorkerSendPayloadOp, WorkerShardingStrategy, WorkerShardingStrategyOptions, getInitialSendRateLimitState, managerToFetchingStrategyOptions, version };
