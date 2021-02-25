
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