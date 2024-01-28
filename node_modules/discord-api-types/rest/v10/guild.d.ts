import type { Permissions, Snowflake } from '../../globals';
import type { APIBan, APIChannel, APIDMChannel, APIExtendedInvite, APIGroupDMChannel, APIGuild, APIGuildIntegration, APIGuildMember, APIGuildMembershipScreening, APIGuildOnboarding, APIGuildPreview, APIGuildWelcomeScreen, APIGuildWidget, APIGuildWidgetSettings, APIRole, APIThreadList, APIVoiceRegion, GuildDefaultMessageNotifications, GuildExplicitContentFilter, GuildFeature, GuildMFALevel, GuildSystemChannelFlags, GuildVerificationLevel, GuildWidgetStyle } from '../../payloads/v10/index';
import type { DistributiveOmit, DistributivePick, Nullable, StrictPartial, StrictRequired } from '../../utils/internals';
import type { RESTPutAPIChannelPermissionJSONBody } from './channel';
export interface APIGuildCreateOverwrite extends RESTPutAPIChannelPermissionJSONBody {
    id: number | string;
}
export type APIGuildChannelResolvable = Exclude<APIChannel, APIDMChannel | APIGroupDMChannel>;
export type APIGuildCreatePartialChannel = StrictPartial<DistributivePick<APIGuildChannelResolvable, 'type' | 'topic' | 'nsfw' | 'bitrate' | 'user_limit' | 'rate_limit_per_user' | 'default_auto_archive_duration' | 'position' | 'rtc_region' | 'video_quality_mode' | 'flags' | 'default_reaction_emoji' | 'available_tags' | 'default_sort_order' | 'default_forum_layout' | 'default_thread_rate_limit_per_user'>> & {
    name: string;
    id?: number | string | undefined;
    parent_id?: number | string | null | undefined;
    permission_overwrites?: APIGuildCreateOverwrite[] | undefined;
};
export interface APIGuildCreateRole extends RESTPostAPIGuildRoleJSONBody {
    id: number | string;
}
/**
 * https://discord.com/developers/docs/resources/guild#create-guild
 */
