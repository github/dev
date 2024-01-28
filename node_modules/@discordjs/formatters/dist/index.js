"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Faces: () => Faces,
  GuildNavigationMentions: () => GuildNavigationMentions,
  HeadingLevel: () => HeadingLevel,
  TimestampStyles: () => TimestampStyles,
  blockQuote: () => blockQuote,
  bold: () => bold,
  channelLink: () => channelLink,
  channelMention: () => channelMention,
  chatInputApplicationCommandMention: () => chatInputApplicationCommandMention,
  codeBlock: () => codeBlock,
  escapeBold: () => escapeBold,
  escapeBulletedList: () => escapeBulletedList,
  escapeCodeBlock: () => escapeCodeBlock,
  escapeEscape: () => escapeEscape,
  escapeHeading: () => escapeHeading,
  escapeInlineCode: () => escapeInlineCode,
  escapeItalic: () => escapeItalic,
  escapeMarkdown: () => escapeMarkdown,
  escapeMaskedLink: () => escapeMaskedLink,
  escapeNumberedList: () => escapeNumberedList,
  escapeSpoiler: () => escapeSpoiler,
  escapeStrikethrough: () => escapeStrikethrough,
  escapeUnderline: () => escapeUnderline,
  formatEmoji: () => formatEmoji,
  heading: () => heading,
  hideLinkEmbed: () => hideLinkEmbed,
  hyperlink: () => hyperlink,
  inlineCode: () => inlineCode,
  italic: () => italic,
  messageLink: () => messageLink,
  orderedList: () => orderedList,
  quote: () => quote,
  roleMention: () => roleMention,
  spoiler: () => spoiler,
  strikethrough: () => strikethrough,
  time: () => time,
  underscore: () => underscore,
  unorderedList: () => unorderedList,
  userMention: () => userMention
});
module.exports = __toCommonJS(src_exports);

