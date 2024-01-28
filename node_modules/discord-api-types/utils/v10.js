"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContextMenuApplicationCommandInteraction = exports.isChatInputApplicationCommandInteraction = exports.isMessageComponentSelectMenuInteraction = exports.isMessageComponentButtonInteraction = exports.isMessageComponentInteraction = exports.isInteractionButton = exports.isLinkButton = exports.isMessageComponentGuildInteraction = exports.isMessageComponentDMInteraction = exports.isApplicationCommandGuildInteraction = exports.isApplicationCommandDMInteraction = exports.isGuildInteraction = exports.isDMInteraction = void 0;
const index_1 = require("../payloads/v10/index");
// Interactions
/**
 * A type-guard check for DM interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction was received in a DM channel
 */
function isDMInteraction(interaction) {
    return Reflect.has(interaction, 'user');
}
exports.isDMInteraction = isDMInteraction;
/**
 * A type-guard check for guild interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction was received in a guild
 */
function isGuildInteraction(interaction) {
    return Reflect.has(interaction, 'guild_id');
}
exports.isGuildInteraction = isGuildInteraction;
// ApplicationCommandInteractions
/**
 * A type-guard check for DM application command interactions
 *
 * @param interaction The application command interaction to check against
 * @returns A boolean that indicates if the application command interaction was received in a DM channel
 */
function isApplicationCommandDMInteraction(interaction) {
    return isDMInteraction(interaction);
}
exports.isApplicationCommandDMInteraction = isApplicationCommandDMInteraction;
/**
 * A type-guard check for guild application command interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the application command interaction was received in a guild
 */
function isApplicationCommandGuildInteraction(interaction) {
    return isGuildInteraction(interaction);
}
exports.isApplicationCommandGuildInteraction = isApplicationCommandGuildInteraction;
// MessageComponentInteractions
/**
 * A type-guard check for DM message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component interaction was received in a DM channel
 */
function isMessageComponentDMInteraction(interaction) {
    return isDMInteraction(interaction);
}
exports.isMessageComponentDMInteraction = isMessageComponentDMInteraction;
/**
 * A type-guard check for guild message component interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the message component interaction was received in a guild
 */
function isMessageComponentGuildInteraction(interaction) {
    return isGuildInteraction(interaction);
}
exports.isMessageComponentGuildInteraction = isMessageComponentGuildInteraction;
// Buttons
/**
 * A type-guard check for buttons that have a `url` attached to them.
 *
 * @param component The button to check against
 * @returns A boolean that indicates if the button has a `url` attached to it
 */
function isLinkButton(component) {
    return component.style === index_1.ButtonStyle.Link;
}
exports.isLinkButton = isLinkButton;
/**
 * A type-guard check for buttons that have a `custom_id` attached to them.
 *
 * @param component The button to check against
 * @returns A boolean that indicates if the button has a `custom_id` attached to it
 */
function isInteractionButton(component) {
    return component.style !== index_1.ButtonStyle.Link;
}
exports.isInteractionButton = isInteractionButton;
// Message Components
/**
 * A type-guard check for message component interactions
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a message component
 */
function isMessageComponentInteraction(interaction) {
    return interaction.type === index_1.InteractionType.MessageComponent;
}
exports.isMessageComponentInteraction = isMessageComponentInteraction;
/**
 * A type-guard check for button message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component is a button
 */
function isMessageComponentButtonInteraction(interaction) {
    return interaction.data.component_type === index_1.ComponentType.Button;
}
exports.isMessageComponentButtonInteraction = isMessageComponentButtonInteraction;
/**
 * A type-guard check for select menu message component interactions
 *
 * @param interaction The message component interaction to check against
 * @returns A boolean that indicates if the message component is a select menu
 */
function isMessageComponentSelectMenuInteraction(interaction) {
    return [
        index_1.ComponentType.StringSelect,
        index_1.ComponentType.UserSelect,
        index_1.ComponentType.RoleSelect,
        index_1.ComponentType.MentionableSelect,
        index_1.ComponentType.ChannelSelect,
    ].includes(interaction.data.component_type);
}
exports.isMessageComponentSelectMenuInteraction = isMessageComponentSelectMenuInteraction;
// Application Commands
/**
 * A type-guard check for chat input application commands.
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a chat input application command
 */
function isChatInputApplicationCommandInteraction(interaction) {
    return interaction.data.type === index_1.ApplicationCommandType.ChatInput;
}
exports.isChatInputApplicationCommandInteraction = isChatInputApplicationCommandInteraction;
/**
 * A type-guard check for context menu application commands.
 *
 * @param interaction The interaction to check against
 * @returns A boolean that indicates if the interaction is a context menu application command
 */
function isContextMenuApplicationCommandInteraction(interaction) {
    return (interaction.data.type === index_1.ApplicationCommandType.Message || interaction.data.type === index_1.ApplicationCommandType.User);
}
exports.isContextMenuApplicationCommandInteraction = isContextMenuApplicationCommandInteraction;
//# sourceMappingURL=v10.js.map