export interface RESTPostAPIGuildsJSONBody {
    /**
     * Name of the guild (2-100 characters)
     */
    name: string;
    /**
     * Voice region id
     *
     * See https://discord.com/developers/docs/resources/voice#voice-region-object
     */
    region?: string | undefined;
    /**
     * base64 1024x1024 png/jpeg image for the guild icon
     *
     * See https://discord.com/developers/docs/reference#image-data
     */
    icon?: string | undefined;
    /**
     * Verification level
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-verification-level
     */
    verification_level?: GuildVerificationLevel | undefined;
    /**
     * Default message notification level
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
     */
    default_message_notifications?: GuildDefaultMessageNotifications | undefined;
    /**
     * Explicit content filter level
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
     */
    explicit_content_filter?: GuildExplicitContentFilter | undefined;
    /**
     * New guild roles
     *
     * @remarks
     * When using this parameter, the first member of the array is used to change properties of the guild's `@everyone` role.
     * If you are trying to bootstrap a guild with additional roles, keep this in mind.
     *
     * Also, the required `id` field within each role object is an integer placeholder,
     * and will be replaced by the API upon consumption. Its purpose is to allow you to overwrite a role's permissions
     * in a channel when also passing in channels with the channels array.
     *
     * See https://discord.com/developers/docs/topics/permissions#role-object
     */
    roles?: APIGuildCreateRole[] | undefined;
    /**
     * New guild's channels
     *
     * @remarks
     * When using the channels parameter, the `position` field is ignored, and none of the default channels are created.
     *
     * Also, the `id` field within each channel object may be set to an integer placeholder,
     * and will be replaced by the API upon consumption. Its purpose is to allow you to create `GUILD_CATEGORY` channels
     * by setting the `parent_id` field on any children to the category's id field.
     * Category channels must be listed before any children.
     *
     * See https://discord.com/developers/docs/resources/channel#channel-object
     */
    channels?: APIGuildCreatePartialChannel[] | undefined;
    /**
     * ID for afk channel
     */
    afk_channel_id?: number | Snowflake | null | undefined;
    /**
     * afk timeout in seconds, can be set to: `60`, `300`, `900`, `1800`, `3600`
     */
    afk_timeout?: 60 | 300 | 900 | 1800 | 3600 | undefined;
    /**
     * The id of the channel where guild notices such as welcome messages and boost events are posted
     */
    system_channel_id?: number | Snowflake | null | undefined;
    /**
     * System channel flags
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
     */
    system_channel_flags?: GuildSystemChannelFlags | undefined;
    /**
     * Whether the boosts progress bar should be enabled.
     */
    premium_progress_bar_enabled?: boolean | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#create-guild
 */
export type RESTPostAPIGuildsResult = APIGuild;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level
 */
export interface RESTPostAPIGuildsMFAJSONBody {
    /**
     * MFA level
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
     */
    level: GuildMFALevel;
}
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level
 */
export type RESTPostAPIGuildsMFAResult = RESTPostAPIGuildsMFAJSONBody;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild
 */
export interface RESTGetAPIGuildQuery {
    /**
     * When `true`, will return approximate member and presence counts for the guild
     *
     * @default false
     */
    with_counts?: boolean;
}
/**
 * https://discord.com/developers/docs/resources/guild#get-guild
 */
export type RESTGetAPIGuildResult = APIGuild;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-preview
 */
export type RESTGetAPIGuildPreviewResult = APIGuildPreview;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild
 */
export interface RESTPatchAPIGuildJSONBody {
    /**
     * New name for the guild (2-100 characters)
     */
    name?: string | undefined;
    /**
     * Voice region id
     *
     * See https://discord.com/developers/docs/resources/voice#voice-region-object
     */
    region?: string | null | undefined;
    /**
     * Verification level
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-verification-level
     */
    verification_level?: GuildVerificationLevel | null | undefined;
    /**
     * Default message notification level
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
     */
    default_message_notifications?: GuildDefaultMessageNotifications | null | undefined;
    /**
     * Explicit content filter level
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
     */
    explicit_content_filter?: GuildExplicitContentFilter | null | undefined;
    /**
     * ID for afk channel
     */
    afk_channel_id?: Snowflake | null | undefined;
    /**
     * afk timeout in seconds, can be set to: `60`, `300`, `900`, `1800`, `3600`
     */
    afk_timeout?: 60 | 300 | 900 | 1800 | 3600 | undefined;
    /**
     * base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the guild has `ANIMATED_ICON` feature)
     *
     * See https://discord.com/developers/docs/reference#image-data
     */
    icon?: string | null | undefined;
    /**
     * User id to transfer guild ownership to (must be owner)
     */
    owner_id?: Snowflake | undefined;
    /**
     * base64 16:9 png/jpeg image for the guild splash (when the guild has `INVITE_SPLASH` feature)
     *
     * See https://discord.com/developers/docs/reference#image-data
     */
    splash?: string | null | undefined;
    /**
     * base64 png/jpeg image for the guild discovery splash (when the guild has `DISCOVERABLE` feature)
     */
    discovery_splash?: string | null | undefined;
    /**
     * base64 16:9 png/jpeg image for the guild banner (when the server has the `BANNER` feature; can be animated gif when the server has the `ANIMATED_BANNER` feature)
     */
    banner?: string | null | undefined;
    /**
     * The id of the channel where guild notices such as welcome messages and boost events are posted
     */
    system_channel_id?: Snowflake | null | undefined;
    /**
     * System channel flags
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
     */
    system_channel_flags?: GuildSystemChannelFlags | undefined;
    /**
     * The id of the channel where Community guilds display rules and/or guidelines
     */
    rules_channel_id?: Snowflake | null | undefined;
    /**
     * The id of the channel where admins and moderators of Community guilds receive notices from Discord
     */
    public_updates_channel_id?: Snowflake | null | undefined;
    /**
     * The preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US"
     *
     * @default "en-US" (if the value is set to `null`)
     */
    preferred_locale?: string | null | undefined;
    /**
     * Enabled guild features
     *
     * See https://discord.com/developers/docs/resources/guild#guild-object-guild-features
     */
    features?: GuildFeature[] | undefined;
    /**
     * The description for the guild
     */
    description?: string | null | undefined;
    /**
     * Whether the boosts progress bar should be enabled.
     */
    premium_progress_bar_enabled?: boolean | undefined;
    /**
     * The id of the channel where admins and moderators of Community guilds receive safety alerts from Discord
     */
    safety_alerts_channel_id?: Snowflake | null | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild
 */
export type RESTPatchAPIGuildResult = APIGuild;
/**
 * https://discord.com/developers/docs/resources/guild#delete-guild
 */
export type RESTDeleteAPIGuildResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-channels
 */
export type RESTGetAPIGuildChannelsResult = APIChannel[];
/**
 * https://discord.com/developers/docs/resources/guild#create-guild-channel
 */
export type RESTPostAPIGuildChannelJSONBody = DistributiveOmit<APIGuildCreatePartialChannel, 'id'>;
/**
 * https://discord.com/developers/docs/resources/guild#create-guild-channel
 */
export type RESTPostAPIGuildChannelResult = APIChannel;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions
 */
export type RESTPatchAPIGuildChannelPositionsJSONBody = {
    /**
     * Channel id
     */
    id: Snowflake;
    /**
     * Sorting position of the channel
     */
    position: number;
    /**
     * Sync channel overwrites with the new parent, when moving to a new `parent_id`
     */
    lock_permissions?: boolean | undefined;
    /**
     * The new parent id of this channel
     */
    parent_id?: Snowflake | null | undefined;
}[];
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions
 */
export type RESTPatchAPIGuildChannelPositionsResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#list-active-guild-threads
 */
export type RESTGetAPIGuildThreadsResult = APIThreadList;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-member
 */
export type RESTGetAPIGuildMemberResult = APIGuildMember;
/**
 * https://discord.com/developers/docs/resources/guild#list-guild-members
 */
export interface RESTGetAPIGuildMembersQuery {
    /**
     * Max number of members to return (1-1000)
     *
     * @default 1
     */
    limit?: number;
    /**
     * The highest user id in the previous page
     *
     * @default 0
     */
    after?: Snowflake;
}
/**
 * https://discord.com/developers/docs/resources/guild#list-guild-members
 */
export type RESTGetAPIGuildMembersResult = APIGuildMember[];
/**
 * https://discord.com/developers/docs/resources/guild#search-guild-members
 */
export interface RESTGetAPIGuildMembersSearchQuery {
    /**
     * Query string to match username(s) and nickname(s) against
     */
    query: string;
    /**
     * Max number of members to return (1-1000)
     *
     * @default 1
     */
    limit?: number;
}
export type RESTGetAPIGuildMembersSearchResult = APIGuildMember[];
/**
 * https://discord.com/developers/docs/resources/guild#add-guild-member
 */
export interface RESTPutAPIGuildMemberJSONBody {
    /**
     * An oauth2 access token granted with the `guilds.join` to the bot's application for the user you want to add to the guild
     */
    access_token: string;
    /**
     * Value to set users nickname to
     *
     * Requires `MANAGE_NICKNAMES` permission
     */
    nick?: string | undefined;
    /**
     * Array of role ids the member is assigned
     *
     * Requires `MANAGE_ROLES` permission
     */
    roles?: Snowflake[] | undefined;
    /**
     * Whether the user is muted in voice channels
     *
     * Requires `MUTE_MEMBERS` permission
     */
    mute?: boolean | undefined;
    /**
     * Whether the user is deafened in voice channels
     *
     * Requires `DEAFEN_MEMBERS` permission
     */
    deaf?: boolean | undefined;
}
export type RESTPutAPIGuildMemberResult = APIGuildMember | undefined;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-member
 */
export interface RESTPatchAPIGuildMemberJSONBody {
    /**
     * Value to set users nickname to
     *
     * Requires `MANAGE_NICKNAMES` permission
     */
    nick?: string | null | undefined;
    /**
     * Array of role ids the member is assigned
     *
     * Requires `MANAGE_ROLES` permission
     */
    roles?: Snowflake[] | null | undefined;
    /**
     * Whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel
     *
     * Requires `MUTE_MEMBERS` permission
     */
    mute?: boolean | null | undefined;
    /**
     * Whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel
     *
     * Requires `DEAFEN_MEMBERS` permission
     */
    deaf?: boolean | null | undefined;
    /**
     * ID of channel to move user to (if they are connected to voice)
     *
     * Requires `MOVE_MEMBERS` permission
     */
    channel_id?: Snowflake | null | undefined;
    /**
     * Timestamp of when the time out will be removed; until then, they cannot interact with the guild
     */
    communication_disabled_until?: string | null | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#add-guild-member
 */
export type RESTPatchAPIGuildMemberResult = APIGuildMember;
/**
 * https://discord.com/developers/docs/resources/guild#modify-current-user-nick
 *
 *  @deprecated Use [Modify Current Member](https://discord.com/developers/docs/resources/guild#modify-current-member) instead.
 */
export interface RESTPatchAPICurrentGuildMemberNicknameJSONBody {
    /**
     * Value to set users nickname to
     *
     * Requires `CHANGE_NICKNAME` permission
     */
    nick?: string | null | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#modify-current-member
 */
export interface RESTPatchAPICurrentGuildMemberJSONBody {
    /**
     * Value to set users nickname to
     *
     * Requires `CHANGE_NICKNAME` permission
     */
    nick?: string | null | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#modify-current-user-nick
 *
 * @deprecated Use [Modify Current Member](https://discord.com/developers/docs/resources/guild#modify-current-member) instead.
 */
export type RESTPatchAPICurrentGuildMemberNicknameResult = StrictRequired<RESTPatchAPICurrentGuildMemberNicknameJSONBody>;
/**
 * https://discord.com/developers/docs/resources/guild#add-guild-member-role
 */
export type RESTPutAPIGuildMemberRoleResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#remove-guild-member-role
 */
export type RESTDeleteAPIGuildMemberRoleResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#remove-guild-member
 */
export type RESTDeleteAPIGuildMemberResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-bans
 */
export type RESTGetAPIGuildBansResult = APIBan[];
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-bans
 */
export interface RESTGetAPIGuildBansQuery {
    /**
     * Consider only users before given user id
     */
    before?: Snowflake;
    /**
     * Consider only users after given user id
     */
    after?: Snowflake;
    /**
     * Number of users to return (1-1000)
     *
     * @default 1000
     */
    limit?: number;
}
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-ban
 */
export type RESTGetAPIGuildBanResult = APIBan;
/**
 * https://discord.com/developers/docs/resources/guild#create-guild-ban
 */
export interface RESTPutAPIGuildBanJSONBody {
    /**
     * Number of days to delete messages for (0-7)
     *
     * @deprecated use `delete_message_seconds` instead
     */
    delete_message_days?: number | undefined;
    /**
     * Number of seconds to delete messages for, between 0 and 604800 (7 days)
     */
    delete_message_seconds?: number | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#create-guild-ban
 */
export type RESTPutAPIGuildBanResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#remove-guild-ban
 */
export type RESTDeleteAPIGuildBanResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-roles
 */
export type RESTGetAPIGuildRolesResult = APIRole[];
/**
 * https://discord.com/developers/docs/resources/guild#create-guild-role
 */
export interface RESTPostAPIGuildRoleJSONBody {
    /**
     * Name of the role
     *
     * @default "new role"
     */
    name?: string | null | undefined;
    /**
     * Bitwise value of the enabled/disabled permissions
     *
     * @default "default role permissions in guild"
     */
    permissions?: Permissions | null | undefined;
    /**
     * RGB color value
     *
     * @default 0
     */
    color?: number | null | undefined;
    /**
     * Whether the role should be displayed separately in the sidebar
     *
     * @default false
     */
    hoist?: boolean | null | undefined;
    /**
     * The role's icon image (if the guild has the `ROLE_ICONS` feature)
     */
    icon?: string | null | undefined;
    /**
     * The role's unicode emoji as a standard emoji (if the guild has the `ROLE_ICONS` feature)
     */
    unicode_emoji?: string | null | undefined;
    /**
     * Whether the role should be mentionable
     *
     * @default false
     */
    mentionable?: boolean | null | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#create-guild-role
 */
export type RESTPostAPIGuildRoleResult = APIRole;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
 */
export type RESTPatchAPIGuildRolePositionsJSONBody = {
    /**
     * Role id
     */
    id: Snowflake;
    /**
     * Sorting position of the role
     */
    position?: number | undefined;
}[];
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
 */
export type RESTPatchAPIGuildRolePositionsResult = APIRole[];
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-role
 */
export interface RESTPatchAPIGuildRoleJSONBody {
    /**
     * Name of the role
     */
    name?: string | null | undefined;
    /**
     * Bitwise value of the enabled/disabled permissions
     */
    permissions?: Permissions | null | undefined;
    /**
     * RGB color value
     */
    color?: number | null | undefined;
    /**
     * Whether the role should be displayed separately in the sidebar
     */
    hoist?: boolean | null | undefined;
    /**
     * The role's icon image (if the guild has the `ROLE_ICONS` feature)
     */
    icon?: string | null | undefined;
    /**
     * The role's unicode emoji as a standard emoji (if the guild has the `ROLE_ICONS` feature)
     */
    unicode_emoji?: string | null | undefined;
    /**
     * Whether the role should be mentionable
     */
    mentionable?: boolean | null | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-role
 */
export type RESTPatchAPIGuildRoleResult = APIRole;
/**
 * https://discord.com/developers/docs/resources/guild#delete-guild-role
 */
export type RESTDeleteAPIGuildRoleResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-prune-count
 */
export interface RESTGetAPIGuildPruneCountQuery {
    /**
     * Number of days to count prune for (1 or more)
     *
     * @default 7
     */
    days?: number;
    /**
     * Role(s) to include
     *
     * While this is typed as a string, it represents an array of
     * role IDs delimited by commas
     *
     * See https://discord.com/developers/docs/resources/guild#get-guild-prune-count-query-string-params
     */
    include_roles?: string;
}
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-prune-count
 */
export interface RESTGetAPIGuildPruneCountResult {
    pruned: number;
}
/**
 * https://discord.com/developers/docs/resources/guild#begin-guild-prune
 */
export interface RESTPostAPIGuildPruneJSONBody {
    /**
     * Number of days to count prune for (1 or more)
     *
     * @default 7
     */
    days?: number | undefined;
    /**
     * Whether `pruned is returned, discouraged for large guilds
     *
     * @default true
     */
    compute_prune_count?: boolean | undefined;
    /**
     * Role(s) to include
     */
    include_roles?: Snowflake[] | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#begin-guild-prune
 */
export interface RESTPostAPIGuildPruneResult {
    pruned: number | null;
}
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-voice-regions
 */
export type RESTGetAPIGuildVoiceRegionsResult = APIVoiceRegion[];
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-invites
 */
export type RESTGetAPIGuildInvitesResult = APIExtendedInvite[];
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-integrations
 */
export type RESTGetAPIGuildIntegrationsResult = APIGuildIntegration[];
/**
 * https://discord.com/developers/docs/resources/guild#delete-guild-integration
 */
export type RESTDeleteAPIGuildIntegrationResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget-settings
 */
export type RESTGetAPIGuildWidgetSettingsResult = APIGuildWidgetSettings;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-widget
 */
export type RESTPatchAPIGuildWidgetSettingsJSONBody = StrictPartial<APIGuildWidgetSettings>;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-widget
 */
export type RESTPatchAPIGuildWidgetSettingsResult = APIGuildWidgetSettings;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget
 */
export type RESTGetAPIGuildWidgetJSONResult = APIGuildWidget;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-vanity-url
 */
export interface RESTGetAPIGuildVanityUrlResult {
    code: string | null;
    uses: number;
}
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget-image
 */
export interface RESTGetAPIGuildWidgetImageQuery {
    /**
     * Style of the widget image returned
     *
     * @default "shield"
     */
    style?: GuildWidgetStyle;
}
/**
 * Note: while the return type is `ArrayBuffer`, the expected result is
 * a buffer of sorts (depends if in browser or on node.js/deno).
 */
export type RESTGetAPIGuildWidgetImageResult = ArrayBuffer;
export type RESTGetAPIGuildMemberVerificationResult = APIGuildMembershipScreening;
export interface RESTPatchAPIGuildMemberVerificationJSONBody {
    /**
     * Whether Membership Screening is enabled
     */
    enabled?: boolean | undefined;
    /**
     * Array of field objects serialized in a string
     */
    form_fields?: string | undefined;
    /**
     * The server description to show in the screening form
     */
    description?: string | null | undefined;
}
export type RESTPatchAPIGuildMemberVerificationResult = APIGuildMembershipScreening;
/**
 * https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state
 */
export interface RESTPatchAPIGuildVoiceStateCurrentMemberJSONBody {
    /**
     * The id of the channel the user is currently in
     */
    channel_id?: Snowflake | undefined;
    /**
     * Toggles the user's suppress state
     */
    suppress?: boolean | undefined;
    /**
     * Sets the user's request to speak
     */
    request_to_speak_timestamp?: string | null | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state
 */
export type RESTPatchAPIGuildVoiceStateCurrentMemberResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#modify-user-voice-state
 */
export interface RESTPatchAPIGuildVoiceStateUserJSONBody {
    /**
     * The id of the channel the user is currently in
     */
    channel_id: Snowflake;
    /**
     * Toggles the user's suppress state
     */
    suppress?: boolean | undefined;
}
/**
 * https://discord.com/developers/docs/resources/guild#modify-user-voice-state
 */
export type RESTPatchAPIGuildVoiceStateUserResult = never;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen
 */
export type RESTGetAPIGuildWelcomeScreenResult = APIGuildWelcomeScreen;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen
 */
export type RESTPatchAPIGuildWelcomeScreenJSONBody = Nullable<StrictPartial<APIGuildWelcomeScreen>> & {
    /**
     * Whether the welcome screen is enabled
     */
    enabled?: boolean | null | undefined;
};
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen
 */
export type RESTPatchAPIGuildWelcomeScreenResult = APIGuildWelcomeScreen;
/**
 * https://discord.com/developers/docs/resources/guild#get-guild-onboarding
 */
export type RESTGetAPIGuildOnboardingResult = APIGuildOnboarding;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-onboarding
 */
export type RESTPutAPIGuildOnboardingJSONBody = Pick<APIGuildOnboarding, 'default_channel_ids' | 'enabled' | 'mode' | 'prompts'>;
/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-onboarding
 */
export type RESTPutAPIGuildOnboardingResult = APIGuildOnboarding;
//# sourceMappingURL=guild.d.ts.map