var SapphireAsyncQueue = (function (exports) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/lib/AsyncQueueEntry.ts
  var _AsyncQueueEntry = class _AsyncQueueEntry {
    constructor(queue) {
      __publicField(this, "promise");
      __publicField(this, "resolve");
      __publicField(this, "reject");
      __publicField(this, "queue");
      __publicField(this, "signal", null);
      __publicField(this, "signalListener", null);
      this.queue = queue;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
    setSignal(signal) {
      if (signal.aborted)
        return this;
      this.signal = signal;
      this.signalListener = () => {
        const index = this.queue["promises"].indexOf(this);
        if (index !== -1)
          this.queue["promises"].splice(index, 1);
        this.reject(new Error("Request aborted manually"));
      };
      this.signal.addEventListener("abort", this.signalListener);
      return this;
    }
    use() {
      this.dispose();
      this.resolve();
      return this;
    }
    abort() {
      this.dispose();
      this.reject(new Error("Request aborted manually"));
      return this;
    }
    dispose() {
      if (this.signal) {
        this.signal.removeEventListener("abort", this.signalListener);
        this.signal = null;
        this.signalListener = null;
      }
    }
  };
  __name(_AsyncQueueEntry, "AsyncQueueEntry");
  var AsyncQueueEntry = _AsyncQueueEntry;

  // src/lib/AsyncQueue.ts
  var _AsyncQueue = class _AsyncQueue {
    constructor() {
      /**
       * The promises array
       */
      __publicField(this, "promises", []);
    }
    /**
     * The amount of entries in the queue, including the head.
     * @seealso {@link queued} for the queued count.
     */
    get remaining() {
      return this.promises.length;
    }
    /**
     * The amount of queued entries.
     * @seealso {@link remaining} for the count with the head.
     */
    get queued() {
      return this.remaining === 0 ? 0 : this.remaining - 1;
    }
    /**
     * Waits for last promise and queues a new one
     * @example
     * ```typescript
     * const queue = new AsyncQueue();
     * async function request(url, options) {
     *     await queue.wait({ signal: options.signal });
     *     try {
     *         const result = await fetch(url, options);
     *         // Do some operations with 'result'
     *     } finally {
     *         // Remove first entry from the queue and resolve for the next entry
     *         queue.shift();
     *     }
     * }
     *
     * request(someUrl1, someOptions1); // Will call fetch() immediately
     * request(someUrl2, someOptions2); // Will call fetch() after the first finished
     * request(someUrl3, someOptions3); // Will call fetch() after the second finished
     * ```
     */
    wait(options) {
      const entry = new AsyncQueueEntry(this);
      if (this.promises.length === 0) {
        this.promises.push(entry);
        return Promise.resolve();
      }
      this.promises.push(entry);
      if (options?.signal)
        entry.setSignal(options.signal);
      return entry.promise;
    }
    /**
     * Unlocks the head lock and transfers the next lock (if any) to the head.
     */
    shift() {
      if (this.promises.length === 0)
        return;
      if (this.promises.length === 1) {
        this.promises.shift();
        return;
      }
      this.promises.shift();
      this.promises[0].use();
    }
    /**
     * Aborts all the pending promises.
     * @note To avoid race conditions, this does **not** unlock the head lock.
     */
    abortAll() {
      if (this.queued === 0)
        return;
      for (let i = 1; i < this.promises.length; ++i) {
        this.promises[i].abort();
      }
      this.promises.length = 1;
    }
  };
  __name(_AsyncQueue, "AsyncQueue");
  var AsyncQueue = _AsyncQueue;

  exports.AsyncQueue = AsyncQueue;

  return exports;

})({});
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.global.js.map