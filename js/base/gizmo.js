//export { Gizmo };
//import { Fmt } from './common/fmt.js';
//import { Util } from './common/util.js';
//import { Store } from './store.js';
//import { Channel } from "./emitter.js";
//import { getCode as evtCode } from './event.js';

/** ========================================================================
 * Gizmo is the base class for all game state objects.
 * - All objects instantiated from this class or any subclass will automatically
 *   get added to and tracked to the global store.
 * - objects can have parent/child relationships, tracked through ids (vs. direct links)
 */
class Gizmo {
    // STATIC PROPERTIES ---------------------------------------------------
    static childContains(gm, filter) {
        for (const child of gm.children) {
            if (filter(child)) return true;
            if (Gizmo.childContains(child, filter)) return true;
        }
        return false;
    }

    static findChild(gm, filter) {
        for (const child of gm.children) {
            if (filter(child)) return child;
            let match = Gizmo.findChild(child, filter);
            if (match) return match;
        }
        return undefined;
    }

    static parentContains(gm, filter) {
        for (let parent = gm.parent; parent; parent = parent.parent) {
            if (filter(parent)) return true;
        }
        return false;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this.__cat = "Gizmo";
        this.__store = Util.objKeyValue(spec, "store", Store.instance);
        this.__ctrl = Util.objKeyValue(spec, "ctrl", undefined);
        this._id = Util.objKeyValue(spec, "id", 0);
        if (!this._id) this._id = this.store.id;
        this._parentID = Util.objKeyValue(spec, "parentID", 0);
        this._childIDs = Util.objKeyValue(spec, "childIDs", []);
        this._tag = Util.objKeyValue(spec, "tag", this.cls + "." + this.id);
        this._dbg = Util.objKeyValue(spec, "dbg", false);
        this.store.add(this);
        // event channels
        this.__evtDestroyed = new Channel(evtCode("destroyed"), {actor: this});
        this.__evtUpdated = new Channel(evtCode("updated"), {actor: this});
    }

    // PROPERTIES ----------------------------------------------------------
    get id() {
        return this._id;
    }

    get tag() {
        return this._tag;
    }

    get store() {
        return this.__store;
    }

    get ctrl() {
        return this.__ctrl;
    }
    set ctrl(v) {
        this.__ctrl = v;
    }

    get cls() {
        return this.constructor.name;
    }

    get cat() {
        return this.__cat;
    }

    get dbg() {
        return this._dbg;
    }
    set dbg(v) {
        return this._dbg = v;
    }

    get parent() {
        return this.store.find(this._parentID);
    }

    get children() {
        const childArr = [];
        for (const id of this._childIDs) {
            let child = this.store.find(id);
            if (child) childArr.push(child);
        }
        return childArr;
    }

    // EVENTS --------------------------------------------------------------
    get evtDestroyed() { return this.__evtDestroyed; }
    get evtUpdated() { return this.__evtUpdated; }

    // METHODS -------------------------------------------------------------
    serialize() {
        return Serializer.serialize(this);
    }

    adopt(child) {
        // avoid cycles
        if (Gizmo.parentContains(this, (v) => v === child) || Gizmo.childContains(this, (v) => v === child)) {
            return;
        }
        // avoid duplicates
        if (this._childIDs.includes(child.id)) {
            return;
        }
        child.orphan();
        child._parentID = this.id;
        this._childIDs.push(child.id);
        // cascade parent events
        this.evtUpdated.listen((evt) => { child.evtUpdated.trigger(evt); }, child.id);
    }

    orphan() {
        if (this._parentID) {
            let idx = this.parent._childIDs.indexOf(this.id);
            if (idx != -1) {
                this.parent._childIDs.splice(idx, 1);
            }
            this._parentID = 0;
        }
    }

    destroy(reapChildren=true) {
        for (const child of this.children) {
            child.orphan();
            if (reapChildren) child.destroy();
        }
        this.orphan();
        this.store.remove(this);
        this.evtDestroyed.trigger();
    }

    find(filter) {
        return Gizmo.findChild(this, filter);
    }

    toString() {
        return Fmt.toString(this.cls, this.id);
    }
}