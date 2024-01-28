import { URL } from 'node:url';
import { Snowflake } from 'discord-api-types/globals';

/**
 * The options that affect what will be escaped.
 */
interface EscapeMarkdownOptions {
    /**
     * Whether to escape bold text.
     *
     * @defaultValue `true`
     */
    bold?: boolean;
    /**
     * Whether to escape bulleted lists.
     *
     * @defaultValue `false`
     */
    bulletedList?: boolean;
    /**
     * Whether to escape code blocks.
     *
     * @defaultValue `true`
     */
    codeBlock?: boolean;
    /**
     * Whether to escape text inside code blocks.
     *
     * @defaultValue `true`
     */
    codeBlockContent?: boolean;
    /**
     * Whether to escape `\`.
     *
     * @defaultValue `true`
     */
    escape?: boolean;
    /**
     * Whether to escape headings.
     *
     * @defaultValue `false`
     */
    heading?: boolean;
    /**
     * Whether to escape inline code.
     *
     * @defaultValue `true`
     */
    inlineCode?: boolean;
    /**
     * Whether to escape text inside inline code.
     *
     * @defaultValue `true`
     */
    inlineCodeContent?: boolean;
    /**
     * Whether to escape italics.
     *
     * @defaultValue `true`
     */
    italic?: boolean;
    /**
     * Whether to escape masked links.
     *
     * @defaultValue `false`
     */
    maskedLink?: boolean;
    /**
     * Whether to escape numbered lists.
     *
     * @defaultValue `false`
     */
    numberedList?: boolean;
    /**
     * Whether to escape spoilers.
     *
     * @defaultValue `true`
     */
    spoiler?: boolean;
    /**
     * Whether to escape strikethroughs.
     *
     * @defaultValue `true`
     */
    strikethrough?: boolean;
    /**
     * Whether to escape underlines.
     *
     * @defaultValue `true`
     */
    underline?: boolean;
}
/**
 * Escapes any Discord-flavored markdown in a string.
 *
 * @param text - Content to escape
 * @param options - Options for escaping the markdown
 */
declare function escapeMarkdown(text: string, options?: EscapeMarkdownOptions): string;
/**
 * Escapes code block markdown in a string.
 *
 * @param text - Content to escape
 */
declare function escapeCodeBlock(text: string): string;
/**
 * Escapes inline code markdown in a string.
 *
 * @param text - Content to escape
 */
declare function escapeInlineCode(text: string): string;
/**
 * Escapes italic markdown in a string.
 *
 * @param text - Content to escape
 */
declare function escapeItalic(text: string): string;
/**
 * Escapes bold markdown in a string.
 *
 * @param text - Content to escape
 */
declare function escapeBold(text: string): string;
/**
 * Escapes underline markdown in a string.
 *
 * @param text - Content to escape
 */
declare function escapeUnderline(text: string): string;
/**
 * Escapes strikethrough markdown in a string.
 *
 * @param text - Content to escape
 */
declare function escapeStrikethrough(text: string): string;
/**
 * Escapes spoiler markdown in a string.
 *
 * @param text - Content to escape
 */
declare function escapeSpoiler(text: string): string;
/**
 * Escapes escape characters in a string.
 *
 * @param text - Content to escape
 */
declare function escapeEscape(text: string): string;
/**
 * Escapes heading characters in a string.
 *
 * @param text - Content to escape
 */
declare function escapeHeading(text: string): string;
/**
 * Escapes bulleted list characters in a string.
 *
 * @param text - Content to escape
 */
declare function escapeBulletedList(text: string): string;
/**
 * Escapes numbered list characters in a string.
 *
 * @param text - Content to escape
 */
declare function escapeNumberedList(text: string): string;
/**
 * Escapes masked link characters in a string.
 *
 * @param text - Content to escape
 */
declare function escapeMaskedLink(text: string): string;

/**
 * Wraps the content inside a code block with no language.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
declare function codeBlock<Content extends string>(content: Content): `\`\`\`\n${Content}\n\`\`\``;
/**
 * Wraps the content inside a code block with the specified language.
 *
 * @typeParam Language - This is inferred by the supplied language
 * @typeParam Content - This is inferred by the supplied content
 * @param language - The language for the code block
 * @param content - The content to wrap
 */
