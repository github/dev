import type { Snowflake } from '../../globals';
import type { APIEntitlement, APISKU } from '../../v10';
/**
 * https://discord.com/developers/docs/monetization/entitlements#list-entitlements
 */
export interface RESTGetAPIEntitlementsQuery {
    /**
     * User ID to look up entitlements for
     */
    user_id?: Snowflake | undefined;
    /**
     * Optional list of SKU IDs to check entitlements for
     * Comma-delimited set of snowflakes
     */
    sku_ids?: string | undefined;
    /**
     * Retrieve entitlements before this entitlement ID
     */
    before?: Snowflake | undefined;
    /**
     * Retrieve entitlements after this entitlement ID
     */
    after?: Snowflake | undefined;
    /**
     * Number of entitlements to return (1-100)
     *
     * @default 100
     */
    limit?: number | undefined;
    /**
     * Guild ID to look up entitlements for
     */
    guild_id?: Snowflake | undefined;
    /**
     * Whether ended entitlements should be omitted
     */
    exclude_ended?: boolean | undefined;
}
/**
 * https://discord.com/developers/docs/monetization/entitlements#list-entitlements
 */
export type RESTGetAPIEntitlementsResult = APIEntitlement[];
/**
 * https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement
 */
export interface RESTPostAPIEntitlementBody {
    /**
     * ID of the SKU to grant the entitlement to
     */
    sku_id: Snowflake;
    /**
     * ID of the guild or user to grant the entitlement to
     */
    owner_id: Snowflake;
    /**
     * The type of entitlement owner
     */
    owner_type: EntitlementOwnerType;
}
/**
 * https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement
 */
export type RESTPostAPIEntitlementResult = Partial<Omit<APIEntitlement, 'starts_at' | 'ends_at'>>;
/**
 * https://discord.com/developers/docs/monetization/entitlements#create-test-entitlement
 */
export declare enum EntitlementOwnerType {
    Guild = 1,
    User = 2
}
/**
 * https://discord.com/developers/docs/monetization/entitlements#delete-test-entitlement
 */
export type RESTDeleteAPIEntitlementResult = never;
/**
 * https://discord.com/developers/docs/monetization/skus#list-skus
 */
export type RESTGetAPISKUsResult = APISKU[];
//# sourceMappingURL=monetization.d.ts.map