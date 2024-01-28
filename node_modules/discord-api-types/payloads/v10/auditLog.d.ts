/**
 * Types extracted from https://discord.com/developers/docs/resources/audit-log
 */
import type { Snowflake } from '../../globals';
import type { APIAutoModerationAction, APIAutoModerationRule, APIAutoModerationRuleTriggerMetadata, AutoModerationRuleEventType, AutoModerationRuleTriggerType } from './autoModeration';
import type { APIChannel, APIOverwrite } from './channel';
import type { APIGuildIntegration, APIGuildIntegrationType, GuildDefaultMessageNotifications, GuildExplicitContentFilter, GuildMFALevel, GuildVerificationLevel, IntegrationExpireBehavior } from './guild';
import type { APIGuildScheduledEvent, GuildScheduledEventEntityType, GuildScheduledEventStatus } from './guildScheduledEvent';
import type { APIApplicationCommand } from './interactions';
import type { APIRole } from './permissions';
import type { StageInstancePrivacyLevel } from './stageInstance';
import type { StickerFormatType } from './sticker';
import type { APIUser } from './user';
import type { APIWebhook } from './webhook';
/**
 * https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure
 */
export interface APIAuditLog {
    /**
     * List of application commands found in the audit log
     *
     * See https://discord.com/developers/docs/interactions/application-commands#application-command-object
     */
    application_commands: APIApplicationCommand[];
    /**
     * Webhooks found in the audit log
     *
     * See https://discord.com/developers/docs/resources/webhook#webhook-object
     */
    webhooks: APIWebhook[];
    /**
     * Users found in the audit log
     *
     * See https://discord.com/developers/docs/resources/user#user-object
     */
    users: APIUser[];
    /**
     * Audit log entries
     *
     * See https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object
     */
    audit_log_entries: APIAuditLogEntry[];
    /**
     * List of auto moderation rules referenced in the audit log
     *
     * See https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object
     */
    auto_moderation_rules: APIAutoModerationRule[];
    /**
     * Partial integration objects
     *
     * See https://discord.com/developers/docs/resources/guild#integration-object
     */
    integrations: APIGuildIntegration[];
    /**
     * Threads found in the audit log
     *
     * Threads referenced in THREAD_CREATE and THREAD_UPDATE events are included in the threads map, since archived threads might not be kept in memory by clients.
     *
     * See https://discord.com/developers/docs/resources/channel#channel-object
     */
    threads: APIChannel[];
    /**
     * The guild scheduled events in the audit log
     *
     * See https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object
     */
    guild_scheduled_events: APIGuildScheduledEvent[];
}
/**
 * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure
 */
export interface APIAuditLogEntry {
    /**
     * ID of the affected entity (webhook, user, role, etc.)
     */
    target_id: string | null;
    /**
     * Changes made to the `target_id`
     *
     * See https://discord.com/developers/docs/resources/audit-log#audit-log-change-object
     */
    changes?: APIAuditLogChange[];
    /**
     * The user who made the changes
     *
     * This can be `null` in some cases (webhooks deleting themselves by using their own token, for example)
     */
    user_id: Snowflake | null;
    /**
     * ID of the entry
     */
    id: Snowflake;
    /**
     * Type of action that occurred
     *
     * See https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
     */
    action_type: AuditLogEvent;
    /**
     * Additional info for certain action types
     *
     * See https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info
     */
    options?: APIAuditLogOptions;
    /**
     * The reason for the change (0-512 characters)
     */
    reason?: string;
}
/**
 * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
 */
