import type { APIInteractionDataResolved } from '../../index';
import type { APIApplicationCommandInteractionWrapper, ApplicationCommandType } from '../applicationCommands';
import type { APIDMInteractionWrapper, APIGuildInteractionWrapper } from '../base';
import type { APIApplicationCommandAttachmentOption, APIApplicationCommandInteractionDataAttachmentOption } from './_chatInput/attachment';
import type { APIApplicationCommandBooleanOption, APIApplicationCommandInteractionDataBooleanOption } from './_chatInput/boolean';
import type { APIApplicationCommandChannelOption, APIApplicationCommandInteractionDataChannelOption } from './_chatInput/channel';
import type { APIApplicationCommandIntegerOption, APIApplicationCommandInteractionDataIntegerOption } from './_chatInput/integer';
import type { APIApplicationCommandInteractionDataMentionableOption, APIApplicationCommandMentionableOption } from './_chatInput/mentionable';
import type { APIApplicationCommandInteractionDataNumberOption, APIApplicationCommandNumberOption } from './_chatInput/number';
import type { APIApplicationCommandInteractionDataRoleOption, APIApplicationCommandRoleOption } from './_chatInput/role';
import type { APIApplicationCommandInteractionDataStringOption, APIApplicationCommandStringOption } from './_chatInput/string';
import type { APIApplicationCommandInteractionDataSubcommandOption, APIApplicationCommandSubcommandOption } from './_chatInput/subcommand';
import type { APIApplicationCommandInteractionDataSubcommandGroupOption, APIApplicationCommandSubcommandGroupOption } from './_chatInput/subcommandGroup';
import type { APIApplicationCommandInteractionDataUserOption, APIApplicationCommandUserOption } from './_chatInput/user';
import type { APIBaseApplicationCommandInteractionData } from './internals';
export * from './_chatInput/attachment';
export * from './_chatInput/base';
export * from './_chatInput/boolean';
export * from './_chatInput/channel';
export * from './_chatInput/integer';
export * from './_chatInput/mentionable';
export * from './_chatInput/number';
export * from './_chatInput/role';
export * from './_chatInput/shared';
export * from './_chatInput/string';
export * from './_chatInput/subcommand';
export * from './_chatInput/subcommandGroup';
export * from './_chatInput/user';
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
 */
export type APIApplicationCommandBasicOption = APIApplicationCommandStringOption | APIApplicationCommandIntegerOption | APIApplicationCommandBooleanOption | APIApplicationCommandUserOption | APIApplicationCommandChannelOption | APIApplicationCommandRoleOption | APIApplicationCommandMentionableOption | APIApplicationCommandNumberOption | APIApplicationCommandAttachmentOption;
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
 */
export type APIApplicationCommandOption = APIApplicationCommandSubcommandOption | APIApplicationCommandSubcommandGroupOption | APIApplicationCommandBasicOption;
/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-interaction-data-option-structure
 */
export type APIApplicationCommandInteractionDataOption = APIApplicationCommandInteractionDataSubcommandOption | APIApplicationCommandInteractionDataSubcommandGroupOption | APIApplicationCommandInteractionDataBasicOption;
export type APIApplicationCommandInteractionDataBasicOption = APIApplicationCommandInteractionDataStringOption | APIApplicationCommandInteractionDataIntegerOption | APIApplicationCommandInteractionDataBooleanOption | APIApplicationCommandInteractionDataUserOption | APIApplicationCommandInteractionDataChannelOption | APIApplicationCommandInteractionDataRoleOption | APIApplicationCommandInteractionDataMentionableOption | APIApplicationCommandInteractionDataNumberOption | APIApplicationCommandInteractionDataAttachmentOption;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-data
 */
export interface APIChatInputApplicationCommandInteractionData extends APIBaseApplicationCommandInteractionData<ApplicationCommandType.ChatInput> {
    options?: APIApplicationCommandInteractionDataOption[];
    resolved?: APIInteractionDataResolved;
}
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
export type APIChatInputApplicationCommandInteraction = APIApplicationCommandInteractionWrapper<APIChatInputApplicationCommandInteractionData>;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
export type APIChatInputApplicationCommandDMInteraction = APIDMInteractionWrapper<APIChatInputApplicationCommandInteraction>;
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
export type APIChatInputApplicationCommandGuildInteraction = APIGuildInteractionWrapper<APIChatInputApplicationCommandInteraction>;
//# sourceMappingURL=chatInput.d.ts.map