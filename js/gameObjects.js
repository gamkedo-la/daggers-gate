// tuning 
var objectNameList = ['fireRune', 'windRune', 'waterRune', 'earthRune'];

var actionKindMap = {
    "door": "open",
    "chest": "open",
    "pickup": "grab",
    "altar": "drop",
    "npc": "talk",
    "pushable": "push",
}

// used to "nudge" a game object a short distance before expiring...
class Nudge {
    constructor(spec={}) {
        this.target = spec.target;
        this.ttl = spec.ttl || 100;
        this.dx = Util.objKeyValue(spec, "dx", Math.random() * .5);
        this.ddx = this.dx/this.ttl;
        this.dy = Util.objKeyValue(spec, "dy", Math.random() * .5);
        this.ddy = this.dy/this.ttl;
    }

    get done() {
        return (this.ttl <= 0);
    }

    update(ctx) {
        this.ttl -= ctx.deltaTime;
        if (this.ttl > 0) {
            this.target.x += (this.dx * ctx.deltaTime);
            this.target.y += (this.dy * ctx.deltaTime);
            this.dx -= this.ddx * ctx.deltaTime;
            this.dy -= this.ddy * ctx.deltaTime;
        }
    }
}

class Translation {
    constructor(spec={}) {
        this.target = spec.target;
        this.ttl = spec.ttl || 700;
        this.x = Util.objKeyValue(spec, "x", 0);
        this.y = Util.objKeyValue(spec, "y", 0);
        this.dx = (this.x-this.target.x)/this.ttl;
        this.dy = (this.y-this.target.y)/this.ttl;
    }

    get done() {
        return (this.ttl <= 0);
    }

    update(ctx) {
        this.ttl -= ctx.deltaTime;
        if (this.ttl > 0) {
            this.target.x += (this.dx * ctx.deltaTime);
            this.target.y += (this.dy * ctx.deltaTime);
        } else {
            this.target.x = this.x;
            this.target.y = this.y;
        }
    }
}

//gameObjects have similar code to Character class for movement.
class gameObjectClass extends characterClass {
    constructor(spec={}) {
        spec.collider = Object.assign({
            color: "rgba(245,133,73,.5)", 
        }, spec.collider);
        // set spec defaults
        spec.kind = spec.kind || "object";
        super(spec);
        this.trap = (spec.trap) ? Object.assign({}, spec.trap) : undefined;
        if (this.trap) {
            // pick random ttl, so that traps do not go off at the same time
            let ttl = Math.floor(Math.random() * this.trap.idleTTL);
            this.trap.ttl = ttl;
            this.trap.ignore = [this];
            if (!this.trap.projectile) this.active = false;
            this.idleState = (this.trap.projectile) ? this.trap.facing : Animator.idle;
            this.state = this.idleState;
            if (this.trap.facing) this._facing = this.trap.facing;
        }
        this.correctPuzzleLocation = false;
        this.want = spec.want || undefined;
        this.gateCondition = spec.gateCondition || (() => false);
        // tag object w/ wanted action
        this.wantAction = actionKindMap[this.kind];
        this.nudge = (spec.nudge) ? new Nudge(Object.assign({}, spec.nudge, {target:this})): undefined;
        this.loot = spec.loot;
        this.mainHand = spec.mainHand;
        this.offHand = spec.offHand;
        this.misc = spec.misc;
        this.attackKind = spec.attackKind;
        this.lateRender = Util.objKeyValue(spec, "lateRender", false);
        this.overlay = Util.objKeyValue(spec, "overlay", false);
        this.locked = Util.objKeyValue(spec, "locked", true);
        this.autoclose = Util.objKeyValue(spec, "autoclose", false);
        this.resetRange = Util.objKeyValue(spec, "resetRange", 0);
        this.xxform = spec.xxform || undefined;
    }

    get facing() {
        if (this._facing) return this._facing;
        switch (this._state) {
        case Animator.idleEast:
        case Animator.attackEast:
        case Animator.walkEast:
            return Animator.idleEast;
        case Animator.idleWest:
        case Animator.attackWest:
        case Animator.walkWest:
            return Animator.idleWest;
        case Animator.idleNorth:
        case Animator.attackNorth:
        case Animator.walkNorth:
            return Animator.idleNorth;
        }
        return Animator.idleSouth;
    }