export declare enum AuditLogEvent {
    GuildUpdate = 1,
    ChannelCreate = 10,
    ChannelUpdate = 11,
    ChannelDelete = 12,
    ChannelOverwriteCreate = 13,
    ChannelOverwriteUpdate = 14,
    ChannelOverwriteDelete = 15,
    MemberKick = 20,
    MemberPrune = 21,
    MemberBanAdd = 22,
    MemberBanRemove = 23,
    MemberUpdate = 24,
    MemberRoleUpdate = 25,
    MemberMove = 26,
    MemberDisconnect = 27,
    BotAdd = 28,
    RoleCreate = 30,
    RoleUpdate = 31,
    RoleDelete = 32,
    InviteCreate = 40,
    InviteUpdate = 41,
    InviteDelete = 42,
    WebhookCreate = 50,
    WebhookUpdate = 51,
    WebhookDelete = 52,
    EmojiCreate = 60,
    EmojiUpdate = 61,
    EmojiDelete = 62,
    MessageDelete = 72,
    MessageBulkDelete = 73,
    MessagePin = 74,
    MessageUnpin = 75,
    IntegrationCreate = 80,
    IntegrationUpdate = 81,
    IntegrationDelete = 82,
    StageInstanceCreate = 83,
    StageInstanceUpdate = 84,
    StageInstanceDelete = 85,
    StickerCreate = 90,
    StickerUpdate = 91,
    StickerDelete = 92,
    GuildScheduledEventCreate = 100,
    GuildScheduledEventUpdate = 101,
    GuildScheduledEventDelete = 102,
    ThreadCreate = 110,
    ThreadUpdate = 111,
    ThreadDelete = 112,
    ApplicationCommandPermissionUpdate = 121,
    AutoModerationRuleCreate = 140,
    AutoModerationRuleUpdate = 141,
    AutoModerationRuleDelete = 142,
    AutoModerationBlockMessage = 143,
    AutoModerationFlagToChannel = 144,
    AutoModerationUserCommunicationDisabled = 145,
    CreatorMonetizationRequestCreated = 150,
    CreatorMonetizationTermsAccepted = 151
}
/**
 * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info
 */
export interface APIAuditLogOptions {
    /**
     * Name of the Auto Moderation rule that was triggered
     *
     * Present from:
     * - AUTO_MODERATION_BLOCK_MESSAGE
     * - AUTO_MODERATION_FLAG_TO_CHANNEL
     * - AUTO_MODERATION_USER_COMMUNICATION_DISABLED
     */
    auto_moderation_rule_name?: string;
    /**
     * Trigger type of the Auto Moderation rule that was triggered
     *
     * Present from:
     * - AUTO_MODERATION_BLOCK_MESSAGE
     * - AUTO_MODERATION_FLAG_TO_CHANNEL
     * - AUTO_MODERATION_USER_COMMUNICATION_DISABLED
     */
    auto_moderation_rule_trigger_type?: AuditLogRuleTriggerType;
    /**
     * Number of days after which inactive members were kicked
     *
     * Present from:
     * - MEMBER_PRUNE
     */
    delete_member_days?: string;
    /**
     * Number of members removed by the prune
     *
     * Present from:
     * - MEMBER_PRUNE
     */
    members_removed?: string;
    /**
     * Channel in which the entities were targeted
     *
     * Present from:
     * - MEMBER_MOVE
     * - MESSAGE_PIN
     * - MESSAGE_UNPIN
     * - MESSAGE_DELETE
     * - STAGE_INSTANCE_CREATE
     * - STAGE_INSTANCE_UPDATE
     * - STAGE_INSTANCE_DELETE
     * - AUTO_MODERATION_BLOCK_MESSAGE
     * - AUTO_MODERATION_FLAG_TO_CHANNEL
     * - AUTO_MODERATION_USER_COMMUNICATION_DISABLED
     */
    channel_id?: Snowflake;
    /**
     * ID of the message that was targeted
     *
     * Present from:
     * - MESSAGE_PIN
     * - MESSAGE_UNPIN
     */
    message_id?: Snowflake;
    /**
     * Number of entities that were targeted
     *
     * Present from:
     * - MESSAGE_DELETE
     * - MESSAGE_BULK_DELETE
     * - MEMBER_DISCONNECT
     * - MEMBER_MOVE
     */
    count?: string;
    /**
     * ID of the overwritten entity
     *
     * Present from:
     * - CHANNEL_OVERWRITE_CREATE
     * - CHANNEL_OVERWRITE_UPDATE
     * - CHANNEL_OVERWRITE_DELETE
     */
    id?: Snowflake;
    /**
     * Type of overwritten entity - "0" for "role" or "1" for "member"
     *
     * Present from:
     * - CHANNEL_OVERWRITE_CREATE
     * - CHANNEL_OVERWRITE_UPDATE
     * - CHANNEL_OVERWRITE_DELETE
     *
     * {@link AuditLogOptionsType}
     */
    type?: AuditLogOptionsType;
    /**
     * Name of the role
     *
     * Present from:
     * - CHANNEL_OVERWRITE_CREATE
     * - CHANNEL_OVERWRITE_UPDATE
     * - CHANNEL_OVERWRITE_DELETE
     *
     * **Present only if the {@link APIAuditLogOptions#type entry type} is "0"**
     */
    role_name?: string;
    /**
     * Type of integration which performed the action
     *
     * Present from:
     * - MEMBER_KICK
     * - MEMBER_ROLE_UPDATE
     */
    integration_type?: APIGuildIntegrationType;
}
export declare enum AuditLogOptionsType {
    Role = "0",
    Member = "1"
}
export type AuditLogRuleTriggerType = `${AutoModerationRuleTriggerType}`;
/**
 * https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure
 */
