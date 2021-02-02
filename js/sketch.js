//export { Sketch };
//import { Fmt } from "./common/fmt.js";
//import { Util } from "./common/util.js";

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
    }

    // PROPERTIES ----------------------------------------------------------
    get parent() {
        return this._parent;
    }
    set parent(v) {
        if (this._parent !== v) this._parent = v;
    }

    get tag() {
        return this._tag;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    // METHODS -------------------------------------------------------------
    /**
     * A sketch can be updated...
     * @param {*} ctx 
     */
    update(ctx) {
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
     * @param {int} x - x position to draw at
     * @param {int} y - y position to draw at
     */
    render(renderCtx, x=0, y=0) {
        // sketch-specific render
        this._render(renderCtx, x, y);
    }

    _render(renderCtx, x=0, y=0) {
    }

    /**
     * convert to string
     */
    toString() {
        return Fmt.toString(this.constructor.name, this.tag, this.size);
    }

}