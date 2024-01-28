"use strict";
/**
 * Types extracted from https://discord.com/developers/docs/topics/teams
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberRole = exports.TeamMemberMembershipState = void 0;
/**
 * https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum
 */
var TeamMemberMembershipState;
(function (TeamMemberMembershipState) {
    TeamMemberMembershipState[TeamMemberMembershipState["Invited"] = 1] = "Invited";
    TeamMemberMembershipState[TeamMemberMembershipState["Accepted"] = 2] = "Accepted";
})(TeamMemberMembershipState = exports.TeamMemberMembershipState || (exports.TeamMemberMembershipState = {}));
/**
 * https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types
 */
var TeamMemberRole;
(function (TeamMemberRole) {
    TeamMemberRole["Admin"] = "admin";
    TeamMemberRole["Developer"] = "developer";
    TeamMemberRole["ReadOnly"] = "read_only";
})(TeamMemberRole = exports.TeamMemberRole || (exports.TeamMemberRole = {}));
//# sourceMappingURL=teams.js.map