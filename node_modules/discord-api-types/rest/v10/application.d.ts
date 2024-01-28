import type { APIApplication, APIApplicationRoleConnectionMetadata } from '../../payloads/v10/application';
import type { Nullable, StrictPartial } from '../../utils/internals';
/**
 * https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records
 */
export type RESTGetAPIApplicationRoleConnectionMetadataResult = APIApplicationRoleConnectionMetadata[];
/**
 * https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records
 */
export type RESTPutAPIApplicationRoleConnectionMetadataJSONBody = APIApplicationRoleConnectionMetadata[];
/**
 * https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records
 */
export type RESTPutAPIApplicationRoleConnectionMetadataResult = APIApplicationRoleConnectionMetadata[];
/**
 * https://discord.com/developers/docs/resources/application#get-current-application
 */
export type RESTGetCurrentApplicationResult = APIApplication;
/**
 * https://discord.com/developers/docs/resources/application#edit-current-application
 */
export type RESTPatchCurrentApplicationJSONBody = StrictPartial<Pick<APIApplication, 'custom_install_url' | 'description' | 'flags' | 'role_connections_verification_url' | 'install_params' | 'interactions_endpoint_url' | 'tags'> & Nullable<Pick<APIApplication, 'icon' | 'cover_image'>>>;
/**
 * https://discord.com/developers/docs/resources/application#edit-current-application
 */
export type RESTPatchCurrentApplicationResult = APIApplication;
//# sourceMappingURL=application.d.ts.map