export type APIAuditLogChange = APIAuditLogChangeKeyName | APIAuditLogChangeKeyDescription | APIAuditLogChangeKeyIconHash | APIAuditLogChangeKeyImageHash | APIAuditLogChangeKeySplashHash | APIAuditLogChangeKeyDiscoverySplashHash | APIAuditLogChangeKeyBannerHash | APIAuditLogChangeKeyOwnerId | APIAuditLogChangeKeyRegion | APIAuditLogChangeKeyPreferredLocale | APIAuditLogChangeKeyAFKChannelId | APIAuditLogChangeKeyAFKTimeout | APIAuditLogChangeKeyRulesChannelId | APIAuditLogChangeKeyPublicUpdatesChannelId | APIAuditLogChangeKeyMFALevel | APIAuditLogChangeKeyVerificationLevel | APIAuditLogChangeKeyExplicitContentFilter | APIAuditLogChangeKeyDefaultMessageNotifications | APIAuditLogChangeKeyVanityURLCode | APIAuditLogChangeKey$Add | APIAuditLogChangeKey$Remove | APIAuditLogChangeKeyPruneDeleteDays | APIAuditLogChangeKeyWidgetEnabled | APIAuditLogChangeKeyWidgetChannelId | APIAuditLogChangeKeySystemChannelId | APIAuditLogChangeKeyPosition | APIAuditLogChangeKeyTopic | APIAuditLogChangeKeyBitrate | APIAuditLogChangeKeyPermissionOverwrites | APIAuditLogChangeKeyNSFW | APIAuditLogChangeKeyApplicationId | APIAuditLogChangeKeyRateLimitPerUser | APIAuditLogChangeKeyPermissions | APIAuditLogChangeKeyColor | APIAuditLogChangeKeyHoist | APIAuditLogChangeKeyMentionable | APIAuditLogChangeKeyAllow | APIAuditLogChangeKeyDeny | APIAuditLogChangeKeyCode | APIAuditLogChangeKeyChannelId | APIAuditLogChangeKeyInviterId | APIAuditLogChangeKeyMaxUses | APIAuditLogChangeKeyUses | APIAuditLogChangeKeyMaxAge | APIAuditLogChangeKeyTemporary | APIAuditLogChangeKeyDeaf | APIAuditLogChangeKeyMute | APIAuditLogChangeKeyNick | APIAuditLogChangeKeyAvatarHash | APIAuditLogChangeKeyId | APIAuditLogChangeKeyType | APIAuditLogChangeKeyEnableEmoticons | APIAuditLogChangeKeyExpireBehavior | APIAuditLogChangeKeyExpireGracePeriod | APIAuditLogChangeKeyUserLimit | APIAuditLogChangeKeyPrivacyLevel | APIAuditLogChangeKeyTags | APIAuditLogChangeKeyFormatType | APIAuditLogChangeKeyAsset | APIAuditLogChangeKeyAvailable | APIAuditLogChangeKeyGuildId | APIAuditLogChangeKeyArchived | APIAuditLogChangeKeyLocked | APIAuditLogChangeKeyAutoArchiveDuration | APIAuditLogChangeKeyDefaultAutoArchiveDuration | APIAuditLogChangeKeyEntityType | APIAuditLogChangeKeyStatus | APIAuditLogChangeKeyLocation | APIAuditLogChangeKeyCommunicationDisabledUntil | APIAuditLogChangeKeyTriggerType | APIAuditLogChangeKeyEventType | APIAuditLogChangeKeyTriggerMetadata | APIAuditLogChangeKeyActions | APIAuditLogChangeKeyEnabled | APIAuditLogChangeKeyExemptRoles | APIAuditLogChangeKeyExemptChannels;
/**
 * Returned when an entity's name is changed
 */
