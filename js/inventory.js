class Inventory {

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this.size = spec.size || 10;
        this._mainHand = spec.mainHand || undefined;
        this._offHand = spec.offHand || undefined;
        this._slots = new Array(this.size);
        // event channels
        this.__evtMainHandUpdated = new Channel("mainHandUpdated", {actor: this});
        this.__evtOffHandUpdated = new Channel("offHandUpdated", {actor: this});
    }

    // PROPERTIES ----------------------------------------------------------
    get count() {
        let c = 0;
        for (let i=0; i<this.size; i++) if (this._slots[i]) c++;
        return c;
    }

    get empty() {
        return (this.count === 0);
    }

    get mainHand() {
        return this._mainHand;
    }
    set mainHand(v) {
        if (v !== this._mainHand) {
            let ov = this._mainHand;
            this._mainHand = v;
            this.evtMainHandUpdated.trigger({old: ov, value: v});
        }
    }

    get offHand() {
        return this._offHand;
    }
    set offHand(v) {
        if (v !== this._offHand) {
            let ov = this._offHand;
            this._offHand = v;
            this.evtOffHandUpdated.trigger({old: ov, value: v});
        }
    }

    // EVENTS --------------------------------------------------------------
    get evtMainHandUpdated() { return this.__evtMainHandUpdated; }
    get evtOffHandUpdated() { return this.__evtOffHandUpdated; }

    // METHODS -------------------------------------------------------------
    add(obj) {
        //console.log("trying to add: " + Fmt.ofmt(obj));
        if (obj.mainHand && !this.mainHand) {
            //console.log(`${obj} added as mainhand`);
            this.mainHand = obj;
        } else if (obj.offHand && !this.offHand) {
            //console.log(`${obj} added as offhand`);
            this.offHand = obj;
        } else {
            //console.log(`${obj} added to inventory`);
            // find empty slot
            for (let i=0; i<this.size; i++) {
                if (!(this._slots[i])) {
                    this._slots[i] = obj;
                    break;
                }
            }
        }
    }

    get(idx) {
        return this._slots[idx];
    }
    set(idx, obj) {
        this._slots[idx] = obj;
    }

    includes(tag) {
        if (this._mainHand && this._mainHand.tag === tag) return true;
        if (this._offHand && this._offHand.tag === tag) return true;
        for (let i=0; i<this.size; i++) {
            if (this._slots[i] && this._slots[i].tag === tag) return true;
        }
        return false;
    }

    remove(obj) {
        let idx = this._slots.indexOf(obj);
        if (idx != -1) this._slots[idx] = undefined;
    }

    removeTag(tag) {
        if (this._mainHand && this._mainHand.tag === tag) {
            this._mainHand = undefined;
            return;
        }
        if (this._offHand && this._offHand.tag === tag) {
            this._offHand = undefined;
            return;
        }
        for (let i=0; i<this.size; i++) {
            if (this._slots[i] && this._slots[i].tag === tag) {
                this._slots[i] = undefined;
                return;
            }
        }
    }

    removeAt(idx) {
        let swap = this._slot[idx];
        this._slots[idx] = undefined;
        return swap;
    }

}