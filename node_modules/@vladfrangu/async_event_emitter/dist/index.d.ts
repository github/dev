declare class AsyncEventEmitter<Events extends {} = Record<PropertyKey, unknown[]> & AsyncEventEmitterPredefinedEvents, _Events extends Record<PropertyKey, unknown[]> = Events> {
    private _events;
    private _eventCount;
    private _maxListeners;
    private _internalPromiseMap;
    private _wrapperId;
    addListener<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K, listener: (...args: K extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[K] : _Events[K]) => void): this;
    on<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K, listener: (...args: K extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[K] : _Events[K]) => void): this;
    once<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K, listener: (...args: K extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[K] : _Events[K]) => void): this;
    removeListener<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K, listener: (...args: K extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[K] : _Events[K]) => void): this;
    off<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K, listener: (...args: K extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[K] : _Events[K]) => void): this;
    removeAllListeners<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(event?: K | undefined): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K): Listener<_Events[keyof Events]>['listener'][];
    rawListeners<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K): Listener<_Events[keyof Events]>[];
    emit<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K, ...args: K extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[K] : _Events[K]): boolean;
    listenerCount<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K): number;
    prependListener<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K, listener: (...args: K extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[K] : _Events[K]) => void): this;
    prependOnceListener<K extends keyof _Events | keyof AsyncEventEmitterPredefinedEvents>(eventName: K, listener: (...args: K extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[K] : _Events[K]) => void): this;
    eventNames(): (keyof _Events | keyof AsyncEventEmitterPredefinedEvents)[];
    waitForAllListenersToComplete(): Promise<boolean>;
    private _addListener;
    private _wrapListener;
    static listenerCount<Emitter extends AsyncEventEmitter<any>, EventNames = Emitter extends AsyncEventEmitter<infer Events> ? Events : never, EventName extends PropertyKey = EventNames extends never ? string | symbol : keyof EventNames>(emitter: Emitter, eventName: EventName | keyof AsyncEventEmitterPredefinedEvents): number;
    // @ts-ignore
    static once<Emitter extends AsyncEventEmitter<any, any>, EventNames extends {} = Emitter extends AsyncEventEmitter<infer Events, any> ? Events : Record<PropertyKey, unknown[]>, EventName extends PropertyKey = keyof EventNames | keyof AsyncEventEmitterPredefinedEvents, EventResult extends unknown[] = EventNames extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[EventName] : EventNames[EventName]>(emitter: Emitter, eventName: EventName, options?: AbortableMethods): Promise<EventResult>;
    // @ts-ignore
    static on<Emitter extends AsyncEventEmitter<any, any>, EventNames extends {} = Emitter extends AsyncEventEmitter<infer Events, any> ? Events : Record<PropertyKey, unknown[]>, EventName extends PropertyKey = keyof EventNames | keyof AsyncEventEmitterPredefinedEvents, EventResult extends unknown[] = EventNames extends keyof AsyncEventEmitterPredefinedEvents ? AsyncEventEmitterPredefinedEvents[EventName] : EventNames[EventName]>(emitter: Emitter, eventName: EventName, options?: AbortableMethods): AsyncGenerator<EventResult, void>;
}
interface AsyncEventEmitterPredefinedEvents {
    newListener: [eventName: string | symbol, listener: (...args: any[]) => Awaitable<void>];
    removeListener: [eventName: string | symbol, listener: (...args: any[]) => Awaitable<void>];
}
interface WrappedOnce<Args extends any[] = any[]> {
    (...args: Args): Awaitable<void>;
    listener: (...args: Args) => Awaitable<void>;
    _hasWarnedAboutMaxListeners?: boolean;
}
interface Listener<Args extends any[] = any[]> {
    (...args: Args): Awaitable<void>;
    listener: (...args: Args) => Awaitable<void>;
    _hasWarnedAboutMaxListeners?: boolean;
}
type Awaitable<T> = T | Promise<T>;
interface AbortableMethods {
    signal?: AbortSignal;
}
interface AbortErrorOptions {
    cause?: unknown;
}
declare class AbortError extends Error {
    readonly code = "ABORT_ERR";
    readonly name = "AbortError";
    constructor(message?: string, options?: AbortErrorOptions | undefined);
}

export { AbortError, type AbortErrorOptions, type AbortableMethods, AsyncEventEmitter, type AsyncEventEmitterPredefinedEvents, type Awaitable, type Listener, type WrappedOnce };
