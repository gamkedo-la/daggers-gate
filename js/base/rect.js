//export { Rect };
//import { Sketch } from "./sketch.js";
//import { Util } from "./common/util.js";
//import { Color } from "./color.js";

/** ========================================================================
 * A rectangle is a sketch primitive.
 */
class Rect extends Sketch {

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        this._borderWidth = Util.objKeyValue(spec, "borderWidth", 0);
        this._borderColor = Util.objKeyValue(spec, "borderColor", Color.zero);
        this._color = Util.objKeyValue(spec, "color", Color.zero);
    }

    // PROPERTIES ----------------------------------------------------------
    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    // METHODS -------------------------------------------------------------
    _render(renderCtx, x=0, y=0) {
        renderCtx.fillStyle = this._color;
        renderCtx.fillRect(x, y, this.width, this.height);
        if (this._borderWidth) {
            renderCtx.lineWidth = this._borderWidth;
            renderCtx.strokeStyle = this._borderColor;
            renderCtx.strokeRect(x, y, this.width, this.height);
        }
    }

}