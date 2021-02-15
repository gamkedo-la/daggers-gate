//export { Bounds };
//import { Vect } from "./vect.js";
//import { Fmt } from "./fmt.js";

// =========================================================================
class Bounds {
    // CONSTRUCTOR ---------------------------------------------------------
    /**
     * create a new bounds
     * @param {*} x - x position of minimum point within bounds
     * @param {*} y - y position of minimum point within bounds
     * @param {*} width - width in pixels
     * @param {*} height - height in pixels
     */
    constructor(x, y, width, height) {
        // the local position (minimum)
        this._x = x;
        this._y = y;
        // the size contraints (width/height)
        this._width = width;
        this._height = height;
    }

    // STATIC PROPERTIES ---------------------------------------------------
    static get zero() {
        return new Bounds(0, 0, 0, 0);
    }

    // PROPERTIES ----------------------------------------------------------
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get pos() {
        return new Vect(this.x, this.y);
    }

    get minx() {
        return this._x;
    }
    get miny() {
        return this._y;
    }
    get min() {
        return new Vect(this.x, this.y);
    }

    get maxx() {
        return this._x + this.width;
    }
    get maxy() {
        return this._y + this.height;
    }
    get max() {
        return new Vect(this.x + this.width, this.y + this.height);
    }

    get midx() {
        return this._x + (this.width * .5);
    }
    get midy() {
        return this._y + (this.height * .5);
    }
    get mid() {
        return new Vect(this._x + (this.width * .5), this._y + (this.height * .5));
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get size() {
        return new Vect(this._width, this._height);
    }

    // STATIC FUNCTIONS ----------------------------------------------------
    static newOrExtend(ob, nb) {
        if (!ob) return nb;
        ob.extend(nb);
        return ob;
    }

    // METHODS -------------------------------------------------------------
    /**
     * make a copy of the current bounds and return
     */
    copy() {
        return new Bounds(this._x, this._y, this._width, this._height);
    }

    /**
     * determine if the given position (in world space) is within the current bounds
     * @param {Vect} pos - position to check
     */
    contains(pos) {
        return pos.x >= this.minx && pos.x <= this.maxx &&
               pos.y >= this.miny && pos.y <= this.maxy;
    }

    /**
     * determine if given bounds overlaps current bounds
     * @param {Bounds} other - other bounds to evaluate
     */
    overlaps(other) {
        if (!other) return false;
        let xoverlap = (this.minx >= other.minx && this.minx < other.maxx) ||
                       (this.maxx > other.minx && this.maxx <= other.maxx) ||
                       (other.minx >= this.minx && other.minx < this.maxx) ||
                       (other.maxx > this.minx && other.maxx <= this.maxx);
        let yoverlap = (this.miny >= other.miny && this.miny < other.maxy) ||
                       (this.maxy > other.miny && this.maxy <= other.maxy) ||
                       (other.miny >= this.miny && other.miny < this.maxy) ||
                       (other.maxy > this.miny && other.maxy <= this.maxy);
        //console.log("xoverlap: " + xoverlap + " yoverlap: " + yoverlap);
        if (xoverlap && yoverlap) {
            let minX = Math.max(this.minx, other.minx);
            let maxX = Math.min(this.maxx, other.maxx);
            let minY = Math.max(this.miny, other.miny);
            let maxY = Math.min(this.maxy, other.maxy);
            let width = maxX-minX;
            let height = maxY-minY;
            return new Bounds(minX, minY, width, height);
        }
        return false;
    }

    /**
     * Extend the current bounds to include the extend of given bounds
     * @param {*} other 
     */
    extend(other) {
        if (other.minx < this.minx) {
            let delta = this.minx - other.minx;
            this._width += delta;
            this._x = other.minx;
        }
        if (other.maxx > this.maxx) {
            let delta = other.maxx - this.maxx;
            this._width += delta;
        }
        if (other.miny < this.miny) {
            let delta = this.miny - other.miny;
            this._height += delta;
            this._y = other.minx;
        }
        if (other.maxy > this.maxy) {
            let delta = other.maxy - this.maxy;
            this._height += delta;
        }
        return this;
    }

    toString() {
        return Fmt.toString("Bounds", this._x, this._y, this._width, this._height);
    }
}
