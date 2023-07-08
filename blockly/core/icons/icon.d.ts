/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import type { IIcon } from '../interfaces/i_icon.js';
import { Coordinate } from '../utils/coordinate.js';
import { Size } from '../utils/size.js';
import type { IconType } from './icon_types.js';
/**
 * The abstract icon class. Icons are visual elements that live in the top-start
 * corner of the block. Usually they provide more "meta" information about a
 * block (such as warnings or comments) as opposed to fields, which provide
 * "actual" information, related to how a block functions.
 */
export declare abstract class Icon implements IIcon {
    protected sourceBlock: Block;
    /**
     * The position of this icon relative to its blocks top-start,
     * in workspace units.
     */
    protected offsetInBlock: Coordinate;
    /** The position of this icon in workspace coordinates. */
    protected workspaceLocation: Coordinate;
    /** The root svg element visually representing this icon. */
    protected svgRoot: SVGGElement | null;
    constructor(sourceBlock: Block);
    getType(): IconType<IIcon>;
    initView(pointerdownListener: (e: PointerEvent) => void): void;
    dispose(): void;
    getWeight(): number;
    getSize(): Size;
    applyColour(): void;
    updateEditable(): void;
    updateCollapsed(): void;
    hideForInsertionMarker(): void;
    isShownWhenCollapsed(): boolean;
    setOffsetInBlock(offset: Coordinate): void;
    private updateSvgRootOffset;
    onLocationChange(blockOrigin: Coordinate): void;
    onClick(): void;
    /**
     * Sets the visibility of the icon's bubble if one exists.
     *
     * @deprecated Use `setBubbleVisible` instead. To be removed in v11.
     */
    setVisible(visibility: boolean): void;
}
//# sourceMappingURL=icon.d.ts.map