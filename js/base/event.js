//import { Fmt } from "./common/fmt.js";
//export { getCode, kinds, Event };

let _evt_id = 1;
const _evtKinds = {};
const _evtIdMap = {};
const _evtTagMap = {};

function evtCode(tag) {
    if (tag in _evtTagMap) {
        return _evtTagMap[tag];
    }
    let p = _evtKinds;
    let keys = tag.split('.')
    if (keys.length > 1) {
        for (let i = 0; i < keys.length - 1; i++) {
            let key = keys[i];
            if (!p[key]) {
                p[key] = {}
            }
            p = p[key]
        }
    }
    let id = p[keys[keys.length - 1]] = _evt_id;
    _evtIdMap[id] = tag;
    _evtTagMap[tag] = id;
    _evt_id++;
    console.log("=-=-= defined event for: " + tag + " id: " + id);
    return id;
}

/** ========================================================================
 * represents an instance of an event that is triggered, along w/ associated event data
 */
class Event {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(kind, atts={}) {
        this.kind = kind;
        Object.assign(this, atts);
    }

    // METHODS -------------------------------------------------------------
    toString() {
        return Fmt.ofmt(this, "Event", {"kind": (v) => _evtIdMap[v] || v});
    }
}

/** ========================================================================
 * represents an event channel for a specific event id
 */
class Channel {
    constructor(id, data) {
        this._id = id;
        this._listeners = [];
        this._data = data;
    }

    get length() {
        return this._listeners.length;
    }

    listen(fcn) {
        if (!fcn) return;
        this._listeners.push({once: false, fcn: fcn});
    }

    once(fcn) {
        if (!fcn) return;
        this._listeners.push({once: true, fcn: fcn});
    }

    ignore(fcn) {
        if (!fcn) {
            this._listeners = [];
            return;
        }
        for (let i=0; i<this._listeners.length; i++) {
            if (this._listeners[i].fcn === fcn) {
                this._listeners.splice(i, 1);
                return;
            }
        }
    }

    trigger(data) {
        // cascade data
        let evtData = {}
        Util.mixin(evtData, this._data);                 // channel data
        Util.mixin(evtData, data);                       // trigger data
        let evt = new Event(this._id, evtData)
        let listeners = this._listeners.slice(0);
        for (let i=0; i<listeners.length; i++) {
            listeners[i].fcn(evt);
            if (listeners[i].once) this.ignore(listeners[i].fcn);
        }
    }

    toString() {
        return Fmt.toString("Channel", this._id, Fmt.ofmt(this._data));
    }

}
