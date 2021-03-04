//export { Sketch };
//import { Vect } from "./common/vect.js";
//import { Fmt } from "./common/fmt.js";
//import { Util } from "./common/util.js";
//import { Fitter } from "./fitter.js";
//import { getCode as evtCode } from './event.js';

/**
 * A sketch is the base abstract data object that represents something that can be drawn to the screen... 
 * -- an image (sprite)
 * -- an animation
 * -- simple js primitives for drawing
 * -- a particle
 */
class Sketch {
    // STATIC VARIABLES ----------------------------------------------------
    // map for generate function, used by subclasses to "register" themselves to the generator.
    static _genmap = new Map();

    // STATIC PROPERTIES ---------------------------------------------------
    static get zero() {
        return new Sketch();
    }

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
    /**
     * create a new sketch
     */
    constructor(spec={}) {
        this._parent = spec.parent;
        this._tag = Util.objKeyValue(spec, "tag", "tag");
        this._width = Util.objKeyValue(spec, "width", 0);
        this._height = Util.objKeyValue(spec, "height", 0);
        this._lockRatio = spec.lockRatio || false;
        this._fitter = (spec.xfitter) ? Fitter.generate(Object.assign({target: this}, spec.xfitter)) : undefined;
        this._cfWidth = this._cfHeight = this._cfX = this._cfY = 0;
    }

    // PROPERTIES ----------------------------------------------------------
    get parent() {
        return this._parent;
    }
    set parent(v) {
        if (this._parent !== v) this._parent = v;
    }

    get ratio() {
        return (this._height) ? (this._width/this._height) : 1;
    }

    get tag() {
        return this._tag;
    }

    get width() {
        if (this._fitter) {
            // if ratio is locked, adjust based on current ratio and fitter...
            if (this._lockRatio) return this._cfWidth;
            return this._fitter.width;
        }
        return this._width;
    }

    get height() {
        if (this._fitter) {
            // if ratio is locked, adjust based on current ratio and fitter...
            if (this._lockRatio) return this._cfHeight;
            return this._fitter.height;
        }
        return this._height;
    }

    get minx() {
        if (this._fitter) {
            if (this._lockRatio) return this._cfX;
            return this._fitter.x;
        }
        return 0;
    }
    get miny() {
        if (this._fitter) {
            if (this._lockRatio) return this._cfY;
            return this._fitter.y;
        }
        return 0;
    }

    get size() {
        return new Vect(this.width, this.height);
    }

    get animIdx() {
        return 0;
    }

    get done() {
        return true;
    }

    // METHODS -------------------------------------------------------------
    /**
     * A sketch can be updated...
     * @param {*} ctx 
     */
    update(ctx) {
        if (this._fitter && this._lockRatio) {
            if (this._fitter.width != this._lastFitterWidth || this._fitter.height != this._lastFitterHeight ||
                this._fitter.x != this._lastFitterX || this._fitter.y != this._lastFitterY) {
                this._lastFitterWidth = this._fitter.width;
                this._lastFitterHeight = this._fitter.height;
                this._lastFitterX = this._fitter.x;
                this._lastFitterY = this._fitter.y;
                let dw = this._fitter.width;
                let dh = this._fitter.height;
                if ((this._width / dw) < (this._height / dh)) {
                    dw = dh * this.ratio;
                } else {
                    dh = dw / this.ratio;
                }
                this._cfWidth = dw;
                this._cfHeight = dh;
                this._cfX = this._fitter.x + (this._fitter.width-dw )* .5;
                this._cfY = this._fitter.y + (this._fitter.height-dh) * .5;
                return dw;
            }
        }
        return false;
    }

    /**
     * A sketch can be reset...
     */
    reset() {
    }

    /**
     * A sketch can be rendered...
     * @param {canvasContext} renderCtx - canvas context on which to draw
     * @param {Vect} pos - position to draw at
     */
    render(renderCtx, x=0, y=0) {
        // local adjustments based on fitter
        x += this.minx;
        y += this.miny;
        // sketch-specific render
        this._render(renderCtx, x, y);
    }

    _render(renderCtx, pos) {
    }

    /**
     * convert to string
     */
    toString() {
        return Fmt.toString(this.constructor.name, this.tag, this.size);
    }

}