export type APIAuditLogChangeKeyName = AuditLogChangeData<'name', string>;
/**
 * Returned when a guild's or sticker's or guild scheduled event's description is changed
 */
export type APIAuditLogChangeKeyDescription = AuditLogChangeData<'description', string>;
/**
 * Returned when a guild's icon is changed
 */
export type APIAuditLogChangeKeyIconHash = AuditLogChangeData<'icon_hash', string>;
/**
 * Returned when a guild's scheduled event's cover image is changed
 */
export type APIAuditLogChangeKeyImageHash = AuditLogChangeData<'image_hash', string>;
/**
 * Returned when a guild's splash is changed
 */
export type APIAuditLogChangeKeySplashHash = AuditLogChangeData<'splash_hash', string>;
/**
 * Returned when a guild's discovery splash is changed
 */
export type APIAuditLogChangeKeyDiscoverySplashHash = AuditLogChangeData<'discovery_splash_hash', string>;
/**
 * Returned when a guild's banner hash is changed
 */
export type APIAuditLogChangeKeyBannerHash = AuditLogChangeData<'banner_hash', string>;
/**
 * Returned when a guild's owner_id is changed
 */
export type APIAuditLogChangeKeyOwnerId = AuditLogChangeData<'owner_id', Snowflake>;
/**
 * Returned when a guild's region is changed
 */
export type APIAuditLogChangeKeyRegion = AuditLogChangeData<'region', string>;
/**
 * Returned when a guild's preferred_locale is changed
 */
export type APIAuditLogChangeKeyPreferredLocale = AuditLogChangeData<'preferred_locale', string>;
/**
 * Returned when a guild's afk_channel_id is changed
 */
export type APIAuditLogChangeKeyAFKChannelId = AuditLogChangeData<'afk_channel_id', Snowflake>;
/**
 * Returned when a guild's afk_timeout is changed
 */
export type APIAuditLogChangeKeyAFKTimeout = AuditLogChangeData<'afk_timeout', number>;
/**
 * Returned when a guild's rules_channel_id is changed
 */
export type APIAuditLogChangeKeyRulesChannelId = AuditLogChangeData<'rules_channel_id', string>;
/**
 * Returned when a guild's public_updates_channel_id is changed
 */
export type APIAuditLogChangeKeyPublicUpdatesChannelId = AuditLogChangeData<'public_updates_channel_id', string>;
/**
 * Returned when a guild's safety_alerts_channel_id is changed
 */
