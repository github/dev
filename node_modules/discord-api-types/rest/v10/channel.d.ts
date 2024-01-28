import type { Permissions, Snowflake } from '../../globals';
import type { APIActionRowComponent, APIAllowedMentions, APIChannel, APIEmbed, APIExtendedInvite, APIFollowedChannel, APIMessage, APIMessageActionRowComponent, APIMessageReference, APIThreadList, APIThreadMember, APIUser, ChannelType, InviteTargetType, MessageFlags, OverwriteType, ThreadAutoArchiveDuration, ThreadChannelType, VideoQualityMode, APIGuildForumTag, APIGuildForumDefaultReactionEmoji, SortOrderType, ForumLayoutType, ChannelFlags } from '../../payloads/v10/index';
import type { AddUndefinedToPossiblyUndefinedPropertiesOfInterface, StrictPartial } from '../../utils/internals';
export interface APIChannelPatchOverwrite extends RESTPutAPIChannelPermissionJSONBody {
    id: Snowflake;
}
/**
 * https://discord.com/developers/docs/resources/channel#get-channel
 */
export type RESTGetAPIChannelResult = APIChannel;
/**
 * https://discord.com/developers/docs/resources/channel#modify-channel
 */
export interface RESTPatchAPIChannelJSONBody {
    /**
     * 1-100 character channel name
     *
     * Channel types: all
     */
    name?: string | undefined;
    /**
     * The type of channel; only conversion between `text` and `news`
     * is supported and only in guilds with the "NEWS" feature
     *
     * Channel types: text, news
     */
    type?: ChannelType.GuildAnnouncement | ChannelType.GuildText | undefined;
    /**
     * The position of the channel in the left-hand listing
     *
     * Channel types: all excluding newsThread, publicThread, privateThread
     */
    position?: number | null | undefined;
    /**
     * 0-1024 character channel topic (0-4096 characters for thread-only channels)
     *
     * Channel types: text, news, forum, media
     */
    topic?: string | null | undefined;
    /**
     * Whether the channel is nsfw
     *
     * Channel types: text, voice, news, forum, media
     */
    nsfw?: boolean | null | undefined;
    /**
     * Amount of seconds a user has to wait before sending another message (0-21600);
     * bots, as well as users with the permission `MANAGE_MESSAGES` or `MANAGE_CHANNELS`,
     * are unaffected
     *
     * Channel types: text, newsThread, publicThread, privateThread, forum, media
     */
    rate_limit_per_user?: number | null | undefined;
    /**
     * The bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers)
     *
     * Channel types: voice
     */
    bitrate?: number | null | undefined;
    /**
     * The user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit
     *
     * Channel types: voice
     */
    user_limit?: number | null | undefined;
    /**
     * Channel or category-specific permissions
     *
     * Channel types: all excluding newsThread, publicThread, privateThread
     */
    permission_overwrites?: APIChannelPatchOverwrite[] | null | undefined;
    /**
     * ID of the new parent category for a channel
     *
     * Channel types: text, voice, news, stage, forum, media
     */
    parent_id?: Snowflake | null | undefined;
    /**
     * Voice region id for the voice or stage channel, automatic when set to `null`
     *
     * See https://discord.com/developers/docs/resources/voice#voice-region-object
     */
    rtc_region?: string | null | undefined;
    /**
     * The camera video quality mode of the voice channel
     *
     * See https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes
     */
    video_quality_mode?: VideoQualityMode | null | undefined;
    /**
     * Whether the thread should be archived
     *
     * Channel types: newsThread, publicThread, privateThread
     */
    archived?: boolean | undefined;
    /**
     * The amount of time in minutes to wait before automatically archiving the thread
     *
     * Channel types: newsThread, publicThread, privateThread
     */
    auto_archive_duration?: ThreadAutoArchiveDuration | undefined;
    /**
     * Whether the thread should be locked
     *
     * Channel types: newsThread, publicThread, privateThread
     */
    locked?: boolean | undefined;
    /**
     * Default duration for newly created threads, in minutes, to automatically archive the thread after recent activity
     *
     * Channel types: text, news, forum, media
     */
    default_auto_archive_duration?: ThreadAutoArchiveDuration | undefined;
    /**
     * Channel flags combined as a bit field.
     */
    flags?: ChannelFlags | undefined;
    /**
     * The set of tags that can be used in a thread-only channel; limited to 20
     *
     * Channel types: forum, media
     */
    available_tags?: (Partial<APIGuildForumTag> & Pick<APIGuildForumTag, 'name'>)[] | undefined;
    /**
     * Whether non-moderators can add other non-moderators to the thread
     *
     * Channel types: privateThread
     */
    invitable?: boolean | undefined;
    /**
     * The emoji to show in the add reaction button on a thread in a thread-only channel
     *
     * Channel types: forum, media
     */
    default_reaction_emoji?: APIGuildForumDefaultReactionEmoji | undefined;
    /**
     * The initial `rate_limit_per_user` to set on newly created threads in a channel.
     * This field is copied to the thread at creation time and does not live update
     *
     * Channel types: text, forum, media
     */
    default_thread_rate_limit_per_user?: number | null | undefined;
    /**
     * The default sort order type used to order posts in a thread-only channel
     *
     * Channel types: forum, media
     */
    default_sort_order?: SortOrderType | null | undefined;
    /**
     * The default layout type used to display posts in a forum channel
     *
     * Channel types: forum
     */
    default_forum_layout?: ForumLayoutType | undefined;
    /**
     * The ids of the set of tags that have been applied to a thread-only channel; limited to 5
     *
     * Channel types: forum, media
     */
    applied_tags?: Snowflake[] | undefined;
}
/**
 * https://discord.com/developers/docs/resources/channel#modify-channel
 */
