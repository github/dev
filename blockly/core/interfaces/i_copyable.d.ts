/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { WorkspaceSvg } from '../workspace_svg.js';
import type { ISelectable } from './i_selectable.js';
export interface ICopyable extends ISelectable {
    /**
     * Encode for copying.
     *
     * @returns Copy metadata.
     * @internal
     */
    toCopyData(): CopyData | null;
}
export declare namespace ICopyable {
    interface CopyData {
        saveInfo: Object | Element;
        source: WorkspaceSvg;
        typeCounts: {
            [key: string]: number;
        } | null;
    }
}
export type CopyData = ICopyable.CopyData;
//# sourceMappingURL=i_copyable.d.ts.map