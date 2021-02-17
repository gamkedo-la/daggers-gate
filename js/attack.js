class Attack {
    constructor(spec={}) {
        // actor for attack (who is attacking?)
        this._actor = spec.actor || {x:0, y:0};
        // collider associated w/ attack
        this._collider = new Collider(spec.collider || {});
        // ttl for attack
        this._ttl = spec.ttl || 150;
        // is attack still active
        this._active = true;
        // attack sketch
        this._sketch = spec._sketch || Sketch.zero;
    }

    get active() {
        return this._active;
    }

    update(ctx) {
        this.ttl -= ctx.deltaTime;
        if (this.ttl <= 0) {
            this._active = false;
        }
        // update collider
        if (this.active) {
            this._collider.update(this._actor.x, this._actor.x, currentLevel.idxfromxy.bind(currentLevel));
        }
    }

    render(ctx) {
        if (showCollisions) {
            this._collider.draw(ctx);
        }
    }
}