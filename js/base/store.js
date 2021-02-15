//export { Store };

//import { getCode as evtCode } from './event.js';
//import { KeyedGroup } from './group.js';
//import { Fmt } from './common/fmt.js';
//import { Channel } from "./emitter.js";

/** ========================================================================
 * Store is a singleton/global store to track objects.
 * It supports basic functions like add/remove/find/etc.
 */
class Store {
    // STATIC VARIABLES ----------------------------------------------------
    static _instance;

    // STATIC PROPERTIES ---------------------------------------------------
    static get instance() {
        if (!this._instance) this._instance = new this();
        return this._instance;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor() {
        this._id = 0;
        if (!Store._instance) Store._instance=this;
        this._items = new KeyedGroup((v)=>v.id);
        // event channels
        this._evtAdded = new Channel(evtCode("added"), {actor: this});
        this._evtRemoved = new Channel(evtCode("removed"), {actor: this});
        return Store._instance;
    }

    // PROPERTIES ----------------------------------------------------------
    get length() {
        return this._items.length;
    }

    get id() {
        this._id++;
        return this._id;
    }

    // EVENTS --------------------------------------------------------------
    get evtAdded() { return this._evtAdded; }
    get evtRemoved() { return this._evtRemoved; }

    // METHODS -------------------------------------------------------------
    add(obj) {
        if (obj.id && obj.id > this._id) this._id = obj.id;
        this._items.add(obj);
        this.evtAdded.trigger({target: obj})
    }

    remove(obj) {
        this._items.remove(obj);
        this.evtRemoved.trigger({target: obj})
    }

    clear() {
        for (const obj of this._items) {
            obj.destroy();
        }
    }

    find(key) {
        return this._items.find(key);
    }

    findFirst(filter) {
        return this._items.findFirst(filter);
    }

    findAll(filter) {
        return this._items.findAll(filter);
    }

    // FIXME: handle deletions during iteration
    *[Symbol.iterator]() {
        for (const obj of this._items) {
            yield obj;
        }
    }

    toString() {
        //return Fmt.toString(this.constructor.name, this.length);
        return Fmt.toString(this.constructor.name);
    }

}