export type APIAuditLogChangeKeySafetyAlertsChannelId = AuditLogChangeData<'safety_alerts_channel_id', string>;
/**
 * Returned when a guild's mfa_level is changed
 */
export type APIAuditLogChangeKeyMFALevel = AuditLogChangeData<'mfa_level', GuildMFALevel>;
/**
 * Returned when a guild's verification_level is changed
 */
export type APIAuditLogChangeKeyVerificationLevel = AuditLogChangeData<'verification_level', GuildVerificationLevel>;
/**
 * Returned when a guild's explicit_content_filter is changed
 */
export type APIAuditLogChangeKeyExplicitContentFilter = AuditLogChangeData<'explicit_content_filter', GuildExplicitContentFilter>;
/**
 * Returned when a guild's default_message_notifications is changed
 */
export type APIAuditLogChangeKeyDefaultMessageNotifications = AuditLogChangeData<'default_message_notifications', GuildDefaultMessageNotifications>;
/**
 * Returned when a guild's vanity_url_code is changed
 */
export type APIAuditLogChangeKeyVanityURLCode = AuditLogChangeData<'vanity_url_code', string>;
/**
 * Returned when new role(s) are added
 */
export type APIAuditLogChangeKey$Add = AuditLogChangeData<'$add', APIRole[]>;
/**
 * Returned when role(s) are removed
 */
export type APIAuditLogChangeKey$Remove = AuditLogChangeData<'$remove', APIRole[]>;
/**
 * Returned when there is a change in number of days after which inactive and role-unassigned members are kicked
 */
export type APIAuditLogChangeKeyPruneDeleteDays = AuditLogChangeData<'prune_delete_days', number>;
/**
 * Returned when a guild's widget is enabled
 */
export type APIAuditLogChangeKeyWidgetEnabled = AuditLogChangeData<'widget_enabled', boolean>;
/**
 * Returned when a guild's widget_channel_id is changed
 */
export type APIAuditLogChangeKeyWidgetChannelId = AuditLogChangeData<'widget_channel_id', Snowflake>;
/**
 * Returned when a guild's system_channel_id is changed
 */
export type APIAuditLogChangeKeySystemChannelId = AuditLogChangeData<'system_channel_id', Snowflake>;
/**
 * Returned when a channel's position is changed
 */
export type APIAuditLogChangeKeyPosition = AuditLogChangeData<'position', number>;
/**
 * Returned when a channel's topic is changed
 */
export type APIAuditLogChangeKeyTopic = AuditLogChangeData<'topic', string>;
/**
 * Returned when a voice channel's bitrate is changed
 */
export type APIAuditLogChangeKeyBitrate = AuditLogChangeData<'bitrate', number>;
/**
 * Returned when a channel's permission overwrites is changed
 */
export type APIAuditLogChangeKeyPermissionOverwrites = AuditLogChangeData<'permission_overwrites', APIOverwrite[]>;
/**
 * Returned when a channel's NSFW restriction is changed
 */
export type APIAuditLogChangeKeyNSFW = AuditLogChangeData<'nsfw', boolean>;
/**
 * The application ID of the added or removed Webhook or Bot
 */
export type APIAuditLogChangeKeyApplicationId = AuditLogChangeData<'application_id', Snowflake>;
/**
 * Returned when a channel's amount of seconds a user has to wait before sending another message
 * is changed
 */
export type APIAuditLogChangeKeyRateLimitPerUser = AuditLogChangeData<'rate_limit_per_user', number>;
/**
 * Returned when a permission bitfield is changed
 */
export type APIAuditLogChangeKeyPermissions = AuditLogChangeData<'permissions', string>;
/**
 * Returned when a role's color is changed
 */
export type APIAuditLogChangeKeyColor = AuditLogChangeData<'color', number>;
/**
 * Represents a change where the key is a snowflake.
 * Currently, the only known instance of this is returned when permissions for a command were updated (<insert name of object here>)
 */
