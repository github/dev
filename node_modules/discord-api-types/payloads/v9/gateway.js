"use strict";
/**
 * Types extracted from
 *  - https://discord.com/developers/docs/topics/gateway
 *  - https://discord.com/developers/docs/topics/gateway-events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityFlags = exports.ActivityType = exports.ActivityPlatform = exports.PresenceUpdateStatus = void 0;
/**
 * https://discord.com/developers/docs/topics/gateway-events#update-presence-status-types
 */
var PresenceUpdateStatus;
(function (PresenceUpdateStatus) {
    PresenceUpdateStatus["Online"] = "online";
    PresenceUpdateStatus["DoNotDisturb"] = "dnd";
    PresenceUpdateStatus["Idle"] = "idle";
    /**
     * Invisible and shown as offline
     */
    PresenceUpdateStatus["Invisible"] = "invisible";
    PresenceUpdateStatus["Offline"] = "offline";
})(PresenceUpdateStatus = exports.PresenceUpdateStatus || (exports.PresenceUpdateStatus = {}));
/**
 * @unstable This enum is currently not documented by Discord but has known values which we will try to keep up to date.
 * Values might be added or removed without a major version bump.
 */
var ActivityPlatform;
(function (ActivityPlatform) {
    ActivityPlatform["Desktop"] = "desktop";
    ActivityPlatform["Xbox"] = "xbox";
    ActivityPlatform["Samsung"] = "samsung";
    ActivityPlatform["IOS"] = "ios";
    ActivityPlatform["Android"] = "android";
    ActivityPlatform["Embedded"] = "embedded";
    ActivityPlatform["PS4"] = "ps4";
    ActivityPlatform["PS5"] = "ps5";
})(ActivityPlatform = exports.ActivityPlatform || (exports.ActivityPlatform = {}));
/**
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
 */
var ActivityType;
(function (ActivityType) {
    /**
     * Playing {game}
     */
    ActivityType[ActivityType["Playing"] = 0] = "Playing";
    /**
     * Streaming {details}
     */
    ActivityType[ActivityType["Streaming"] = 1] = "Streaming";
    /**
     * Listening to {name}
     */
    ActivityType[ActivityType["Listening"] = 2] = "Listening";
    /**
     * Watching {details}
     */
    ActivityType[ActivityType["Watching"] = 3] = "Watching";
    /**
     * {emoji} {state}
     */
    ActivityType[ActivityType["Custom"] = 4] = "Custom";
    /**
     * Competing in {name}
     */
    ActivityType[ActivityType["Competing"] = 5] = "Competing";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
/**
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags
 */
var ActivityFlags;
(function (ActivityFlags) {
    ActivityFlags[ActivityFlags["Instance"] = 1] = "Instance";
    ActivityFlags[ActivityFlags["Join"] = 2] = "Join";
    ActivityFlags[ActivityFlags["Spectate"] = 4] = "Spectate";
    ActivityFlags[ActivityFlags["JoinRequest"] = 8] = "JoinRequest";
    ActivityFlags[ActivityFlags["Sync"] = 16] = "Sync";
    ActivityFlags[ActivityFlags["Play"] = 32] = "Play";
    ActivityFlags[ActivityFlags["PartyPrivacyFriends"] = 64] = "PartyPrivacyFriends";
    ActivityFlags[ActivityFlags["PartyPrivacyVoiceChannel"] = 128] = "PartyPrivacyVoiceChannel";
    ActivityFlags[ActivityFlags["Embedded"] = 256] = "Embedded";
})(ActivityFlags = exports.ActivityFlags || (exports.ActivityFlags = {}));
//# sourceMappingURL=gateway.js.map