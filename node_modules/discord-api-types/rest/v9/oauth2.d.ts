import type { Permissions, Snowflake } from '../../globals';
import type { APIApplication, APIGuild, APIUser, APIWebhook, OAuth2Scopes } from '../../payloads/v9/index';
/**
 * https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information
 */
export type RESTGetAPIOAuth2CurrentApplicationResult = Omit<APIApplication, 'flags'>;
/**
 * https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information
 */
export interface RESTGetAPIOAuth2CurrentAuthorizationResult {
    /**
     * the current application
     */
    application: Partial<APIApplication>;
    /**
     * the scopes the user has authorized the application for
     */
    scopes: OAuth2Scopes[];
    /**
     * when the access token expires
     */
    expires: string;
    /**
     * the user who has authorized, if the user has authorized with the `identify` scope
     */
    user?: APIUser;
}
/**
 * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant
 */
export interface RESTOAuth2AuthorizationQuery {
    response_type: 'code';
    client_id: Snowflake;
    scope: string;
    redirect_uri?: string;
    state?: string;
    prompt?: 'consent' | 'none';
}
/**
 * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-redirect-url-example
 */
export interface RESTOAuth2AuthorizationQueryResult {
    code: string;
    state?: string;
}
/**
 * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-redirect-url-example
 */
export interface RESTPostOAuth2AccessTokenURLEncodedData {
    client_id: Snowflake;
    client_secret: string;
    grant_type: 'authorization_code';
    code: string;
    redirect_uri?: string;
}
/**
 * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response
 */
export interface RESTPostOAuth2AccessTokenResult {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}
/**
 * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example
 */
export interface RESTPostOAuth2RefreshTokenURLEncodedData {
    client_id: Snowflake;
    client_secret: string;
    grant_type: 'refresh_token';
    refresh_token: string;
}
export type RESTPostOAuth2RefreshTokenResult = RESTPostOAuth2AccessTokenResult;
/**
 * https://discord.com/developers/docs/topics/oauth2#implicit-grant
 */
export interface RESTOAuth2ImplicitAuthorizationQuery {
    response_type: 'token';
    client_id: Snowflake;
    scope: string;
    redirect_uri?: string;
    state?: string;
    prompt?: 'consent' | 'none';
}
/**
 * https://discord.com/developers/docs/topics/oauth2#implicit-grant-redirect-url-example
 */
export type RESTOAuth2ImplicitAuthorizationURLFragmentResult = Omit<RESTPostOAuth2AccessTokenResult, 'refresh_token'>;
/**
 * https://discord.com/developers/docs/topics/oauth2#client-credentials-grant
 */
export interface RESTPostOAuth2ClientCredentialsURLEncodedData {
    grant_type: 'client_credentials';
    scope: string;
}
export type RESTPostOAuth2ClientCredentialsResult = RESTOAuth2ImplicitAuthorizationURLFragmentResult;
/**
 * https://discord.com/developers/docs/topics/oauth2#bot-authorization-flow-bot-auth-parameters
 */
export interface RESTOAuth2BotAuthorizationQuery {
    /**
     * Your app's client id
     */
    client_id: Snowflake;
    /**
     * Needs to include bot for the bot flow
     */
    scope: OAuth2Scopes.Bot | `${string}${' ' | '%20'}${OAuth2Scopes.Bot}` | `${OAuth2Scopes.Bot}${' ' | '%20'}${string}` | `${string}${' ' | '%20'}${OAuth2Scopes.Bot}${string}${' ' | '%20'}`;
    /**
     * The permissions you're requesting
     *
     * See https://discord.com/developers/docs/topics/permissions
     */
    permissions?: Permissions;
    /**
     * Pre-fills the dropdown picker with a guild for the user
     */
    guild_id?: Snowflake;
    /**
     * `true` or `false`—disallows the user from changing the guild dropdown
     */
    disable_guild_select?: boolean;
}
/**
 * https://discord.com/developers/docs/topics/oauth2#advanced-bot-authorization
 */
export interface RESTOAuth2AdvancedBotAuthorizationQuery {
    client_id: Snowflake;
    /**
     * This assumes you include the `bot` scope alongside others (like `identify` for example)
     */
    scope: OAuth2Scopes.Bot | `${string}${' ' | '%20'}${OAuth2Scopes.Bot}` | `${OAuth2Scopes.Bot}${' ' | '%20'}${string}` | `${string}${' ' | '%20'}${OAuth2Scopes.Bot}${string}${' ' | '%20'}`;
    /**
     * The required permissions bitfield, stringified
     */
    permissions?: Permissions;
    guild_id?: Snowflake;
    disable_guild_select?: boolean;
    response_type: string;
    redirect_uri?: string;
}
export interface RESTOAuth2AdvancedBotAuthorizationQueryResult {
    code: string;
    state?: string;
    guild_id: Snowflake;
    permissions: Permissions;
}
/**
 * https://discord.com/developers/docs/topics/oauth2#advanced-bot-authorization-extended-bot-authorization-access-token-example
 */
export interface RESTPostOAuth2AccessTokenWithBotAndGuildsScopeResult {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    guild: APIGuild;
}
/**
 * https://discord.com/developers/docs/topics/oauth2#webhooks-webhook-token-response-example
 */
export interface RESTPostOAuth2AccessTokenWithBotAndWebhookIncomingScopeResult {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    webhook: APIWebhook;
}
export type RESTPostOAuth2AccessTokenWithBotAndGuildsAndWebhookIncomingScopeResult = RESTPostOAuth2AccessTokenWithBotAndGuildsScopeResult & RESTPostOAuth2AccessTokenWithBotAndWebhookIncomingScopeResult;
//# sourceMappingURL=oauth2.d.ts.map