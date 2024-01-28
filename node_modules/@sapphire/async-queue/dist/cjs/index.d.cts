/**
 * The AsyncQueue class used to sequentialize burst requests
 */
declare class AsyncQueue {
    /**
     * The amount of entries in the queue, including the head.
     * @seealso {@link queued} for the queued count.
     */
    get remaining(): number;
    /**
     * The amount of queued entries.
     * @seealso {@link remaining} for the count with the head.
     */
    get queued(): number;
    /**
     * The promises array
     */
    private promises;
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
    wait(options?: Readonly<AsyncQueueWaitOptions>): Promise<void>;
    /**
     * Unlocks the head lock and transfers the next lock (if any) to the head.
     */
    shift(): void;
    /**
     * Aborts all the pending promises.
     * @note To avoid race conditions, this does **not** unlock the head lock.
     */
    abortAll(): void;
}
interface AsyncQueueWaitOptions {
    signal?: AbortSignal | undefined | null;
}

export { AsyncQueue, type AsyncQueueWaitOptions };
