"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildScheduledEventPrivacyLevel = exports.GuildScheduledEventStatus = exports.GuildScheduledEventEntityType = void 0;
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types
 */
var GuildScheduledEventEntityType;
(function (GuildScheduledEventEntityType) {
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["StageInstance"] = 1] = "StageInstance";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["Voice"] = 2] = "Voice";
    GuildScheduledEventEntityType[GuildScheduledEventEntityType["External"] = 3] = "External";
})(GuildScheduledEventEntityType = exports.GuildScheduledEventEntityType || (exports.GuildScheduledEventEntityType = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status
 */
var GuildScheduledEventStatus;
(function (GuildScheduledEventStatus) {
    GuildScheduledEventStatus[GuildScheduledEventStatus["Scheduled"] = 1] = "Scheduled";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Active"] = 2] = "Active";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Completed"] = 3] = "Completed";
    GuildScheduledEventStatus[GuildScheduledEventStatus["Canceled"] = 4] = "Canceled";
})(GuildScheduledEventStatus = exports.GuildScheduledEventStatus || (exports.GuildScheduledEventStatus = {}));
/**
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level
 */
var GuildScheduledEventPrivacyLevel;
(function (GuildScheduledEventPrivacyLevel) {
    /**
     * The scheduled event is only accessible to guild members
     */
    GuildScheduledEventPrivacyLevel[GuildScheduledEventPrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
})(GuildScheduledEventPrivacyLevel = exports.GuildScheduledEventPrivacyLevel || (exports.GuildScheduledEventPrivacyLevel = {}));
//# sourceMappingURL=guildScheduledEvent.js.map