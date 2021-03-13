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

    static collectionEqual(c1, c2) {
        if (c1 === c2) return true;
        if ((c1 && !c2) || (!c1 && c2)) return false;
        if (c1.length != c2.length) return false;
        for (let i=0; i<c1.length; i++) {
            if (c1[i] !== c2[i]) return false;
        }
        return true;
    }

    static choose(arr) {
        if (arr.length === 0) return undefined
        if (arr.length === 1) return arr[0];
        let choice = Math.floor(Math.random() * arr.length);
        return arr[choice];
    }

}