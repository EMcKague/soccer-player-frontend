export function snakeCase(string: string) {
    const result = string.replace( /([A-Z])/g, " $1" );
    return result.split(' ').join('_').toLowerCase();
 }

export function camelCaseToNoraml(string: string) {
    const result = string.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);

}