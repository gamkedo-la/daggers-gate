
class Attack {
    static _specs;
    static _meleeDuration = _playerMeleeFrameDuration * 8;

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

        this._specs["ice"] = {
            [Animator.idleEast]: {
                state: Animator.attackEast,
                sketch: iceball,
                collider: {
                    color: "red",
                    width: 20,
                    height: 20,
                },
                ttl: 450,
                angle: 0,
            },
            [Animator.idleWest]: {
                state: Animator.attackWest,
                sketch: iceball,
                collider: {
                    color: "red",
                    width: 20,
                    height: 20,
                },
                ttl: 450,
                angle: Math.PI,
            },
            [Animator.idleNorth]: {
                state: Animator.attackNorth,
                sketch: iceball,
                collider: {
                    color: "red",
                    width: 20,
                    height: 20,
                },
                ttl: 450,
                angle: -Math.PI*.5,
            },
            [Animator.idleSouth]: {
                state: Animator.attackSouth,
                sketch: iceball,
                collider: {
                    color: "red",
                    width: 20,
                    height: 20,
                },
                ttl: 450,
                angle: Math.PI*.5,
            },
        };
        this._specs["ice"][Animator.idle] = this._specs["ice"][Animator.idleSouth];

        this._specs["fire"] = {
            [Animator.idleEast]: {
                state: Animator.attackEast,
                sketch: fireball,
                collider: {
                    color: "red",
                    width: 20,
                    height: 20,
                },
                ttl: 650,
                speed: .35,
                angle: 0,
            },
            [Animator.idleWest]: {
                state: Animator.attackWest,
                sketch: fireball,
                collider: {
                    color: "red",
                    width: 20,
                    height: 20,
                },
                ttl: 650,
                speed: .35,
                angle: Math.PI,
            },
            [Animator.idleNorth]: {
                state: Animator.attackNorth,
                sketch: fireball,
                collider: {
                    color: "red",
                    width: 20,
                    height: 20,
                },
                ttl: 650,
                speed: .35,
                angle: -Math.PI*.5,
            },
            [Animator.idleSouth]: {
                state: Animator.attackSouth,
                sketch: fireball,
                collider: {
                    color: "red",
                    width: 20,
                    height: 20,
                },
                ttl: 650,
                speed: .35,
                angle: Math.PI*.5,
            },
        };
        this._specs["fire"][Animator.idle] = this._specs["fire"][Animator.idleSouth];