export type RESTPatchAPIChannelResult = APIChannel;
/**
 * https://discord.com/developers/docs/resources/channel#deleteclose-channel
 */
export type RESTDeleteAPIChannelResult = APIChannel;
/**
 * https://discord.com/developers/docs/resources/channel#get-channel-messages
 */
export interface RESTGetAPIChannelMessagesQuery {
    /**
     * Get messages around this message ID
     */
    around?: Snowflake;
    /**
     * Get messages before this message ID
     */
    before?: Snowflake;
    /**
     * Get messages after this message ID
     */
    after?: Snowflake;
    /**
     * Max number of messages to return (1-100)
     *
     * @default 50
     */
    limit?: number;
}
/**
 * https://discord.com/developers/docs/resources/channel#get-channel-messages
 */
export type RESTGetAPIChannelMessagesResult = APIMessage[];
/**
 * https://discord.com/developers/docs/resources/channel#get-channel-message
 */
export type RESTGetAPIChannelMessageResult = APIMessage;
/**
 * https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure
 */
export type APIMessageReferenceSend = StrictPartial<APIMessageReference> & AddUndefinedToPossiblyUndefinedPropertiesOfInterface<Required<Pick<APIMessageReference, 'message_id'>>> & {
    /**
     * Whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message
     *
     * @default true
     */
    fail_if_not_exists?: boolean | undefined;
};
/**
 * https://discord.com/developers/docs/resources/channel#attachment-object
 */
export interface RESTAPIAttachment {
    /**
     * Attachment id or a number that matches `n` in `files[n]`
     */
    id: Snowflake | number;
    /**
     * Name of the file
     */
    filename?: string | undefined;
    /**
     * Description of the file
     */
    description?: string | undefined;
}
/**
 * https://discord.com/developers/docs/resources/channel#create-message
 */
export interface RESTPostAPIChannelMessageJSONBody {
    /**
     * The message contents (up to 2000 characters)
     */
    content?: string | undefined;
    /**
     * A nonce that can be used for optimistic message sending
     */
    nonce?: number | string | undefined;
    /**
     * `true` if this is a TTS message
     */
    tts?: boolean | undefined;
    /**
     * Embedded `rich` content (up to 6000 characters)
     *
     * See https://discord.com/developers/docs/resources/channel#embed-object
     */
    embeds?: APIEmbed[] | undefined;
    /**
     * Allowed mentions for a message
     *
     * See https://discord.com/developers/docs/resources/channel#allowed-mentions-object
     */
    allowed_mentions?: APIAllowedMentions | undefined;
    /**
     * Include to make your message a reply
     *
     * See https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure
     */
    message_reference?: APIMessageReferenceSend | undefined;
    /**
     * The components to include with the message
     *
     * See https://discord.com/developers/docs/interactions/message-components#component-object
     */
    components?: APIActionRowComponent<APIMessageActionRowComponent>[] | undefined;
    /**
     * IDs of up to 3 stickers in the server to send in the message
     *
     * See https://discord.com/developers/docs/resources/sticker#sticker-object
     */
    sticker_ids?: [Snowflake] | [Snowflake, Snowflake] | [Snowflake, Snowflake, Snowflake] | undefined;
    /**
     * Attachment objects with filename and description
     */
    attachments?: RESTAPIAttachment[] | undefined;
    /**
     * Message flags combined as a bitfield
     */
    flags?: MessageFlags | undefined;
}
/**
 * https://discord.com/developers/docs/resources/channel#create-message
 */
