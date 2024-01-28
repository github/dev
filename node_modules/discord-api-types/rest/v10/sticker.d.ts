import type { APISticker, APIStickerPack } from '../../payloads/v10/index';
/**
 * https://discord.com/developers/docs/resources/sticker#get-sticker
 */
export type RESTGetAPIStickerResult = APISticker;
/**
 * https://discord.com/developers/docs/resources/sticker#list-sticker-packs
 */
export interface RESTGetStickerPacksResult {
    sticker_packs: APIStickerPack[];
}
/**
 * https://discord.com/developers/docs/resources/sticker#list-sticker-packs
 *
 * @deprecated Use `RESTGetStickerPacksResult` instead
 */
export type RESTGetNitroStickerPacksResult = RESTGetStickerPacksResult;
/**
 * https://discord.com/developers/docs/resources/sticker#list-guild-stickers
 */
export type RESTGetAPIGuildStickersResult = APISticker[];
/**
 * https://discord.com/developers/docs/resources/sticker#get-guild-sticker
 */
export type RESTGetAPIGuildStickerResult = APISticker;
/**
 * https://discord.com/developers/docs/resources/sticker#create-guild-sticker
 */
export interface RESTPostAPIGuildStickerFormDataBody {
    /**
     * Name of the sticker (2-30 characters)
     */
    name: string;
    /**
     * Description of the sticker (empty or 2-100 characters)
     */
    description: string;
    /**
     * The Discord name of a unicode emoji representing the sticker's expression (2-200 characters)
     */
    tags: string;
    /**
     * The sticker file to upload, must be a PNG, APNG, GIF, or Lottie JSON file, max 512 KB
     *
     * Uploaded stickers are constrained to 5 seconds in length for animated stickers, and 320 x 320 pixels.
     */
    file: unknown;
}
/**
 * https://discord.com/developers/docs/resources/sticker#create-guild-sticker
 */
export type RESTPostAPIGuildStickerResult = APISticker;
/**
 * https://discord.com/developers/docs/resources/sticker#modify-guild-sticker
 */
export interface RESTPatchAPIGuildStickerJSONBody {
    /**
     * Name of the sticker (2-30 characters)
     */
    name?: string | undefined;
    /**
     * Description of the sticker (2-100 characters)
     */
    description?: string | null | undefined;
    /**
     * The Discord name of a unicode emoji representing the sticker's expression (2-200 characters)
     */
    tags?: string | undefined;
}
/**
 * https://discord.com/developers/docs/resources/sticker#modify-guild-sticker
 */
export type RESTPatchAPIGuildStickerResult = APISticker;
/**
 * https://discord.com/developers/docs/resources/sticker#delete-guild-sticker
 */
export type RESTDeleteAPIGuildStickerResult = never;
//# sourceMappingURL=sticker.d.ts.map