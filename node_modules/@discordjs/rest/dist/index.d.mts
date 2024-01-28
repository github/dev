import * as url from 'url';
import { Snowflake } from 'discord-api-types/v10';
import { Readable } from 'node:stream';
import { ReadableStream } from 'node:stream/web';
import { Collection } from '@discordjs/collection';
import { Awaitable } from '@discordjs/util';
import * as undici from 'undici';
import { RequestInit, Dispatcher, Response, BodyInit, Agent } from 'undici';
import { AsyncEventEmitter } from '@vladfrangu/async_event_emitter';

interface IHandler {
    /**
     * The unique id of the handler
     */
    readonly id: string;
    /**
     * If the bucket is currently inactive (no pending requests)
     */
    get inactive(): boolean;
    /**
     * Queues a request to be sent
     *
     * @param routeId - The generalized api route with literal ids for major parameters
     * @param url - The url to do the request on
     * @param options - All the information needed to make a request
     * @param requestData - Extra data from the user's request needed for errors and additional processing
     */
    queueRequest(routeId: RouteData, url: string, options: RequestInit, requestData: HandlerRequestData): Promise<ResponseLike>;
}

interface RestEvents {
    handlerSweep: [sweptHandlers: Collection<string, IHandler>];
    hashSweep: [sweptHashes: Collection<string, HashData>];
    invalidRequestWarning: [invalidRequestInfo: InvalidRequestWarningData];
    rateLimited: [rateLimitInfo: RateLimitData];
    response: [request: APIRequest, response: ResponseLike];
    restDebug: [info: string];
}
type RestEventsMap = {
    [K in keyof RestEvents]: RestEvents[K];
};
/**
 * Options to be passed when creating the REST instance
 */
interface RESTOptions {
    /**
     * The agent to set globally
     */
    agent: Dispatcher | null;
    /**
     * The base api path, without version
     *
     * @defaultValue `'https://discord.com/api'`
     */
    api: string;
    /**
     * The authorization prefix to use for requests, useful if you want to use
     * bearer tokens
     *
     * @defaultValue `'Bot'`
     */
    authPrefix: 'Bearer' | 'Bot';
    /**
     * The cdn path
     *
     * @defaultValue `'https://cdn.discordapp.com'`
     */
    cdn: string;
    /**
     * How many requests to allow sending per second (Infinity for unlimited, 50 for the standard global limit used by Discord)
     *
     * @defaultValue `50`
     */
    globalRequestsPerSecond: number;
    /**
     * The amount of time in milliseconds that passes between each hash sweep. (defaults to 1h)
     *
     * @defaultValue `3_600_000`
     */
    handlerSweepInterval: number;
    /**
     * The maximum amount of time a hash can exist in milliseconds without being hit with a request (defaults to 24h)
     *
     * @defaultValue `86_400_000`
     */
    hashLifetime: number;
    /**
     * The amount of time in milliseconds that passes between each hash sweep. (defaults to 4h)
     *
     * @defaultValue `14_400_000`
     */
    hashSweepInterval: number;
    /**
     * Additional headers to send for all API requests
     *
     * @defaultValue `{}`
     */
    headers: Record<string, string>;
    /**
     * The number of invalid REST requests (those that return 401, 403, or 429) in a 10 minute window between emitted warnings (0 for no warnings).
     * That is, if set to 500, warnings will be emitted at invalid request number 500, 1000, 1500, and so on.
     *
     * @defaultValue `0`
     */
    invalidRequestWarningInterval: number;
    /**
     * The method called to perform the actual HTTP request given a url and web `fetch` options
     * For example, to use global fetch, simply provide `makeRequest: fetch`
     */
    makeRequest(url: string, init: RequestInit): Promise<ResponseLike>;
    /**
     * The extra offset to add to rate limits in milliseconds
     *
     * @defaultValue `50`
     */
    offset: number;
    /**
     * Determines how rate limiting and pre-emptive throttling should be handled.
     * When an array of strings, each element is treated as a prefix for the request route
     * (e.g. `/channels` to match any route starting with `/channels` such as `/channels/:id/messages`)
     * for which to throw {@link RateLimitError}s. All other request routes will be queued normally
     *
     * @defaultValue `null`
     */
    rejectOnRateLimit: RateLimitQueueFilter | string[] | null;
    /**
     * The number of retries for errors with the 500 code, or errors
     * that timeout
     *
     * @defaultValue `3`
     */
    retries: number;
    /**
     * The time to wait in milliseconds before a request is aborted
     *
     * @defaultValue `15_000`
     */
    timeout: number;
    /**
     * Extra information to add to the user agent
     *
     * @defaultValue DefaultUserAgentAppendix
     */
    userAgentAppendix: string;
    /**
     * The version of the API to use
     *
     * @defaultValue `'10'`
     */
    version: string;
}
/**
 * Data emitted on `RESTEvents.RateLimited`
 */