declare function codeBlock<Language extends string, Content extends string>(language: Language, content: Content): `\`\`\`${Language}\n${Content}\n\`\`\``;
/**
 * Wraps the content inside \`backticks\` which formats it as inline code.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
declare function inlineCode<Content extends string>(content: Content): `\`${Content}\``;
/**
 * Formats the content into italic text.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
declare function italic<Content extends string>(content: Content): `_${Content}_`;
/**
 * Formats the content into bold text.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
declare function bold<Content extends string>(content: Content): `**${Content}**`;
/**
 * Formats the content into underscored text.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
declare function underscore<Content extends string>(content: Content): `__${Content}__`;
/**
 * Formats the content into strike-through text.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
declare function strikethrough<Content extends string>(content: Content): `~~${Content}~~`;
/**
 * Formats the content into a quote.
 *
 * @remarks This needs to be at the start of the line for Discord to format it.
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
declare function quote<Content extends string>(content: Content): `> ${Content}`;
/**
 * Formats the content into a block quote.
 *
 * @remarks This needs to be at the start of the line for Discord to format it.
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
declare function blockQuote<Content extends string>(content: Content): `>>> ${Content}`;
/**
 * Wraps the URL into `<>` which stops it from embedding.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param url - The URL to wrap
 */
declare function hideLinkEmbed<Content extends string>(url: Content): `<${Content}>`;
/**
 * Wraps the URL into `<>` which stops it from embedding.
 *
 * @param url - The URL to wrap
 */
declare function hideLinkEmbed(url: URL): `<${string}>`;
/**
 * Formats the content and the URL into a masked URL.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to display
 * @param url - The URL the content links to
 */
declare function hyperlink<Content extends string>(content: Content, url: URL): `[${Content}](${string})`;
/**
 * Formats the content and the URL into a masked URL.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @typeParam Url - This is inferred by the supplied URL
 * @param content - The content to display
 * @param url - The URL the content links to
 */
declare function hyperlink<Content extends string, Url extends string>(content: Content, url: Url): `[${Content}](${Url})`;
/**
 * Formats the content and the URL into a masked URL with a custom tooltip.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @typeParam Title - This is inferred by the supplied title
 * @param content - The content to display
 * @param url - The URL the content links to
 * @param title - The title shown when hovering on the masked link
 */
declare function hyperlink<Content extends string, Title extends string>(content: Content, url: URL, title: Title): `[${Content}](${string} "${Title}")`;
/**
 * Formats the content and the URL into a masked URL with a custom tooltip.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @typeParam Url - This is inferred by the supplied URL
 * @typeParam Title - This is inferred by the supplied title
 * @param content - The content to display
 * @param url - The URL the content links to
 * @param title - The title shown when hovering on the masked link
 */
declare function hyperlink<Content extends string, Url extends string, Title extends string>(content: Content, url: Url, title: Title): `[${Content}](${Url} "${Title}")`;
/**
 * Formats the content into a spoiler.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
declare function spoiler<Content extends string>(content: Content): `||${Content}||`;
/**
 * Formats a user id into a user mention.
 *
 * @typeParam UserId - This is inferred by the supplied user id
 * @param userId - The user id to format
 */
declare function userMention<UserId extends Snowflake>(userId: UserId): `<@${UserId}>`;
/**
 * Formats a channel id into a channel mention.
 *
 * @typeParam ChannelId - This is inferred by the supplied channel id
 * @param channelId - The channel id to format
 */
declare function channelMention<ChannelId extends Snowflake>(channelId: ChannelId): `<#${ChannelId}>`;
/**
 * Formats a role id into a role mention.
 *
 * @typeParam RoleId - This is inferred by the supplied role id
 * @param roleId - The role id to format
 */
declare function roleMention<RoleId extends Snowflake>(roleId: RoleId): `<@&${RoleId}>`;
/**
 * Formats an application command name, subcommand group name, subcommand name, and id into an application command mention.
 *
 * @typeParam CommandName - This is inferred by the supplied command name
 * @typeParam SubcommandGroupName - This is inferred by the supplied subcommand group name
 * @typeParam SubcommandName - This is inferred by the supplied subcommand name
 * @typeParam CommandId - This is inferred by the supplied command id
 * @param commandName - The application command name to format
 * @param subcommandGroupName - The subcommand group name to format
 * @param subcommandName - The subcommand name to format
 * @param commandId - The application command id to format
 */
declare function chatInputApplicationCommandMention<CommandName extends string, SubcommandGroupName extends string, SubcommandName extends string, CommandId extends Snowflake>(commandName: CommandName, subcommandGroupName: SubcommandGroupName, subcommandName: SubcommandName, commandId: CommandId): `</${CommandName} ${SubcommandGroupName} ${SubcommandName}:${CommandId}>`;
/**
 * Formats an application command name, subcommand name, and id into an application command mention.
 *
 * @typeParam CommandName - This is inferred by the supplied command name
 * @typeParam SubcommandName - This is inferred by the supplied subcommand name
 * @typeParam CommandId - This is inferred by the supplied command id
 * @param commandName - The application command name to format
 * @param subcommandName - The subcommand name to format
 * @param commandId - The application command id to format
 */