export type APIAuditLogChangeKeySnowflake = AuditLogChangeData<Snowflake, unknown>;
/**
 * Returned when a role's hoist status is changed
 */
export type APIAuditLogChangeKeyHoist = AuditLogChangeData<'hoist', boolean>;
/**
 * Returned when a role's mentionable status is changed
 */
export type APIAuditLogChangeKeyMentionable = AuditLogChangeData<'mentionable', boolean>;
/**
 * Returned when an overwrite's allowed permissions bitfield is changed
 */
export type APIAuditLogChangeKeyAllow = AuditLogChangeData<'allow', string>;
/**
 * Returned when an overwrite's denied permissions bitfield is changed
 */
export type APIAuditLogChangeKeyDeny = AuditLogChangeData<'deny', string>;
/**
 * Returned when an invite's code is changed
 */
export type APIAuditLogChangeKeyCode = AuditLogChangeData<'code', string>;
/**
 * Returned when an invite's or guild scheduled event's channel_id is changed
 */
export type APIAuditLogChangeKeyChannelId = AuditLogChangeData<'channel_id', Snowflake>;
/**
 * Returned when an invite's inviter_id is changed
 */
export type APIAuditLogChangeKeyInviterId = AuditLogChangeData<'inviter_id', Snowflake>;
/**
 * Returned when an invite's max_uses is changed
 */
export type APIAuditLogChangeKeyMaxUses = AuditLogChangeData<'max_uses', number>;
/**
 * Returned when an invite's uses is changed
 */
export type APIAuditLogChangeKeyUses = AuditLogChangeData<'uses', number>;
/**
 * Returned when an invite's max_age is changed
 */
export type APIAuditLogChangeKeyMaxAge = AuditLogChangeData<'max_age', number>;
/**
 * Returned when an invite's temporary status is changed
 */
export type APIAuditLogChangeKeyTemporary = AuditLogChangeData<'temporary', boolean>;
/**
 * Returned when a user's deaf status is changed
 */
export type APIAuditLogChangeKeyDeaf = AuditLogChangeData<'deaf', boolean>;
/**
 * Returned when a user's mute status is changed
 */
export type APIAuditLogChangeKeyMute = AuditLogChangeData<'mute', boolean>;
/**
 * Returned when a user's nick is changed
 */
export type APIAuditLogChangeKeyNick = AuditLogChangeData<'nick', string>;
/**
 * Returned when a user's avatar_hash is changed
 */
export type APIAuditLogChangeKeyAvatarHash = AuditLogChangeData<'avatar_hash', string>;
/**
 * The ID of the changed entity - sometimes used in conjunction with other keys
 */
export type APIAuditLogChangeKeyId = AuditLogChangeData<'id', Snowflake>;
/**
 * The type of entity created
 */
export type APIAuditLogChangeKeyType = AuditLogChangeData<'type', number | string>;
/**
 * Returned when an integration's enable_emoticons is changed
 */
export type APIAuditLogChangeKeyEnableEmoticons = AuditLogChangeData<'enable_emoticons', boolean>;
/**
 * Returned when an integration's expire_behavior is changed
 */
export type APIAuditLogChangeKeyExpireBehavior = AuditLogChangeData<'expire_behavior', IntegrationExpireBehavior>;
/**
 * Returned when an integration's expire_grace_period is changed
 */
export type APIAuditLogChangeKeyExpireGracePeriod = AuditLogChangeData<'expire_grace_period', number>;
/**
 * Returned when a voice channel's user_limit is changed
 */
export type APIAuditLogChangeKeyUserLimit = AuditLogChangeData<'user_limit', number>;
/**
 * Returned when privacy level of a stage instance or guild scheduled event is changed
 */
export type APIAuditLogChangeKeyPrivacyLevel = AuditLogChangeData<'privacy_level', StageInstancePrivacyLevel>;
/**
 * Returned when a sticker's related emoji is changed
 */
