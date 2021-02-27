//export { Util };

// =========================================================================
class Util {

    static objKeyValue(obj, key, dflt) {
        return (obj && obj.hasOwnProperty(key)) ? obj[key] : dflt;
    }

    static bind(obj, ...names) {
        for (const name of names) {
           obj[name] = obj[name].bind(obj);
        }
    }   

    static spliceStr(str, index, count, add) {
        var ar = str.split('');
        ar.splice(index, count, add);
        return ar.join('');
    }

}