declare function chatInputApplicationCommandMention<CommandName extends string, SubcommandName extends string, CommandId extends Snowflake>(commandName: CommandName, subcommandName: SubcommandName, commandId: CommandId): `</${CommandName} ${SubcommandName}:${CommandId}>`;
/**
 * Formats an application command name and id into an application command mention.
 *
 * @typeParam CommandName - This is inferred by the supplied command name
 * @typeParam CommandId - This is inferred by the supplied command id
 * @param commandName - The application command name to format
 * @param commandId - The application command id to format
 */
declare function chatInputApplicationCommandMention<CommandName extends string, CommandId extends Snowflake>(commandName: CommandName, commandId: CommandId): `</${CommandName}:${CommandId}>`;
/**
 * Formats a non-animated emoji id into a fully qualified emoji identifier.
 *
 * @typeParam EmojiId - This is inferred by the supplied emoji id
 * @param emojiId - The emoji id to format
 */
declare function formatEmoji<EmojiId extends Snowflake>(emojiId: EmojiId, animated?: false): `<:_:${EmojiId}>`;
/**
 * Formats an animated emoji id into a fully qualified emoji identifier.
 *
 * @typeParam EmojiId - This is inferred by the supplied emoji id
 * @param emojiId - The emoji id to format
 * @param animated - Whether the emoji is animated
 */
declare function formatEmoji<EmojiId extends Snowflake>(emojiId: EmojiId, animated?: true): `<a:_:${EmojiId}>`;
/**
 * Formats an emoji id into a fully qualified emoji identifier.
 *
 * @typeParam EmojiId - This is inferred by the supplied emoji id
 * @param emojiId - The emoji id to format
 * @param animated - Whether the emoji is animated
 */
declare function formatEmoji<EmojiId extends Snowflake>(emojiId: EmojiId, animated?: boolean): `<:_:${EmojiId}>` | `<a:_:${EmojiId}>`;
/**
 * Formats a channel link for a direct message channel.
 *
 * @typeParam ChannelId - This is inferred by the supplied channel id
 * @param channelId - The channel's id
 */
declare function channelLink<ChannelId extends Snowflake>(channelId: ChannelId): `https://discord.com/channels/@me/${ChannelId}`;
/**
 * Formats a channel link for a guild channel.
 *
 * @typeParam ChannelId - This is inferred by the supplied channel id
 * @typeParam GuildId - This is inferred by the supplied guild id
 * @param channelId - The channel's id
 * @param guildId - The guild's id
 */
declare function channelLink<ChannelId extends Snowflake, GuildId extends Snowflake>(channelId: ChannelId, guildId: GuildId): `https://discord.com/channels/${GuildId}/${ChannelId}`;
/**
 * Formats a message link for a direct message channel.
 *
 * @typeParam ChannelId - This is inferred by the supplied channel id
 * @typeParam MessageId - This is inferred by the supplied message id
 * @param channelId - The channel's id
 * @param messageId - The message's id
 */
declare function messageLink<ChannelId extends Snowflake, MessageId extends Snowflake>(channelId: ChannelId, messageId: MessageId): `https://discord.com/channels/@me/${ChannelId}/${MessageId}`;
/**
 * Formats a message link for a guild channel.
 *
 * @typeParam ChannelId - This is inferred by the supplied channel id
 * @typeParam MessageId - This is inferred by the supplied message id
 * @typeParam GuildId - This is inferred by the supplied guild id
 * @param channelId - The channel's id
 * @param messageId - The message's id
 * @param guildId - The guild's id
 */
declare function messageLink<ChannelId extends Snowflake, MessageId extends Snowflake, GuildId extends Snowflake>(channelId: ChannelId, messageId: MessageId, guildId: GuildId): `https://discord.com/channels/${GuildId}/${ChannelId}/${MessageId}`;
/**
 * The heading levels for expanded markdown.
 */
declare enum HeadingLevel {
    /**
     * The first heading level.
     */
    One = 1,
    /**
     * The second heading level.
     */
    Two = 2,
    /**
     * The third heading level.
     */
    Three = 3
}
/**
 * Formats the content into a heading level.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 * @param level - The heading level
 */
declare function heading<Content extends string>(content: Content, level?: HeadingLevel.One): `# ${Content}`;
/**
 * Formats the content into a heading level.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 * @param level - The heading level
 */
declare function heading<Content extends string>(content: Content, level: HeadingLevel.Two): `## ${Content}`;
/**
 * Formats the content into a heading level.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 * @param level - The heading level
 */
declare function heading<Content extends string>(content: Content, level: HeadingLevel.Three): `### ${Content}`;
/**
 * A type that recursively traverses into arrays.
 */
type RecursiveArray<ItemType> = readonly (ItemType | RecursiveArray<ItemType>)[];
/**
 * Formats the elements in the array to an ordered list.
 *
 * @param list - The array of elements to list
 * @param startNumber - The starting number for the list
 */