// src/escapers.ts
function escapeMarkdown(text, options = {}) {
  const {
    codeBlock: codeBlock2 = true,
    inlineCode: inlineCode2 = true,
    bold: bold2 = true,
    italic: italic2 = true,
    underline = true,
    strikethrough: strikethrough2 = true,
    spoiler: spoiler2 = true,
    codeBlockContent = true,
    inlineCodeContent = true,
    escape = true,
    heading: heading2 = false,
    bulletedList = false,
    numberedList = false,
    maskedLink = false
  } = options;
  if (!codeBlockContent) {
    return text.split("```").map((subString, index, array) => {
      if (index % 2 && index !== array.length - 1)
        return subString;
      return escapeMarkdown(subString, {
        inlineCode: inlineCode2,
        bold: bold2,
        italic: italic2,
        underline,
        strikethrough: strikethrough2,
        spoiler: spoiler2,
        inlineCodeContent,
        escape,
        heading: heading2,
        bulletedList,
        numberedList,
        maskedLink
      });
    }).join(codeBlock2 ? "\\`\\`\\`" : "```");
  }
  if (!inlineCodeContent) {
    return text.split(/(?<=^|[^`])`(?=[^`]|$)/g).map((subString, index, array) => {
      if (index % 2 && index !== array.length - 1)
        return subString;
      return escapeMarkdown(subString, {
        codeBlock: codeBlock2,
        bold: bold2,
        italic: italic2,
        underline,
        strikethrough: strikethrough2,
        spoiler: spoiler2,
        escape,
        heading: heading2,
        bulletedList,
        numberedList,
        maskedLink
      });
    }).join(inlineCode2 ? "\\`" : "`");
  }
  let res = text;
  if (escape)
    res = escapeEscape(res);
  if (inlineCode2)
    res = escapeInlineCode(res);
  if (codeBlock2)
    res = escapeCodeBlock(res);
  if (italic2)
    res = escapeItalic(res);
  if (bold2)
    res = escapeBold(res);
  if (underline)
    res = escapeUnderline(res);
  if (strikethrough2)
    res = escapeStrikethrough(res);
  if (spoiler2)
    res = escapeSpoiler(res);
  if (heading2)
    res = escapeHeading(res);
  if (bulletedList)
    res = escapeBulletedList(res);
  if (numberedList)
    res = escapeNumberedList(res);
  if (maskedLink)
    res = escapeMaskedLink(res);
  return res;
}
__name(escapeMarkdown, "escapeMarkdown");
function escapeCodeBlock(text) {
  return text.replaceAll("```", "\\`\\`\\`");
}
__name(escapeCodeBlock, "escapeCodeBlock");
function escapeInlineCode(text) {
  return text.replaceAll(/(?<=^|[^`])``?(?=[^`]|$)/g, (match) => match.length === 2 ? "\\`\\`" : "\\`");
}
__name(escapeInlineCode, "escapeInlineCode");
function escapeItalic(text) {
  let idx = 0;
  const newText = text.replaceAll(/(?<=^|[^*])\*([^*]|\*\*|$)/g, (_, match) => {
    if (match === "**")
      return ++idx % 2 ? `\\*${match}` : `${match}\\*`;
    return `\\*${match}`;
  });
  idx = 0;
  return newText.replaceAll(/(?<=^|[^_])(?<!<a?:.+)_(?!:\d+>)([^_]|__|$)/g, (_, match) => {
    if (match === "__")
      return ++idx % 2 ? `\\_${match}` : `${match}\\_`;
    return `\\_${match}`;
  });
}
__name(escapeItalic, "escapeItalic");
function escapeBold(text) {
  let idx = 0;
  return text.replaceAll(/\*\*(\*)?/g, (_, match) => {
    if (match)
      return ++idx % 2 ? `${match}\\*\\*` : `\\*\\*${match}`;
    return "\\*\\*";
  });
}
__name(escapeBold, "escapeBold");
function escapeUnderline(text) {
  let idx = 0;
  return text.replaceAll(/(?<!<a?:.+)__(_)?(?!:\d+>)/g, (_, match) => {
    if (match)
      return ++idx % 2 ? `${match}\\_\\_` : `\\_\\_${match}`;
    return "\\_\\_";
  });
}
__name(escapeUnderline, "escapeUnderline");
function escapeStrikethrough(text) {
  return text.replaceAll("~~", "\\~\\~");
}
__name(escapeStrikethrough, "escapeStrikethrough");
function escapeSpoiler(text) {
  return text.replaceAll("||", "\\|\\|");
}
__name(escapeSpoiler, "escapeSpoiler");
function escapeEscape(text) {
  return text.replaceAll("\\", "\\\\");
}
__name(escapeEscape, "escapeEscape");
function escapeHeading(text) {
  return text.replaceAll(/^( {0,2})([*-] )?( *)(#{1,3} )/gm, "$1$2$3\\$4");
}
__name(escapeHeading, "escapeHeading");
function escapeBulletedList(text) {
  return text.replaceAll(/^( *)([*-])( +)/gm, "$1\\$2$3");
}
__name(escapeBulletedList, "escapeBulletedList");
function escapeNumberedList(text) {
  return text.replaceAll(/^( *\d+)\./gm, "$1\\.");
}
__name(escapeNumberedList, "escapeNumberedList");
function escapeMaskedLink(text) {
  return text.replaceAll(/\[.+]\(.+\)/gm, "\\$&");
}
__name(escapeMaskedLink, "escapeMaskedLink");

// src/formatters.ts
function codeBlock(language, content) {
  return content === void 0 ? `\`\`\`
${language}
\`\`\`` : `\`\`\`${language}
${content}
\`\`\``;
}
__name(codeBlock, "codeBlock");
function inlineCode(content) {
  return `\`${content}\``;
}
__name(inlineCode, "inlineCode");
function italic(content) {
  return `_${content}_`;
}
__name(italic, "italic");
function bold(content) {
  return `**${content}**`;
}
__name(bold, "bold");
function underscore(content) {
  return `__${content}__`;
}
__name(underscore, "underscore");
function strikethrough(content) {
  return `~~${content}~~`;
}
__name(strikethrough, "strikethrough");
function quote(content) {
  return `> ${content}`;
}
__name(quote, "quote");
function blockQuote(content) {
  return `>>> ${content}`;
}
__name(blockQuote, "blockQuote");
function hideLinkEmbed(url) {
  return `<${url}>`;
}
__name(hideLinkEmbed, "hideLinkEmbed");
function hyperlink(content, url, title) {
  return title ? `[${content}](${url} "${title}")` : `[${content}](${url})`;
}
__name(hyperlink, "hyperlink");
function spoiler(content) {
  return `||${content}||`;
}
__name(spoiler, "spoiler");
function userMention(userId) {
  return `<@${userId}>`;
}
__name(userMention, "userMention");
function channelMention(channelId) {
  return `<#${channelId}>`;
}
__name(channelMention, "channelMention");
function roleMention(roleId) {
  return `<@&${roleId}>`;
}
__name(roleMention, "roleMention");
function chatInputApplicationCommandMention(commandName, subcommandGroupName, subcommandName, commandId) {
  if (commandId !== void 0) {
    return `</${commandName} ${subcommandGroupName} ${subcommandName}:${commandId}>`;
  }
  if (subcommandName !== void 0) {
    return `</${commandName} ${subcommandGroupName}:${subcommandName}>`;
  }
  return `</${commandName}:${subcommandGroupName}>`;
}
__name(chatInputApplicationCommandMention, "chatInputApplicationCommandMention");
function formatEmoji(emojiId, animated = false) {
  return `<${animated ? "a" : ""}:_:${emojiId}>`;
}
__name(formatEmoji, "formatEmoji");
function channelLink(channelId, guildId) {
  return `https://discord.com/channels/${guildId ?? "@me"}/${channelId}`;
}
__name(channelLink, "channelLink");
function messageLink(channelId, messageId, guildId) {
  return `${guildId === void 0 ? channelLink(channelId) : channelLink(channelId, guildId)}/${messageId}`;
}
__name(messageLink, "messageLink");
var HeadingLevel = /* @__PURE__ */ ((HeadingLevel2) => {
  HeadingLevel2[HeadingLevel2["One"] = 1] = "One";
  HeadingLevel2[HeadingLevel2["Two"] = 2] = "Two";
  HeadingLevel2[HeadingLevel2["Three"] = 3] = "Three";
  return HeadingLevel2;
})(HeadingLevel || {});
function heading(content, level) {
  switch (level) {
    case 3 /* Three */:
      return `### ${content}`;
    case 2 /* Two */:
      return `## ${content}`;
    default:
      return `# ${content}`;
  }
}
__name(heading, "heading");
function listCallback(element, startNumber, depth = 0) {
  if (Array.isArray(element)) {
    return element.map((element2) => listCallback(element2, startNumber, depth + 1)).join("\n");
  }
  return `${"  ".repeat(depth - 1)}${startNumber ? `${startNumber}.` : "-"} ${element}`;
}
__name(listCallback, "listCallback");
function orderedList(list, startNumber = 1) {
  return listCallback(list, Math.max(startNumber, 1));
}
__name(orderedList, "orderedList");
function unorderedList(list) {
  return listCallback(list);
}
__name(unorderedList, "unorderedList");
function time(timeOrSeconds, style) {
  if (typeof timeOrSeconds !== "number") {
    timeOrSeconds = Math.floor((timeOrSeconds?.getTime() ?? Date.now()) / 1e3);
  }
  return typeof style === "string" ? `<t:${timeOrSeconds}:${style}>` : `<t:${timeOrSeconds}>`;
}
__name(time, "time");
var TimestampStyles = {
  /**
   * Short time format, consisting of hours and minutes.
   *
   * @example `16:20`
   */
  ShortTime: "t",
  /**
   * Long time format, consisting of hours, minutes, and seconds.
   *
   * @example `16:20:30`
   */
  LongTime: "T",
  /**
   * Short date format, consisting of day, month, and year.
   *
   * @example `20/04/2021`
   */
  ShortDate: "d",
  /**
   * Long date format, consisting of day, month, and year.
   *
   * @example `20 April 2021`
   */
  LongDate: "D",
  /**
   * Short date-time format, consisting of short date and short time formats.
   *
   * @example `20 April 2021 16:20`
   */
  ShortDateTime: "f",
  /**
   * Long date-time format, consisting of long date and short time formats.
   *
   * @example `Tuesday, 20 April 2021 16:20`
   */
  LongDateTime: "F",
  /**
   * Relative time format, consisting of a relative duration format.
   *
   * @example `2 months ago`
   */
  RelativeTime: "R"
};
var Faces = /* @__PURE__ */ ((Faces2) => {
  Faces2["Shrug"] = "\xAF_(\u30C4)_/\xAF";
  Faces2["Tableflip"] = "(\u256F\xB0\u25A1\xB0)\u256F\uFE35 \u253B\u2501\u253B";
  Faces2["Unflip"] = "\u252C\u2500\u252C\u30CE( \xBA _ \xBA\u30CE)";
  return Faces2;
})(Faces || {});
var GuildNavigationMentions = /* @__PURE__ */ ((GuildNavigationMentions2) => {
  GuildNavigationMentions2["Browse"] = "<id:browse>";
  GuildNavigationMentions2["Customize"] = "<id:customize>";
  GuildNavigationMentions2["Guide"] = "<id:guide>";
  return GuildNavigationMentions2;
})(GuildNavigationMentions || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Faces,
  GuildNavigationMentions,
  HeadingLevel,
  TimestampStyles,
  blockQuote,
  bold,
  channelLink,
  channelMention,
  chatInputApplicationCommandMention,
  codeBlock,
  escapeBold,
  escapeBulletedList,
  escapeCodeBlock,
  escapeEscape,
  escapeHeading,
  escapeInlineCode,
  escapeItalic,
  escapeMarkdown,
  escapeMaskedLink,
  escapeNumberedList,
  escapeSpoiler,
  escapeStrikethrough,
  escapeUnderline,
  formatEmoji,
  heading,
  hideLinkEmbed,
  hyperlink,
  inlineCode,
  italic,
  messageLink,
  orderedList,
  quote,
  roleMention,
  spoiler,
  strikethrough,
  time,
  underscore,
  unorderedList,
  userMention
});
//# sourceMappingURL=index.js.map