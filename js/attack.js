
class Attack {
    static _specs;
    static _meleeDuration = _meleeFrameDuration * 8;

    // initialize specs
    static _initSpecs() {
        this._specs = {};
        this._specs["ranged"] = {
            [Animator.idleEast]: {
                state: Animator.attackEast,
                sketch: assets.generate("ARROW_ONE_DROP"),
                collider: {
                    color: "red",
                    width: 40,
                    height: 20,
                },
                ttl: 450,
                //angle: Math.PI*.5,
                angle: 0,
                rotation: Math.PI * .5,
            },
            [Animator.idleWest]: {
                state: Animator.attackWest,
                sketch: assets.generate("ARROW_ONE_DROP"),
                collider: {
                    color: "red",
                    width: 40,
                    height: 20,
                },
                ttl: 450,
                angle: Math.PI,
                rotation: Math.PI * .5,
            },
            [Animator.idleNorth]: {
                state: Animator.attackNorth,
                sketch: assets.generate("ARROW_ONE_DROP"),
                collider: {
                    color: "red",
                    width: 25,
                    height: 25,
                },
                ttl: 450,
                angle: -Math.PI*.5,
                rotation: Math.PI * .5,
            },
            [Animator.idleSouth]: {
                state: Animator.attackSouth,
                sketch: assets.generate("ARROW_ONE_DROP"),
                collider: {
                    color: "red",
                    width: 25,
                    height: 25,
                },
                ttl: 450,
                angle: Math.PI*.5,
                rotation: Math.PI * .5,
            },
        };
        this._specs["ranged"][Animator.idle] = this._specs["ranged"][Animator.idleSouth];

        this._specs["melee"] = {
            [Animator.idleSouth]: {
                state: Animator.attackSouth,
                sketch: sword,
                collider: {
                    color: "red",
                    width: 35,
                    height: 25,
                    xoff:0, 
                    yoff:20,
                },
                syncMap: {
                    //0: { origx: -.15, angle: 2.16, x: -9, y: -5, },
                    0: { origx: -.15, angle: -.47, x: 5, y: -6, },
                    1: { origx: -.15, angle: -.15, x: 0, y: 1, },
                    2: { origx: -.15, angle: 2.04, x: -9, y: 0, },
                    3: { origx: -.15, angle: 2.83, x: -19, y: 1, },
                    4: { origx: -.15, angle: 3.14, x: -20, y: 0, },
                    5: { origx: -.15, angle: 2.67, x: -19, y: 1, },
                    6: { origx: -.15, angle: 1.72, x: -12, y: 2, },
                },
                startAngle: Math.PI*.25,
                endAngle: Math.PI*.75,
                ttl: this._meleeDuration,
            },
            [Animator.idleNorth]: {
                state: Animator.attackNorth,
                sketch: sword,
                collider: {
                    color: "red",
                    width: 35,
                    height: 25,
                    xoff:0, 
                    yoff:-25,
                },
                syncMap: {
                    //0: { origx: -.15, angle: 1.06, x: 11, y: -4, },
                    0: { origx: -.15, angle: -2.98, x: -3, y: -12, },
                    1: { origx: -.15, angle: -2.5, x: -1, y: -10, },
                    2: { origx: -.15, angle: -1.26, x: 6, y: -12, },
                    3: { origx: -.15, angle: -.15, x: 21, y: -2, },
                    4: { origx: -.15, angle: 0, x: 22, y: -4, },
                    5: { origx: -.15, angle: .15, x: 18, y: -3, },
                    6: { origx: -.15, angle: .78, x: 10, y: 2, },
                },
                startAngle: Math.PI*1.25,
                endAngle: Math.PI*1.75,
                reach: -.5,
                ttl: this._meleeDuration,
            },
            [Animator.idleWest]: {
                state: Animator.attackWest,
                sketch: sword,
                collider: {
                    color: "red",
                    width: 25,
                    height: 35,
                    xoff:-25, 
                    yoff:0,
                },
                syncMap: {
                    //0: { origx: -.15, angle: 1.06, x: 1, y: -5, },
                    0: { origx: -.15, angle: -2.51, x: -8, y: -10, },
                    1: { origx: -.15, angle: -3.12, x: -12, y: -3, },
                    2: { origx: -.15, angle: 2.51, x: -12, y: 3, },
                    3: { origx: -.15, angle: 2.21, x: -6, y: 5, },
                    4: { origx: -.15, angle: .94, x: -6, y: 7, },
                    5: { origx: -.15, angle: .78, x: -7, y: 4, },
                    6: { origx: -.15, angle: .78, x: -7, y: 6, },
                },
                startAngle: Math.PI*1.25,
                endAngle: Math.PI*.75,
                ttl: this._meleeDuration,
            },
            [Animator.idleEast]: {
                state: Animator.attackEast,
                sketch: sword,
                collider: {
                    color: "red",
                    width: 25,
                    height: 35,
                    xoff:25, 
                    yoff:0,
                },
                syncMap: {
                    //0: { origx: -.15, angle: 1.21, x: -6, y: -5, },
                    0: { origx: -.15, angle: -.63, x: 8, y: -10, },
                    1: { origx: -.15, angle: 0, x: 12, y: -3, },
                    2: { origx: -.15, angle: .63, x: 12, y: 3, },
                    3: { origx: -.15, angle: .94, x: 6, y: 5, },
                    4: { origx: -.15, angle: 2.21, x: 6, y: 7, },
                    5: { origx: -.15, angle: 2.36, x: 7, y: 4, },
                    6: { origx: -.15, angle: 2.36, x: 7, y: 6, },
                },
                startAngle: -Math.PI*.25,
                endAngle: Math.PI*.25,
                ttl: this._meleeDuration,
            },
        };
        this._specs["melee"][Animator.idle] = this._specs["melee"][Animator.idleSouth];
    }