export type RESTPostAPIChannelMessageFormDataBody = ({
    /**
     * JSON stringified message body
     */
    payload_json?: string | undefined;
} & Record<`files[${bigint}]`, unknown>) | (RESTPostAPIChannelMessageJSONBody & Record<`files[${bigint}]`, unknown>);
/**
 * https://discord.com/developers/docs/resources/channel#create-message
 */
export type RESTPostAPIChannelMessageResult = APIMessage;
/**
 * https://discord.com/developers/docs/resources/channel#crosspost-message
 */
export type RESTPostAPIChannelMessageCrosspostResult = APIMessage;
/**
 * https://discord.com/developers/docs/resources/channel#create-reaction
 */
export type RESTPutAPIChannelMessageReactionResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#delete-own-reaction
 */
export type RESTDeleteAPIChannelMessageOwnReaction = never;
/**
 * https://discord.com/developers/docs/resources/channel#delete-user-reaction
 */
export type RESTDeleteAPIChannelMessageUserReactionResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#get-reactions
 */
export interface RESTGetAPIChannelMessageReactionUsersQuery {
    /**
     * Get users after this user ID
     */
    after?: Snowflake;
    /**
     * Max number of users to return (1-100)
     *
     * @default 25
     */
    limit?: number;
}
/**
 * https://discord.com/developers/docs/resources/channel#get-reactions
 */
export type RESTGetAPIChannelMessageReactionUsersResult = APIUser[];
/**
 * https://discord.com/developers/docs/resources/channel#delete-all-reactions
 */
export type RESTDeleteAPIChannelAllMessageReactionsResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji
 */
export type RESTDeleteAPIChannelMessageReactionResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#edit-message
 */
export interface RESTPatchAPIChannelMessageJSONBody {
    /**
     * The new message contents (up to 2000 characters)
     */
    content?: string | null | undefined;
    /**
     * Embedded `rich` content (up to 6000 characters)
     *
     * See https://discord.com/developers/docs/resources/channel#embed-object
     */
    embeds?: APIEmbed[] | null | undefined;
    /**
     * Edit the flags of a message (only `SUPPRESS_EMBEDS` can currently be set/unset)
     *
     * When specifying flags, ensure to include all previously set flags/bits
     * in addition to ones that you are modifying
     *
     * See https://discord.com/developers/docs/resources/channel#message-object-message-flags
     */
    flags?: MessageFlags | null | undefined;
    /**
     * Allowed mentions for the message
     *
     * See https://discord.com/developers/docs/resources/channel#allowed-mentions-object
     */
    allowed_mentions?: APIAllowedMentions | null | undefined;
    /**
     * Attached files to keep
     *
     * Starting with API v10, the `attachments` array must contain all attachments that should be present after edit, including **retained and new** attachments provided in the request body.
     *
     * See https://discord.com/developers/docs/resources/channel#attachment-object
     */
    attachments?: RESTAPIAttachment[] | undefined;
    /**
     * The components to include with the message
     *
     * See https://discord.com/developers/docs/interactions/message-components#component-object
     */
    components?: APIActionRowComponent<APIMessageActionRowComponent>[] | null | undefined;
}
/**
 * https://discord.com/developers/docs/resources/channel#edit-message
 */
export type RESTPatchAPIChannelMessageFormDataBody = ({
    /**
     * JSON stringified message body
     */
    payload_json?: string | undefined;
} & Record<`files[${bigint}]`, unknown>) | (RESTPatchAPIChannelMessageJSONBody & Record<`files[${bigint}]`, unknown>);
/**
 * https://discord.com/developers/docs/resources/channel#edit-message
 */
