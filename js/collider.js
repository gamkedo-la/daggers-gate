class Collider {
    constructor(spec={}) {
        this.color = spec.color || "green";
        this.collisionColor = spec.collisionColor || "red";

        this.width = spec.width || 50;
        this.height = spec.height || 50;
        this.halfWidth = this.width * .5;
        this.halfHeight = this.height * .5;
        this.xoff = spec.xoff || 0;
        this.yoff = spec.yoff || 0;

        this.update(spec.x || 0, spec.y || 0, (v) => 0);
    }

    get tileIndices() {
        let idxs = [this.tlIdx];
        if (this.trIdx !== this.tlIdx) idxs.push(this.trIdx);
        if (this.blIdx !== this.tlIdx) idxs.push(this.blIdx);
        if (this.brIdx !== this.blIdx) idxs.push(this.brIdx);
        return idxs;
    }

    copy() {
        let c = new Collider({
            color: this.color,
            collisionColor: this.collisionColor,
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y,
            xoff: this.xoff,
            yoff: this.yoff,
        });
        c.tlIdx = this.tlIdx;
        c.trIdx = this.trIdx;
        c.blIdx = this.blIdx;
        c.brIdx = this.brIdx;
        return c;
    }

    update(x, y, idxfcn) {
        this.x = x;
        this.y = y;
        this.minx = this.x + this.xoff - this.halfWidth;
        this.maxx = this.x + this.xoff + this.halfWidth;
        this.miny = this.y + this.yoff - this.halfHeight;
        this.maxy = this.y + this.yoff + this.halfHeight;
        this.tlIdx = idxfcn(this.minx, this.miny);
        this.trIdx = idxfcn(this.maxx, this.miny);
        this.blIdx = idxfcn(this.minx, this.maxy);
        this.brIdx = idxfcn(this.maxx, this.maxy);
    }

    overlaps(other) {
        let xoverlap = (this.minx >= other.minx && this.minx < other.maxx) ||
            (this.maxx > other.minx && this.maxx <= other.maxx) ||
            (other.minx >= this.minx && other.minx < this.maxx) || 
            (other.maxx > this.minx && other.maxx <= this.maxx);
        let yoverlap = (this.miny >= other.miny && this.miny < other.maxy) ||
            (this.maxy > other.miny && this.maxy <= other.maxy) ||
            (other.miny >= this.miny && other.miny < this.maxy) || 
            (other.maxy > this.miny && other.maxy <= this.maxy);
        return xoverlap && yoverlap;    
    }

    overlapsXY(testX, testY) {
        return testX >= this.x && testX <= this.x + this.width &&
                testY >= this.y && testY <= this.y + this.height;
    }

    draw(renderCtx) {
        colorRect(this.minx, this.miny, this.width, this.height, this.color);
        colorRect(this.x-4, this.y-4, 8, 8, "black");
    }
}