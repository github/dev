import type { Permissions, Snowflake } from '../../../globals';
import type { APIRole, LocaleString } from '../../../v9';
import type { APIAttachment, APIChannel, APIMessage, APIPartialChannel, APIThreadChannel, ChannelType, ThreadChannelType } from '../channel';
import type { APIGuildMember } from '../guild';
import type { APIEntitlement } from '../monetization';
import type { APIUser } from '../user';
import type { InteractionType } from './responses';
export type PartialAPIMessageInteractionGuildMember = Pick<APIGuildMember, 'roles' | 'premium_since' | 'pending' | 'nick' | 'mute' | 'joined_at' | 'deaf' | 'communication_disabled_until' | 'avatar'>;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object
 */
export interface APIMessageInteraction {
    /**
     * ID of the interaction
     */
    id: Snowflake;
    /**
     * The type of interaction
     */
    type: InteractionType;
    /**
     * The name of the application command, including subcommands and subcommand groups
     */
    name: string;
    /**
     * The user who invoked the interaction
     */
    user: APIUser;
    /**
     * The guild member who invoked the interaction, only sent in MESSAGE_CREATE events
     */
    member?: PartialAPIMessageInteractionGuildMember;
}
/**
 * https://discord.com/developers/docs/resources/guild#guild-member-object
 */
export interface APIInteractionGuildMember extends APIGuildMember {
    permissions: Permissions;
    user: APIUser;
}
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
export interface APIBaseInteraction<Type extends InteractionType, Data> {
    /**
     * ID of the interaction
     */
    id: Snowflake;
    /**
     * ID of the application this interaction is for
     */
    application_id: Snowflake;
    /**
     * The type of interaction
     */
    type: Type;
    /**
     * The command data payload
     */
    data?: Data;
    /**
     * The guild it was sent from
     */
    guild_id?: Snowflake;
    /**
     * The channel it was sent from
     */
    channel?: Partial<APIChannel> & Pick<APIChannel, 'id' | 'type'>;
    /**
     * The id of the channel it was sent from
     *
     * @deprecated Use {@apilink APIBaseInteraction#channel} instead
     */
    channel_id?: Snowflake;
    /**
     * Guild member data for the invoking user, including permissions
     *
     * **This is only sent when an interaction is invoked in a guild**
     */
    member?: APIInteractionGuildMember;
    /**
     * User object for the invoking user, if invoked in a DM
     */
    user?: APIUser;
    /**
     * A continuation token for responding to the interaction
     */
    token: string;
    /**
     * Read-only property, always `1`
     */
    version: 1;
    /**
     * For components, the message they were attached to
     */
    message?: APIMessage;
    /**
     * Bitwise set of permissions the app or bot has within the channel the interaction was sent from
     */
    app_permissions?: Permissions;
    /**
     * The selected language of the invoking user
     */
    locale: LocaleString;
    /**
     * The guild's preferred locale, if invoked in a guild
     */
    guild_locale?: LocaleString;
    /**
     * For monetized apps, any entitlements for the invoking user, representing access to premium SKUs
     */
    entitlements: APIEntitlement[];
}
export type APIDMInteractionWrapper<Original extends APIBaseInteraction<InteractionType, unknown>> = Omit<Original, 'member' | 'guild_id'> & Required<Pick<Original, 'user'>>;
export type APIGuildInteractionWrapper<Original extends APIBaseInteraction<InteractionType, unknown>> = Omit<Original, 'user'> & Required<Pick<Original, 'member' | 'guild_id'>>;
export interface APIInteractionDataResolvedChannelBase<T extends ChannelType> extends Required<APIPartialChannel> {
    type: T;
    permissions: Permissions;
}
/**
 * https://discord.com/developers/docs/resources/channel#channel-object
 */
export type APIInteractionDataResolvedChannel = APIInteractionDataResolvedChannelBase<Exclude<ChannelType, ThreadChannelType>> | (APIInteractionDataResolvedChannelBase<ThreadChannelType> & Pick<APIThreadChannel, 'thread_metadata' | 'parent_id'>);
/**
 * https://discord.com/developers/docs/resources/guild#guild-member-object
 */
export interface APIInteractionDataResolvedGuildMember extends Omit<APIGuildMember, 'user' | 'deaf' | 'mute'> {
    permissions: Permissions;
}
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure
 */
export interface APIInteractionDataResolved {
    users?: Record<Snowflake, APIUser>;
    roles?: Record<Snowflake, APIRole>;
    members?: Record<Snowflake, APIInteractionDataResolvedGuildMember>;
    channels?: Record<Snowflake, APIInteractionDataResolvedChannel>;
    attachments?: Record<Snowflake, APIAttachment>;
}
/**
 * @deprecated Renamed to `APIInteractionDataResolved`
 */
export type APIChatInputApplicationCommandInteractionDataResolved = APIInteractionDataResolved;
/**
 * `users` and optional `members` from APIInteractionDataResolved, for user commands and user selects
 */
export type APIUserInteractionDataResolved = Required<Pick<APIInteractionDataResolved, 'users'>> & Pick<APIInteractionDataResolved, 'members'>;
/**
 * @deprecated Renamed to `APIUserInteractionDataResolved`
 */
export type APIUserApplicationCommandInteractionDataResolved = APIUserInteractionDataResolved;
//# sourceMappingURL=base.d.ts.map