    interact(character) {
        switch (this.kind) {
        case "door":
            if (this.state !== Animator.open) {
                if (this.tag === "TEMPLE_GATE") {
                    if (character.inventory.includes("TEMPLE_KEY")) {
                        this.state = Animator.open;
                        this.wantAction = undefined;
                        this.locked = false;
                        this.active = false;
                        doorOpenning.play();
                    }
                } else if (!this.locked || character.keysHeld > 0) {
                    if (this.locked) {
                        character.keysHeld--; // one less key
                        document.getElementById("debugText").innerHTML = "Keys: " + character.keysHeld;
                    }
                    this.state = Animator.open;
                    this.wantAction = undefined;
                    this.locked = false;
                    this.active = false;
                    doorOpenning.play();
                }
            }
            break;
        case "chest":
            if (this.state !== Animator.open) {
                if (character.keysHeld > 0) {
                    character.keysHeld--; // one less key
                    document.getElementById("debugText").innerHTML = "Keys: " + character.keysHeld;
                    this.state = Animator.open;
                    this.wantAction = undefined;
                    this.spawnLoot();
                }
            }
            break;
        case "pickup":
            if (!character.grabbedObj) {
                character.grabbedObj = this;
                //this.visible = false; // object is drawn during player render, don't draw during lvl render
                //console.log("picked up: " + this);
            }
            break;
        case "altar":
            if (character.grabbedObj && character.grabbedObj.tag === this.want) {
                //console.log("placing gem on altar...");
                // character drops object
                let obj = character.grabbedObj;
                character.grabbedObj = undefined;
                // change altar state
                this.state = Animator.solved;
                // destroy dropped object
                currentLevel.destroyObject(obj);
            }
            break;
        case "pushable":
            // if currently in translation... don't allow to be pushed again until translation is done...
            if (this.translation) return;
            // determine direction from player to object
            let v = new Vect(this.x-character.x, this.y-character.y);
            let heading = v.heading();
            if (heading < 0) heading += 360;
            // determine direction from heading
            let wantIndex;
            let myIndex = currentLevel.idxfromxy(this.x, this.y);
            // -- south
            if (heading >= 45 && heading < 135) {
                wantIndex = currentLevel.downFromIdx(myIndex);
            // -- west
            } else if (heading >= 135 && heading < 225) {
                wantIndex = currentLevel.leftFromIdx(myIndex);
            // -- north
            } else if (heading >= 225 && heading < 315) {
                wantIndex = currentLevel.upFromIdx(myIndex);
            // -- east
            } else {
                wantIndex = currentLevel.rightFromIdx(myIndex);
            }
            if (wantIndex === myIndex) return;
            let clear = currentLevel.isClearAtIdx(wantIndex);
            if (clear) {
                // start translation
                let tx = currentLevel.xfromidx(wantIndex, true);
                let ty = currentLevel.yfromidx(wantIndex, true);
                let trans = new Translation({target: this, x:tx, y:ty});
                this.translation = trans;
            }
            break;
        }
    }

    /**
     * What to do when another character has collided with us
     * @param {*} other 
     */
    checkCollisionAgainst(other) {
        // handle button collisions
        if (this.kind === "button" && other === p1) {
            if (p1.collider.overlaps(this.collider)) {
                if (this.state === Animator.idle) {
                    this.state = Animator.pressed;
                    if (this.resetRange) {
                        let v1 = new Vect(this.x, this.y);
                        for (const obj of currentLevel.findObject((obj) => obj.kind === "pushable" && v1.dist(obj.x, obj.y) <= this.resetRange)) {
                            obj.reset();
                        }
                    }
                }
            } else {
                if (this.state !== Animator.idle) {
                    this.state = Animator.idle;
                }
            }
        }
        if (this.kind === "void") {
            if (p1.collider.overlaps(this.collider)) {
                if (!other.falling) {
                    other.doFall(this.x, this.y);
                }
            }
        }
        // FIXME: handling damage by player running into spikes goes here...

    }

