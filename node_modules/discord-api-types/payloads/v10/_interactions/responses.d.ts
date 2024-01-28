import type { RESTPostAPIWebhookWithTokenJSONBody } from '../../../v10';
import type { APIActionRowComponent, APIModalActionRowComponent } from '../channel';
import type { MessageFlags } from '../index';
import type { APIApplicationCommandOptionChoice } from './applicationCommands';
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type
 */
export declare enum InteractionType {
    Ping = 1,
    ApplicationCommand = 2,
    MessageComponent = 3,
    ApplicationCommandAutocomplete = 4,
    ModalSubmit = 5
}
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object
 */
export type APIInteractionResponse = APIInteractionResponsePong | APIInteractionResponseChannelMessageWithSource | APIInteractionResponseDeferredChannelMessageWithSource | APIInteractionResponseDeferredMessageUpdate | APIInteractionResponseUpdateMessage | APIApplicationCommandAutocompleteResponse | APIModalInteractionResponse | APIPremiumRequiredInteractionResponse;
export interface APIInteractionResponsePong {
    type: InteractionResponseType.Pong;
}
export interface APIApplicationCommandAutocompleteResponse {
    type: InteractionResponseType.ApplicationCommandAutocompleteResult;
    data: APICommandAutocompleteInteractionResponseCallbackData;
}
export interface APIModalInteractionResponse {
    type: InteractionResponseType.Modal;
    data: APIModalInteractionResponseCallbackData;
}
export interface APIPremiumRequiredInteractionResponse {
    type: InteractionResponseType.PremiumRequired;
}
export interface APIInteractionResponseChannelMessageWithSource {
    type: InteractionResponseType.ChannelMessageWithSource;
    data: APIInteractionResponseCallbackData;
}
export interface APIInteractionResponseDeferredChannelMessageWithSource {
    type: InteractionResponseType.DeferredChannelMessageWithSource;
    data?: Pick<APIInteractionResponseCallbackData, 'flags'>;
}
export interface APIInteractionResponseDeferredMessageUpdate {
    type: InteractionResponseType.DeferredMessageUpdate;
}
export interface APIInteractionResponseUpdateMessage {
    type: InteractionResponseType.UpdateMessage;
    data?: APIInteractionResponseCallbackData;
}
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
 */
export declare enum InteractionResponseType {
    /**
     * ACK a `Ping`
     */
    Pong = 1,
    /**
     * Respond to an interaction with a message
     */
    ChannelMessageWithSource = 4,
    /**
     * ACK an interaction and edit to a response later, the user sees a loading state
     */
    DeferredChannelMessageWithSource = 5,
    /**
     * ACK a button interaction and update it to a loading state
     */
    DeferredMessageUpdate = 6,
    /**
     * ACK a button interaction and edit the message to which the button was attached
     */
    UpdateMessage = 7,
    /**
     * For autocomplete interactions
     */
    ApplicationCommandAutocompleteResult = 8,
    /**
     * Respond to an interaction with an modal for a user to fill-out
     */
    Modal = 9,
    /**
     * Respond to an interaction with an upgrade button, only available for apps with monetization enabled
     */
    PremiumRequired = 10
}
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure
 */
export type APIInteractionResponseCallbackData = Omit<RESTPostAPIWebhookWithTokenJSONBody, 'username' | 'avatar_url'> & {
    flags?: MessageFlags;
};
export interface APICommandAutocompleteInteractionResponseCallbackData {
    choices?: APIApplicationCommandOptionChoice[];
}
/**
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-modal
 */
export interface APIModalInteractionResponseCallbackData {
    /**
     * A developer-defined identifier for the component, max 100 characters
     */
    custom_id: string;
    /**
     * The title of the popup modal
     */
    title: string;
    /**
     * Between 1 and 5 (inclusive) components that make up the modal
     */
    components: APIActionRowComponent<APIModalActionRowComponent>[];
}
//# sourceMappingURL=responses.d.ts.map