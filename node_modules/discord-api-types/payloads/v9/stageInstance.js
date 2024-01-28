"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageInstancePrivacyLevel = void 0;
/**
 * https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level
 */
var StageInstancePrivacyLevel;
(function (StageInstancePrivacyLevel) {
    /**
     * The stage instance is visible publicly, such as on stage discovery
     *
     * @deprecated
     */
    StageInstancePrivacyLevel[StageInstancePrivacyLevel["Public"] = 1] = "Public";
    /**
     * The stage instance is visible to only guild members
     */
    StageInstancePrivacyLevel[StageInstancePrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
})(StageInstancePrivacyLevel = exports.StageInstancePrivacyLevel || (exports.StageInstancePrivacyLevel = {}));
//# sourceMappingURL=stageInstance.js.map