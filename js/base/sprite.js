//export { Sprite };
//import { Sketch } from "./sketch.js";
//import { Util } from "./common/util.js";

/** ========================================================================
 * A sprite is a sketch used to render a JS image.
 */
class Sprite extends Sketch {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec) {
        const img = Util.objKeyValue(spec, "img", { width: 0, height: 0} );
        spec.width = Util.objKeyValue(spec, "width", img.width);
        spec.height = Util.objKeyValue(spec, "height", img.height);
        super(spec);
        //this._lockRatio = spec.lockRatio || false;
        //this._ratio = (img.height) ? (img.width/img.height) : 1,
        this._img = img;
    }

    // PROPERTIES ----------------------------------------------------------
    get img() {
        return this._img;
    }

    // METHODS -------------------------------------------------------------
    /**
     * draw the sprite
     * @param {int} x - x position to draw at
     * @param {int} y - y position to draw at
     */
    _render(renderCtx, x=0, y=0) {
        // scale if necessary
        if ((this.width !== this._img.width) || (this.height !== this._img.height)) {
            if (this._img.width && this._img.height) {
                // src dims
                let sw = this._img.width;
                let sh = this._img.height;
                // dst dims
                let dw = this.width;
                let dh = this.height;
                renderCtx.drawImage(this._img, 
                    0, 0, sw, sh, 
                    x, y, dw, dh);
            }
        } else {
            renderCtx.drawImage(this._img, x, y);
        }
    }

}
