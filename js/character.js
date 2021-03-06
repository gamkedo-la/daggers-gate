
const actionTable = {
    "melee": "doMeleeAttack",
    "ranged": "doRangedAttack",
    "open": "doOpen",
    "grab": "doGrab",
    "drop": "doDrop",
    "place": "doPlace",
    "talk": "doTalk",
    "magic": "doMagicAttack",
    "push": "doPush",
}

const interactionWaitIterations = 3;
class characterClass {
    constructor(spec={}) {
        this.tileid = spec.tileid || 0;
        this.tag = spec.tag || "notag";
         // x/y offsets for drawing sprite from origin x,y      
        this.myName = spec.name || this.constructor.name;
        this.sketch = assets.generateFromSpec(spec.sketch) || Sketch.zero;
        this.xOff = spec.xOff || 0;          
        this.yOff = spec.yOff || 0;
        this.homeX = spec.x || 0;
        this.homeY = spec.y || 0;
        this.kind = spec.kind || "character";
        this._updateCtx = {};
        this.visible = true;
        this.dbgAnim = spec.dbgAnim || false;
        // add loot table
        this.lootTable = spec.lootTable || daggerLootTables[this.tag];
        // variables to keep track of position
        this.x;
        this.y;
        this.tilePath = [];
        this.pathfindingNow = false;
		this.movingSpeed = spec.movingSpeed || 4.0; // should be overwritten by specific class.
        // input states
        this.move_North = false;
        this.move_East = false;
        this.move_South = false;
        this.move_West = false;
        this.wantPrimaryAction = false;
        this.wantSecondaryAction = false;
        this.startPrimaryAction = false;
        this.startSecondaryAction = false;
        // primary/secondary action selectors
        this.selectedPrimary = "none";
        this.selectedSecondary = "none";
        this.chosenPrimary = "none";
        this.chosenSecondary = "none";
        // collisions
        this.collider = new Collider(Object.assign({}, spec.collider, {x: this.x, y:this.y}));
        this.nextCollider = this.collider.copy();
        this.interactCollider = (spec.interactCollider) ? new Collider(Object.assign({}, spec.interactCollider, {x: this.x, y:this.y})) : undefined;
        // melee attack
        // -- current attack
        this.currentAttack;
        // character attributes
        this.health = Util.objKeyValue(spec, "health", 0);
        this.maxHealth = Util.objKeyValue(spec, "maxHealth", 0);
        this.startHealth = this.maxHealth;
        this.mana = Util.objKeyValue(spec, "mana", 0);
        this.maxMana = Util.objKeyValue(spec, "maxMana", 0);
        this.startMana = this.maxMana;
        // variables for held objects
        this.grabbedObj;
        // linking of objects (used to handle double doors, where each part of the door is a separate object)
        this.wantLink = spec.link;
        this.linkVars = (spec.link && spec.link.vars) ? spec.link.vars : ["state", "active"];
        this.links = [];
        // -- linked variables (dependent on linkVars setting)
        this._state = Animator.idle;
        this._active = true;
        this.reset();
        this.waitForInteraction = 0;
        // delay timers
        this.delayBetweenAttacks = spec.delayBetweenAttacks || 200;
        this.attackDelayTTL = 0;
        this.delayDeath = spec.delayDeath || 500;
        this.deathTTL = 0;
        // scale/rotation
        this.scale = 1;
        this.angle = 0;
    }

    get state() {

        // handle idle state
        return this._state;
    }

    set state(v) {
        if (v !== this._state) {
            if (this === p1) {
                if (v === undefined) console.error("invalid state");
            }
            this._state = v;
            if (this.linkVars.includes("state")) for (const link of this.links) link._state = v;
        }
    }

