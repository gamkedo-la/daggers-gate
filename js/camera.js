// =========================================================================
class Camera {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        // viewport dimensions
        this.width = spec.width || 800;
        this.height = spec.height || 600;
        this.halfWidth = this.width * .5;
        this.halfHeight = this.height * .5;
        // deltas for borders around game level in which the camera will not pan
        this.dx = spec.dx || 150;
        this.dy = spec.dy || 150;
        // current offset of camera
        this._x = 0;
        this._y = 0;
        // camera can follow a target
        this.target = undefined;
        this.dbg = spec.dbg || false;
    }

    // PROPERTIES ----------------------------------------------------------
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }

    // center of viewport
    get midx() {
        return this._x + this.halfWidth;
    }
    get midy() {
        return this._y + this.halfHeight;
    }

    get maxx() {
        return this._x + this.width;
    }
    get maxy() {
        return this._y + this.height;
    }

    // METHODS -------------------------------------------------------------
    follow(target) {
        this.target = target;
    }

    update(ctx) {
        // calculate current x,y
        if (!this.target) return;
        // world max x/y
        // FIXME: would be nice not to reference global here...
        let wmaxx = currentLevel.maxx;
        let wmaxy = currentLevel.maxy;
        // target min/max x/y
        let tx = this.target.x;
        let ty = this.target.y;
        // left of pan area
        if (tx < (this._x + this.dx) && tx >= this.dx) {
            this._x = tx - this.dx;
            if (this.dbg) console.log("pan left - tx: " + tx + " wmaxx: " + wmaxx + " newx: " + this._x);
        }
        // right of pan area
        if (tx > (this._x + this.width - this.dx)) {
            if (tx <= wmaxx-this.dx) {
                this._x = tx - (this.width - this.dx);
            } else {
                this._x = wmaxx - this.width;
            }
            if (this.dbg) console.log("pan right - tx: " + tx + " wmaxx: " + wmaxx + " newx: " + this._x);
        }
        // above pan area
        if (ty < (this._y + this.dy) && ty >= this.dy) {
            this._y = ty - this.dy;
            if (this.dbg) console.log("pan up - ty: " + ty + " wmaxy: " + wmaxy + " newy: " + this._y);
        }
        // below pan area
        if (ty > (this._y + this.height - this.dy)) {
            if (ty <= wmaxy-this.dy) {
                this._y = ty - (this.height - this.dy);
            } else {
                this._y = wmaxy - this.height;
            }
            if (this.dbg) console.log("pan down - ty: " + ty + " wmaxy: " + wmaxy + " newy: " + this._y);
        }
    }

    contains(x, y) {
        return (x>=this._x && x<=this._x+this.width && y>=this._y && y<=this._y+this.height);
    }

    containsRect(x, y, width, height) {
        let xoverlap = (this._x >= x && this._x < x+width) ||
                       (this.maxx > x && this.maxx <= x+width) ||
                       (x >= this._x && x < this.maxx) ||
                       (x+width > this._x && x+width <= this.maxx);
        let yoverlap = (this._y >= y && this._y < y+height) ||
                       (this.maxy > y && this.maxy <= y+height) ||
                       (y >= this._y && y < this.maxy) ||
                       (y+height > this._y && y+height <= this.maxy);
        return xoverlap && yoverlap;
    }

    reset() {
        this._x = 0;
        this._y = 0;
    }

    resize(width, height) {
        console.log("resize camera to: " + width + "," + height);
        this.width = width;
        this.height = height;
        this.halfWidth = this.width * .5;
        this.halfHeight = this.height * .5;
    }

}