export type APIAuditLogChangeKeyTags = AuditLogChangeData<'tags', string>;
/**
 * Returned when a sticker's format_type is changed
 */
export type APIAuditLogChangeKeyFormatType = AuditLogChangeData<'format_type', StickerFormatType>;
/**
 * Empty string
 */
export type APIAuditLogChangeKeyAsset = AuditLogChangeData<'asset', ''>;
/**
 * Returned when a sticker's availability is changed
 */
export type APIAuditLogChangeKeyAvailable = AuditLogChangeData<'available', boolean>;
/**
 * Returned when a sticker's guild_id is changed
 */
export type APIAuditLogChangeKeyGuildId = AuditLogChangeData<'guild_id', Snowflake>;
/**
 * Returned when a thread's archive status is changed
 */
export type APIAuditLogChangeKeyArchived = AuditLogChangeData<'archived', boolean>;
/**
 * Returned when a thread's lock status is changed
 */
export type APIAuditLogChangeKeyLocked = AuditLogChangeData<'locked', boolean>;
/**
 * Returned when a thread's auto archive duration is changed
 */
export type APIAuditLogChangeKeyAutoArchiveDuration = AuditLogChangeData<'auto_archive_duration', number>;
/**
 * Returned when a channel's default auto archive duration for newly created threads is changed
 */
export type APIAuditLogChangeKeyDefaultAutoArchiveDuration = AuditLogChangeData<'default_auto_archive_duration', number>;
/**
 * Returned when entity type of a guild scheduled event is changed
 */
export type APIAuditLogChangeKeyEntityType = AuditLogChangeData<'entity_type', GuildScheduledEventEntityType>;
/**
 * Returned when status of a guild scheduled event is changed
 */
export type APIAuditLogChangeKeyStatus = AuditLogChangeData<'status', GuildScheduledEventStatus>;
/**
 * Returned when location of a guild scheduled event is changed
 */
export type APIAuditLogChangeKeyLocation = AuditLogChangeData<'location', string>;
/**
 * Returned when a user's timeout is changed
 */
export type APIAuditLogChangeKeyCommunicationDisabledUntil = AuditLogChangeData<'communication_disabled_until', string>;
/**
 * Returned when an auto moderation rule's trigger type is changed (only in rule creation or deletion)
 */
export type APIAuditLogChangeKeyTriggerType = AuditLogChangeData<'trigger_type', AutoModerationRuleTriggerType>;
/**
 * Returned when an auto moderation rule's event type is changed
 */
export type APIAuditLogChangeKeyEventType = AuditLogChangeData<'event_type', AutoModerationRuleEventType>;
/**
 * Returned when an auto moderation rule's trigger metadata is changed
 */
export type APIAuditLogChangeKeyTriggerMetadata = AuditLogChangeData<'trigger_metadata', APIAutoModerationRuleTriggerMetadata>;
/**
 * Returned when an auto moderation rule's actions is changed
 */
export type APIAuditLogChangeKeyActions = AuditLogChangeData<'actions', APIAutoModerationAction[]>;
/**
 * Returned when an auto moderation rule's enabled status is changed
 */
export type APIAuditLogChangeKeyEnabled = AuditLogChangeData<'enabled', boolean>;
/**
 * Returned when an auto moderation rule's exempt roles is changed
 */
export type APIAuditLogChangeKeyExemptRoles = AuditLogChangeData<'exempt_roles', Snowflake[]>;
/**
 * Returned when an auto moderation rule's exempt channels is changed
 */
export type APIAuditLogChangeKeyExemptChannels = AuditLogChangeData<'exempt_channels', Snowflake[]>;
interface AuditLogChangeData<K extends string, D> {
    key: K;
    /**
     * The new value
     *
     * If `new_value` is not present in the change object, while `old_value` is,
     * that means the property that was changed has been reset, or set to `null`
     */
    new_value?: D;
    old_value?: D;
}
export {};
//# sourceMappingURL=auditLog.d.ts.map