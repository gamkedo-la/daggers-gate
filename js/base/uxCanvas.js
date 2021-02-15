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
        if (width) this._cvs.width = width;
        if (height) this._cvs.height = height;
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

}