    get facing() {
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

    get active() {
        return this._active;
    }

    set active(v) {
        if (v !== this._active) {
            this._active = v;
            if (this.linkVars.includes("active")) for (const link of this.links) link._active = v;
        }
    }

    get pathfinding() {
        return this.tilePath.length > 0;
    }

    link(other) {
        if (!this.links.includes(other)) this.links.push(other);
        if (!other.links.includes(this)) other.links.push(this);
    }

    unlink(other) {
        let idx = this.links.indexOf(other);
        if (idx !== -1) this.links.splice(idx, 1);
        idx = other.links.indexOf(this);
        if (idx !== -1) other.links.splice(idx, 1);
    }

    reset(all=false) {
        this.x = this.homeX;
        this.y = this.homeY;
        this.state = Animator.idle;
        if (all) {
            this.maxHealth = this.startHealth;
            this.health = this.startHealth;
            this.maxMana = this.startMana;
            this.mana = this.startMana;
        }
    } // end of reset

    tileCollisionHandle(nextX, nextY) {
        console.log("UNDEFINED FOR THIS SUBCLASS");
    }

    applyChilled() {
        if (disableCollisions && this === p1) return;
        this.chilled = true;
        this.chilledTTL = 5000;
        if (!this.chillFx) this.chillFx = new ChillFx({
            getx: () => this.x,
            gety: () => this.y,
        });
    }
    removeChilled() {
        this.chilled = false;
        this.chilledTTL = 0;
        if (this.chillFx) {
            this.chillFx.destroy();
            this.chillFx = undefined;
        }
    }

    applyPoisoned() {
        if (disableCollisions && this === p1) return;
        this.poisoned = true;
        this.poisonTick = 0;
        this.poisonedTTL = 20000;    // 20 seconds
        if (!this.poisonFx) this.poisonFx = new PoisonFx({
            getx: () => this.x,
            gety: () => this.y,
        });
    }
    removePoisoned() {
        this.poisoned = false;
        this.poisonedTTL = 0;
        this.poisonTick = 0;
        if (this.poisonFx) {
            this.poisonFx.destroy();
            this.poisonFx = undefined;
        }
    }

    applyBlown(dir) {
        if (disableCollisions && this === p1) return;
        if (this.falling) return;
        this.stopPathfinding();
        this.blown = true;
        this.blownDir = dir;
        if (!this.blownFx) this.blownFx = new BlownFx({
            getx: () => this.x,
            gety: () => this.y,
        });
    }
    removeBlown() {
        this.blown = false;
        this.move_East = this.move_West = this.move_North = this.move_South = false;
        if (this.blownFx) {
            this.blownFx.destroy();
            this.blownFx = undefined;
        }
    }

    doFall(x,y) {
        if (disableCollisions && this === p1) return;
        if (this.currentAttack) this.currentAttack = undefined;
        if (this.blown) this.removeBlown();
        if (this.grabbedObj) this.doDrop();
        this.falling = true;
        this.translation = new Translation({target: this, x:x, y:y, ttl: 200});
        this.fallTTL = 500;
        this.dscale = 1/this.fallTTL;
        this.dangle = Math.PI*2/this.fallTTL;
    }

    /**
     * spawn loot from object loot table
     * loot table should be of the form:
     * [
     * {
     *      chance: 0-1,
     *      kind: "gold"|"health"|"mana"|"arrow"
     *      min: int
     *      max: int
     *      amt: int
     * }
     * ]
     */
    spawnLoot() {
        for (const loot of (this.lootTable || [])) {
            console.log("checking for loot: " + Fmt.ofmt(loot));
            // roll for loot
            if (Math.random() <= loot.chance) {
                // randomize amount
                let amt = loot.amt;
                if (!loot.amt) {
                    let min = loot.min || 1;
                    let max = loot.max || 1;
                    amt = Math.floor(Math.random() * (max-min)) + min;
                }
                let angle = Math.random() * Math.PI * 2;
                let speed = .4; // pixels per ms
                let nudge = {
                    ttl: 200,
                    dx: Math.sin(angle)*speed,
                    dy: Math.cos(angle)*speed,
                }
                let id = assets.getId(loot.kind);
                let spec = {
                    kind: "loot",
                    tileid: id,
                    tag: loot.kind,
                    sketch: assets.get(loot.kind),
                    name: props.getName(id),
                    x: this.x,
                    y: this.y,
                    loot: {
                        amt: amt,
                        delayTTL: 500,
                    },
                    collider: {
                        blocking: false,
                    },
                    nudge:nudge,
                }
                let obj = new gameObjectClass(spec);
                console.log("loot: " + obj + " from: " + Fmt.ofmt(spec));
                currentLevel.addObject(obj);
            }
        }
    }

    primaryAction() {
        this.startPrimaryAction = false;
        this.wantPrimaryAction = false;
        let actionData = {
            target: this.targetObj,
            weapon: (this.inventory) ? this.inventory.mainHand : undefined,
        }
        let fcnTag = actionTable[this.chosenPrimary];
        if (fcnTag && this[fcnTag]) {
            this[fcnTag](actionData);
        }
    }

    secondaryAction() {
        this.startSecondaryAction = false;
        this.wantSecondaryAction = false;
        let actionData = {
            target: this.targetObj,
            weapon: (this.inventory) ? this.inventory.offHand : undefined,
        }
        let fcnTag = actionTable[this.chosenSecondary];
        if (fcnTag && this[fcnTag]) {
            this[fcnTag](actionData);
        }
    }

    faceTowards(target) {
        if (!target) return;
        // heading to target
        let v = new Vect(target.x-this.x, target.y-this.y);
        let heading = v.heading();
        if (heading > -135 && heading <= -45) {
            this.state = Animator.idleNorth;
        } else if (heading > -45 && heading <= 45) {
            this.state = Animator.idleEast;
        } else if (heading > 45 && heading <= 135) {
            this.state = Animator.idleSouth;
        } else {
            this.state = Animator.idleWest;
        }
    }

    walkTowards(target) {
        if (!target) return;
        // heading to target
        let v = new Vect(target.x-this.x, target.y-this.y);
        let heading = v.heading();
        if (heading > -135 && heading <= -45) {
            this.state = Animator.walkNorth;
        } else if (heading > -45 && heading <= 45) {
            this.state = Animator.walkEast;
        } else if (heading > 45 && heading <= 135) {
            this.state = Animator.walkSouth;
        } else {
            this.state = Animator.walkWest;
        }
    }

    // ACTIONS
    doMeleeAttack(data) {
        if (!this.currentAttack) {
            let tag = data.tag || "melee";
            // lookup attack
            let xattack = Object.assign({}, Attack.getSpec(tag)[this.facing], {actor: this, idleState: this.facing});
            // transition to attack state (based on idle direction)
            this.state = xattack.state;
            if (data.weapon) xattack.weapon = data.weapon;
            // start the attack
            xattack.collider = Object.assign({}, xattack.collider, {x:this.x, y:this.y});
            if (this === p1) {
                this.currentAttack = new SyncAttack(xattack);
            } else {
                this.currentAttack = new Attack(xattack);
            }
        }
    }

    doRangedAttack(data) {
        if (!this.currentAttack) {
            if (this.arrows <= 0) {
                console.log("no arrow!");
                return;
            }
            let xattack = Object.assign({}, Attack.getSpec("ranged")[this.facing], {actor: this, idleState: this.facing});
            xattack.collider = Object.assign({}, xattack.collider, {x:this.x, y:this.y});
            this.currentAttack = new RangedAttack(xattack);
            this.arrows -= 1;
            // transition to attack state (based on idle direction)
            this.state = xattack.state;
        }
    }

    doMagicAttack(data) {
        if (!this.currentAttack) {
            // resolve mana cost...
            let manaCost = data.hasOwnProperty("manaCost") ? data.manaCost : 5;
            if (this.mana < manaCost) {
                console.log("no mana!");
                return;
            }
            // resolve attack kind...
            let attackKind = data.attackKind;
            if (!attackKind) attackKind = (data.weapon && data.weapon.tag === "FIREWAND") ? "fire" : "ice";
            // resolve attack offsets
            let xoff = data.xoff || 0;
            let yoff = data.yoff || 0;
            // build attack
            let xattack = Object.assign({}, Attack.getSpec(attackKind)[this.facing], {actor: this, idleState: this.facing});
            xattack.collider = Object.assign({}, xattack.collider, {x:this.x, y:this.y});
            xattack.actorOffsetx = xoff;
            xattack.actorOffsety = yoff;
            if (attackKind === "fire") xattack.hitfx = (v) => new FireExplosionFx(v);
            if (attackKind === "ice") xattack.hitfx = (v) => new IceExplosionFx(v);
            if (attackKind === "poison") xattack.hitfx = (v) => new PoisonExplosionFx(v);
            if (attackKind === "wind") xattack.hitfx = (v) => new WindExplosionFx(v);
            this.currentAttack = new RangedAttack(xattack);
            if (attackKind === "fire") {
                let attack = this.currentAttack;
                let fx = new FireTrailFx({
                    getx: () => attack.x,
                    gety: () => attack.y,
                    geteol: () => !(attack.active),
                });
            } else if (attackKind === "ice") {
                let attack = this.currentAttack;
                let fx = new IceTrailFx({
                    getx: () => attack.x,
                    gety: () => attack.y,
                    geteol: () => !(attack.active),
                });
            } else if (attackKind === "poison") {
                let attack = this.currentAttack;
                let fx = new PoisonTrailFx({
                    getx: () => attack.x,
                    gety: () => attack.y,
                    geteol: () => !(attack.active),
                });
            } else if (attackKind === "wind") {
                let attack = this.currentAttack;
                let fx = new WindTrailFx({
                    getx: () => attack.x,
                    gety: () => attack.y,
                    geteol: () => !(attack.active),
                });
            }
            this.mana -= manaCost;
            // transition to attack state (based on idle direction)
            this.state = xattack.state;
        }
    }

    doGrab(data) {
        if (data.target) {
            data.target.homeLvl = currentLevel;
            console.log("grabbing object: " + data.target);
            data.target.interact(this);
            currentLevel.destroyObject(data.target);
        }
    }

    doPush(data) {
        if (data.target) {
            console.log("push object: " + data.target);
            data.target.interact(this);
            //data.target.interact(this);
            //currentLevel.destroyObject(data.target);
        }
    }

    doDrop() {
        if (this.grabbedObj) {
            console.log("dropping object: " + this.grabbedObj);
            //this.grabbedObj.y += 15;
            this.grabbedObj.reset();
            //this.grabbedObj.visible = true;
            if (this.grabbedObj.homeLvl && (this.grabbedObj.homeLvl !== currentLevel)) {
                this.grabbedObj.homeLvl.addObject(this.grabbedObj);
            } else {
                currentLevel.addObject(this.grabbedObj);
            }
            this.grabbedObj = undefined;
        }
    }

    doOpen(data) {
        if (data.target) {
            data.target.interact(this);
        }
    }

    doPlace(data) {
        if (data.target) {
            console.log("trying to place: " + this.grabbedObj + " on: " + data.target);
            data.target.interact(this);
        }
    }

    doTalk(data) {
        if (data.target) {
            console.log("trying to talk to: " + data.target);
            data.target.interact(this);
        }
    }

    doDie() {
        console.log(this + " has died");
        this.state = Animator.death;
        this.deathTTL = this.delayDeath;
        this.removeChilled();
        this.removePoisoned();
        this.removeBlown();
        this.spawnLoot();
        // global event
        if (this.constructor.name === "enemyClass") {
            console.log("triggering enemyDied");
            GameEvents.enemyDied.trigger({actor: this});
        } else if (this.constructor.name === "gameObjectClass") {
            console.log("triggering objectDestroyed");
            GameEvents.objectDestroyed.trigger({actor: this});
        }
        // handle player death
        if (this === p1) {
            UxCtrlSys.instance.current.onGameOver();
        }
    }

    interact(character) {
        // expecting subclasses to override this function...
    }

    aiUpdate(updateCtx) {
        // expecting subclasses to override this function...
    }

    // update character based on current state and inputs
    update(updateCtx) {
        // resolve link during move/update of object
        if (this.wantLink) {
            for (const target of this.wantLink.targets || []) {
                if (target === "left") {
                    let linkObj = currentLevel.findObject((v) => v.x === this.x-currentLevel.sketchWidth && v.y === this.y, true);
                    if (linkObj) this.link(linkObj);
                } else if (target === "up") {
                    let linkObj = currentLevel.findObject((v) => v.x === this.x && v.y === this.y-currentLevel.sketchHeight, true);
                    if (linkObj) this.link(linkObj);
                }
            }
            this.wantLink = undefined;
        }

        // handle death
        if (this.state !== Animator.death && this.maxHealth && this.health <= 0) {
            this.doDie();
        }
        if (this.deathTTL > 0) {
            this.deathTTL -= updateCtx.deltaTime;
            if (this.deathTTL <= 0) {
                if (this.constructor.name === "enemyClass") {
                    currentLevel.destroyEnemy(this);
                } else {
                    currentLevel.destroyObject(this);
                }
            }
        }
        let incapacitated = (this.state === Animator.death);

        // handle "nudge" and "translation"
        if (this.nudge) {
            this.nudge.update(updateCtx)
            if (this.nudge.done) this.nudge = undefined;
            this.collider.update(this.x, this.y, currentLevel.idxfromxy);
        }
        if (this.translation) {
            this.translation.update(updateCtx)
            if (this.translation.done) this.translation = undefined;
            this.collider.update(this.x, this.y, currentLevel.idxfromxy);
        }

        // regenerate mana over time
        let manaRegRate = 0.1;
        if(this.mana + manaRegRate < this.maxMana)
        {
            this.mana += manaRegRate;
        }
        else
        {
            this.mana = this.maxMana;
        }

        // update any current attack
        if (!incapacitated && this.currentAttack) {
            if (this.dbgAnim && !this.sketch._anim._step) this.sketch._anim._step = true;
            // check if attack is done
            if (!this.currentAttack.active) {
                //console.log("attack is done");
                let lastAttack = this.currentAttack;
                this.currentAttack = undefined;
                // transition back to idle state (based on attack direction)
                this.state = lastAttack.idleState;
                this.attackDelayTTL = this.delayBetweenAttacks;
            // otherwise, attack is still active...
            } else {
                this.currentAttack.update(updateCtx);
            }
        }

        // update delay TTLs
        if (this.attackDelayTTL > 0) this.attackDelayTTL -= updateCtx.deltaTime;

        // handle chilled condition
        if (this.chilled) {
            if (this.chilledTTL > 0) this.chilledTTL -= updateCtx.deltaTime;
            if (this.chilledTTL <= 0) {
                this.removeChilled();
            }
        }
        // handle poisoned condition
        if (this.poisoned) {
            this.poisonTick += updateCtx.deltaTime;
            if (this.poisonTick > 2000) {
                this.poisonTick = 0;
                this.takeDamage(1);
            }
            if (this.poisonedTTL > 0) this.poisonedTTL -= updateCtx.deltaTime;
            if (this.poisonedTTL <= 0) {
                this.removePoisoned();
            }
        }

        // handle blown condition
        if (this.blown) {
            this.move_East = this.move_West = this.move_North = this.move_South = false;
            switch (this.blownDir) {
            case Animator.idleEast:
                this.move_East = true;
                break;
            case Animator.idleWest:
                this.move_West = true;
                break;
            case Animator.idleSouth:
                this.move_South = true;
                break;
            case Animator.idleNorth:
                this.move_North = true;
                break;
            }
        }

        // handle falling condition
        if (this.falling) {
            // translate
            if (this.translation) {
                // do nothing...
            } else if (this.fallTTL > 0) {
                this.fallTTL -= updateCtx.deltaTime;
                this.scale -= this.dscale * updateCtx.deltaTime;
                this.angle += this.dangle * updateCtx.deltaTime;
            } else {
                this.falling = false;
                //this.takeDamage(10);
                this.respawn();
                this.scale = 1;
                this.angle = 0;
            }
            incapacitated = true;
        }

        // AI callout
        this.aiUpdate(updateCtx);

        // handle movement
        // -- blocked if attacking
        // -- blocked if incapacitated
        if (!(this.currentAttack && this.currentAttack.blocking) && !incapacitated) {
            this.move(updateCtx);
        }

        // grabbed object is character's responsibility
        if (this.grabbedObj) this.grabbedObj.update(updateCtx);

        // update sketch ... add our own context to include state
        this._updateCtx.deltaTime = updateCtx.deltaTime;
        this._updateCtx.state = this.state;
        this.sketch.update(this._updateCtx);

    }

    /**
     * stop pathfinding and restore move state
     */
    stopPathfinding() {
        this.tilePath = [];
        this.move_East = this.move_West = this.move_North = this.move_South = false;
    }

    move(updateCtx) {

        var nextX = this.x;
        var nextY = this.y;
        var charCol = Math.floor(this.x / TILE_W);
        var charRow = Math.floor(this.y / TILE_H);

        // compute movement speed
        let movingSpeed = this.movingSpeed;
        if (this.chilled) movingSpeed *= .5;
        if (this.blown) movingSpeed *= 3;

        // handle path finding movement
        if (!this.blown && this.tilePath.length > 0) {
            var targetIndex = this.tilePath[0];
            var targetC = currentLevel.ifromidx(targetIndex);
            var targetR = currentLevel.jfromidx(targetIndex);
            var targetX = targetC * TILE_W + (TILE_W * 0.5);
            var targetY = targetR * TILE_H + (TILE_H * 0.5);
            var deltaX = Math.abs(targetX - this.x);
            var deltaY = Math.abs(targetY - this.y);

            this.move_East = this.move_West = this.move_North = this.move_South = false;

            if (deltaX <= movingSpeed) {
                this.x = targetX;
                if (deltaY <= movingSpeed) {
                    this.y = targetY;
                    this.tilePath.shift();
                } else if (targetY < this.y) {
                    this.move_North = true;
                } else {
                    this.move_South = true;
                }
            } else if (deltaY <= movingSpeed) {
                this.y = targetY;
                if (deltaX <= movingSpeed) {
                    this.x = targetX;
                    this.tilePath.shift();
                } else if (targetX < this.x) {
                    this.move_West = true;
                } else {
                    this.move_East = true;
                }
            } else { // move towards center of closest tile
                targetX = charCol * TILE_W + (TILE_W * 0.5);
                targetY = charRow * TILE_H + (TILE_H * 0.5);
                if (targetY < this.y - movingSpeed) {
                    this.move_North = true;
                } else if (targetY > this.y + movingSpeed) {
                    this.move_South = true;
                } else if (targetX < this.x) {
                    this.move_West = true;
                } else {
                    this.move_East = true;
                }
            }
        }

        // update state
        this.moving = true;
        if (this.moveTarget) {
            this.walkTowards(this.moveTarget);
        } else {
            if (this.move_West) {
                this.state = Animator.walkWest;
            } else if (this.move_East) {
                this.state = Animator.walkEast;
            } else if (this.move_North) {
                this.state = Animator.walkNorth;
            } else if (this.move_South) {
                this.state = Animator.walkSouth;
            } else {
                this.moving = false;
                // handle transition from moving state to idle state
                switch(this.state) {
                case Animator.walkEast:
                    this.state = Animator.idleEast;
                    break;
                case Animator.walkWest:
                    this.state = Animator.idleWest;
                    break;
                case Animator.walkNorth:
                    this.state = Animator.idleNorth;
                    break;
                case Animator.walkSouth:
                    this.state = Animator.idleSouth;
                    break;
                }
            }
        }

        // update position
        if (this.moveTarget) {
            // compute vector towards target
            let v = new Vect(this.moveTarget.x-this.x, this.moveTarget.y-this.y);
            // normalize speed
            v.normalize().mult(movingSpeed);
            nextX += v.x;
            nextY += v.y;
        } else {
            if (this.move_North) {
                nextY -= movingSpeed;
            }
            if (this.move_East) {
                nextX += movingSpeed;
            }
            if (this.move_South) {
                nextY += movingSpeed;
            }
            if (this.move_West) {
                nextX -= movingSpeed;
            }
        }

        // prevent movement past edge of level
        if (nextX < 0) nextX = 0;
        if (nextX > currentLevel.maxx) nextX = currentLevel.maxx;
        if (nextY < 0) nextY = 0;
        if (nextY > currentLevel.maxy) nextY = currentLevel.maxy;

		// handle collisions: collisions are checked in each axis independently...
        // -- store last x,y
        let lastX = this.x;
        let lastY = this.y;
        // -- x axis
        this.nextCollider.update(nextX, this.y, currentLevel.idxfromxy);
        this.tileCollisionHandle(nextX, this.y);
        // -- y axis
        this.nextCollider.update(this.x, nextY, currentLevel.idxfromxy);
        this.tileCollisionHandle(this.x, nextY);
        // -- adjust animator if walking diagonally, but single axis movement is prohibited
        if ((this.move_East || this.move_West) && (lastX === this.x)) {
            if (this.move_South) {
                this.state = Animator.walkSouth;
            } else if (this.move_North) {
                this.state = Animator.walkNorth;
            }
        }
        if ((this.move_North || this.move_South) && (lastY === this.y)) {
            if (this.move_East) {
                this.state = Animator.walkEast;
            } else if (this.move_West) {
                this.state = Animator.walkWest;
            }
        }

        // updates to collision boxes
        this.collider.update(this.x, this.y, currentLevel.idxfromxy);
        if (this.interactCollider) this.interactCollider.update(this.x, this.y, currentLevel.idxfromxy);

        // handle blown termination (when char hits something...)
        if (this.blown && (lastX === this.x) && (lastY === this.y)) {
            //console.log("remove blown");
            this.removeBlown();
        }

        // update position of grabbed object, based on current player position and facing direction
        if (this.grabbedObj) {
            let xoff, yoff;
            switch (this.facing) {
            case Animator.idleNorth:
                xoff = 0;
                yoff = -15;
                break;
            case Animator.idleWest:
                xoff = -25;
                yoff = 15;
                break;
            case Animator.idleEast:
                xoff = 25;
                yoff = 15;
                break;
            default: // south
                xoff = 0;
                yoff = 20;
                break;
            }
            //console.log("setting grabbed obj pos this.x: " + this.x + " this.xoff: " + this.xOff + " xoff: " + xoff);
            this.grabbedObj.x = this.x + this.xOff + xoff;
            this.grabbedObj.y = this.y + this.yOff + yoff;
        }

    }

    isOverLapping(testX, testY) {
        if (testX > this.colTopLeftX && testX < this.colTopLeftX + this.colWidth &&
            testY > this.colTopLeftY && testY < this.colTopLeftY + this.colHeight) {
            return true;
        } else {
            return false;
        }
    }

    checkCollisionAgainst(thisEntity) {
        if (this.isOverLapping(thisEntity.x, thisEntity.y)) {
            this.collisionColor = "red";
        } else {
            this.collisionColor = this.myCollisionColor;
        }
    }

    takeDamage(amount){
        if (disableCollisions && this === p1) return;
        var damageAmount = amount;
        let oldHealth = this.health;
        this.health = this.health - damageAmount;
        console.log(this + " taking damage: " + amount + " health from: " + oldHealth + " to: " + this.health);
        // if we are carrying something and we take damage, drop the item
        if (this.grabbedObj) {
            this.doDrop();
        }
    }

    respawn() {
        if (this.lastSpawn) {
            currentLevel.placeCharacter(this, this.lastSpawn);
            this.collider.update(this.x, this.y, currentLevel.idxfromxy);
            this.removeBlown();
        } else {
            this.reset();
        }
    }

    draw() {
        // handle grabbed object or attack behind player
        if(this.facing === Animator.idleNorth) {
            if (this.grabbedObj) this.grabbedObj.draw();
            if (this.currentAttack) this.currentAttack.render(canvasContext);
        }

        // draw the character's sketch
        if (this.sketch && this.sketch.render) {
            let atX = this.x;
            let atY = this.y;
            let width = this.sketch.width;
            let height = this.sketch.height;
            let minx = -width * .5 + this.xOff;
            let miny = -height * .5 + this.yOff;
            canvasContext.save();
            canvasContext.translate(atX,atY);
            if (this.angle) canvasContext.rotate(this.angle);
            if (this.scale !== 1) canvasContext.scale(this.scale, this.scale);
            this.sketch.render(canvasContext, minx, miny);
            canvasContext.restore();
            //colorRect(atX-4, atY-4, 8, 8, "black");
            //colorRect(this.x-4, this.y-4, 8, 8, "red");
        }

        //drawBitmapCenteredAtLocationWithRotation(this.sketch, this.x+this.xOff, this.y+this.yOff, this.angle, this.scale);
        if (showCollisions) {
            if (this.interactCollider) this.interactCollider.draw(canvasContext);
            this.collider.draw(canvasContext);
        }
        // handle grabbed object in front or side of player
        if (this.facing !== Animator.idleNorth) {
            if (this.grabbedObj) this.grabbedObj.draw();
            if (this.currentAttack) this.currentAttack.render(canvasContext);
        }
    }

    toString() {
        return Fmt.toString(this.constructor.name, this.myName, this.tileid);
    }
} 