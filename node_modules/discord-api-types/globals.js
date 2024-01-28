"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattingPatterns = void 0;
/**
 * https://discord.com/developers/docs/reference#message-formatting-formats
 */
exports.FormattingPatterns = {
    /**
     * Regular expression for matching a user mention, strictly without a nickname
     *
     * The `id` group property is present on the `exec` result of this expression
     */
    User: /<@(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a user mention, strictly with a nickname
     *
     * The `id` group property is present on the `exec` result of this expression
     *
     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
     */
    UserWithNickname: /<@!(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a user mention, with or without a nickname
     *
     * The `id` group property is present on the `exec` result of this expression
     *
     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
     */
    UserWithOptionalNickname: /<@!?(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a channel mention
     *
     * The `id` group property is present on the `exec` result of this expression
     */
    Channel: /<#(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a role mention
     *
     * The `id` group property is present on the `exec` result of this expression
     */
    Role: /<@&(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a application command mention
     *
     * The `fullName` (possibly including `name`, `subcommandOrGroup` and `subcommand`) and `id` group properties are present on the `exec` result of this expression
     */
    SlashCommand: 
    // eslint-disable-next-line unicorn/no-unsafe-regex
    /<\/(?<fullName>(?<name>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32})(?: (?<subcommandOrGroup>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?(?: (?<subcommand>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?):(?<id>\d{17,20})>/u,
    /**
     * Regular expression for matching a custom emoji, either static or animated
     *
     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
     */
    Emoji: /<(?<animated>a)?:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching strictly an animated custom emoji
     *
     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
     */
    AnimatedEmoji: /<(?<animated>a):(?<name>\w{2,32}):(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching strictly a static custom emoji
     *
     * The `name` and `id` group properties are present on the `exec` result of this expression
     */
    StaticEmoji: /<:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
    /**
     * Regular expression for matching a timestamp, either default or custom styled
     *
     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
     */
    // eslint-disable-next-line prefer-named-capture-group
    Timestamp: /<t:(?<timestamp>-?\d{1,13})(:(?<style>[DFRTdft]))?>/,
    /**
     * Regular expression for matching strictly default styled timestamps
     *
     * The `timestamp` group property is present on the `exec` result of this expression
     */
    DefaultStyledTimestamp: /<t:(?<timestamp>-?\d{1,13})>/,
    /**
     * Regular expression for matching strictly custom styled timestamps
     *
     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
     */
    StyledTimestamp: /<t:(?<timestamp>-?\d{1,13}):(?<style>[DFRTdft])>/,
};
/**
 * Freezes the formatting patterns
 *
 * @internal
 */
Object.freeze(exports.FormattingPatterns);
//# sourceMappingURL=globals.js.map