//export { UxCanvas };
//import { UxView } from "./uxView.js";

/** ========================================================================
 * class representing base canvas as a UI view
 */
class UxCanvas extends UxView {

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        let cvsid = spec.cvsid || "canvas";
        let canvas = spec.canvas || document.getElementById(cvsid) || {width: 0, height: 0, getContext: () => undefined};
        let width = spec.width || canvas.width;
        let height = spec.height || canvas.height;
        spec.xxform = Object.assign({}, {origx: 0, origy: 0, width: canvas.width, height: canvas.height}, spec.xxform)
        super(spec);
        this._cvs = canvas;
        this._ctx = canvas.getContext("2d");
        this._resize = spec.resize || false;
        if (width) this._cvs.width = width;
        if (height) this._cvs.height = height;
        if (this._resize) {
            this.onWindowResize();  // resize now...
            window.addEventListener('resize', this.onWindowResize.bind(this)); // resize when window resizes
        }
        // event channels
        this.__evtResized = new Channel(evtCode("resized"), {actor: this});
    }


    // PROPERTIES ----------------------------------------------------------
    get cvs() {
        return this._cvs;
    }
    get ctx() {
        return this._ctx;
    }

    get width() {
        return this._cvs.width;
    }

    get height() {
        return this._cvs.height;
    }

    // EVENTS --------------------------------------------------------------
    get evtResized() { return this.__evtResized; }

    // METHODS -------------------------------------------------------------
    onWindowResize() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        console.log("trying to resize to: " + width + "," + height);
        this._cvs.width = width;
        this._cvs.height = height;
        console.log("this.size: " + this.width + "," + this.height);
        console.log("canvas size: " + canvas.width + "," + canvas.height);
        this.xform.width = width;
        this.xform.height = height;
        if (this.evtResized) this.evtResized.trigger({width: width, height: height});
    }

}