    update(updateCtx) {
        // handle trap updates
        if (this.trap) {
            // for projectile traps...
            // -- state is managed as either idle, or in attacking state
            if (this.trap.projectile) {
                if (!this.currentAttack) {
                    if (this.startedTimer) {
                        this.trap.ttl += updateCtx.deltaTime;
                        if (this.trap.ttl > this.trap.idleTTL) {
                            let projectileDelay = this.trap.projectileDelay || 0;
                            if (this.trap.ttl > this.trap.idleTTL + projectileDelay) {
                                // setup attack
                                let actionData = {
                                    manaCost: 0,
                                    attackKind: this.trap.projectile,
                                    xoff: this.trap.attackXoff || 0,
                                    yoff: this.trap.attackYoff || 0,
                                }
                                this.doMagicAttack(actionData);
                                this.startedTimer = false;
                            } else {
                                if (this.state !== Animator.delay) {
                                    this.state = Animator.delay;
                                }
                            }
                        }
                    } else {
                        this.startedTimer = true;
                        this.trap.ttl = 0;
                    }
                }

            // for stationary traps
            // -- state is handled via timers
            // ---- idle timer for idle state
            // ---- active timer for active state
            } else {
                let duration = (this.state === this.idleState) ? this.trap.idleTTL : this.trap.activeTTL;
                this.trap.ttl += updateCtx.deltaTime;
                // swap states once we have reached state TTL
                if (this.trap.ttl > duration) {
                    this.trap.ttl = 0;
                    this.state = (this.state === this.idleState) ? Animator.active : Animator.idle;
                    this.active = (this.state === Animator.active);
                    // reset ignore list during state transitions
                    this.trap.ignore = [this];
                }

                // handle trap effects
                if (this.active) {
                    if (this.collider.overlaps(p1.collider) && !this.trap.ignore.includes(p1)) {
                        //console.log("player taking trap damage: " + this.trap.damage);
                        p1.takeDamage(this.trap.damage);
                        this.trap.ignore.push(p1);
                    }
                    let ohits = currentLevel.findAll((v) => v.health > 0 && this.collider.overlaps(v.collider) && !this.trap.ignore.includes(v));
                    for (const ohit of ohits) {
                        //console.log("enemy: " + ohit + " taking trap damage: " + this.trap.damage);
                        ohit.takeDamage(this.trap.damage);
                        this.trap.ignore.push(ohit);
                    }
                }
            }
        }

        // handle overlay
        if (this.overlay) {
            if (this.collider.overlaps(p1.interactCollider)) {
                if (this.state === Animator.idle) this.state = Animator.idleTransparent;
                if (this.state === Animator.open) this.state = Animator.openTransparent;
            } else {
                if (this.state === Animator.idleTransparent) this.state = Animator.idle;
                if (this.state === Animator.openTransparent) this.state = Animator.open;
            }
        }

        // handle loot delay
        if (this.loot) {
            if (this.loot.delayTTL > 0) {
                this.loot.delayTTL -= updateCtx.deltaTime;
                if (this.loot.delayTTL < 0) this.loot.delayTTL = 0;
            }
        }

        // handle autoclose
        if (this.autoclose && this.kind === "door" && this.state === Animator.open) {
            if (!this.collider.overlaps(p1.interactCollider)) {
                this.state = Animator.close;
                this.wantAction = actionKindMap[this.kind];
                this.active = true;
            }
        }

        // handle gate conditions
        if (this.kind === "altarGate" && this.state !== Animator.open) {
            let solved = this.gateCondition();
            /*
            for (const obj of currentLevel.findObject((obj) => (obj.kind === "altar") && (obj.want === "GEM_EARTH"))) {
                solved &= (obj.state === Animator.solved);
            }
            */
            if (solved) {
                this.state = Animator.open;
            }
        }

		super.update(updateCtx);
    }

    //must override this function.  No super version
    tileCollisionHandle(nextX, nextY) {
    }

} // end of class