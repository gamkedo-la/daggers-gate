class Shape extends Sketch {
    constructor(spec={}) {
        super(spec);
        this._borderWidth = Util.objKeyValue(spec, "borderWidth", 0);
        this._fill = Util.objKeyValue(spec, "fill", true);
        this._color = spec.color || "rgba(127,127,127,1)";
        this._borderColor = spec.borderColor || "black";
        let verts = spec.verts || [{x:0,y:0}, {x:20,y:0}, {x:20,y:20}, {x:0,y:20}];
        let [path, min, max] = this.toPath(verts)
        this._path = path;
        this._width = max.x-min.x;
        this._height = max.y-min.y;
    }

    toPath(verts) {
        let path = new Path2D();
        let min = {x: verts[0].x, y:verts[0].y};
        let max = {x: verts[0].x, y:verts[0].y};
        path.moveTo(verts[0].x, verts[0].y);
        for (let i=1; i<verts.length; i++) {
            let vert = verts[i];
            if (vert.x < min.x) min.x = vert.x;
            if (vert.x > max.x) max.x = vert.x;
            if (vert.y < min.y) min.y = vert.y;
            if (vert.y > max.y) max.y = vert.y;
            path.lineTo(vert.x, vert.y);
        }
        path.closePath();
        return [path, min, max];
    }

    _render(ctx, x=0, y=0) {
        if (x || y) ctx.translate(x, y);
        if (this._fill) {
            ctx.fillStyle = this._color;
            ctx.fill(this._path);
        }
        if (this._borderWidth) {
            ctx.lineWidth = this._borderWidth;
            ctx.strokeStyle = this._borderColor;
            ctx.stroke(this._path);
        }
        if (x || y) ctx.translate(-x, -y);
    }    
}