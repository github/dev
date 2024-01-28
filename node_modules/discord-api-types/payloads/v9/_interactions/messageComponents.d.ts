import type { Snowflake } from '../../../globals';
import type { ComponentType } from '../channel';
import type { APIBaseInteraction, InteractionType } from '../interactions';
import type { APIDMInteractionWrapper, APIGuildInteractionWrapper, APIInteractionDataResolved, APIUserInteractionDataResolved } from './base';
export type APIMessageComponentInteraction = APIBaseInteraction<InteractionType.MessageComponent, APIMessageComponentInteractionData> & Required<Pick<APIBaseInteraction<InteractionType.MessageComponent, APIMessageComponentInteractionData>, 'channel' | 'channel_id' | 'data' | 'app_permissions' | 'message'>>;
export type APIMessageComponentButtonInteraction = APIBaseInteraction<InteractionType.MessageComponent, APIMessageButtonInteractionData> & Required<Pick<APIBaseInteraction<InteractionType.MessageComponent, APIMessageButtonInteractionData>, 'channel' | 'channel_id' | 'data' | 'app_permissions' | 'message'>>;
export type APIMessageComponentSelectMenuInteraction = APIBaseInteraction<InteractionType.MessageComponent, APIMessageSelectMenuInteractionData> & Required<Pick<APIBaseInteraction<InteractionType.MessageComponent, APIMessageSelectMenuInteractionData>, 'channel' | 'channel_id' | 'data' | 'app_permissions' | 'message'>>;
export type APIMessageComponentInteractionData = APIMessageButtonInteractionData | APIMessageSelectMenuInteractionData;
export interface APIMessageComponentBaseInteractionData<CType extends ComponentType> {
    /**
     * The `custom_id` of the component
     */
    custom_id: string;
    /**
     * The type of the component
     */
    component_type: CType;
}
export type APIMessageButtonInteractionData = APIMessageComponentBaseInteractionData<ComponentType.Button>;
export interface APIMessageStringSelectInteractionData extends APIMessageComponentBaseInteractionData<ComponentType.StringSelect> {
    values: string[];
}
export interface APIMessageUserSelectInteractionData extends APIMessageComponentBaseInteractionData<ComponentType.UserSelect> {
    values: Snowflake[];
    resolved: APIUserInteractionDataResolved;
}
export interface APIMessageRoleSelectInteractionData extends APIMessageComponentBaseInteractionData<ComponentType.RoleSelect> {
    values: Snowflake[];
    resolved: Required<Pick<APIInteractionDataResolved, 'roles'>>;
}
export interface APIMessageMentionableSelectInteractionData extends APIMessageComponentBaseInteractionData<ComponentType.MentionableSelect> {
    values: Snowflake[];
    resolved: Pick<APIInteractionDataResolved, 'users' | 'members' | 'roles'>;
}
export interface APIMessageChannelSelectInteractionData extends APIMessageComponentBaseInteractionData<ComponentType.ChannelSelect> {
    values: Snowflake[];
    resolved: Required<Pick<APIInteractionDataResolved, 'channels'>>;
}
export type APIMessageSelectMenuInteractionData = APIMessageStringSelectInteractionData | APIMessageUserSelectInteractionData | APIMessageRoleSelectInteractionData | APIMessageMentionableSelectInteractionData | APIMessageChannelSelectInteractionData;
export type APIMessageComponentDMInteraction = APIDMInteractionWrapper<APIMessageComponentInteraction>;
export type APIMessageComponentGuildInteraction = APIGuildInteractionWrapper<APIMessageComponentInteraction>;
//# sourceMappingURL=messageComponents.d.ts.map