        this._specs["melee"] = {
            [Animator.idleSouth]: {
                state: Animator.attackSouth,
                sketch: assets.generate("SWORD"),
                collider: {
                    color: "red",
                    width: 60,
                    height: 45,
                    xoff:0, 
                    yoff:20,
                },
                rotation: Math.PI*.25,
                syncMap: {
                    0: { angle: -.47, offx: 11, offy: -4, },
                    1: { angle: -.15, offx: 2, offy: 2, },
                    2: { angle: 2.04, offx: -13, offy: 2, },
                    3: { angle: 2.83, offx: -21, offy: 0, },
                    4: { angle: 3.14, offx: -23, offy: -3, },
                    5: { angle: 2.67, offx: -21, offy: -1, },
                    6: { angle: 1.72, offx: -15, offy: 3, },
                },
                startAngle: Math.PI*.25,
                endAngle: Math.PI*.75,
                ttl: this._meleeDuration,
            },
            [Animator.idleNorth]: {
                state: Animator.attackNorth,
                sketch: assets.generate("SWORD"),
                collider: {
                    color: "red",
                    width: 60,
                    height: 45,
                    xoff:0, 
                    yoff:-20,
                },
                syncMap: {
                    0: { angle: -2.98,  offx: -3, offy: -12, },
                    1: { angle: -2.5,   offx: -1, offy: -10, },
                    2: { angle: -1.26,  offx: 6, offy: -12, },
                    3: { angle: -.15,   offx: 21, offy: 1, },
                    4: { angle: 0,      offx: 22, offy: -1, },
                    5: { angle: .15,    offx: 20, offy: 0, },
                    6: { angle: .78,    offx: 9, offy: 3, },
                },
                startAngle: Math.PI*1.25,
                endAngle: Math.PI*1.75,
                reach: -.5,
                ttl: this._meleeDuration,
            },
            [Animator.idleWest]: {
                state: Animator.attackWest,
                sketch: assets.generate("SWORD"),
                collider: {
                    color: "red",
                    width: 45,
                    height: 50,
                    xoff:-30, 
                    yoff:0,
                },
                syncMap: {
                    0: { angle: -2.51,  offx: -10, offy: -13, },
                    1: { angle: -3.12,  offx: -16, offy: -6, },
                    2: { angle: 2.51,   offx: -18, offy: 5, },
                    3: { angle: 2.21,   offx: -12, offy: 9, },
                    4: { angle: .94,    offx: -4, offy: 10, },
                    5: { angle: .62,    offx: -7, offy: 7, },
                    6: { angle: .78,    offx: -6, offy: 9, },
                },
                startAngle: Math.PI*1.25,
                endAngle: Math.PI*.75,
                ttl: this._meleeDuration,
            },
            [Animator.idleEast]: {
                state: Animator.attackEast,
                sketch: assets.generate("SWORD"),
                collider: {
                    color: "red",
                    width: 45,
                    height: 50,
                    xoff:30, 
                    yoff:0,
                },
                syncMap: {
                    0: { angle: -.63,   offx: 15, offy: -10, },
                    1: { angle: 0,      offx: 14, offy: -1, },
                    2: { angle: .63,    offx: 16, offy: 9, },
                    3: { angle: .94,    offx: 9, offy: 11, },
                    4: { angle: 2.21,   offx: 1, offy: 8, },
                    5: { angle: 2.51,   offx: 2, offy: 7, },
                    6: { angle: 2.36,   offx: 3, offy: 6, },
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
            let ohits = currentLevel.findAll((v) => v.health && this._collider.overlaps(v.collider) && !this._ignore.includes(v));
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
        //console.log("spec is: " + Fmt.ofmt(spec));
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
        this._rotation = spec.rotation || 0;
        this._weapon = spec.weapon;
        this._baseXform = new XForm(Object.assign({
            width: this._sketch.width,
            height: this._sketch.height,
        }, (this._weapon)?this._weapon.xxform:undefined));
        this._xform = this._baseXform.copy();
        //console.log(`attack xform: ${this._xform}`);
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
            this._xform = this._baseXform.copy();
            this._xform.add(sync);
            //console.log("swing xform: " + this._xform);
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
        let ohits = currentLevel.findAll((v) => v.health && this._collider.overlaps(v.collider) && !this._ignore.includes(v));
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
        //ctx.fillStyle = "rgba(255,0,0,.75)";
        //ctx.fillRect(-5,-5,5,5);
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
    set active(v) {
        this._active = v;
    }
    get idleState() {
        return this._idleState;
    }

    get x() { return this._x; }
    get y() { return this._y; }

    update(ctx) {
        this._ttl -= ctx.deltaTime;
        if (this._ttl <= 0) {
            this.active = false;
        }
        // update position
        this._x += this._dx * ctx.deltaTime;
        this._y += this._dy * ctx.deltaTime;
        // update collider
        if (this.active) {
            this._collider.update(this._x, this._y, currentLevel.idxfromxy.bind(currentLevel));
            // see if collider has hit anything...
            let ohits = currentLevel.findAll((v) => this._collider.overlaps(v.collider) && !this._ignore.includes(v));
            for (const ohit of ohits) {
                // check for collision w/ non-health colliders that will block projectile
                if (!ohit.health) {
                    if (ohit.active && ohit.collider.blocking) {
                        this.active = false;
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
                    this.active = false;
                    return;
                }
            }

            // check for tile collisions
            let idx = currentLevel.idxfromxy(this._x, this._y);
            let id = currentLevel.fgi(idx);
            if (id && !props.passable(id) && !props.permeable(id)) {
                this.active = false;
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