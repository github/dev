import type { APIApplicationCommand, APIApplicationCommandPermission, APIGuildApplicationCommandPermissions, APIInteractionResponse, APIInteractionResponseCallbackData, ApplicationCommandType } from '../../payloads/v9/index';
import type { AddUndefinedToPossiblyUndefinedPropertiesOfInterface, StrictPartial } from '../../utils/internals';
import type { RESTDeleteAPIWebhookWithTokenMessageResult, RESTGetAPIWebhookWithTokenMessageResult, RESTPatchAPIWebhookWithTokenMessageFormDataBody, RESTPatchAPIWebhookWithTokenMessageJSONBody, RESTPatchAPIWebhookWithTokenMessageResult, RESTPostAPIWebhookWithTokenWaitResult } from './webhook';
/**
 * https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands
 */
export interface RESTGetAPIApplicationCommandsQuery {
    /**
     * Whether to include full localization dictionaries (name_localizations and description_localizations)
     * in the returned objects, instead of the name_localized and description_localized fields.
     *
     * @default false
     */
    with_localizations?: boolean;
}
/**
 * https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands
 */
export type RESTGetAPIApplicationCommandsResult = APIApplicationCommand[];
/**
 * https://discord.com/developers/docs/interactions/application-commands#get-global-application-command
 */
export type RESTGetAPIApplicationCommandResult = APIApplicationCommand;
type RESTPostAPIBaseApplicationCommandsJSONBody = AddUndefinedToPossiblyUndefinedPropertiesOfInterface<Omit<APIApplicationCommand, 'id' | 'application_id' | 'description' | 'type' | 'version' | 'guild_id' | 'name_localized' | 'description_localized' | 'default_member_permissions'> & Partial<Pick<APIApplicationCommand, 'default_member_permissions'>>>;
/**
 * https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
 */
export interface RESTPostAPIChatInputApplicationCommandsJSONBody extends RESTPostAPIBaseApplicationCommandsJSONBody {
    type?: ApplicationCommandType.ChatInput | undefined;
    description: string;
}
/**
 * https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
 */
export interface RESTPostAPIContextMenuApplicationCommandsJSONBody extends RESTPostAPIBaseApplicationCommandsJSONBody {
    type: ApplicationCommandType.User | ApplicationCommandType.Message;
}
/**
 * https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
 */
export type RESTPostAPIApplicationCommandsJSONBody = RESTPostAPIChatInputApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody;
/**
 * https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
 */
export type RESTPostAPIApplicationCommandsResult = APIApplicationCommand;
/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command
 */
export type RESTPatchAPIApplicationCommandJSONBody = StrictPartial<RESTPostAPIApplicationCommandsJSONBody>;
/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command
 */
export type RESTPatchAPIApplicationCommandResult = APIApplicationCommand;
/**
 * https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
 */
export type RESTPutAPIApplicationCommandsJSONBody = RESTPostAPIApplicationCommandsJSONBody[];
/**
 * https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
 */
export type RESTPutAPIApplicationCommandsResult = APIApplicationCommand[];
/**
 * https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands
 */
export type RESTGetAPIApplicationGuildCommandsQuery = RESTGetAPIApplicationCommandsQuery;
/**
 * https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands
 */
export type RESTGetAPIApplicationGuildCommandsResult = Omit<APIApplicationCommand, 'dm_permission'>[];
/**
 * https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands
 */
export type RESTGetAPIApplicationGuildCommandResult = Omit<APIApplicationCommand, 'dm_permission'>;
/**
 * https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command
 */
export type RESTPostAPIApplicationGuildCommandsJSONBody = Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'dm_permission'> | Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'dm_permission'>;
/**
 * https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command
 */
export type RESTPostAPIApplicationGuildCommandsResult = Omit<APIApplicationCommand, 'dm_permission'>;
/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command
 */
export type RESTPatchAPIApplicationGuildCommandJSONBody = StrictPartial<Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'dm_permission'> | Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'dm_permission'>>;
/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command
 */