interface RateLimitData {
    /**
     * Whether the rate limit that was reached was the global limit
     */
    global: boolean;
    /**
     * The bucket hash for this request
     */
    hash: string;
    /**
     * The amount of requests we can perform before locking requests
     */
    limit: number;
    /**
     * The major parameter of the route
     *
     * For example, in `/channels/x`, this will be `x`.
     * If there is no major parameter (e.g: `/bot/gateway`) this will be `global`.
     */
    majorParameter: string;
    /**
     * The HTTP method being performed
     */
    method: string;
    /**
     * The time, in milliseconds, that will need to pass before this specific request can be retried
     */
    retryAfter: number;
    /**
     * The route being hit in this request
     */
    route: string;
    /**
     * The scope of the rate limit that was hit.
     *
     * This can be `user` for rate limits that are per client, `global` for rate limits that affect all clients or `shared` for rate limits that
     * are shared per resource.
     */
    scope: 'global' | 'shared' | 'user';
    /**
     * The time, in milliseconds, that will need to pass before the sublimit lock for the route resets, and requests that fall under a sublimit
     * can be retried
     *
     * This is only present on certain sublimits, and `0` otherwise
     */
    sublimitTimeout: number;
    /**
     * The time, in milliseconds, until the route's request-lock is reset
     */
    timeToReset: number;
    /**
     * The full URL for this request
     */
    url: string;
}
/**
 * A function that determines whether the rate limit hit should throw an Error
 */
type RateLimitQueueFilter = (rateLimitData: RateLimitData) => Awaitable<boolean>;
interface APIRequest {
    /**
     * The data that was used to form the body of this request
     */
    data: HandlerRequestData;
    /**
     * The HTTP method used in this request
     */
    method: string;
    /**
     * Additional HTTP options for this request
     */
    options: RequestInit;
    /**
     * The full path used to make the request
     */
    path: RouteLike;
    /**
     * The number of times this request has been attempted
     */
    retries: number;
    /**
     * The API route identifying the ratelimit for this request
     */
    route: string;
}
interface ResponseLike extends Pick<Response, 'arrayBuffer' | 'bodyUsed' | 'headers' | 'json' | 'ok' | 'status' | 'statusText' | 'text'> {
    body: Readable | ReadableStream | null;
}
interface InvalidRequestWarningData {
    /**
     * Number of invalid requests that have been made in the window
     */
    count: number;
    /**
     * Time in milliseconds remaining before the count resets
     */
    remainingTime: number;
}
/**
 * Represents a file to be added to the request
 */
interface RawFile {
    /**
     * Content-Type of the file
     */
    contentType?: string;
    /**
     * The actual data for the file
     */
    data: Buffer | Uint8Array | boolean | number | string;
    /**
     * An explicit key to use for key of the formdata field for this file.
     * When not provided, the index of the file in the files array is used in the form `files[${index}]`.
     * If you wish to alter the placeholder snowflake, you must provide this property in the same form (`files[${placeholder}]`)
     */
    key?: string;
    /**
     * The name of the file
     */
    name: string;
}
/**
 * Represents possible data to be given to an endpoint
 */
