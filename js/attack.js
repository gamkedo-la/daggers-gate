class Attack {
    constructor(spec={}) {
        // actor for attack (who is attacking?)
        this._actor = spec.actor || {x:0, y:0};
        // collider associated w/ attack
        this._collider = new Collider(spec.collider || {});
        // ttl for attack
        this._ttl = spec.ttl || 125;
        // is attack still active
        this._active = true;
        // attack sketch
        this._sketch = spec.sketch || Sketch.zero;
        // reach of weapon
        let reach = spec.reach || -.25;
        this._startAngle = spec.startAngle || 0;
        this._endAngle = spec.endAngle || 0;
        this._angleRate = (this._endAngle - this._startAngle) / this._ttl;
        this._idleState = spec.idleState || Animator.idle;
        this._xform = new XForm({
            angle: this._startAngle,
            width: this._sketch.width,
            height: this._sketch.height,
            origx: reach,
        });
    }

    get active() {
        return this._active;
    }
    get idleState() {
        return this._idleState;
    }

    update(ctx) {
        this._ttl -= ctx.deltaTime;
        let dangle = ctx.deltaTime * this._angleRate;
        this._xform.angle += dangle;
        if (this._ttl <= 0) {
            this._active = false;
        }
        // update collider
        if (this.active) {
            this._collider.update(this._actor.x, this._actor.y, currentLevel.idxfromxy.bind(currentLevel));
        }
    }

    render(ctx) {
        ctx.translate(this._actor.x, this._actor.y)
        this._xform.apply(ctx);
        this._sketch.render(ctx, this._xform.minx, this._xform.miny);
        this._xform.revert(ctx);
        //this._xform.render(ctx);
        ctx.translate(-this._actor.x, -this._actor.y)
        if (showCollisions) {
            this._collider.draw(ctx);
        }
    }
}