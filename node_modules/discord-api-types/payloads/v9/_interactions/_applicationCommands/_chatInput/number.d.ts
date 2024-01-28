import type { APIApplicationCommandOptionBase, APIApplicationCommandOptionWithAutocompleteOrChoicesWrapper, APIInteractionDataOptionBase } from './base';
import type { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from './shared';
interface APIApplicationCommandNumberOptionBase extends APIApplicationCommandOptionBase<ApplicationCommandOptionType.Number> {
    /**
     * If the option is an `INTEGER` or `NUMBER` type, the minimum value permitted.
     */
    min_value?: number;
    /**
     * If the option is an `INTEGER` or `NUMBER` type, the maximum value permitted.
     */
    max_value?: number;
}
export type APIApplicationCommandNumberOption = APIApplicationCommandOptionWithAutocompleteOrChoicesWrapper<APIApplicationCommandNumberOptionBase, APIApplicationCommandOptionChoice<number>>;
export interface APIApplicationCommandInteractionDataNumberOption extends APIInteractionDataOptionBase<ApplicationCommandOptionType.Number, number> {
    focused?: boolean;
}
export {};
//# sourceMappingURL=number.d.ts.map