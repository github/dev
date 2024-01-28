import type { Snowflake } from '../../globals';
/**
 * https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-structure
 */
export interface APIEntitlement {
    /**
     * ID of the entitlement
     */
    id: Snowflake;
    /**
     * ID of the SKU
     */
    sku_id: Snowflake;
    /**
     * ID of the user that is granted access to the entitlement's sku
     */
    user_id?: Snowflake;
    /**
     * ID of the guild that is granted access to the entitlement's sku
     */
    guild_id?: Snowflake;
    /**
     * ID of the parent application
     */
    application_id: Snowflake;
    /**
     * Type of entitlement
     */
    type: EntitlementType;
    /**
     * Whether the entitlement was deleted
     */
    deleted: boolean;
    /**
     * Start date at which the entitlement is valid. Not present when using test entitlements.
     */
    starts_at?: string;
    /**
     * Date at which the entitlement is no longer valid. Not present when using test entitlements.
     */
    ends_at?: string;
}
/**
 * https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types
 */
export declare enum EntitlementType {
    /**
     * Entitlement was purchased as an app subscription
     */
    ApplicationSubscription = 8
}
/**
 * https://discord.com/developers/docs/monetization/skus#sku-object-sku-structure
 */
export interface APISKU {
    /**
     * ID of SKU
     */
    id: Snowflake;
    /**
     * Type of SKU
     */
    type: SKUType;
    /**
     * ID of the parent application
     */
    application_id: Snowflake;
    /**
     * Customer-facing name of your premium offering
     */
    name: string;
    /**
     * System-generated URL slug based on the SKU's name
     */
    slug: string;
    /**
     * SKU flags combined as a bitfield
     *
     * See https://en.wikipedia.org/wiki/Bit_field
     */
    flags: SKUFlags;
}
/**
 * https://discord.com/developers/docs/monetization/skus#sku-object-sku-flags
 */
export declare enum SKUFlags {
    /**
     * SKU is available for purchase
     */
    Available = 4,
    /**
     * Recurring SKU that can be purchased by a user and applied to a single server.
     * Grants access to every user in that server.
     */
    GuildSubscription = 128,
    /**
     * Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server.
     */
    UserSubscription = 256
}
export declare enum SKUType {
    /**
     * Represents a recurring subscription
     */
    Subscription = 5,
    /**
     * System-generated group for each Subscription SKU created
     */
    SubscriptionGroup = 6
}
//# sourceMappingURL=monetization.d.ts.map