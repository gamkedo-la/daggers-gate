//export { UxView };
//import { Fmt } from "../common/fmt.js";
//import { Bounds } from "../common/bounds.js";
//import { Vect } from "../common/vect.js";
//import { Util } from "../common/util.js";
//import { UxMouse } from "./uxMouse.js";
//import { getCode as evtCode } from '../event.js';
//import { Gizmo } from "../gizmo.js";
//import { Channel } from "../emitter.js";
//import { XForm } from "../xform.js";

/** ========================================================================
 * The base user experience primitive.
 */
class UxView extends Gizmo {
    // STATIC VARIABLES ----------------------------------------------------
    // map for generate function, used by subclasses to "register" themselves to the generator.
    static _genmap = new Map();

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
    constructor(spec) {
        super(spec);
        this.__cat = "View";
        this._active = Util.objKeyValue(spec, "active", true);
        this._visible = Util.objKeyValue(spec, "visible", true);
        let xxform = Object.assign({}, spec.xxform, (spec.parent) ? {parent:spec.parent.xform} : {});
        //this._xform = (spec.xxform) ? new XForm(spec.xxform) : XForm.identity;
        this._xform = new XForm(xxform);
        this._depth = Util.objKeyValue(spec, "depth", Util.objKeyValue(spec, "dfltDepth", 0));
        this._layer = Util.objKeyValue(spec, "layer", Util.objKeyValue(spec, "dfltLayer", 0));
        this._mouse = Util.objKeyValue(spec, "mouse", UxMouse.instance);
        this._mouseOver = false;
        this._mouseDown = false;
        this.dbg = spec.dbg;
        this._mouseEnteredSound = spec.mouseEnteredSound;
        this._mouseLeftSound = spec.mouseLeftSound;
        // child specs
        for (const childSpec of (spec.xchild || [])) { 
            childSpec.dfltDepth = Util.objKeyValue(spec, "dfltDepth", 1) + 1;
            childSpec.dfltLayer = this._layer;
            childSpec.parent = this;
            childSpec.xxform = Object.assign({parent: this.xform}, childSpec.xxform);
            const childView = UxView.generate(childSpec);
            if (childView) {
                this.adopt(childView);
            }
        }
        // event channels
        this.__evtActivated = new Channel(evtCode("activated"), {actor: this});
        this.__evtDeactivated = new Channel(evtCode("deactivated"), {actor: this});
        this.__evtAppeared = new Channel(evtCode("appeared"), {actor: this});
        this.__evtDisappeared = new Channel(evtCode("disappeared"), {actor: this});
        this.__evtMouseEntered = new Channel(evtCode("mouseEntered"), {actor: this, mouse:this._mouse});
        this.__evtMouseLeft = new Channel(evtCode("mouseLeft"), {actor: this, mouse:this._mouse});
    }

    // PROPERTIES ----------------------------------------------------------
    get xform() {
        return this._xform;
    }

    // get position (center of view) in local coords
    get pos() {
        return new Vect(this._xform.centerx, this._xform.centery);
    }

    get x() {
        return this._xform.centerx;
    }
    get y() {
        return this._xform.centery;
    }

    get width() {
        return this._xform.width;
    }

    get height() {
        return this._xform.height;
    }

    get size() {
        return new Vect(this.width, this.height);
    }

    get bounds() {
        return new Bounds(this.xform.minx, this.xform.miny, this.width, this.height);
    }

    get layer() {
        return this._layer;
    }
    set layer(v) {
        this._layer = v;
    }

    get depth() {
        return this._depth;
    }
    set depth(v) {
        this._depth = v;
    }

    get mouse() {
        return this._mouse;
    }

    get mouseOver() {
        return this._mouseOver;
    }

    get mouseDown() {
        return this._mouseDown;
    }

    get active() {
        if (!this._active) return false;
        if (this.parent) return this.parent.active;
        return true;
    }
    set active(v) {
        v = (v) ? true : false;
        if (v != this._active) {
            this._active = v;
            if (v) {
                this.evtActivated.trigger();
            } else {
                this.evtDeactivated.trigger();
            }
        }
    }

    get visible() {
        if (!this._visible) return false;
        if (this.parent) return this.parent.visible;
        return true;
    }
    set visible(v) {
        v = (v) ? true : false;
        if (v != this._visible) {
            this._visible = v;
            if (v) {
                this.evtAppeared.trigger();
            } else {
                this.evtDisappeared.trigger();
            }
        }
    }

    // EVENTS --------------------------------------------------------------
    get evtActivated() { return this.__evtActivated; }
    get evtDeactivated() { return this.__evtDeactivated; }
    get evtAppeared() { return this.__evtAppeared; }
    get evtDisappeared() { return this.__evtDisappeared; }
    get evtMouseEntered() { return this.__evtMouseEntered; }
    get evtMouseLeft() { return this.__evtMouseLeft; }

    // METHODS -------------------------------------------------------------
    update(ctx) {
        // detect mouse events
        if (this.active && this._mouse && this._mouse.updated) {
            // mouse position in world coords
            const mousePos = this._mouse.pos;
            // convert to local position
            const localMousePos = this.xform.getLocal(mousePos);
            //console.log("localMousePos: " + localMousePos);
            const contains = this.bounds.contains(localMousePos);
            if (this._mouseOver && !contains) {
                this._mouseOver = false;
                if (this._mouseLeftSound) this._mouseLeftSound.play();
                this.evtMouseLeft.trigger({mouse: this._mouse});
                if (this.dbg) console.log("mouse left area: " + this);
            }
            if (!this._mouseOver && contains) {
                this._mouseOver = true;
                if (this._mouseEnteredSound) this._mouseEnteredSound.play();
                this.evtMouseEntered.trigger({mouse: this._mouse});
                if (this.dbg) console.log("mouse entered area: " + this);
            }
            this._mouseDown = (contains && this._mouse.down);
        }
    }

    _render(ctx) {
    }

    render(ctx) {
        // don't render if not visible
        if (!this.visible) return;
        // apply transform
        this.xform.apply(ctx);
        // private render, specific to subclass
        this._render(ctx);
        // revert transform
        this.xform.revert(ctx);
    }

    adopt(child) {
        child.xform.parent = this.xform;
        super.adopt(child);
    }

    toString() {
        return Fmt.toString(this.constructor.name, this._id, this._tag, this._pos);
    }

}