declare function orderedList(list: RecursiveArray<string>, startNumber?: number): string;
/**
 * Formats the elements in the array to an unordered list.
 *
 * @param list - The array of elements to list
 */
declare function unorderedList(list: RecursiveArray<string>): string;
/**
 * Formats a date into a short date-time string.
 *
 * @param date - The date to format. Defaults to the current time
 */
declare function time(date?: Date): `<t:${bigint}>`;
/**
 * Formats a date given a format style.
 *
 * @typeParam Style - This is inferred by the supplied {@link TimestampStylesString}
 * @param date - The date to format
 * @param style - The style to use
 */
declare function time<Style extends TimestampStylesString>(date: Date, style: Style): `<t:${bigint}:${Style}>`;
/**
 * Formats the given timestamp into a short date-time string.
 *
 * @typeParam Seconds - This is inferred by the supplied timestamp
 * @param seconds - A Unix timestamp in seconds
 */
declare function time<Seconds extends number>(seconds: Seconds): `<t:${Seconds}>`;
/**
 * Formats the given timestamp into a short date-time string.
 *
 * @typeParam Seconds - This is inferred by the supplied timestamp
 * @typeParam Style - This is inferred by the supplied {@link TimestampStylesString}
 * @param seconds - A Unix timestamp in seconds
 * @param style - The style to use
 */
declare function time<Seconds extends number, Style extends TimestampStylesString>(seconds: Seconds, style: Style): `<t:${Seconds}:${Style}>`;
/**
 * The {@link https://discord.com/developers/docs/reference#message-formatting-timestamp-styles | message formatting timestamp styles}
 * supported by Discord.
 */
declare const TimestampStyles: {
    /**
     * Short time format, consisting of hours and minutes.
     *
     * @example `16:20`
     */
    readonly ShortTime: "t";
    /**
     * Long time format, consisting of hours, minutes, and seconds.
     *
     * @example `16:20:30`
     */
    readonly LongTime: "T";
    /**
     * Short date format, consisting of day, month, and year.
     *
     * @example `20/04/2021`
     */
    readonly ShortDate: "d";
    /**
     * Long date format, consisting of day, month, and year.
     *
     * @example `20 April 2021`
     */
    readonly LongDate: "D";
    /**
     * Short date-time format, consisting of short date and short time formats.
     *
     * @example `20 April 2021 16:20`
     */
    readonly ShortDateTime: "f";
    /**
     * Long date-time format, consisting of long date and short time formats.
     *
     * @example `Tuesday, 20 April 2021 16:20`
     */
    readonly LongDateTime: "F";
    /**
     * Relative time format, consisting of a relative duration format.
     *
     * @example `2 months ago`
     */
    readonly RelativeTime: "R";
};
/**
 * The possible {@link TimestampStyles} values.
 */
type TimestampStylesString = (typeof TimestampStyles)[keyof typeof TimestampStyles];
/**
 * All the available faces from Discord's native slash commands.
 */
declare enum Faces {
    /**
     * `¯\_(ツ)_/¯`
     */
    Shrug = "\u00AF_(\u30C4)_/\u00AF",
    /**
     * `(╯°□°)╯︵ ┻━┻`
     */
    Tableflip = "(\u256F\u00B0\u25A1\u00B0)\u256F\uFE35 \u253B\u2501\u253B",
    /**
     * `┬─┬ノ( º _ ºノ)`
     */
    Unflip = "\u252C\u2500\u252C\u30CE( \u00BA _ \u00BA\u30CE)"
}
/**
 * All the available guild navigation mentions.
 */
declare enum GuildNavigationMentions {
    /**
     * Browse Channels tab.
     */
    Browse = "<id:browse>",
    /**
     * Customize tab with the server's {@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object | onboarding prompts}.
     */
    Customize = "<id:customize>",
    /**
     * {@link https://support.discord.com/hc/articles/13497665141655 | Server Guide} tab.
     */
    Guide = "<id:guide>"
}

export { EscapeMarkdownOptions, Faces, GuildNavigationMentions, HeadingLevel, RecursiveArray, TimestampStyles, TimestampStylesString, blockQuote, bold, channelLink, channelMention, chatInputApplicationCommandMention, codeBlock, escapeBold, escapeBulletedList, escapeCodeBlock, escapeEscape, escapeHeading, escapeInlineCode, escapeItalic, escapeMarkdown, escapeMaskedLink, escapeNumberedList, escapeSpoiler, escapeStrikethrough, escapeUnderline, formatEmoji, heading, hideLinkEmbed, hyperlink, inlineCode, italic, messageLink, orderedList, quote, roleMention, spoiler, strikethrough, time, underscore, unorderedList, userMention };
