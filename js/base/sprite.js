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
                let scalex = this.width/this._img.width;
                let scaley = this.height/this._img.height;
                if (scalex && scaley) {
                    let iscalex = 1/scalex;
                    let iscaley = 1/scaley;
                    renderCtx.scale(scalex, scaley);
                    renderCtx.drawImage(this._img, x*iscalex, y*iscaley);
                    renderCtx.scale(1/scalex, 1/scaley);
                }
            }
        } else {
            renderCtx.drawImage(this._img, x, y);
        }
    }

}
