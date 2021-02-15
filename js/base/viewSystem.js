//import { Util }  from "../common/util.js";
//export { ViewSystem };

class ViewSystem {
    constructor(spec={}) {
        this._vmgr = Util.objKeyValue(spec, "vmgr", ViewMgr.instance);
        this._tracked = {};
    }

    update(ctx) {
        let current = {};
        // iterate through all tracked game objects...
        for (const obj of Store.instance) {
            // is object a view?
            if (obj.__cat === "View") {
                current[obj.id] = obj;
                if (!this._tracked[obj.id]) {
                    if (this._vmgr) this._vmgr.add(obj);
                }
            }
        }

        // iterate through current tracked objects
        for (const id of Object.keys(this._tracked)) {
            if (!current[id]) {
                const obj = this._tracked[id];
                if (this._vmgr) this._vmgr.remove(obj);
            }
        }
        this._tracked = current;
    }

}