/**
 * @interface
 * @description
 * Represents any api exportable object. Any concrete class must have
 * its own implementation of exportToApi.
 */
export interface IApiExportable {
    exportToApi(): Object;
}
