"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIApplicationCommandPermissionsConstant = exports.ApplicationCommandPermissionType = void 0;
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type
 */
var ApplicationCommandPermissionType;
(function (ApplicationCommandPermissionType) {
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Role"] = 1] = "Role";
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["User"] = 2] = "User";
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Channel"] = 3] = "Channel";
})(ApplicationCommandPermissionType = exports.ApplicationCommandPermissionType || (exports.ApplicationCommandPermissionType = {}));
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-constants
 */
exports.APIApplicationCommandPermissionsConstant = {
    // eslint-disable-next-line unicorn/prefer-native-coercion-functions
    Everyone: (guildId) => String(guildId),
    AllChannels: (guildId) => String(BigInt(guildId) - 1n),
};
//# sourceMappingURL=permissions.js.map