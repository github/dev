import type { Snowflake } from '../../globals';
export * from '../common';
export * from './application';
export * from './auditLog';
export * from './autoModeration';
export * from './channel';
export * from './emoji';
export * from './gateway';
export * from './guild';
export * from './guildScheduledEvent';
export * from './interactions';
export * from './invite';
export * from './oauth2';
export * from './stageInstance';
export * from './sticker';
export * from './template';
export * from './user';
export * from './voice';
export * from './webhook';
export * from './monetization';
export declare const APIVersion = "10";
export declare const Routes: {
    /**
     * Route for:
     * - GET `/applications/{application.id}/role-connections/metadata`
     * - PUT `/applications/{application.id}/role-connections/metadata`
     */
    applicationRoleConnectionMetadata(applicationId: Snowflake): `/applications/${string}/role-connections/metadata`;
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/auto-moderation/rules`
     * - POST `/guilds/{guild.id}/auto-moderation/rules`
     */
    guildAutoModerationRules(guildId: Snowflake): `/guilds/${string}/auto-moderation/rules`;
    /**
     * Routes for:
     * - GET    `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
     * - PATCH  `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
     * - DELETE `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
     */
    guildAutoModerationRule(guildId: Snowflake, ruleId: Snowflake): `/guilds/${string}/auto-moderation/rules/${string}`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/audit-logs`
     */
    guildAuditLog(guildId: Snowflake): `/guilds/${string}/audit-logs`;
    /**
     * Route for:
     * - GET    `/channels/{channel.id}`
     * - PATCH  `/channels/{channel.id}`
     * - DELETE `/channels/{channel.id}`
     */
    channel(channelId: Snowflake): `/channels/${string}`;
    /**
     * Route for:
     * - GET  `/channels/{channel.id}/messages`
     * - POST `/channels/{channel.id}/messages`
     */
    channelMessages(channelId: Snowflake): `/channels/${string}/messages`;
    /**
     * Route for:
     * - GET    `/channels/{channel.id}/messages/{message.id}`
     * - PATCH  `/channels/{channel.id}/messages/{message.id}`
     * - DELETE `/channels/{channel.id}/messages/{message.id}`
     */
    channelMessage(channelId: Snowflake, messageId: Snowflake): `/channels/${string}/messages/${string}`;
    /**
     * Route for:
     * - POST `/channels/{channel.id}/messages/{message.id}/crosspost`
     */
    channelMessageCrosspost(channelId: Snowflake, messageId: Snowflake): `/channels/${string}/messages/${string}/crosspost`;
    /**
     * Route for:
     * - PUT    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
     *
     * **Note**: You need to URL encode the emoji yourself
     */
    channelMessageOwnReaction(channelId: Snowflake, messageId: Snowflake, emoji: string): `/channels/${string}/messages/${string}/reactions/${string}/@me`;
    /**
     * Route for:
     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}`
     *
     * **Note**: You need to URL encode the emoji yourself
     */
    channelMessageUserReaction(channelId: Snowflake, messageId: Snowflake, emoji: string, userId: Snowflake): `/channels/${string}/messages/${string}/reactions/${string}/${string}`;
    /**
     * Route for:
     * - GET    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
     *
     * **Note**: You need to URL encode the emoji yourself
     */
    channelMessageReaction(channelId: Snowflake, messageId: Snowflake, emoji: string): `/channels/${string}/messages/${string}/reactions/${string}`;
    /**
     * Route for:
     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions`
     */
    channelMessageAllReactions(channelId: Snowflake, messageId: Snowflake): `/channels/${string}/messages/${string}/reactions`;
    /**
     * Route for:
     * - POST `/channels/{channel.id}/messages/bulk-delete`
     */
    channelBulkDelete(channelId: Snowflake): `/channels/${string}/messages/bulk-delete`;
    /**
     * Route for:
     * - PUT    `/channels/{channel.id}/permissions/{overwrite.id}`
     * - DELETE `/channels/{channel.id}/permissions/{overwrite.id}`
     */
    channelPermission(channelId: Snowflake, overwriteId: Snowflake): `/channels/${string}/permissions/${string}`;
    /**
     * Route for:
     * - GET  `/channels/{channel.id}/invites`
     * - POST `/channels/{channel.id}/invites`
     */
    channelInvites(channelId: Snowflake): `/channels/${string}/invites`;
    /**
     * Route for:
     * - POST `/channels/{channel.id}/followers`
     */
    channelFollowers(channelId: Snowflake): `/channels/${string}/followers`;
    /**
     * Route for:
     * - POST `/channels/{channel.id}/typing`
     */
    channelTyping(channelId: Snowflake): `/channels/${string}/typing`;
    /**
     * Route for:
     * - GET `/channels/{channel.id}/pins`
     */
    channelPins(channelId: Snowflake): `/channels/${string}/pins`;
    /**
     * Route for:
     * - PUT    `/channels/{channel.id}/pins/{message.id}`
     * - DELETE `/channels/{channel.id}/pins/{message.id}`
     */
    channelPin(channelId: Snowflake, messageId: Snowflake): `/channels/${string}/pins/${string}`;
    /**
     * Route for:
     * - PUT    `/channels/{channel.id}/recipients/{user.id}`
     * - DELETE `/channels/{channel.id}/recipients/{user.id}`
     */
    channelRecipient(channelId: Snowflake, userId: Snowflake): `/channels/${string}/recipients/${string}`;
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/emojis`
     * - POST `/guilds/{guild.id}/emojis`
     */
    guildEmojis(guildId: Snowflake): `/guilds/${string}/emojis`;
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}/emojis/{emoji.id}`
     * - PATCH  `/guilds/{guild.id}/emojis/{emoji.id}`
     * - DELETE `/guilds/{guild.id}/emojis/{emoji.id}`
     */
    guildEmoji(guildId: Snowflake, emojiId: Snowflake): `/guilds/${string}/emojis/${string}`;
    /**
     * Route for:
     * - POST `/guilds`
     */
    guilds(): "/guilds";
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}`
     * - PATCH  `/guilds/{guild.id}`
     * - DELETE `/guilds/{guild.id}`
     */
    guild(guildId: Snowflake): `/guilds/${string}`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/preview`
     */
    guildPreview(guildId: Snowflake): `/guilds/${string}/preview`;
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/channels`
     * - POST  `/guilds/{guild.id}/channels`
     * - PATCH `/guilds/{guild.id}/channels`
     */
    guildChannels(guildId: Snowflake): `/guilds/${string}/channels`;
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}/members/{user.id}`
     * - PUT    `/guilds/{guild.id}/members/{user.id}`
     * - PATCH  `/guilds/{guild.id}/members/@me`
     * - PATCH  `/guilds/{guild.id}/members/{user.id}`
     * - DELETE `/guilds/{guild.id}/members/{user.id}`
     */
    guildMember(guildId: Snowflake, userId?: Snowflake | '@me'): `/guilds/${string}/members/${string}`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/members`
     */
    guildMembers(guildId: Snowflake): `/guilds/${string}/members`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/members/search`
     */
    guildMembersSearch(guildId: Snowflake): `/guilds/${string}/members/search`;
    /**
     * Route for:
     * - PATCH `/guilds/{guild.id}/members/@me/nick`
     *
     * @deprecated Use {@link Routes.guildMember} instead.
     */
    guildCurrentMemberNickname(guildId: Snowflake): `/guilds/${string}/members/@me/nick`;
    /**
     * Route for:
     * - PUT    `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
     * - DELETE `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
     */
    guildMemberRole(guildId: Snowflake, memberId: Snowflake, roleId: Snowflake): `/guilds/${string}/members/${string}/roles/${string}`;
    /**
     * Route for:
     * - POST `/guilds/{guild.id}/mfa`
     */
    guildMFA(guildId: Snowflake): `/guilds/${string}/mfa`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/bans`
     */
    guildBans(guildId: Snowflake): `/guilds/${string}/bans`;
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}/bans/{user.id}`
     * - PUT    `/guilds/{guild.id}/bans/{user.id}`
     * - DELETE `/guilds/{guild.id}/bans/{user.id}`
     */
    guildBan(guildId: Snowflake, userId: Snowflake): `/guilds/${string}/bans/${string}`;
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/roles`
     * - POST  `/guilds/{guild.id}/roles`
     * - PATCH `/guilds/{guild.id}/roles`
     */
    guildRoles(guildId: Snowflake): `/guilds/${string}/roles`;
    /**
     * Route for:
     * - PATCH  `/guilds/{guild.id}/roles/{role.id}`
     * - DELETE `/guilds/{guild.id}/roles/{role.id}`
     */
    guildRole(guildId: Snowflake, roleId: Snowflake): `/guilds/${string}/roles/${string}`;
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/prune`
     * - POST `/guilds/{guild.id}/prune`
     */
    guildPrune(guildId: Snowflake): `/guilds/${string}/prune`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/regions`
     */
    guildVoiceRegions(guildId: Snowflake): `/guilds/${string}/regions`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/invites`
     */
    guildInvites(guildId: Snowflake): `/guilds/${string}/invites`;
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/integrations`
     */
    guildIntegrations(guildId: Snowflake): `/guilds/${string}/integrations`;
    /**
     * Route for:
     * - DELETE `/guilds/{guild.id}/integrations/{integration.id}`
     */
    guildIntegration(guildId: Snowflake, integrationId: Snowflake): `/guilds/${string}/integrations/${string}`;
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/widget`
     * - PATCH `/guilds/{guild.id}/widget`
     */
    guildWidgetSettings(guildId: Snowflake): `/guilds/${string}/widget`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/widget.json`
     */
    guildWidgetJSON(guildId: Snowflake): `/guilds/${string}/widget.json`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/vanity-url`
     */
    guildVanityUrl(guildId: Snowflake): `/guilds/${string}/vanity-url`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/widget.png`
     */
    guildWidgetImage(guildId: Snowflake): `/guilds/${string}/widget.png`;
    /**
     * Route for:
     * - GET    `/invites/{invite.code}`
     * - DELETE `/invites/{invite.code}`
     */
    invite(code: string): `/invites/${string}`;
    /**
     * Route for:
     * - GET  `/guilds/templates/{template.code}`
     * - POST `/guilds/templates/{template.code}`
     */
    template(code: string): `/guilds/templates/${string}`;
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/templates`
     * - POST `/guilds/{guild.id}/templates`
     */
    guildTemplates(guildId: Snowflake): `/guilds/${string}/templates`;
    /**
     * Route for:
     * - PUT    `/guilds/{guild.id}/templates/{template.code}`
     * - PATCH  `/guilds/{guild.id}/templates/{template.code}`
     * - DELETE `/guilds/{guild.id}/templates/{template.code}`
     */
    guildTemplate(guildId: Snowflake, code: string): `/guilds/${string}/templates/${string}`;
    /**
     * Route for:
     * - POST `/channels/{channel.id}/threads`
     * - POST `/channels/{channel.id}/messages/{message.id}/threads`
     */
    threads(parentId: Snowflake, messageId?: Snowflake): `/channels/${string}/threads` | `/channels/${string}/messages/${string}/threads`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/threads/active`
     */
    guildActiveThreads(guildId: Snowflake): `/guilds/${string}/threads/active`;
    /**
     * Route for:
     * - GET `/channels/{channel.id}/threads/archived/public`
     * - GET `/channels/{channel.id}/threads/archived/private`
     */
    channelThreads(channelId: Snowflake, archivedStatus: 'public' | 'private'): `/channels/${string}/threads/archived/public` | `/channels/${string}/threads/archived/private`;
    /**
     * Route for:
     * - GET `/channels/{channel.id}/users/@me/threads/archived/private`
     */
    channelJoinedArchivedThreads(channelId: Snowflake): `/channels/${string}/users/@me/threads/archived/private`;
    /**
     * Route for:
     * - GET    `/channels/{thread.id}/thread-members`
     * - GET    `/channels/{thread.id}/thread-members/{user.id}`
     * - PUT    `/channels/{thread.id}/thread-members/@me`
     * - PUT    `/channels/{thread.id}/thread-members/{user.id}`
     * - DELETE `/channels/{thread.id}/thread-members/@me`
     * - DELETE `/channels/{thread.id}/thread-members/{user.id}`
     */
    threadMembers(threadId: Snowflake, userId?: Snowflake | '@me'): `/channels/${string}/thread-members` | `/channels/${string}/thread-members/${string}`;
    /**
     * Route for:
     * - GET   `/users/@me`
     * - GET   `/users/{user.id}`
     * - PATCH `/users/@me`
     *
     * @param [userId] The user ID, defaulted to `@me`
     */
    user(userId?: Snowflake | '@me'): `/users/${string}`;
    /**
     * Route for:
     * - GET `/users/@me/applications/{application.id}/role-connection`
     * - PUT `/users/@me/applications/{application.id}/role-connection`
     */
    userApplicationRoleConnection(applicationId: Snowflake): `/users/@me/applications/${string}/role-connection`;
    /**
     * Route for:
     * - GET `/users/@me/guilds`
     */
    userGuilds(): "/users/@me/guilds";
    /**
     * Route for:
     * - GET `/users/@me/guilds/{guild.id}/member`
     */
    userGuildMember(guildId: Snowflake): `/users/@me/guilds/${string}/member`;
    /**
     * Route for:
     * - DELETE `/users/@me/guilds/{guild.id}`
     */
    userGuild(guildId: Snowflake): `/users/@me/guilds/${string}`;
    /**
     * Route for:
     * - POST `/users/@me/channels`
     */
    userChannels(): "/users/@me/channels";
    /**
     * Route for:
     * - GET `/users/@me/connections`
     */
    userConnections(): "/users/@me/connections";
    /**
     * Route for:
     * - GET `/voice/regions`
     */
    voiceRegions(): "/voice/regions";
    /**
     * Route for:
     * - GET  `/channels/{channel.id}/webhooks`
     * - POST `/channels/{channel.id}/webhooks`
     */
    channelWebhooks(channelId: Snowflake): `/channels/${string}/webhooks`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/webhooks`
     */
    guildWebhooks(guildId: Snowflake): `/guilds/${string}/webhooks`;
    /**
     * Route for:
     * - GET    `/webhooks/{webhook.id}`
     * - GET    `/webhooks/{webhook.id}/{webhook.token}`
     * - PATCH  `/webhooks/{webhook.id}`
     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}`
     * - DELETE `/webhooks/{webhook.id}`
     * - DELETE `/webhooks/{webhook.id}/{webhook.token}`
     * - POST   `/webhooks/{webhook.id}/{webhook.token}`
     *
     * - POST   `/webhooks/{application.id}/{interaction.token}`
     */
    webhook(webhookId: Snowflake, webhookToken?: string): `/webhooks/${string}` | `/webhooks/${string}/${string}`;
    /**
     * Route for:
     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
     *
     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/@original`
     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
     * - DELETE `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
     */
    webhookMessage(webhookId: Snowflake, webhookToken: string, messageId?: Snowflake | '@original'): `/webhooks/${string}/${string}/messages/${string}`;
    /**
     * Route for:
     * - POST `/webhooks/{webhook.id}/{webhook.token}/github`
     * - POST `/webhooks/{webhook.id}/{webhook.token}/slack`
     */
    webhookPlatform(webhookId: Snowflake, webhookToken: string, platform: 'github' | 'slack'): `/webhooks/${string}/${string}/github` | `/webhooks/${string}/${string}/slack`;
    /**
     * Route for:
     * - GET `/gateway`
     */
    gateway(): "/gateway";
    /**
     * Route for:
     * - GET `/gateway/bot`
     */
    gatewayBot(): "/gateway/bot";
    /**
     * Route for:
     * - GET `/oauth2/applications/@me`
     */
    oauth2CurrentApplication(): "/oauth2/applications/@me";
    /**
     * Route for:
     * - GET `/oauth2/@me`
     */
    oauth2CurrentAuthorization(): "/oauth2/@me";
    /**
     * Route for:
     * - GET `/oauth2/authorize`
     */
    oauth2Authorization(): "/oauth2/authorize";
    /**
     * Route for:
     * - POST `/oauth2/token`
     */
    oauth2TokenExchange(): "/oauth2/token";
    /**
     * Route for:
     * - POST `/oauth2/token/revoke`
     */
    oauth2TokenRevocation(): "/oauth2/token/revoke";
    /**
     * Route for:
     * - GET  `/applications/{application.id}/commands`
     * - PUT  `/applications/{application.id}/commands`
     * - POST `/applications/{application.id}/commands`
     */
    applicationCommands(applicationId: Snowflake): `/applications/${string}/commands`;
    /**
     * Route for:
     * - GET    `/applications/{application.id}/commands/{command.id}`
     * - PATCH  `/applications/{application.id}/commands/{command.id}`
     * - DELETE `/applications/{application.id}/commands/{command.id}`
     */
    applicationCommand(applicationId: Snowflake, commandId: Snowflake): `/applications/${string}/commands/${string}`;
    /**
     * Route for:
     * - GET  `/applications/{application.id}/guilds/{guild.id}/commands`
     * - PUT  `/applications/{application.id}/guilds/{guild.id}/commands`
     * - POST `/applications/{application.id}/guilds/{guild.id}/commands`
     */
    applicationGuildCommands(applicationId: Snowflake, guildId: Snowflake): `/applications/${string}/guilds/${string}/commands`;
    /**
     * Route for:
     * - GET    `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
     * - PATCH  `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
     * - DELETE `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
     */
    applicationGuildCommand(applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): `/applications/${string}/guilds/${string}/commands/${string}`;
    /**
     * Route for:
     * - POST `/interactions/{interaction.id}/{interaction.token}/callback`
     */
    interactionCallback(interactionId: Snowflake, interactionToken: string): `/interactions/${string}/${string}/callback`;
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/member-verification`
     * - PATCH `/guilds/{guild.id}/member-verification`
     */
    guildMemberVerification(guildId: Snowflake): `/guilds/${string}/member-verification`;
    /**
     * Route for:
     * - PATCH `/guilds/{guild.id}/voice-states/@me`
     * - PATCH `/guilds/{guild.id}/voice-states/{user.id}`
     */
    guildVoiceState(guildId: Snowflake, userId?: Snowflake | '@me'): `/guilds/${string}/voice-states/${string}`;
    /**
     * Route for:
     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
     */
    guildApplicationCommandsPermissions(applicationId: Snowflake, guildId: Snowflake): `/applications/${string}/guilds/${string}/commands/permissions`;
    /**
     * Route for:
     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
     */
    applicationCommandPermissions(applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): `/applications/${string}/guilds/${string}/commands/${string}/permissions`;
    /**
     * Route for:
     * - GET   `/guilds/{guild.id}/welcome-screen`
     * - PATCH `/guilds/{guild.id}/welcome-screen`
     */
    guildWelcomeScreen(guildId: Snowflake): `/guilds/${string}/welcome-screen`;
    /**
     * Route for:
     * - POST `/stage-instances`
     */
    stageInstances(): "/stage-instances";
    /**
     * Route for:
     * - GET `/stage-instances/{channel.id}`
     * - PATCH `/stage-instances/{channel.id}`
     * - DELETE `/stage-instances/{channel.id}`
     */
    stageInstance(channelId: Snowflake): `/stage-instances/${string}`;
    /**
     * Route for:
     * - GET `/stickers/{sticker.id}`
     */
    sticker(stickerId: Snowflake): `/stickers/${string}`;
    /**
     * Route for:
     * - GET `/sticker-packs`
     */
    stickerPacks(): "/sticker-packs";
    /**
     * Route for:
     * - GET `/sticker-packs`
     *
     * @deprecated Use {@link Routes.stickerPacks} instead.
     */
    nitroStickerPacks(): "/sticker-packs";
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/stickers`
     * - POST `/guilds/{guild.id}/stickers`
     */
    guildStickers(guildId: Snowflake): `/guilds/${string}/stickers`;
    /**
     * Route for:
     * - GET    `/guilds/{guild.id}/stickers/{sticker.id}`
     * - PATCH  `/guilds/{guild.id}/stickers/{sticker.id}`
     * - DELETE `/guilds/{guild.id}/stickers/{sticker.id}`
     */
    guildSticker(guildId: Snowflake, stickerId: Snowflake): `/guilds/${string}/stickers/${string}`;
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/scheduled-events`
     * - POST `/guilds/{guild.id}/scheduled-events`
     */
    guildScheduledEvents(guildId: Snowflake): `/guilds/${string}/scheduled-events`;
    /**
     * Route for:
     * - GET  `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
     * - PATCH `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
     * - DELETE `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
     */
    guildScheduledEvent(guildId: Snowflake, guildScheduledEventId: Snowflake): `/guilds/${string}/scheduled-events/${string}`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}/users`
     */
    guildScheduledEventUsers(guildId: Snowflake, guildScheduledEventId: Snowflake): `/guilds/${string}/scheduled-events/${string}/users`;
    /**
     * Route for:
     * - GET `/guilds/${guild.id}/onboarding`
     * - PUT `/guilds/${guild.id}/onboarding`
     */
    guildOnboarding(guildId: Snowflake): `/guilds/${string}/onboarding`;
    /**
     * Route for:
     * - GET `/applications/@me`
     * - PATCH `/applications/@me`
     */
    currentApplication(): "/applications/@me";
    /**
     * Route for:
     * - GET `/applications/{application.id}/entitlements`
     * - POST `/applications/{application.id}/entitlements`
     */
    entitlements(applicationId: Snowflake): `/applications/${string}/entitlements`;
    /**
     * Route for:
     * - DELETE `/applications/{application.id}/entitlements/{entitlement.id}`
     */
    entitlement(applicationId: Snowflake, entitlementId: Snowflake): `/applications/${string}/entitlements/${string}`;
    /**
     * Route for:
     * - GET `/applications/{application.id}/skus`
     */
    skus(applicationId: Snowflake): `/applications/${string}/skus`;
};
export declare const StickerPackApplicationId = "710982414301790216";
export declare const CDNRoutes: {
    /**
     * Route for:
     * - GET `/emojis/{emoji.id}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    emoji(emojiId: Snowflake, format: EmojiFormat): `/emojis/${string}.jpeg` | `/emojis/${string}.png` | `/emojis/${string}.webp` | `/emojis/${string}.gif`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/icons/{guild.id}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    guildIcon(guildId: Snowflake, guildIcon: string, format: GuildIconFormat): `icons/${string}/${string}.jpeg` | `icons/${string}/${string}.png` | `icons/${string}/${string}.webp` | `icons/${string}/${string}.gif`;
    /**
     * Route for:
     * - GET `/splashes/{guild.id}/{guild.splash}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    guildSplash(guildId: Snowflake, guildSplash: string, format: GuildSplashFormat): `/splashes/${string}/${string}.jpeg` | `/splashes/${string}/${string}.png` | `/splashes/${string}/${string}.webp`;
    /**
     * Route for:
     * - GET `/discovery-splashes/{guild.id}/{guild.discovery_splash}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    guildDiscoverySplash(guildId: Snowflake, guildDiscoverySplash: string, format: GuildDiscoverySplashFormat): `/discovery-splashes/${string}/${string}.jpeg` | `/discovery-splashes/${string}/${string}.png` | `/discovery-splashes/${string}/${string}.webp`;
    /**
     * Route for:
     * - GET `/banners/{guild.id}/{guild.banner}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    guildBanner(guildId: Snowflake, guildBanner: string, format: GuildBannerFormat): `/banners/${string}/${string}.jpeg` | `/banners/${string}/${string}.png` | `/banners/${string}/${string}.webp` | `/banners/${string}/${string}.gif`;
    /**
     * Route for:
     * - GET `/banners/{user.id}/{user.banner}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    userBanner(userId: Snowflake, userBanner: string, format: UserBannerFormat): `/banners/${string}/${string}.jpeg` | `/banners/${string}/${string}.png` | `/banners/${string}/${string}.webp` | `/banners/${string}/${string}.gif`;
    /**
     * Route for:
     * - GET `/embed/avatars/{index}.png`
     *
     * The value for `index` parameter depends on whether the user is [migrated to the new username system](https://discord.com/developers/docs/change-log#unique-usernames-on-discord).
     * For users on the new username system, `index` will be `(user.id >> 22) % 6`.
     * For users on the legacy username system, `index` will be `user.discriminator % 5`.
     *
     * This route supports the extension: PNG
     */
    defaultUserAvatar(index: DefaultUserAvatarAssets): "/embed/avatars/0.png" | "/embed/avatars/2.png" | "/embed/avatars/1.png" | "/embed/avatars/3.png" | "/embed/avatars/4.png" | "/embed/avatars/5.png";
    /**
     * Route for:
     * - GET `/avatars/{user.id}/{user.avatar}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    userAvatar(userId: Snowflake, userAvatar: string, format: UserAvatarFormat): `/avatars/${string}/${string}.jpeg` | `/avatars/${string}/${string}.png` | `/avatars/${string}/${string}.webp` | `/avatars/${string}/${string}.gif`;
    /**
     * Route for:
     * - GET `/guilds/{guild.id}/users/{user.id}/{guild_member.avatar}.{png|jpeg|webp|gif}`
     *
     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    guildMemberAvatar(guildId: Snowflake, userId: Snowflake, memberAvatar: string, format: GuildMemberAvatarFormat): `/guilds/${string}/users/${string}/avatars/${string}.jpeg` | `/guilds/${string}/users/${string}/avatars/${string}.png` | `/guilds/${string}/users/${string}/avatars/${string}.webp` | `/guilds/${string}/users/${string}/avatars/${string}.gif`;
    /**
     * Route for:
     * - GET `/avatar-decorations/{user.id}/{user.avatar_decoration}.png`
     *
     * This route supports the extension: PNG
     */
    userAvatarDecoration(userId: Snowflake, userAvatarDecoration: string): `/avatar-decorations/${string}/${string}.png`;
    /**
     * Route for:
     * - GET `/app-icons/{application.id}/{application.icon}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    applicationIcon(applicationId: Snowflake, applicationIcon: string, format: ApplicationIconFormat): `/app-icons/${string}/${string}.jpeg` | `/app-icons/${string}/${string}.png` | `/app-icons/${string}/${string}.webp`;
    /**
     * Route for:
     * - GET `/app-icons/{application.id}/{application.cover_image}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    applicationCover(applicationId: Snowflake, applicationCoverImage: string, format: ApplicationCoverFormat): `/app-icons/${string}/${string}.jpeg` | `/app-icons/${string}/${string}.png` | `/app-icons/${string}/${string}.webp`;
    /**
     * Route for:
     * - GET `/app-assets/{application.id}/{application.asset_id}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    applicationAsset(applicationId: Snowflake, applicationAssetId: string, format: ApplicationAssetFormat): `/app-assets/${string}/${string}.jpeg` | `/app-assets/${string}/${string}.png` | `/app-assets/${string}/${string}.webp`;
    /**
     * Route for:
     * - GET `/app-assets/{application.id}/achievements/{achievement.id}/icons/{achievement.icon}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    achievementIcon(applicationId: Snowflake, achievementId: Snowflake, achievementIconHash: string, format: AchievementIconFormat): `/app-assets/${string}/achievements/${string}/icons/${string}.jpeg` | `/app-assets/${string}/achievements/${string}/icons/${string}.png` | `/app-assets/${string}/achievements/${string}/icons/${string}.webp`;
    /**
     * Route for:
     * - GET `/app-assets/710982414301790216/store/{sticker_pack.banner.asset_id}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    stickerPackBanner(stickerPackBannerAssetId: Snowflake, format: StickerPackBannerFormat): `/app-assets/710982414301790216/store/${string}.jpeg` | `/app-assets/710982414301790216/store/${string}.png` | `/app-assets/710982414301790216/store/${string}.webp`;
    /**
     * Route for:
     * - GET `/app-assets/${application.id}/store/${asset.id}.{png|jpeg|webp}}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    storePageAsset(applicationId: Snowflake, assetId: string): `/app-assets/${string}/store/${string}.png`;
    /**
     * Route for:
     * - GET `team-icons/{team.id}/{team.icon}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    teamIcon(teamId: Snowflake, teamIcon: string, format: TeamIconFormat): `/team-icons/${string}/${string}.jpeg` | `/team-icons/${string}/${string}.png` | `/team-icons/${string}/${string}.webp`;
    /**
     * Route for:
     * - GET `/stickers/{sticker.id}.{png|json}`
     *
     * This route supports the extensions: PNG, Lottie, GIF
     */
    sticker(stickerId: Snowflake, format: StickerFormat): `/stickers/${string}.png` | `/stickers/${string}.gif` | `/stickers/${string}.json`;
    /**
     * Route for:
     * - GET `/role-icons/{role.id}/{role.icon}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    roleIcon(roleId: Snowflake, roleIcon: string, format: RoleIconFormat): `/role-icons/${string}/${string}.jpeg` | `/role-icons/${string}/${string}.png` | `/role-icons/${string}/${string}.webp`;
    /**
     * Route for:
     * - GET `/guild-events/{guild_scheduled_event.id}/{guild_scheduled_event.image}.{png|jpeg|webp}`
     *
     * This route supports the extensions: PNG, JPEG, WebP
     */
    guildScheduledEventCover(guildScheduledEventId: Snowflake, guildScheduledEventCoverImage: string, format: GuildScheduledEventCoverFormat): `/guild-events/${string}/${string}.jpeg` | `/guild-events/${string}/${string}.png` | `/guild-events/${string}/${string}.webp`;
    /**
     * Route for:
     * - GET `/guilds/${guild.id}/users/${user.id}/banners/${guild_member.banner}.{png|jpeg|webp|gif}`
     *
     * This route supports the extensions: PNG, JPEG, WebP, GIF
     */
    guildMemberBanner(guildId: Snowflake, userId: Snowflake, guildMemberBanner: string, format: GuildMemberBannerFormat): `/guilds/${string}/users/${string}/banners/${string}.jpeg` | `/guilds/${string}/users/${string}/banners/${string}.png` | `/guilds/${string}/users/${string}/banners/${string}.webp` | `/guilds/${string}/users/${string}/banners/${string}.gif`;
};
export type DefaultUserAvatarAssets = 0 | 1 | 2 | 3 | 4 | 5;
export type EmojiFormat = Exclude<ImageFormat, ImageFormat.Lottie>;
export type GuildIconFormat = Exclude<ImageFormat, ImageFormat.Lottie>;
export type GuildSplashFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type GuildDiscoverySplashFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type GuildBannerFormat = Exclude<ImageFormat, ImageFormat.Lottie>;
export type UserBannerFormat = Exclude<ImageFormat, ImageFormat.Lottie>;
export type DefaultUserAvatar = Extract<ImageFormat, ImageFormat.PNG>;
export type UserAvatarFormat = Exclude<ImageFormat, ImageFormat.Lottie>;
export type GuildMemberAvatarFormat = Exclude<ImageFormat, ImageFormat.Lottie>;
export type ApplicationIconFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type ApplicationCoverFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type ApplicationAssetFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type AchievementIconFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type StickerPackBannerFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type TeamIconFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type StickerFormat = Extract<ImageFormat, ImageFormat.PNG | ImageFormat.Lottie | ImageFormat.GIF>;
export type RoleIconFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type GuildScheduledEventCoverFormat = Exclude<ImageFormat, ImageFormat.Lottie | ImageFormat.GIF>;
export type GuildMemberBannerFormat = Exclude<ImageFormat, ImageFormat.Lottie>;
export declare enum ImageFormat {
    JPEG = "jpeg",
    PNG = "png",
    WebP = "webp",
    GIF = "gif",
    Lottie = "json"
}
export interface CDNQuery {
    /**
     * The returned image can have the size changed by using this query parameter
     *
     * Image size can be any power of two between 16 and 4096
     */
    size?: number;
}
export declare const RouteBases: {
    readonly api: "https://discord.com/api/v10";
    readonly cdn: "https://cdn.discordapp.com";
    readonly invite: "https://discord.gg";
    readonly template: "https://discord.new";
    readonly gift: "https://discord.gift";
    readonly scheduledEvent: "https://discord.com/events";
};
export declare const OAuth2Routes: {
    readonly authorizationURL: "https://discord.com/api/v10/oauth2/authorize";
    readonly tokenURL: "https://discord.com/api/v10/oauth2/token";
    /**
     * See https://tools.ietf.org/html/rfc7009
     */
    readonly tokenRevocationURL: "https://discord.com/api/v10/oauth2/token/revoke";
};
//# sourceMappingURL=index.d.ts.map