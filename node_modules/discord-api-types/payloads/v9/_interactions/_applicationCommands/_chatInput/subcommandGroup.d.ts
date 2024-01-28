import type { APIApplicationCommandOptionBase } from './base';
import type { ApplicationCommandOptionType } from './shared';
import type { APIApplicationCommandInteractionDataSubcommandOption, APIApplicationCommandSubcommandOption } from './subcommand';
export interface APIApplicationCommandSubcommandGroupOption extends APIApplicationCommandOptionBase<ApplicationCommandOptionType.SubcommandGroup> {
    options?: APIApplicationCommandSubcommandOption[];
}
export interface APIApplicationCommandInteractionDataSubcommandGroupOption {
    name: string;
    type: ApplicationCommandOptionType.SubcommandGroup;
    options: APIApplicationCommandInteractionDataSubcommandOption[];
}
//# sourceMappingURL=subcommandGroup.d.ts.map