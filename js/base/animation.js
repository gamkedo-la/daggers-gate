//export { Animation };
//import { Sketch } from './sketch.js';
//import { Sprite } from './sprite.js';
//import { Util } from "./common/util.js";
//import { Fmt } from "./common/fmt.js";

/** ========================================================================
 * A single cel of an animation.
 */
class Cel {
    static dfltDuration = 100;
    constructor(spec={}) {
        this._sketch = Util.objKeyValue(spec, "sketch", Sketch.zero);
        this._duration = Util.objKeyValue(spec, "duration", Cel.dfltDuration);
    }

    get sketch() {
        return this._sketch;
    }
    get duration() {
        return this._duration;
    }

    toString() {
        return Fmt.toString(this.constructor.name, this.duration, this.sketch);
    }
}

/** ========================================================================
 * An animation is a sketch used to render a series of animation cels (sketches).
 */
class Animation extends Sprite {

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        this._loop = Util.objKeyValue(spec, "loop", true);
        this._cels = Util.objKeyValue(spec, "cels", [{}]).map((v) => new Cel(v));
        this._cidx = 0;
        if (this._width === 0) this._width = this.cel.sketch.width;
        if (this._height === 0) this._height = this.cel.sketch.height;
        this._elapsed = 0;
        this._done = false;
    }

    // PROPERTIES ----------------------------------------------------------
    get done() {
        return this._done;
    }

    get cel() {
        return this._cels[this._cidx];
    }

    get sketch() {
        if (this._cels.length) {
            return this._cels[this._cidx].sketch;
        }
        return Sketch.zero;
    }

    // METHODS -------------------------------------------------------------
    reset() {
        this._cidx = 0;
        this._elapsed = 0;
        this._done = 0;
    }

    advance() {
        this._cidx++;
        if (this._cidx >= this._cels.length) {
            if (this._loop) {
                this._cidx = 0;
            } else {
                this._done = true;
                this._cidx = this._cels.length-1;
            }
        }
    }

    _render(renderCtx, x=0, y=0) {
        this.sketch.render(renderCtx, x, y);
    }

    /**
     * Update animation state
     * @param {*} ctx 
     */
    update(ctx) {
        let updated = false;
        if (this.done) return;
        this._elapsed += ctx.deltaTime;
        while (!this.done && this._elapsed > this.cel.duration) {
            this._elapsed -= this.cel.duration;
            this.advance();
            updated = true;
        }
        return updated;
    }

}