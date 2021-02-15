//import { Util }  from "../common/util.js";

export { ViewSystem };

class ViewSystem extends System {
    constructor(spec={}) {
        super(spec);
        this._vmgr = Util.objKeyValue(spec, "vmgr", ViewMgr.instance);
        this._tracked = {};
    }

    update(ctx) {
        let current = {};
        // iterate through all tracked game objects...
        for (const obj of Store.instance) {
            // is object a view?
            if (obj.__cat === "View") {
                current[e.id] = e;
                if (!this._tracked[e.id]) {
                    if (this._vmgr) this._vmgr.add(e);
                }
            }
        }

        // iterate through current tracked objects
        for (const id of Object.keys(this._tracked)) {
            if (!current[id]) {
                const e = this._tracked[id];
                if (this._vmgr) this._vmgr.remove(e);
            }
        }
        this._tracked = current;
    }

}