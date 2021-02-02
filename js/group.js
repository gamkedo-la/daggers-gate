//export { Group, SortedGroup, KeyedGroup };
//import { Fmt } from "./common/fmt.js";

/**
 * A generic collection
 */
class Group {
    // CONSTRUCTOR ---------------------------------------------------------
    /**
     * Create a new OrderedGroup
     * @constructor
     */
    constructor() {
        this.entries = [];
    }

    // METHODS -------------------------------------------------------------
    /**
     * Provides group iterator
     */
    *[Symbol.iterator]() {
        for (const item of this.entries) {
            yield item;
        }
    }

    /**
     * add object to the group
     * @param {*} obj - object to add
     */
    add(obj) {
        this.entries.push(obj);
    }

    /**
     * remove object from group
     * @param {*} obj - object to remove
     */
    remove(obj) {
        let index = this.entries.indexOf(obj);
        if (index > -1) {
            this.entries.splice(index, 1);
        }
    }

    /**
     * clear the group
     */
    clear() {
        this.entries.length = 0;
    }

    /**
     * Walk entries, calling given function on each
     * @param {function(*)} fcn - function to apply to each object
     */
    walk(fcn) {
        if (!fcn) return;
        let entries = this.entries.slice();
        for (let i=0; i<entries.length; i++) {
            fcn(entries[i]);
        }
    }

    /**
     * find first object in the collection that matches the given filter
     * @param {Function(*)} filter - filter function to apply to each object in collection
     */
    findFirst(filter) {
        for (const obj of this) {
            if (filter && filter(obj)) {
                return obj;
            }
        }
        return null;
    }

    /**
     * find all objects in the collection that match the given filter
     * @param {Function(*)} filter - filter function to apply to each object in collection
     */
    findAll(filter) {
        let matches = [];
        for (const obj of this) {
            if (filter && filter(obj)) {
                matches.push(obj);
            }
        }
        return matches;
    }

    /**
     * convert to string
     * @returns {string}
     */
    toString() {
        return Fmt.toString(this.constructor.name, ...this.entries);
    }

}

/**
 * A generic collection of objects sorted based on a comparison function
 */
class SortedGroup extends Group {
    // CONSTRUCTOR ---------------------------------------------------------
    /**
     * Create a new SortedGroup
     * @constructor
     */
    constructor(cmpFcn) {
        super();
        this.cmpFcn = cmpFcn;
    }

    /**
     * add object to the group, sorted by comparison function
     * @param {*} obj - object to add
     */
    add(obj) {
        if (this.cmpFcn) {
            for (let i=0; i<this.entries.length; i++) {
                if (this.cmpFcn(obj, this.entries[i]) < 0) {
                    this.entries.splice(i, 0, obj);
                    return;
                }
            }
        }
        this.entries.push(obj);
    }

}

/**
 * A generic collection of objects keyed by their string representation
 */
class KeyedGroup extends Group {

    // CONSTRUCTOR ---------------------------------------------------------
    /**
     * Create a new collection
     */
    constructor(keyFcn) {
        super();
        this.map = new Map();
        this.keyFcn = keyFcn;
    }

    // PROPERTIES ----------------------------------------------------------
    get length() {
        return this.map.size;
    }

    // METHODS -------------------------------------------------------------
    /**
     * determine key for specified object
     * @param {*} obj - object to assess
     * @returns {string} - key for object
     */
    keyFor(obj) {
        if (obj && this.keyFcn) {
            return this.keyFcn(obj);
        }
        if (obj && typeof obj.key == 'string') {
            return obj.key;
        }
        return (obj) ? obj.toString() : "undefined";
    }

    /**
     * Add object to collection
     * @param {*} obj - object to add
     */
    add(obj) {
        if (!obj) return;
        // use string to represent object key
        let key = this.keyFor(obj);
        this.map.set(key, obj);
        //console.log("key: " + key + " obj: " + obj + " map: " + this.map);
    }

    /**
     * Remove object from collection
     * @param {*} obj - object to remove
     */
    remove(obj) {
        if (!obj) return;
        // use string to represent object key
        let key = this.keyFor(obj);
        this.map.delete(key);
    }

    /**
     * clear the group
     */
    clear() {
        this.map.clear();
    }

    /**
     * find the object associated with given key, where key is expected to be a string, translate object to string if not
     * @param {*} key 
     */
    find(key) {
        return this.map.get(key);
    }

    /**
     * walk through each
     * @param {Function(*)} fcn - function to apply to each object in the collection
     * @param {Function(*)} [filter] - optional filter function to apply to each object in collection
     */
    walk(fcn, filter) {
        if (!fcn) return;
        for (let obj of this.map.values()) {
            if (!filter || filter(obj)) fcn(obj);
        }
    }

    *[Symbol.iterator]() {
        for (let obj of this.map.values()) {
            yield obj;
        }
    }

    /**
     * convert to string
     */
    toString() {
        return Fmt.toString("KeyedGroup", [...this.map.keys()].join(","));
    }

}