export type RESTPatchAPIChannelMessageResult = APIMessage;
/**
 * https://discord.com/developers/docs/resources/channel#delete-message
 */
export type RESTDeleteAPIChannelMessageResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#bulk-delete-messages
 */
export interface RESTPostAPIChannelMessagesBulkDeleteJSONBody {
    /**
     * An array of message ids to delete (2-100)
     */
    messages: Snowflake[];
}
/**
 * https://discord.com/developers/docs/resources/channel#bulk-delete-messages
 */
export type RESTPostAPIChannelMessagesBulkDeleteResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#edit-channel-permissions
 */
export interface RESTPutAPIChannelPermissionJSONBody {
    /**
     * The bitwise value of all allowed permissions
     *
     * See https://en.wikipedia.org/wiki/Bit_field
     *
     * @default "0"
     */
    allow?: Permissions | null | undefined;
    /**
     * The bitwise value of all disallowed permissions
     *
     * See https://en.wikipedia.org/wiki/Bit_field
     *
     * @default "0"
     */
    deny?: Permissions | null | undefined;
    /**
     * `0` for a role or `1` for a member
     */
    type: OverwriteType;
}
/**
 * https://discord.com/developers/docs/resources/channel#edit-channel-permissions
 */
export type RESTPutAPIChannelPermissionResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#get-channel-invites
 */
export type RESTGetAPIChannelInvitesResult = APIExtendedInvite[];
/**
 * https://discord.com/developers/docs/resources/channel#create-channel-invite
 */
export interface RESTPostAPIChannelInviteJSONBody {
    /**
     * Duration of invite in seconds before expiry, or 0 for never
     *
     * @default 86400 (24 hours)
     */
    max_age?: number | undefined;
    /**
     * Max number of uses or 0 for unlimited
     *
     * @default 0
     */
    max_uses?: number | undefined;
    /**
     * Whether this invite only grants temporary membership
     *
     * @default false
     */
    temporary?: boolean | undefined;
    /**
     * If true, don't try to reuse a similar invite
     * (useful for creating many unique one time use invites)
     *
     * @default false
     */
    unique?: boolean | undefined;
    /**
     * The type of target for this voice channel invite
     *
     * See https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types
     */
    target_type?: InviteTargetType | undefined;
    /**
     * The id of the user whose stream to display for this invite
     * - Required if `target_type` is 1
     * - The user must be streaming in the channel
     */
    target_user_id?: Snowflake | undefined;
    /**
     * The id of the embedded application to open for this invite
     * - Required if `target_type` is 2
     * - The application must have the `EMBEDDED` flag
     */
    target_application_id?: Snowflake | undefined;
}
/**
 * https://discord.com/developers/docs/resources/channel#create-channel-invite
 */
export type RESTPostAPIChannelInviteResult = APIExtendedInvite;
/**
 * https://discord.com/developers/docs/resources/channel#delete-channel-permission
 */
export type RESTDeleteAPIChannelPermissionResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#follow-news-channel
 */
export interface RESTPostAPIChannelFollowersJSONBody {
    /**
     * ID of target channel
     */
    webhook_channel_id: Snowflake;
}
/**
 * https://discord.com/developers/docs/resources/channel#follow-news-channel
 */
export type RESTPostAPIChannelFollowersResult = APIFollowedChannel;
/**
 * https://discord.com/developers/docs/resources/channel#trigger-typing-indicator
 */
export type RESTPostAPIChannelTypingResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#get-pinned-messages
 */
export type RESTGetAPIChannelPinsResult = APIMessage[];
/**
 * https://discord.com/developers/docs/resources/channel#pin-message
 */
export type RESTPutAPIChannelPinResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#unpin-message
 */
export type RESTDeleteAPIChannelPinResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
 */
export interface RESTPutAPIChannelRecipientJSONBody {
    /**
     * Access token of a user that has granted your app the `gdm.join` scope
     */
    access_token: string;
    /**
     * Nickname of the user being added
     */
    nick?: string | undefined;
}
/**
 * https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
 */
export type RESTPutAPIChannelRecipientResult = unknown;
/**
 * https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient
 */
export type RESTDeleteAPIChannelRecipientResult = unknown;
/**
 * https://discord.com/developers/docs/resources/channel#start-thread-from-message
 */
