var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
function validateListener(input) {
  if (typeof input !== "function") {
    throw new TypeError(`The listener argument must be a function. Received ${typeof input}`);
  }
}
__name(validateListener, "validateListener");
function validateAbortSignal(input) {
  if (input && !(input instanceof AbortSignal)) {
    throw new TypeError(`The signal option must be an AbortSignal. Received ${input}`);
  }
}
__name(validateAbortSignal, "validateAbortSignal");
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1];
  }
  list.pop();
}
__name(spliceOne, "spliceOne");
function arrayClone(arr) {
  switch (arr.length) {
    case 2:
      return [arr[0], arr[1]];
    case 3:
      return [arr[0], arr[1], arr[2]];
    case 4:
      return [arr[0], arr[1], arr[2], arr[3]];
    case 5:
      return [arr[0], arr[1], arr[2], arr[3], arr[4]];
    case 6:
      return [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]];
  }
  return arr.slice();
}
__name(arrayClone, "arrayClone");
function identicalSequenceRange(a, b) {
  for (let i = 0; i < a.length - 3; i++) {
    const pos = b.indexOf(a[i]);
    if (pos !== -1) {
      const rest = b.length - pos;
      if (rest > 3) {
        let len = 1;
        const maxLen = Math.min(a.length - i, rest);
        while (maxLen > len && a[i + len] === b[pos + len]) {
          len++;
        }
        if (len > 3) {
          return [len, i];
        }
      }
    }
  }
  return [0, 0];
}
__name(identicalSequenceRange, "identicalSequenceRange");
function enhanceStackTrace(err, own) {
  let ctorInfo = "";
  try {
    const { name } = this.constructor;
    if (name !== "AsyncEventEmitter")
      ctorInfo = ` on ${name} instance`;
  } catch {
  }
  const sep = `
Emitted 'error' event${ctorInfo} at:
`;
  const errStack = err.stack.split("\n").slice(1);
  const ownStack = own.stack.split("\n").slice(1);
  const { 0: len, 1: off } = identicalSequenceRange(ownStack, errStack);
  if (len > 0) {
    ownStack.splice(off + 1, len - 2, "    [... lines matching original stack trace ...]");
  }
  return err.stack + sep + ownStack.join("\n");
}
__name(enhanceStackTrace, "enhanceStackTrace");
var _AsyncEventEmitter = class _AsyncEventEmitter {
  constructor() {
    this._events = {
      __proto__: null
    };
    this._eventCount = 0;
    this._maxListeners = 10;
    this._internalPromiseMap = /* @__PURE__ */ new Map();
    this._wrapperId = 0n;
  }
  addListener(eventName, listener) {
    validateListener(listener);
    const wrapped = this._wrapListener(eventName, listener, false);
    this._addListener(eventName, wrapped, false);
    return this;
  }
  on(eventName, listener) {
    return this.addListener(eventName, listener);
  }
  once(eventName, listener) {
    validateListener(listener);
    const wrapped = this._wrapListener(eventName, listener, true);
    this._addListener(eventName, wrapped, false);
    return this;
  }
  removeListener(eventName, listener) {
    validateListener(listener);
    const events = this._events;
    const eventList = events[eventName];
    if (eventList === void 0) {
      return this;
    }
    if (eventList === listener || eventList.listener === listener) {
      if (--this._eventCount === 0) {
        this._events = { __proto__: null };
      } else {
        delete events[eventName];
        if (events.removeListener) {
          this.emit("removeListener", eventName, eventList.listener ?? eventList);
        }
      }
    } else if (typeof eventList !== "function") {
      let position = -1;
      for (let i = eventList.length - 1; i >= 0; i--) {
        if (eventList[i] === listener || eventList[i].listener === listener) {
          position = i;
          break;
        }
      }
      if (position < 0) {
        return this;
      }
      if (position === 0) {
        eventList.shift();
      } else {
        spliceOne(eventList, position);
      }
      if (eventList.length === 0) {
        delete events[eventName];
        --this._eventCount;
      }
      if (events.removeListener !== void 0) {
        this.emit("removeListener", eventName, listener);
      }
    }
    return this;
  }
  off(eventName, listener) {
    return this.removeListener(eventName, listener);
  }
  removeAllListeners(event) {
    const events = this._events;
    if (events.removeListener === void 0) {
      if (!event) {
        this._events = { __proto__: null };
        this._eventCount = 0;
      } else if (events[event] !== void 0) {
        if (--this._eventCount === 0) {
          this._events = { __proto__: null };
        } else {
          delete events[event];
        }
      }
      return this;
    }
    if (!event) {
      for (const key of Reflect.ownKeys(events)) {
        if (key === "removeListener") {
          continue;
        }
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = { __proto__: null };
      this._eventCount = 0;
      return this;
    }
    const listeners = events[event];
    if (typeof listeners === "function") {
      this.removeListener(event, listeners);
    } else if (listeners !== void 0) {
      for (let i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(event, listeners[i]);
      }
    }
    return this;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(`Expected to get a non-negative number for "setMaxListeners", got ${n} instead`);
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return this._maxListeners;
  }
  listeners(eventName) {
    const eventList = this._events[eventName];
    if (eventList === void 0) {
      return [];
    }
    if (typeof eventList === "function") {
      return [eventList.listener ?? eventList];
    }
    const ret = arrayClone(eventList);
    for (let i = 0; i < ret.length; ++i) {
      const orig = ret[i].listener;
      if (typeof orig === "function") {
        ret[i] = orig;
      }
    }
    return ret;
  }
  rawListeners(eventName) {
    const eventList = this._events[eventName];
    if (eventList === void 0) {
      return [];
    }
    if (typeof eventList === "function") {
      return [eventList];
    }
    return arrayClone(eventList);
  }
  emit(eventName, ...args) {
    let doError = eventName === "error";
    const events = this._events;
    if (events !== void 0) {
      doError = doError && events.error === void 0;
    } else if (!doError) {
      return false;
    }
    if (doError) {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        try {
          const capture = {};
          Error.captureStackTrace(capture, _AsyncEventEmitter.prototype.emit);
          Object.defineProperty(er, "stack", {
            value: enhanceStackTrace.call(this, er, capture),
            configurable: true
          });
        } catch {
        }
        throw er; // Unhandled 'error' event
      }
      const stringifiedError = String(er);
      const err = new Error(`Unhandled 'error' event emitted, received ${stringifiedError}`);
      err.context = er;
      throw err; // Unhandled 'error' event
    }
    const handlers = events[eventName];
    if (handlers === void 0) {
      return false;
    }
    if (typeof handlers === "function") {
      const result = handlers.apply(this, args);
      if (result !== void 0 && result !== null) {
        handleMaybeAsync(this, result);
      }
    } else {
      const len = handlers.length;
      const listeners = arrayClone(handlers);
      for (let i = 0; i < len; ++i) {
        const result = listeners[i].apply(this, args);
        if (result !== void 0 && result !== null) {
          handleMaybeAsync(this, result);
        }
      }
    }
    return true;
  }
  listenerCount(eventName) {
    const events = this._events;
    if (events === void 0) {
      return 0;
    }
    const eventListeners = events[eventName];
    if (typeof eventListeners === "function") {
      return 1;
    }
    return eventListeners?.length ?? 0;
  }
  prependListener(eventName, listener) {
    validateListener(listener);
    const wrapped = this._wrapListener(eventName, listener, false);
    this._addListener(eventName, wrapped, true);
    return this;
  }
  prependOnceListener(eventName, listener) {
    validateListener(listener);
    const wrapped = this._wrapListener(eventName, listener, true);
    this._addListener(eventName, wrapped, true);
    return this;
  }
  eventNames() {
    return this._eventCount > 0 ? Reflect.ownKeys(this._events) : [];
  }
  async waitForAllListenersToComplete() {
    const promises = [...this._internalPromiseMap.values()];
    if (promises.length === 0) {
      return false;
    }
    await Promise.all(promises);
    return true;
  }
  _addListener(eventName, wrappedListener, prepend) {
    if (this._events.newListener !== void 0) {
      this.emit("newListener", eventName, wrappedListener.listener ?? wrappedListener);
    }
    let existing = this._events[eventName];
    if (existing === void 0) {
      existing = this._events[eventName] = wrappedListener;
      ++this._eventCount;
    } else if (typeof existing === "function") {
      existing = this._events[eventName] = prepend ? [wrappedListener, existing] : [existing, wrappedListener];
    } else if (prepend) {
      existing.unshift(wrappedListener);
    } else {
      existing.push(wrappedListener);
    }
    if (this._maxListeners > 0 && existing.length > this._maxListeners && !existing._hasWarnedAboutMaxListeners) {
      existing._hasWarnedAboutMaxListeners = true;
      const warningMessage = [
        `Possible AsyncEventEmitter memory leak detected. ${existing.length} ${String(eventName)} listeners added to ${this.constructor.name}.`,
        `Use emitter.setMaxListeners() to increase the limit.`
      ].join(" ");
      console.warn(warningMessage);
    }
  }
  _wrapListener(eventName, listener, once) {
    if (!once) {
      return listener;
    }
    const state = {
      fired: false,
      wrapFn: void 0,
      eventEmitter: this,
      eventName,
      listener
    };
    const aliased = onceWrapper;
    const wrapped = aliased.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  static listenerCount(emitter, eventName) {
    return emitter.listenerCount(eventName);
  }
  static async once(emitter, eventName, options = {}) {
    const signal = options?.signal;
    validateAbortSignal(signal);
    if (signal?.aborted) {
      throw new AbortError(void 0, { cause: getReason(signal) });
    }
    return new Promise((resolve, reject) => {
      const errorListener = /* @__PURE__ */ __name((err) => {
        emitter.removeListener(eventName, resolver);
        if (signal) {
          eventTargetAgnosticRemoveListener(emitter, eventName, abortListener);
        }
        reject(err);
      }, "errorListener");
      const resolver = /* @__PURE__ */ __name((...args) => {
        emitter.removeListener("error", errorListener);
        if (signal) {
          eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
        }
        resolve(args);
      }, "resolver");
      emitter.once(eventName, resolver);
      if (eventName !== "error") {
        emitter.once("error", errorListener);
      }
      const abortListener = /* @__PURE__ */ __name(() => {
        eventTargetAgnosticRemoveListener(emitter, eventName, resolver);
        eventTargetAgnosticRemoveListener(emitter, "error", errorListener);
        reject(new AbortError(void 0, { cause: getReason(signal) }));
      }, "abortListener");
      if (signal) {
        eventTargetAgnosticAddListener(signal, "abort", abortListener, { once: true });
      }
    });
  }
  static on(emitter, eventName, options = {}) {
    const signal = options?.signal;
    validateAbortSignal(signal);
    if (signal?.aborted) {
      throw new AbortError(void 0, { cause: getReason(signal) });
    }
    const unconsumedEvents = [];
    const unconsumedPromises = [];
    let error = null;
    let finished = false;
    const abortListener = /* @__PURE__ */ __name(() => {
      errorHandler(new AbortError(void 0, { cause: getReason(signal) }));
    }, "abortListener");
    const eventHandler = /* @__PURE__ */ __name((...args) => {
      const promise = unconsumedPromises.shift();
      if (promise) {
        promise.resolve(createIterResult(args, false));
      } else {
        unconsumedEvents.push(args);
      }
    }, "eventHandler");
    const errorHandler = /* @__PURE__ */ __name((err) => {
      finished = true;
      const toError = unconsumedPromises.shift();
      if (toError) {
        toError.reject(err);
      } else {
        error = err;
      }
      void iterator.return();
    }, "errorHandler");
    const iterator = Object.setPrototypeOf(
      {
        next() {
          const value = unconsumedEvents.shift();
          if (value) {
            return Promise.resolve(createIterResult(value, false));
          }
          if (error) {
            const p = Promise.reject(error);
            error = null;
            return p;
          }
          if (finished) {
            return Promise.resolve(createIterResult(void 0, true));
          }
          return new Promise((resolve, reject) => {
            unconsumedPromises.push({ resolve, reject });
          });
        },
        return() {
          emitter.off(eventName, eventHandler);
          emitter.off("error", errorHandler);
          if (signal) {
            eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
          }
          finished = true;
          const doneResult = createIterResult(void 0, true);
          for (const promise of unconsumedPromises) {
            promise.resolve(doneResult);
          }
          return Promise.resolve(doneResult);
        },
        throw(err) {
          if (!err || !(err instanceof Error)) {
            throw new TypeError(`Expected Error instance to be thrown in AsyncEventEmitter.AsyncIterator. Got ${err}`);
          }
          error = err;
          emitter.off(eventName, eventHandler);
          emitter.off("error", errorHandler);
        },
        [Symbol.asyncIterator]() {
          return this;
        }
      },
      AsyncIteratorPrototype
    );
    emitter.on(eventName, eventHandler);
    if (eventName !== "error") {
      emitter.on("error", errorHandler);
    }
    if (signal) {
      eventTargetAgnosticAddListener(signal, "abort", abortListener);
    }
    return iterator;
  }
};
__name(_AsyncEventEmitter, "AsyncEventEmitter");
var AsyncEventEmitter = _AsyncEventEmitter;
function onceWrapper() {
  if (!this.fired) {
    this.eventEmitter.removeListener(this.eventName, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) {
      return this.listener.call(this.eventEmitter);
    }
    return this.listener.apply(this.eventEmitter, arguments);
  }
}
__name(onceWrapper, "onceWrapper");
function getReason(signal) {
  return signal?.reason;
}
__name(getReason, "getReason");
function eventTargetAgnosticRemoveListener(emitter, name, listener, flags) {
  if (typeof emitter.off === "function") {
    emitter.off(name, listener);
  } else if (typeof emitter.removeEventListener === "function") {
    emitter.removeEventListener(name, listener, flags);
  }
}
__name(eventTargetAgnosticRemoveListener, "eventTargetAgnosticRemoveListener");
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags?.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    emitter.addEventListener(name, listener, flags);
  }
}
__name(eventTargetAgnosticAddListener, "eventTargetAgnosticAddListener");
var AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
}).prototype);
function createIterResult(value, done) {
  return { value, done };
}
__name(createIterResult, "createIterResult");
var _AbortError = class _AbortError extends Error {
  constructor(message = "The operation was aborted", options = void 0) {
    if (options !== void 0 && typeof options !== "object") {
      throw new TypeError(`Failed to create AbortError: options is not an object or undefined`);
    }
    super(message, options);
    this.code = "ABORT_ERR";
    this.name = "AbortError";
  }
};
__name(_AbortError, "AbortError");
var AbortError = _AbortError;
function handleMaybeAsync(emitter, result) {
  try {
    const fin = result.finally;
    if (typeof fin === "function") {
      const promiseId = String(++emitter["_wrapperId"]);
      emitter["_internalPromiseMap"].set(promiseId, result);
      fin.call(result, /* @__PURE__ */ __name(function final() {
        emitter["_internalPromiseMap"].delete(promiseId);
      }, "final"));
    }
  } catch (err) {
    emitter.emit("error", err);
  }
}
__name(handleMaybeAsync, "handleMaybeAsync");
export {
  AbortError,
  AsyncEventEmitter
};
//# sourceMappingURL=index.mjs.map