interface RequestData {
    /**
     * Whether to append JSON data to form data instead of `payload_json` when sending files
     */
    appendToFormData?: boolean;
    /**
     * If this request needs the `Authorization` header
     *
     * @defaultValue `true`
     */
    auth?: boolean;
    /**
     * The authorization prefix to use for this request, useful if you use this with bearer tokens
     *
     * @defaultValue `'Bot'`
     */
    authPrefix?: 'Bearer' | 'Bot';
    /**
     * The body to send to this request.
     * If providing as BodyInit, set `passThroughBody: true`
     */
    body?: BodyInit | unknown;
    /**
     * The {@link https://undici.nodejs.org/#/docs/api/Agent | Agent} to use for the request.
     */
    dispatcher?: Agent;
    /**
     * Files to be attached to this request
     */
    files?: RawFile[] | undefined;
    /**
     * Additional headers to add to this request
     */
    headers?: Record<string, string>;
    /**
     * Whether to pass-through the body property directly to `fetch()`.
     * <warn>This only applies when files is NOT present</warn>
     */
    passThroughBody?: boolean;
    /**
     * Query string parameters to append to the called endpoint
     */
    query?: URLSearchParams;
    /**
     * Reason to show in the audit logs
     */
    reason?: string | undefined;
    /**
     * The signal to abort the queue entry or the REST call, where applicable
     */
    signal?: AbortSignal | undefined;
    /**
     * If this request should be versioned
     *
     * @defaultValue `true`
     */
    versioned?: boolean;
}
/**
 * Possible headers for an API call
 */
interface RequestHeaders {
    Authorization?: string;
    'User-Agent': string;
    'X-Audit-Log-Reason'?: string;
}
/**
 * Possible API methods to be used when doing requests
 */
declare enum RequestMethod {
    Delete = "DELETE",
    Get = "GET",
    Patch = "PATCH",
    Post = "POST",
    Put = "PUT"
}
type RouteLike = `/${string}`;
/**
 * Internal request options
 *
 * @internal
 */
interface InternalRequest extends RequestData {
    fullRoute: RouteLike;
    method: RequestMethod;
}
type HandlerRequestData = Pick<InternalRequest, 'auth' | 'body' | 'files' | 'signal'>;
/**
 * Parsed route data for an endpoint
 *
 * @internal
 */
interface RouteData {
    bucketRoute: string;
    majorParameter: string;
    original: RouteLike;
}
/**
 * Represents a hash and its associated fields
 *
 * @internal
 */
interface HashData {
    lastAccess: number;
    value: string;
}

declare const DefaultUserAgent: `DiscordBot (https://discord.js.org, ${string})`;
/**
 * The default string to append onto the user agent.
 */
declare const DefaultUserAgentAppendix: string;
declare const DefaultRestOptions: {
    readonly agent: null;
    readonly api: "https://discord.com/api";
    readonly authPrefix: "Bot";
    readonly cdn: "https://cdn.discordapp.com";
    readonly headers: {};
    readonly invalidRequestWarningInterval: 0;
    readonly globalRequestsPerSecond: 50;
    readonly offset: 50;
    readonly rejectOnRateLimit: null;
    readonly retries: 3;
    readonly timeout: 15000;
    readonly userAgentAppendix: string;
    readonly version: "10";
    readonly hashSweepInterval: 14400000;
    readonly hashLifetime: 86400000;
    readonly handlerSweepInterval: 3600000;
    readonly makeRequest: (url: string, init: undici.RequestInit) => Promise<ResponseLike>;
};
/**
 * The events that the REST manager emits
 */
