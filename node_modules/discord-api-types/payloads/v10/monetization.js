"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SKUType = exports.SKUFlags = exports.EntitlementType = void 0;
/**
 * https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types
 */
var EntitlementType;
(function (EntitlementType) {
    /**
     * Entitlement was purchased as an app subscription
     */
    EntitlementType[EntitlementType["ApplicationSubscription"] = 8] = "ApplicationSubscription";
})(EntitlementType = exports.EntitlementType || (exports.EntitlementType = {}));
/**
 * https://discord.com/developers/docs/monetization/skus#sku-object-sku-flags
 */
var SKUFlags;
(function (SKUFlags) {
    /**
     * SKU is available for purchase
     */
    SKUFlags[SKUFlags["Available"] = 4] = "Available";
    /**
     * Recurring SKU that can be purchased by a user and applied to a single server.
     * Grants access to every user in that server.
     */
    SKUFlags[SKUFlags["GuildSubscription"] = 128] = "GuildSubscription";
    /**
     * Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server.
     */
    SKUFlags[SKUFlags["UserSubscription"] = 256] = "UserSubscription";
})(SKUFlags = exports.SKUFlags || (exports.SKUFlags = {}));
var SKUType;
(function (SKUType) {
    /**
     * Represents a recurring subscription
     */
    SKUType[SKUType["Subscription"] = 5] = "Subscription";
    /**
     * System-generated group for each Subscription SKU created
     */
    SKUType[SKUType["SubscriptionGroup"] = 6] = "SubscriptionGroup";
})(SKUType = exports.SKUType || (exports.SKUType = {}));
//# sourceMappingURL=monetization.js.map