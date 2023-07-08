/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BlockSvg } from './block_svg.js';
/**
 * Registers that the given block and all of its parents need to be rerendered,
 * and registers a callback to do so after a delay, to allowf or batching.
 *
 * @param block The block to rerender.
 * @returns A promise that resolves after the currently queued renders have been
 *     completed. Used for triggering other behavior that relies on updated
 *     size/position location for the block.
 * @internal
 */
export declare function queueRender(block: BlockSvg): Promise<void>;
/**
 * @returns A promise that resolves after the currently queued renders have
 *     been completed.
 */
export declare function finishQueuedRenders(): Promise<void>;
//# sourceMappingURL=render_management.d.ts.map