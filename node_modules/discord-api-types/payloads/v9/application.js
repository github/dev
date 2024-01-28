"use strict";
/**
 * Types extracted from https://discord.com/developers/docs/resources/application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRoleConnectionMetadataType = exports.ApplicationFlags = void 0;
/**
 * https://discord.com/developers/docs/resources/application#application-object-application-flags
 */
var ApplicationFlags;
(function (ApplicationFlags) {
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedReleased"] = 2] = "EmbeddedReleased";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["ManagedEmoji"] = 4] = "ManagedEmoji";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedIAP"] = 8] = "EmbeddedIAP";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["GroupDMCreate"] = 16] = "GroupDMCreate";
    /**
     * Indicates if an app uses the Auto Moderation API
     */
    ApplicationFlags[ApplicationFlags["ApplicationAutoModerationRuleCreateBadge"] = 64] = "ApplicationAutoModerationRuleCreateBadge";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["RPCHasConnected"] = 2048] = "RPCHasConnected";
    /**
     * Intent required for bots in 100 or more servers to receive `presence_update` events
     */
    ApplicationFlags[ApplicationFlags["GatewayPresence"] = 4096] = "GatewayPresence";
    /**
     * Intent required for bots in under 100 servers to receive `presence_update` events, found in Bot Settings
     */
    ApplicationFlags[ApplicationFlags["GatewayPresenceLimited"] = 8192] = "GatewayPresenceLimited";
    /**
     * Intent required for bots in 100 or more servers to receive member-related events like `guild_member_add`.
     * See list of member-related events [under `GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
     */
    ApplicationFlags[ApplicationFlags["GatewayGuildMembers"] = 16384] = "GatewayGuildMembers";
    /**
     * Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found in Bot Settings.
     * See list of member-related events [under `GUILD_MEMBERS`](https://discord.com/developers/docs/topics/gateway#list-of-intents)
     */
    ApplicationFlags[ApplicationFlags["GatewayGuildMembersLimited"] = 32768] = "GatewayGuildMembersLimited";
    /**
     * Indicates unusual growth of an app that prevents verification
     */
    ApplicationFlags[ApplicationFlags["VerificationPendingGuildLimit"] = 65536] = "VerificationPendingGuildLimit";
    /**
     * Indicates if an app is embedded within the Discord client (currently unavailable publicly)
     */
    ApplicationFlags[ApplicationFlags["Embedded"] = 131072] = "Embedded";
    /**
     * Intent required for bots in 100 or more servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055)
     */
    ApplicationFlags[ApplicationFlags["GatewayMessageContent"] = 262144] = "GatewayMessageContent";
    /**
     * Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055),
     * found in Bot Settings
     */
    ApplicationFlags[ApplicationFlags["GatewayMessageContentLimited"] = 524288] = "GatewayMessageContentLimited";
    /**
     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
     */
    ApplicationFlags[ApplicationFlags["EmbeddedFirstParty"] = 1048576] = "EmbeddedFirstParty";
    /**
     * Indicates if an app has registered global [application commands](https://discord.com/developers/docs/interactions/application-commands)
     */
    ApplicationFlags[ApplicationFlags["ApplicationCommandBadge"] = 8388608] = "ApplicationCommandBadge";
})(ApplicationFlags = exports.ApplicationFlags || (exports.ApplicationFlags = {}));
/**
 * https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type
 */
var ApplicationRoleConnectionMetadataType;
(function (ApplicationRoleConnectionMetadataType) {
    /**
     * The metadata value (`integer`) is less than or equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerLessThanOrEqual"] = 1] = "IntegerLessThanOrEqual";
    /**
     * The metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerGreaterThanOrEqual"] = 2] = "IntegerGreaterThanOrEqual";
    /**
     * The metadata value (`integer`) is equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerEqual"] = 3] = "IntegerEqual";
    /**
     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerNotEqual"] = 4] = "IntegerNotEqual";
    /**
     * The metadata value (`ISO8601 string`) is less than or equal to the guild's configured value (`integer`; days before current date)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeLessThanOrEqual"] = 5] = "DatetimeLessThanOrEqual";
    /**
     * The metadata value (`ISO8601 string`) is greater than or equal to the guild's configured value (`integer`; days before current date)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeGreaterThanOrEqual"] = 6] = "DatetimeGreaterThanOrEqual";
    /**
     * The metadata value (`integer`) is equal to the guild's configured value (`integer`; `1`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanEqual"] = 7] = "BooleanEqual";
    /**
     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`; `1`)
     */
    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanNotEqual"] = 8] = "BooleanNotEqual";
})(ApplicationRoleConnectionMetadataType = exports.ApplicationRoleConnectionMetadataType || (exports.ApplicationRoleConnectionMetadataType = {}));
//# sourceMappingURL=application.js.map