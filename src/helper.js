//Helper functions

/**
 * Capitalizes a string, i.e. uppercases the first letter
 */
export function capitalize(str) {
    //check for invalid (nonexistant or empty) string
    if(!str) throw new Error("String must not be empty");
    return str.charAt(0).toUpperCase() + str.slice(1);
}
