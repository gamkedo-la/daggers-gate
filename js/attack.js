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
        // damage of attack...
        this._damage = spec.damage || 5;
        // ignore list... entities for which not to apply attack damage to
        // starts w/ actor, then applies to entities already hit (don't do damage continuously when colliders hit)
        this._ignore = [ this._actor ];
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

            // see if collider has hit anything...
            let ohits = currentLevel.findAllObjectEnemy((v) => v.health && this._collider.overlaps(v.collider) && !this._ignore.includes(v));
            for (const ohit of ohits) {
                console.log("attack applying damage to: " + ohit);
                // apply damage
                ohit.takeDamage(this._damage);
                // add object to ignore list
                this._ignore.push(ohit);
                // nudge object
                let v = new Vect(ohit.x-this._actor.x, ohit.y-this._actor.y).normalize().mult(.15);
                let xnudge = {
                    ttl: 100,
                    dx: v.x,
                    dy: v.y,
                    target: ohit,
                }
                ohit.nudge = new Nudge(xnudge);
            }
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