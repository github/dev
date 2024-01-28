import type { Permissions, Snowflake } from '../../../globals';
import type { LocalizationMap } from '../../../v10';
import type { APIApplicationCommandOption, APIChatInputApplicationCommandDMInteraction, APIChatInputApplicationCommandGuildInteraction, APIChatInputApplicationCommandInteraction, APIChatInputApplicationCommandInteractionData } from './_applicationCommands/chatInput';
import type { APIContextMenuDMInteraction, APIContextMenuGuildInteraction, APIContextMenuInteraction, APIContextMenuInteractionData } from './_applicationCommands/contextMenu';
import type { APIBaseInteraction } from './base';
import type { InteractionType } from './responses';
export * from './_applicationCommands/chatInput';
export * from './_applicationCommands/contextMenu';
export * from './_applicationCommands/permissions';
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object
 */
export interface APIApplicationCommand {
    /**
     * Unique id of the command
     */
    id: Snowflake;
    /**
     * Type of the command
     */
    type: ApplicationCommandType;
    /**
     * Unique id of the parent application
     */
    application_id: Snowflake;
    /**
     * Guild id of the command, if not global
     */
    guild_id?: Snowflake;
    /**
     * 1-32 character name; `CHAT_INPUT` command names must be all lowercase matching `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$`
     */
    name: string;
    /**
     * Localization dictionary for the name field. Values follow the same restrictions as name
     */
    name_localizations?: LocalizationMap | null;
    /**
     * The localized name
     */
    name_localized?: string;
    /**
     * 1-100 character description for `CHAT_INPUT` commands, empty string for `USER` and `MESSAGE` commands
     */
    description: string;
    /**
     * Localization dictionary for the description field. Values follow the same restrictions as description
     */
    description_localizations?: LocalizationMap | null;
    /**
     * The localized description
     */
    description_localized?: string;
    /**
     * The parameters for the `CHAT_INPUT` command, max 25
     */
    options?: APIApplicationCommandOption[];
    /**
     * Set of permissions represented as a bitset
     */
    default_member_permissions: Permissions | null;
    /**
     * Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible
     */
    dm_permission?: boolean;
    /**
     * Whether the command is enabled by default when the app is added to a guild
     *
     * If missing, this property should be assumed as `true`
     *
     * @deprecated Use `dm_permission` and/or `default_member_permissions` instead
     */
    default_permission?: boolean;
    /**
     * Indicates whether the command is age-restricted, defaults to `false`
     */
    nsfw?: boolean;
    /**
     * Autoincrementing version identifier updated during substantial record changes
     */
    version: Snowflake;
}
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
 */
export declare enum ApplicationCommandType {
    ChatInput = 1,
    User = 2,
    Message = 3
}
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-data
 */
export type APIApplicationCommandInteractionData = APIChatInputApplicationCommandInteractionData | APIContextMenuInteractionData;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
export type APIApplicationCommandInteractionWrapper<Data extends APIApplicationCommandInteractionData> = APIBaseInteraction<InteractionType.ApplicationCommand, Data> & Required<Pick<APIBaseInteraction<InteractionType.ApplicationCommand, Data>, 'channel' | 'channel_id' | 'data' | 'app_permissions'>>;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
export type APIApplicationCommandInteraction = APIChatInputApplicationCommandInteraction | APIContextMenuInteraction;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
export type APIApplicationCommandDMInteraction = APIChatInputApplicationCommandDMInteraction | APIContextMenuDMInteraction;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
export type APIApplicationCommandGuildInteraction = APIChatInputApplicationCommandGuildInteraction | APIContextMenuGuildInteraction;
//# sourceMappingURL=applicationCommands.d.ts.map