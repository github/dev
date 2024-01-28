import type { APIApplicationCommandBasicOption, APIApplicationCommandInteractionDataBasicOption } from '../chatInput';
import type { APIApplicationCommandOptionBase } from './base';
import type { ApplicationCommandOptionType } from './shared';
export interface APIApplicationCommandSubcommandOption extends APIApplicationCommandOptionBase<ApplicationCommandOptionType.Subcommand> {
    options?: APIApplicationCommandBasicOption[];
}
export interface APIApplicationCommandInteractionDataSubcommandOption {
    name: string;
    type: ApplicationCommandOptionType.Subcommand;
    options?: APIApplicationCommandInteractionDataBasicOption[];
}
//# sourceMappingURL=subcommand.d.ts.map