    static getSpec(tag) {
        if (!this._specs) this._initSpecs();
        return this._specs[tag];
    }

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

/**
 * attack synced to animation of actor
 */
class SyncAttack {

    constructor(spec={}) {
        // actor for attack (who is attacking?)
        this._actor = spec.actor || {x:0, y:0, idleState: Animator.idle, sketch: Sketch.zero};
        this._actorState = this._actor.idleState;
        this._animIdx = this._actor.sketch.animIdx;
        // collider associated w/ attack
        this._collider = new Collider(spec.collider || {});
        // is attack still active
        this._active = true;
        // attack sketch
        this._sketch = spec.sketch || Sketch.zero;
        // sync map
        this._syncMap = spec.syncMap || {};
        this._idleState = spec.idleState || Animator.idle;
        this._xform = new XForm({
            width: this._sketch.width,
            height: this._sketch.height,
        });
        // damage of attack...
        this._damage = spec.damage || 5;
        // ignore list... entities for which not to apply attack damage to
        // starts w/ actor, then applies to entities already hit (don't do damage continuously when colliders hit)
        this._ignore = [ this._actor ];
        // hackety hack hack: update is being called on attack before animation has started, so attack thinks animation
        // is done... so wait a frame before actually calling attack update...
        this.firstUpdate = true; 
        this.updateSwing(this._animIdx);
    }

    get active() {
        return this._active;
    }
    get idleState() {
        return this._idleState;
    }

    updateSwing(animIdx) {
        // lookup sync info based on index
        let sync = this._syncMap[animIdx];
        if (sync) {
            //console.log("modify swing: " + Fmt.ofmt(sync));
            this._xform.modify(sync);
        }
        this._animIdx = animIdx;
    }

