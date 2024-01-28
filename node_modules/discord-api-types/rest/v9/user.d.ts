import type { Permissions, Snowflake } from '../../globals';
import type { APIChannel, APIConnection, APIGuildMember, APIUser, APIApplicationRoleConnection, GuildFeature } from '../../payloads/v9/index';
/**
 * https://discord.com/developers/docs/resources/user#get-current-user
 */
export type RESTGetAPICurrentUserResult = APIUser;
/**
 * https://discord.com/developers/docs/resources/user#get-user
 */
export type RESTGetAPIUserResult = APIUser;
/**
 * https://discord.com/developers/docs/resources/user#get-current-user-guild-member
 */
export type RESTGetCurrentUserGuildMemberResult = APIGuildMember;
/**
 * https://discord.com/developers/docs/resources/user#modify-current-user
 */
export interface RESTPatchAPICurrentUserJSONBody {
    /**
     * User's username, if changed may cause the user's discriminator to be randomized
     */
    username?: string | undefined;
    /**
     * If passed, modifies the user's avatar
     */
    avatar?: string | null | undefined;
}
/**
 * https://discord.com/developers/docs/resources/user#modify-current-user
 */
export type RESTPatchAPICurrentUserResult = APIUser;
/**
 * https://discord.com/developers/docs/resources/user#get-current-user-guilds
 */
export interface RESTGetAPICurrentUserGuildsQuery {
    /**
     * Get guilds before this guild ID
     */
    before?: Snowflake;
    /**
     * Get guilds after this guild ID
     */
    after?: Snowflake;
    /**
     * Max number of guilds to return (1-200)
     *
     * @default 200
     */
    limit?: number;
    /**
     * Include approximate member and presence counts in response
     *
     * @default false
     */
    with_counts?: boolean;
}
export interface RESTAPIPartialCurrentUserGuild {
    id: Snowflake;
    name: string;
    icon: string | null;
    owner: boolean;
    features: GuildFeature[];
    permissions: Permissions;
    approximate_member_count?: number;
    approximate_presence_count?: number;
}
/**
 * https://discord.com/developers/docs/resources/user#get-current-user-guilds
 */
export type RESTGetAPICurrentUserGuildsResult = RESTAPIPartialCurrentUserGuild[];
/**
 * https://discord.com/developers/docs/resources/user#leave-guild
 */
export type RESTDeleteAPICurrentUserGuildResult = never;
/**
 * https://discord.com/developers/docs/resources/user#create-dm
 */
export interface RESTPostAPICurrentUserCreateDMChannelJSONBody {
    /**
     * The recipient to open a DM channel with
     */
    recipient_id: string;
}
/**
 * https://discord.com/developers/docs/resources/user#create-dm
 */
export type RESTPostAPICurrentUserCreateDMChannelResult = APIChannel;
/**
 * https://discord.com/developers/docs/resources/user#get-user-connections
 */
export type RESTGetAPICurrentUserConnectionsResult = APIConnection[];
/**
 * https://discord.com/developers/docs/resources/user#get-user-application-role-connection
 */
export type RESTGetAPICurrentUserApplicationRoleConnectionResult = APIApplicationRoleConnection;
/**
 * https://discord.com/developers/docs/resources/user#update-user-application-role-connection
 */
export interface RESTPutAPICurrentUserApplicationRoleConnectionJSONBody {
    /**
     * The vanity name of the platform a bot has connected (max 50 characters)
     */
    platform_name?: string | undefined;
    /**
     * The username on the platform a bot has connected (max 100 characters)
     */
    platform_username?: string | undefined;
    /**
     * Object mapping application role connection metadata keys to their `string`-ified value (max 100 characters) for the user on the platform a bot has connected
     */
    metadata?: Record<string, string | number> | undefined;
}
/**
 * https://discord.com/developers/docs/resources/user#update-user-application-role-connection
 */
export type RESTPutAPICurrentUserApplicationRoleConnectionResult = APIApplicationRoleConnection;
//# sourceMappingURL=user.d.ts.map