export interface RESTPostAPIChannelMessagesThreadsJSONBody {
    /**
     * 1-100 character thread name
     */
    name: string;
    /**
     * The amount of time in minutes to wait before automatically archiving the thread
     */
    auto_archive_duration?: ThreadAutoArchiveDuration | undefined;
    /**
     * Amount of seconds a user has to wait before sending another message (0-21600)
     */
    rate_limit_per_user?: number | undefined;
}
/**
 * https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel
 */
export type RESTPostAPIGuildForumThreadsJSONBody = RESTPostAPIChannelMessagesThreadsJSONBody & {
    /**
     * The initial message of the thread
     */
    message: RESTPostAPIChannelMessageJSONBody;
    /**
     * The IDs of the set of tags to apply to the thread; limited to 5
     */
    applied_tags?: Snowflake[] | undefined;
};
/**
 * https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel
 */
export type RESTPostAPIGuildForumThreadsFormDataBody = RESTPostAPIChannelMessagesThreadsJSONBody & {
    /**
     * The initial message of the thread
     */
    message: string;
};
/**
 * https://discord.com/developers/docs/resources/channel#start-thread-from-message
 */
export type RESTPostAPIChannelMessagesThreadsResult = APIChannel;
/**
 * https://discord.com/developers/docs/resources/channel#start-thread-without-message
 */
export interface RESTPostAPIChannelThreadsJSONBody extends RESTPostAPIChannelMessagesThreadsJSONBody {
    /**
     * The type of thread to create
     *
     * In API v9 and v10, `type` defaults to `PRIVATE_THREAD`.
     * In a future API version this will be changed to be a required field, with no default.
     *
     * See https://discord.com/developers/docs/resources/channel#channel-object-channel-types
     *
     * @default ChannelType.PrivateThread
     */
    type?: ThreadChannelType | undefined;
    /**
     * Whether non-moderators can add other non-moderators to the thread; only available when creating a private thread
     */
    invitable?: boolean | undefined;
}
/**
 * https://discord.com/developers/docs/resources/channel#start-thread-without-message
 */
export type RESTPostAPIChannelThreadsResult = APIChannel;
/**
 * https://discord.com/developers/docs/resources/channel#join-thread
 */
export type RESTPutAPIChannelThreadMembersResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#leave-thread
 */
export type RESTDeleteAPIChannelThreadMembersResult = never;
/**
 * https://discord.com/developers/docs/resources/channel#get-thread-member
 */
export interface RESTGetAPIChannelThreadMemberQuery {
    /**
     * Whether to include a guild member object for the thread member
     */
    with_member?: boolean;
}
/**
 * https://discord.com/developers/docs/resources/channel#get-thread-member
 */
export type RESTGetAPIChannelThreadMemberResult = APIThreadMember;
/**
 * https://discord.com/developers/docs/resources/channel#list-thread-members
 */
export interface RESTGetAPIChannelThreadMembersQuery {
    /**
     * Whether to include a guild member object for each thread member
     */
    with_member?: boolean;
    /**
     * Get thread members after this user ID
     */
    after?: Snowflake;
    /**
     * Max number of thread members to return (1-100). Defaults to 100
     */
    limit?: number;
}
/**
 * https://discord.com/developers/docs/resources/channel#list-thread-members
 */
export type RESTGetAPIChannelThreadMembersResult = APIThreadMember[];
/**
 * https://discord.com/developers/docs/resources/channel#list-public-archived-threads
 */
export interface RESTGetAPIChannelThreadsArchivedQuery {
    /**
     * Get threads before this id or ISO8601 timestamp
     */
    before?: Snowflake | string;
    /**
     * Max number of thread to return
     */
    limit?: number;
}
/**
 * https://discord.com/developers/docs/resources/channel#list-public-archived-threads
 */
export type RESTGetAPIChannelThreadsArchivedPublicResult = RESTGetAPIChannelUsersThreadsArchivedResult;
/**
 * https://discord.com/developers/docs/resources/channel#list-private-archived-threads
 */
export type RESTGetAPIChannelThreadsArchivedPrivateResult = RESTGetAPIChannelUsersThreadsArchivedResult;
/**
 * https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads
 */
export interface RESTGetAPIChannelUsersThreadsArchivedResult extends APIThreadList {
    /**
     * Whether there are potentially additional threads
     */
    has_more: boolean;
}
//# sourceMappingURL=channel.d.ts.map