//export { UxMouse };
//import { Gizmo } from "../gizmo.js";
//import { Vect } from "../common/vect.js";
//import { ViewMgr } from "../viewMgr.js";
//import { Util } from "../common/util.js";
//import { getCode as evtCode } from '../event.js';
//import { Channel } from "../emitter.js";

class UxMouse extends Gizmo {
    // STATIC VARIABLES ----------------------------------------------------
    static _instance;

    // STATIC PROPERTIES ---------------------------------------------------
    static get instance() {
        if (!this._instance) this._instance = new this();
        return this._instance;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        if (!UxMouse._instance) UxMouse._instance=this;
        this._vmgr = Util.objKeyValue(spec, "vmgr", ViewMgr.instance);
        this._canvas = Util.objKeyValue(spec, "canvas", this._vmgr.dfltCanvas);
        // register event handlers
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this._canvas.addEventListener('click', this.onClick.bind(this));
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this._cx = 0;
        this._cy = 0;
        this._x = 0;
        this._y = 0;
        this._canvasRect = this._canvas.getBoundingClientRect();
        this._dirty = false;
        this._updated = false;
        this._down = false;
        // event channels
        this.__evtClicked = new Channel(evtCode("clicked"), {actor: this});
        return UxMouse._instance;
    }

    // PROPERTIES ----------------------------------------------------------
    get active() {
        return true;
    }
    get x() {
        return this._x - this._canvasRect.left;
    }
    get y() {
        return this._y - this._canvasRect.top;
    }
    get pos() {
        return new Vect(this._x - this._canvasRect.left, this._y - this._canvasRect.top);
    }
    get updated() {
        return this._dirty || this._updated;
    }
    get down() {
        return this._down;
    }

    // EVENTS --------------------------------------------------------------
    get evtClicked() { return this.__evtClicked; }

    // METHODS -------------------------------------------------------------
    onClick(e) {
        //console.log("onClick which: " + e.which);
        this.evtClicked.trigger({evt: e});
    }

    onMouseMove(e) {
        if (!e) return;
        this._cx = e.clientX;
        this._cy = e.clientY;
        this._dirty = true;
    }
    onMouseDown(e) {
        //console.log("on mouse down");
        this._down = true;
        this._dirty = true;
    }
    onMouseUp(e) {
        //console.log("on mouse up");
        this._down = false;
        this._dirty = true;
    }

    update(ctx) {
        this._canvasRect = this._canvas.getBoundingClientRect();
        // sync captured position to actual position
        if (this._dirty) {
            //console.log("setting mouse updated true");
            this._updated = true;
            this._x = this._cx;
            this._y = this._cy;
        } else {
            this._updated = false;
            //console.log("setting mouse updated false: " + this.updated);
        }
        this._dirty = false;
    }

}