export type RESTPatchAPIApplicationGuildCommandResult = Omit<APIApplicationCommand, 'dm_permission'>;
/**
 * https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands
 */
export type RESTPutAPIApplicationGuildCommandsJSONBody = ((Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'dm_permission'> & Pick<Partial<APIApplicationCommand>, 'id'>) | (Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'dm_permission'> & Pick<Partial<APIApplicationCommand>, 'id'>))[];
/**
 * https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands
 */
export type RESTPutAPIApplicationGuildCommandsResult = Omit<APIApplicationCommand, 'dm_permission'>[];
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response
 */
export type RESTPostAPIInteractionCallbackJSONBody = APIInteractionResponse;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response
 */
export type RESTPostAPIInteractionCallbackFormDataBody = ({
    /**
     * JSON stringified message body
     */
    payload_json?: string | undefined;
} & Record<`files[${bigint}]`, unknown>) | (RESTPostAPIInteractionCallbackJSONBody & Record<`files[${bigint}]`, unknown>);
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response
 */
export type RESTGetAPIInteractionOriginalResponseResult = RESTGetAPIWebhookWithTokenMessageResult;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
 */
export type RESTPatchAPIInteractionOriginalResponseJSONBody = RESTPatchAPIWebhookWithTokenMessageJSONBody;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
 */
export type RESTPatchAPIInteractionOriginalResponseFormDataBody = RESTPatchAPIWebhookWithTokenMessageFormDataBody;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
 */
export type RESTPatchAPIInteractionOriginalResponseResult = RESTPatchAPIWebhookWithTokenMessageResult;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response
 */
export type RESTDeleteAPIInteractionOriginalResponseResult = RESTDeleteAPIWebhookWithTokenMessageResult;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
 */
export type RESTPostAPIInteractionFollowupJSONBody = APIInteractionResponseCallbackData;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
 */
export type RESTPostAPIInteractionFollowupFormDataBody = ({
    /**
     * JSON stringified message body
     */
    payload_json?: string | undefined;
} & Record<`files[${bigint}]`, unknown>) | (RESTPostAPIInteractionFollowupJSONBody & Record<`files[${bigint}]`, unknown>);
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
 */
export type RESTPostAPIInteractionFollowupResult = RESTPostAPIWebhookWithTokenWaitResult;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message
 */
export type RESTGetAPIInteractionFollowupResult = RESTGetAPIWebhookWithTokenMessageResult;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
 */
export type RESTPatchAPIInteractionFollowupJSONBody = RESTPatchAPIWebhookWithTokenMessageJSONBody;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
 */
export type RESTPatchAPIInteractionFollowupFormDataBody = RESTPatchAPIWebhookWithTokenMessageFormDataBody;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
 */
export type RESTPatchAPIInteractionFollowupResult = RESTPatchAPIWebhookWithTokenMessageResult;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message
 */
export type RESTDeleteAPIInteractionFollowupResult = RESTDeleteAPIWebhookWithTokenMessageResult;
/**
 * https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions
 */
export type RESTGetAPIGuildApplicationCommandsPermissionsResult = APIGuildApplicationCommandPermissions[];
/**
 * https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions
 */
export type RESTGetAPIApplicationCommandPermissionsResult = APIGuildApplicationCommandPermissions;
/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions
 */
export interface RESTPutAPIApplicationCommandPermissionsJSONBody {
    permissions: APIApplicationCommandPermission[];
}
/**
 * https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions
 */
export type RESTPutAPIApplicationCommandPermissionsResult = APIGuildApplicationCommandPermissions;
/**
 * https://discord.com/developers/docs/interactions/application-commands#batch-edit-application-command-permissions
 */
export type RESTPutAPIGuildApplicationCommandsPermissionsJSONBody = Pick<APIGuildApplicationCommandPermissions, 'id' | 'permissions'>[];
/**
 * https://discord.com/developers/docs/interactions/application-commands#batch-edit-application-command-permissions
 */
export type RESTPutAPIGuildApplicationCommandsPermissionsResult = APIGuildApplicationCommandPermissions[];
export {};
//# sourceMappingURL=interactions.d.ts.map