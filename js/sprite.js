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
     * @param {canvasContext} renderCtx - canvas context on which to draw
     * @param {int} x - x position to draw at
     * @param {int} y - y position to draw at
     */
    _render(renderCtx, x=0, y=0) {
        renderCtx.drawImage(this._img, (pos) ? pos.x : 0, (pos) ? pos.y : 0);
    }

}
