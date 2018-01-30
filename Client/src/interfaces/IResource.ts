import { IApiExportable } from './IApiExportable';

/**
 * @interface
 * @description
 * Represents an interface that any resource model that is created across the system
 * should implement.
 */
export interface IResource extends IApiExportable {
    id: number;
}

/**
 * @interface
 * @description
 * Represents a parser functions that creates an resource object from a
 * web api response.
 */
export type IResourceApiParser = (apiObject: any) => IResource;
