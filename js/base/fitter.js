//export { Fitter, FitToParent, FitToCanvas };
//import { Fmt } from "./common/fmt.js";
//import { Util } from "./common/util.js";
//import { Vect } from "./common/vect.js";
//import { ViewMgr } from "./viewMgr.js";

class Fitter {
    // STATIC VARIABLES ----------------------------------------------------
    // map for generate function, used by subclasses to "register" themselves to the generator.
    static _genmap = new Map();
    // registration to generator
    static _genid = this._genreg(this);

    // STATIC METHODS ------------------------------------------------------
    // the registration function for subclasses to "register" themselves to the generator
    static _genreg(cls) {
        const name = cls.prototype.constructor.name;
        this._genmap.set(name, cls);
        return name;
    }
    static generate(spec={}) {
        let cls = this._genmap.get(spec.cls);
        if (cls) return new cls(spec);
        return undefined;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this._top = Util.objKeyValue(spec, "top", 0);
        this._bottom = Util.objKeyValue(spec, "bottom", 0);
        this._left = Util.objKeyValue(spec, "left", 0);
        this._right = Util.objKeyValue(spec, "right", 0);
        // the target object whose size is being adjusted by the fitter
        this._target = Util.objKeyValue(spec, "target");
        // the reference object (if any) whose size is being used as a reference
        this._ref = Util.objKeyValue(spec, "ref")
    }

    // PROPERTIES ----------------------------------------------------------
    get cls() {
        return this.constructor.name;
    }

    get ref() {
        return (this._ref) ? this._ref : { width: 0, height: 0 };
    }

    get x() {
        const ref = this.ref;
        return ref.width * this._left;
    }

    get y() {
        const ref = this.ref;
        return ref.height * this._top;
    }

    get pos() {
        const ref = this.ref;
        return new Vect(ref.width * this._left, ref.height * this._top);
    }

    get target() {
        return (this._target) ? this._target : {};
    }

    get width() {
        return this.ref.width * (1-(this._left+this._right));
    }

    get height() {
        return this.ref.height * (1-(this._top+this._bottom));
    }

    get size() {
        return new Vect(this.width, this.height);
    }

    // METHODS -------------------------------------------------------------
    toString() {
        return Fmt.ofmt(this, this.constructor.name);
    }

}

class FitToParent extends Fitter {
    // STATIC VARIABLES ----------------------------------------------------
    // registration to generator
    static _genid = this._genreg(this);

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
    }

    get ref() {
        if (this.target && this.target.parent) return this.target.parent;
        return super.ref;
    }

}

class FitToCanvas extends Fitter {
    // STATIC VARIABLES ----------------------------------------------------
    // registration to generator
    static _genid = this._genreg(this);

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        const vmgr = Util.objKeyValue(spec, "vmgr", ViewMgr.instance);
        this._ref = Util.objKeyValue(spec, "canvas", vmgr.dfltCanvas);
    }
}

class FitToContents extends Fitter {
    // STATIC VARIABLES ----------------------------------------------------
    // registration to generator
    static _genid = this._genreg(this);

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        this._contentTag = Util.objKeyValue(spec, "contentTag", "sketch");
    }

    // PROPERTIES ----------------------------------------------------------
    get ref() {
        if (this.target && this.target[this._contentTag]) {
            return this.target[this._contentTag];
        }
        return { width: 0, height: 0 };
    }
}