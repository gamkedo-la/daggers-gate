//export { Sprite };
//import { Sketch } from "./sketch.js";
//import { Util } from "./common/util.js";

/** ========================================================================
 * A stretch sprite is a sketch used to render a JS image that can be sliced/stretched
 * to maintain corners/sides but still be expandable.
 */
class StretchSprite extends Sketch {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec) {
        const img = Util.objKeyValue(spec, "img", { width: 0, height: 0} );
        spec.width = Util.objKeyValue(spec, "width", img.width);
        spec.height = Util.objKeyValue(spec, "height", img.height);
        super(spec);
        this._img = img;
        // border attributes, specified in pixels
        this._top = Util.objKeyValue(spec, "top", 0);
        this._bottom = Util.objKeyValue(spec, "bottom", 0);
        this._left = Util.objKeyValue(spec, "left", 0);
        this._right = Util.objKeyValue(spec, "left", 0);
        if (spec.border) this._top = this._bottom = this._left = this._right = spec.border;
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
            let sw = this._img.width;
            let sh = this._img.height;
            let dw = this.width;
            let dh = this.height;
            // render corners w/out scale
            // img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight
            if (this._top && this._left) {  // upper left
                renderCtx.drawImage(this._img, 
                    0, 0, this._left, this._top, 
                    x, y, this._left, this._top);
            }
            if (this._top && this._right) { // upper right
                renderCtx.drawImage(this._img, 
                    sw-this._right, 0, this._right, this._top, 
                    x+(dw-this._right), y, this._right, this._top);
            }
            if (this._bottom && this._left) { // lower left
                renderCtx.drawImage(this._img, 
                    0, sh-this._bottom, this._left, this._bottom, 
                    x, y+(dh-this._bottom), this._left, this._bottom);
            }
            if (this._bottom && this._right) { // lower right
                renderCtx.drawImage(this._img, 
                    sw-this._right, sh-this._bottom, this._right, this._bottom, 
                    x+(dw-this._right), y+(dh-this._bottom), this._right, this._bottom);
            }
            // render scaled slices
            let lr = this._left + this._right;
            let tb = this._top + this._bottom;
            if (this._top && lr < sw) { // top middle
                renderCtx.drawImage(this._img, 
                    this._left, 0, sw-lr, this._top, 
                    x+this._left, y, dw-lr, this._top);
            }
            if (this._bottom && lr < sw) { // bottom middle
                renderCtx.drawImage(this._img, 
                    this._left, sh-this._bottom, sw-lr, this._bottom, 
                    x+this._left, y+dh-this._bottom, dw-lr, this._bottom);
            }
            if (this._left && tb < sh) { // left middle
                renderCtx.drawImage(this._img, 
                    0, this._top, this._left, sh-tb,
                    x, y+this._top, this._left, dh-tb);
            }
            if (this._right && tb < sh) { // right middle
                renderCtx.drawImage(this._img, 
                    sw-this._right, this._top, this._right, sh-tb,
                    x+dw-this._right, y+this._top, this._right, dh-tb);
            }
            if (lr < sw && tb < sh) { // middle middle
                renderCtx.drawImage(this._img, 
                    this._left, this._top, sw-lr, sh-tb,
                    x+this._left, y+this._top, dw-lr, dh-tb);
            }

        } else {
            renderCtx.drawImage(this._img, x, y);
        }
    }

}
