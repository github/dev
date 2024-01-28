"use strict";
/**
 * Types extracted from https://discord.com/developers/docs/resources/webhook
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookType = void 0;
var WebhookType;
(function (WebhookType) {
    /**
     * Incoming Webhooks can post messages to channels with a generated token
     */
    WebhookType[WebhookType["Incoming"] = 1] = "Incoming";
    /**
     * Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels
     */
    WebhookType[WebhookType["ChannelFollower"] = 2] = "ChannelFollower";
    /**
     * Application webhooks are webhooks used with Interactions
     */
    WebhookType[WebhookType["Application"] = 3] = "Application";
})(WebhookType = exports.WebhookType || (exports.WebhookType = {}));
//# sourceMappingURL=webhook.js.map