    update(ctx) {
        // hackety hack hack: update is being called on attack before animation has started, so attack thinks animation
        // is done... so wait a frame before actually calling attack update...
        if (this.firstUpdate) {
            this.firstUpdate = false;
            return;
        }
        // check for state transition
        if (this._actor.idleState === Animator.idle || this._actor.idleState !== this._actorState) {
            //console.log("setting active to false: actor state: " + this._actor.idleState);
            this._active = false;
        }
        // check for animation completion
        if (this._actor.sketch.done) {
            //console.log("setting active to false: sketch done");
            //console.log("sketch: " + this._actor.sketch._anim);
            this._active = false;
        }
        // ## STOP update if not active
        if (!this.active) return;
        // update swing transform
        if (this._actor.sketch.animIdx !== this._animIdx) {
            //console.log("update index: " + this._actor.sketch.animIdx);
            this.updateSwing(this._actor.sketch.animIdx);
        }
        // update collider
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

class RangedAttack {
    constructor(spec={}) {
        // actor for attack (who is attacking?)
        this._actor = spec.actor || {x:0, y:0};
        // collider associated w/ attack
        this._collider = new Collider(spec.collider || {});
        // ttl for attack
        this._ttl = spec.ttl || 250;
        this._speed = spec.speed || .5; // pixels per ms
        // is attack still active
        this._active = true;
        // attack sketch
        this._sketch = spec.sketch || Sketch.zero;
        this._idleState = spec.idleState || Animator.idle;
        // angle of attack (which direction are we shooting?)
        let angle = spec.angle || 0;
        // rotation of sprite
        let rotation = spec.rotation || 0;
        this._xform = new XForm({
            angle: angle + rotation,
            width: this._sketch.width,
            height: this._sketch.height,
        });
        // current position of attack
        let aoffx = spec.actorOffsetx || 0;
        let aoffy = spec.actorOffsety || 0;
        this._x = this._actor.x + aoffx;
        this._y = this._actor.y + aoffy;
        this._dx = Math.cos(angle) * this._speed;
        this._dy = Math.sin(angle) * this._speed;
        // damage of attack...
        this._damage = spec.damage || 5;
        this._piercing = Util.objKeyValue(spec, "piercing", false);
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
        if (this._ttl <= 0) {
            this._active = false;
        }
        // update position
        this._x += this._dx * ctx.deltaTime;
        this._y += this._dy * ctx.deltaTime;
        // update collider
        if (this.active) {
            this._collider.update(this._x, this._y, currentLevel.idxfromxy.bind(currentLevel));
            // see if collider has hit anything...
            let ohits = currentLevel.findAllObjectEnemy((v) => this._collider.overlaps(v.collider) && !this._ignore.includes(v));
            for (const ohit of ohits) {
                // check for collision w/ non-health colliders that will block projectile
                if (!ohit.health) {
                    if (ohit.active && ohit.collider.blocking) {
                        this._active = false;
                        return;
                    } else { // not a blocking collider, ignore it
                        continue;
                    }
                }
                console.log("attack applying damage to: " + ohit);
                // apply damage
                ohit.takeDamage(this._damage);
                // add object to ignore list
                this._ignore.push(ohit);
                // nudge object
                let v = new Vect(ohit.x-this._x, ohit.y-this._y).normalize().mult(.15);
                let xnudge = {
                    ttl: 100,
                    dx: v.x,
                    dy: v.y,
                    target: ohit,
                }
                ohit.nudge = new Nudge(xnudge);
                // if not piercing... we are done
                if (!this._piercing) {
                    this._active = false;
                    return;
                }
            }

            // check for tile collisions
            let idx = currentLevel.idxfromxy(this._x, this._y);
            let id = currentLevel.fgi(idx);
            if (id && !props.passable(id)) {
                this._active = false;
                return;
            }
        }
    }

    render(ctx) {
        ctx.translate(this._x, this._y)
        this._xform.apply(ctx);
        this._sketch.render(ctx, this._xform.minx, this._xform.miny);
        this._xform.revert(ctx);
        ctx.translate(-this._x, -this._y)
        if (showCollisions) {
            this._collider.draw(ctx);
        }
    }

}