declare enum RESTEvents {
    Debug = "restDebug",
    HandlerSweep = "handlerSweep",
    HashSweep = "hashSweep",
    InvalidRequestWarning = "invalidRequestWarning",
    RateLimited = "rateLimited",
    Response = "response"
}
declare const ALLOWED_EXTENSIONS: readonly ["webp", "png", "jpg", "jpeg", "gif"];
declare const ALLOWED_STICKER_EXTENSIONS: readonly ["png", "json", "gif"];
declare const ALLOWED_SIZES: readonly [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
type ImageExtension = (typeof ALLOWED_EXTENSIONS)[number];
type StickerExtension = (typeof ALLOWED_STICKER_EXTENSIONS)[number];
type ImageSize = (typeof ALLOWED_SIZES)[number];
declare const OverwrittenMimeTypes: {
    readonly 'image/apng': "image/png";
};
declare const BurstHandlerMajorIdKey = "burst";
/**
 * Prefix for deprecation warnings.
 *
 * @internal
 */
declare const DEPRECATION_WARNING_PREFIX: "DeprecationWarning";

/**
 * The options used for image URLs
 */
interface BaseImageURLOptions {
    /**
     * The extension to use for the image URL
     *
     * @defaultValue `'webp'`
     */
    extension?: ImageExtension;
    /**
     * The size specified in the image URL
     */
    size?: ImageSize;
}
/**
 * The options used for image URLs with animated content
 */
interface ImageURLOptions extends BaseImageURLOptions {
    /**
     * Whether or not to prefer the static version of an image asset.
     */
    forceStatic?: boolean;
}
/**
 * The options to use when making a CDN URL
 */
interface MakeURLOptions {
    /**
     * The allowed extensions that can be used
     */
    allowedExtensions?: readonly string[];
    /**
     * The extension to use for the image URL
     *
     * @defaultValue `'webp'`
     */
    extension?: string | undefined;
    /**
     * The size specified in the image URL
     */
    size?: ImageSize;
}
/**
 * The CDN link builder
 */
declare class CDN {
    private readonly base;
    constructor(base?: string);
    /**
     * Generates an app asset URL for a client's asset.
     *
     * @param clientId - The client id that has the asset
     * @param assetHash - The hash provided by Discord for this asset
     * @param options - Optional options for the asset
     */
    appAsset(clientId: string, assetHash: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates an app icon URL for a client's icon.
     *
     * @param clientId - The client id that has the icon
     * @param iconHash - The hash provided by Discord for this icon
     * @param options - Optional options for the icon
     */
    appIcon(clientId: string, iconHash: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates an avatar URL, e.g. for a user or a webhook.
     *
     * @param id - The id that has the icon
     * @param avatarHash - The hash provided by Discord for this avatar
     * @param options - Optional options for the avatar
     */
    avatar(id: string, avatarHash: string, options?: Readonly<ImageURLOptions>): string;
    /**
     * Generates a user avatar decoration URL.
     *
     * @param userId - The id of the user
     * @param userAvatarDecoration - The hash provided by Discord for this avatar decoration
     * @param options - Optional options for the avatar decoration
     */
    avatarDecoration(userId: string, userAvatarDecoration: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates a banner URL, e.g. for a user or a guild.
     *
     * @param id - The id that has the banner splash
     * @param bannerHash - The hash provided by Discord for this banner
     * @param options - Optional options for the banner
     */
    banner(id: string, bannerHash: string, options?: Readonly<ImageURLOptions>): string;
    /**
     * Generates an icon URL for a channel, e.g. a group DM.
     *
     * @param channelId - The channel id that has the icon
     * @param iconHash - The hash provided by Discord for this channel
     * @param options - Optional options for the icon
     */
    channelIcon(channelId: string, iconHash: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates a default avatar URL
     *
     * @param index - The default avatar index
     * @remarks
     * To calculate the index for a user do `(userId >> 22) % 6`,
     * or `discriminator % 5` if they're using the legacy username system.
     */
    defaultAvatar(index: number): string;
    /**
     * Generates a discovery splash URL for a guild's discovery splash.
     *
     * @param guildId - The guild id that has the discovery splash
     * @param splashHash - The hash provided by Discord for this splash
     * @param options - Optional options for the splash
     */
    discoverySplash(guildId: string, splashHash: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates an emoji's URL for an emoji.
     *
     * @param emojiId - The emoji id
     * @param options - Optional options for the emoji
     */
    emoji(emojiId: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates an emoji's URL for an emoji.
     *
     * @param emojiId - The emoji id
     * @param extension - The extension of the emoji
     * @deprecated This overload is deprecated. Pass an object containing the extension instead.
     */
    emoji(emojiId: string, extension?: ImageExtension): string;
    /**
     * Generates a guild member avatar URL.
     *
     * @param guildId - The id of the guild
     * @param userId - The id of the user
     * @param avatarHash - The hash provided by Discord for this avatar
     * @param options - Optional options for the avatar
     */
    guildMemberAvatar(guildId: string, userId: string, avatarHash: string, options?: Readonly<ImageURLOptions>): string;
    /**
     * Generates a guild member banner URL.
     *
     * @param guildId - The id of the guild
     * @param userId - The id of the user
     * @param bannerHash - The hash provided by Discord for this banner
     * @param options - Optional options for the banner
     */
    guildMemberBanner(guildId: string, userId: string, bannerHash: string, options?: Readonly<ImageURLOptions>): string;
    /**
     * Generates an icon URL, e.g. for a guild.
     *
     * @param id - The id that has the icon splash
     * @param iconHash - The hash provided by Discord for this icon
     * @param options - Optional options for the icon
     */
    icon(id: string, iconHash: string, options?: Readonly<ImageURLOptions>): string;
    /**
     * Generates a URL for the icon of a role
     *
     * @param roleId - The id of the role that has the icon
     * @param roleIconHash - The hash provided by Discord for this role icon
     * @param options - Optional options for the role icon
     */
    roleIcon(roleId: string, roleIconHash: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates a guild invite splash URL for a guild's invite splash.
     *
     * @param guildId - The guild id that has the invite splash
     * @param splashHash - The hash provided by Discord for this splash
     * @param options - Optional options for the splash
     */
    splash(guildId: string, splashHash: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates a sticker URL.
     *
     * @param stickerId - The sticker id
     * @param extension - The extension of the sticker
     * @privateRemarks
     * Stickers cannot have a `.webp` extension, so we default to a `.png`
     */
    sticker(stickerId: string, extension?: StickerExtension): string;
    /**
     * Generates a sticker pack banner URL.
     *
     * @param bannerId - The banner id
     * @param options - Optional options for the banner
     */
    stickerPackBanner(bannerId: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates a team icon URL for a team's icon.
     *
     * @param teamId - The team id that has the icon
     * @param iconHash - The hash provided by Discord for this icon
     * @param options - Optional options for the icon
     */
    teamIcon(teamId: string, iconHash: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Generates a cover image for a guild scheduled event.
     *
     * @param scheduledEventId - The scheduled event id
     * @param coverHash - The hash provided by discord for this cover image
     * @param options - Optional options for the cover image
     */
    guildScheduledEventCover(scheduledEventId: string, coverHash: string, options?: Readonly<BaseImageURLOptions>): string;
    /**
     * Constructs the URL for the resource, checking whether or not `hash` starts with `a_` if `dynamic` is set to `true`.
     *
     * @param route - The base cdn route
     * @param hash - The hash provided by Discord for this icon
     * @param options - Optional options for the link
     */
    private dynamicMakeURL;
    /**
     * Constructs the URL for the resource
     *
     * @param route - The base cdn route
     * @param options - The extension/size options for the link
     */
    private makeURL;
}

interface DiscordErrorFieldInformation {
    code: string;
    message: string;
}
interface DiscordErrorGroupWrapper {
    _errors: DiscordError[];
}
type DiscordError = DiscordErrorFieldInformation | DiscordErrorGroupWrapper | string | {
    [k: string]: DiscordError;
};
interface DiscordErrorData {
    code: number;
    errors?: DiscordError;
    message: string;
}
interface OAuthErrorData {
    error: string;
    error_description?: string;
}
interface RequestBody {
    files: RawFile[] | undefined;
    json: unknown | undefined;
}
/**
 * Represents an API error returned by Discord
 */
declare class DiscordAPIError extends Error {
    rawError: DiscordErrorData | OAuthErrorData;
    code: number | string;
    status: number;
    method: string;
    url: string;
    requestBody: RequestBody;
    /**
     * @param rawError - The error reported by Discord
     * @param code - The error code reported by Discord
     * @param status - The status code of the response
     * @param method - The method of the request that erred
     * @param url - The url of the request that erred
     * @param bodyData - The unparsed data for the request that errored
     */
    constructor(rawError: DiscordErrorData | OAuthErrorData, code: number | string, status: number, method: string, url: string, bodyData: Pick<InternalRequest, 'body' | 'files'>);
    /**
     * The name of the error
     */
    get name(): string;
    private static getMessage;
    private static flattenDiscordError;
}

/**
 * Represents a HTTP error
 */
declare class HTTPError extends Error {
    status: number;
    method: string;
    url: string;
    requestBody: RequestBody;
    name: string;
    /**
     * @param status - The status code of the response
     * @param statusText - The status text of the response
     * @param method - The method of the request that erred
     * @param url - The url of the request that erred
     * @param bodyData - The unparsed data for the request that errored
     */
    constructor(status: number, statusText: string, method: string, url: string, bodyData: Pick<InternalRequest, 'body' | 'files'>);
}

declare class RateLimitError extends Error implements RateLimitData {
    timeToReset: number;
    limit: number;
    method: string;
    hash: string;
    url: string;
    route: string;
    majorParameter: string;
    global: boolean;
    retryAfter: number;
    sublimitTimeout: number;
    scope: RateLimitData['scope'];
    constructor({ timeToReset, limit, method, hash, url, route, majorParameter, global, retryAfter, sublimitTimeout, scope, }: RateLimitData);
    /**
     * The name of the error
     */
    get name(): string;
}

/**
 * Represents the class that manages handlers for endpoints
 */
declare class REST extends AsyncEventEmitter<RestEventsMap> {
    #private;
    /**
     * The {@link https://undici.nodejs.org/#/docs/api/Agent | Agent} for all requests
     * performed by this manager.
     */
    agent: Dispatcher | null;
    readonly cdn: CDN;
    /**
     * The number of requests remaining in the global bucket
     */
    globalRemaining: number;
    /**
     * The promise used to wait out the global rate limit
     */
    globalDelay: Promise<void> | null;
    /**
     * The timestamp at which the global bucket resets
     */
    globalReset: number;
    /**
     * API bucket hashes that are cached from provided routes
     */
    readonly hashes: Collection<string, HashData>;
    /**
     * Request handlers created from the bucket hash and the major parameters
     */
    readonly handlers: Collection<string, IHandler>;
    private hashTimer;
    private handlerTimer;
    readonly options: RESTOptions;
    constructor(options?: Partial<RESTOptions>);
    private setupSweepers;
    /**
     * Runs a get request from the api
     *
     * @param fullRoute - The full route to query
     * @param options - Optional request options
     */
    get(fullRoute: RouteLike, options?: RequestData): Promise<unknown>;
    /**
     * Runs a delete request from the api
     *
     * @param fullRoute - The full route to query
     * @param options - Optional request options
     */
    delete(fullRoute: RouteLike, options?: RequestData): Promise<unknown>;
    /**
     * Runs a post request from the api
     *
     * @param fullRoute - The full route to query
     * @param options - Optional request options
     */
    post(fullRoute: RouteLike, options?: RequestData): Promise<unknown>;
    /**
     * Runs a put request from the api
     *
     * @param fullRoute - The full route to query
     * @param options - Optional request options
     */
    put(fullRoute: RouteLike, options?: RequestData): Promise<unknown>;
    /**
     * Runs a patch request from the api
     *
     * @param fullRoute - The full route to query
     * @param options - Optional request options
     */
    patch(fullRoute: RouteLike, options?: RequestData): Promise<unknown>;
    /**
     * Runs a request from the api
     *
     * @param options - Request options
     */
    request(options: InternalRequest): Promise<unknown>;
    /**
     * Sets the default agent to use for requests performed by this manager
     *
     * @param agent - The agent to use
     */
    setAgent(agent: Dispatcher): this;
    /**
     * Sets the authorization token that should be used for requests
     *
     * @param token - The authorization token to use
     */
    setToken(token: string): this;
    /**
     * Queues a request to be sent
     *
     * @param request - All the information needed to make a request
     * @returns The response from the api request
     */
    queueRequest(request: InternalRequest): Promise<ResponseLike>;
    /**
     * Creates a new rate limit handler from a hash, based on the hash and the major parameter
     *
     * @param hash - The hash for the route
     * @param majorParameter - The major parameter for this handler
     * @internal
     */
    private createHandler;
    /**
     * Formats the request data to a usable format for fetch
     *
     * @param request - The request data
     */
    private resolveRequest;
    /**
     * Stops the hash sweeping interval
     */
    clearHashSweeper(): void;
    /**
     * Stops the request handler sweeping interval
     */
    clearHandlerSweeper(): void;
    /**
     * Generates route data for an endpoint:method
     *
     * @param endpoint - The raw endpoint to generalize
     * @param method - The HTTP method this endpoint is called without
     * @internal
     */
    private static generateRouteData;
}

/**
 * Creates and populates an URLSearchParams instance from an object, stripping
 * out null and undefined values, while also coercing non-strings to strings.
 *
 * @param options - The options to use
 * @returns A populated URLSearchParams instance
 */
declare function makeURLSearchParams<OptionsType extends object>(options?: Readonly<OptionsType>): url.URLSearchParams;
/**
 * Converts the response to usable data
 *
 * @param res - The fetch response
 */
declare function parseResponse(res: ResponseLike): Promise<unknown>;
/**
 * Calculates the default avatar index for a given user id.
 *
 * @param userId - The user id to calculate the default avatar index for
 */
declare function calculateUserDefaultAvatarIndex(userId: Snowflake): number;

/**
 * The {@link https://github.com/discordjs/discord.js/blob/main/packages/rest#readme | @discordjs/rest} version
 * that you are currently using.
 */
declare const version: string;

export { ALLOWED_EXTENSIONS, ALLOWED_SIZES, ALLOWED_STICKER_EXTENSIONS, APIRequest, BaseImageURLOptions, BurstHandlerMajorIdKey, CDN, DEPRECATION_WARNING_PREFIX, DefaultRestOptions, DefaultUserAgent, DefaultUserAgentAppendix, DiscordAPIError, DiscordErrorData, HTTPError, HandlerRequestData, HashData, ImageExtension, ImageSize, ImageURLOptions, InternalRequest, InvalidRequestWarningData, MakeURLOptions, OAuthErrorData, OverwrittenMimeTypes, REST, RESTEvents, RESTOptions, RateLimitData, RateLimitError, RateLimitQueueFilter, RawFile, RequestBody, RequestData, RequestHeaders, RequestMethod, ResponseLike, RestEvents, RestEventsMap, RouteData, RouteLike, StickerExtension, calculateUserDefaultAvatarIndex, makeURLSearchParams, parseResponse, version };
