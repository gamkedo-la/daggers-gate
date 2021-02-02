//export { Util };

// =========================================================================
class Util {

    static objKeyValue(obj, key, dflt) {
        return (obj && obj.hasOwnProperty(key)) ? obj[key] : dflt;
    }

}