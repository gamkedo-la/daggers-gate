
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
        this.mana = Util.objKeyValue(spec, "mana", 0);
        this.maxMana = Util.objKeyValue(spec, "maxMana", 0);
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
    }

    get state() {

        // handle idle state
        return this._state;
    }

    set state(v) {
        if (v !== this._state) {
            if (this === p1) {
                console.log("new state: " + v);
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

    reset() {
        this.x = this.homeX;
        this.y = this.homeY;
    } // end of reset

    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
        console.log("UNDEFINED FOR THIS SUBCLASS");
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
        //console.log("...primary action...");
        switch (this.chosenPrimary) {
        case "open":
            this.doOpen(this.targetObj);
            break;
        case "melee":
            this.doMeleeAttack((this.inventory)?this.inventory.mainHand:undefined);
            break;
        case "grab":
            this.doGrab(this.targetObj);
            break;
        case "drop":
            this.doDrop();
            break;
        case "place":
            console.log("trying to place...");
            this.doPlace(this.targetObj);
            break;
        }
    }

    secondaryAction() {
        this.startSecondaryAction = false;
        //console.log("...secondary action...");
        switch (this.chosenSecondary) {
        case "ranged":
            console.log("trying to range attack...");
            this.doRangedAttack();
            break;
        }
    }

    // ACTIONS
    doMeleeAttack(weapon) {
        if (!this.currentAttack) {
            // lookup attack
            let xattack = Object.assign({}, Attack.getSpec("melee")[this.facing], {actor: this, idleState: this.facing});
            // transition to attack state (based on idle direction)
            this.state = xattack.state;
            if (weapon) xattack.weapon = weapon;
            // start the attack
            xattack.collider = Object.assign({}, xattack.collider, {x:this.x, y:this.y});
            this.currentAttack = new SyncAttack(xattack);
        }
    }

    doRangedAttack() {
        if (!this.currentAttack) {
            /*
            if (!this.haveBow) {
                console.log("need bow!");
                return;
            }
            */
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

    doGrab(targetObj) {
        if (targetObj) {
            console.log("grabbing object: " + targetObj);
            targetObj.interact(this);
            currentLevel.destroyObject(targetObj);
        }
    }

    doDrop() {
        if (this.grabbedObj) {
            console.log("dropping object: " + this.grabbedObj);
            this.grabbedObj.y += 15;
            //this.grabbedObj.visible = true;
            currentLevel.addObject(this.grabbedObj);
            this.grabbedObj = undefined;
        }
    }

    doOpen(targetObj) {
        if (targetObj) {
            targetObj.interact(this);
        }
    }

    doPlace(targetObj) {
        if (targetObj) {
            console.log("trying to place: " + this.grabbedObj + " on: " + targetObj);
            targetObj.interact(this);
        }
    }

    doDie() {
        console.log(this + " has died");
        this.state = Animator.death;
        this.deathTTL = this.delayDeath;
        // FIXME: add loot
        this.spawnLoot();
        // FIXME: handle player death
    }

    // update character based on current state and inputs
    update(updateCtx) {
        // resolve link during move/update of object
        if (this.wantLink) {
            for (const target of this.wantLink.targets || []) {
                if (target === "left") {
                    let linkObj = currentLevel.findObject((v) => v.x === this.x-currentLevel.sketchWidth && v.y === this.y);
                    if (linkObj) this.link(linkObj);
                } else if (target === "up") {
                    let linkObj = currentLevel.findObject((v) => v.x === this.x && v.y === this.y-currentLevel.sketchHeight);
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
            if (this.constructor.name === "enemyClass") {
                currentLevel.destroyEnemy(this);
            } else {
                currentLevel.destroyObject(this);
            }
        }
        let incapacitated = (this.state === Animator.death);

        // handle "nudge"
        if (this.nudge) {
            this.nudge.update(updateCtx)
            if (this.nudge.done) this.nudge = undefined;
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

        // handle movement
        // -- blocked if attacking
        // -- blocked if incapacitated
        if (!this.currentAttack && !incapacitated) {
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

        // handle path finding movement
        if (this.tilePath.length > 0) {
            var targetIndex = this.tilePath[0];
            var targetC = currentLevel.ifromidx(targetIndex);
            var targetR = currentLevel.jfromidx(targetIndex);
            var targetX = targetC * TILE_W + (TILE_W * 0.5);
            var targetY = targetR * TILE_H + (TILE_H * 0.5);
            var deltaX = Math.abs(targetX - this.x);
            var deltaY = Math.abs(targetY - this.y);

            this.move_East = this.move_West = this.move_North = this.move_South = false;

            if (deltaX <= this.movingSpeed) {
                this.x = targetX;
                if (deltaY <= this.movingSpeed) {
                    this.y = targetY;
                    this.tilePath.shift();
                } else if (targetY < this.y) {
                    this.move_North = true;
                } else {
                    this.move_South = true;
                }
            } else if (deltaY <= this.movingSpeed) {
                this.y = targetY;
                if (deltaX <= this.movingSpeed) {
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
                if (targetY < this.y - this.movingSpeed) {
                    this.move_North = true;
                } else if (targetY > this.y + this.movingSpeed) {
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

        if (this.move_North) {
            nextY -= this.movingSpeed;
        }
        if (this.move_East) {
            nextX += this.movingSpeed;
        }
        if (this.move_South) {
            nextY += this.movingSpeed;
        }
        if (this.move_West) {
            nextX -= this.movingSpeed;
        }

        var walkIntoTileIndex = currentLevel.idxfromxy(nextX, nextY);
        var walkIntoTileType = currentLevel.fgi(walkIntoTileIndex);

        // prevent movement past edge of level
        if (nextX < 0) nextX = 0;
        if (nextX > currentLevel.maxx) nextX = currentLevel.maxx;
        if (nextY < 0) nextY = 0;
        if (nextY > currentLevel.maxy) nextY = currentLevel.maxy;

		// update next collider
        this.nextCollider.update(nextX, nextY, currentLevel.idxfromxy.bind(currentLevel));
  
		// handle collisions
        this.tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY);

        // updates to collision boxes
        // FIXME... assign new collider within tileCollisionHandle???
        let tmp = this.collider;
        this.collider = this.nextCollider;
        this.nextCollider = tmp;
        if (this.interactCollider) this.interactCollider.update(this.x, this.y, currentLevel.idxfromxy.bind(currentLevel));

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
        var damageAmount = amount;
        let oldHealth = this.health;
        this.health = this.health - damageAmount;
        console.log(this + " taking damage: " + amount + " health from: " + oldHealth + " to: " + this.health);
        // if we are carrying something and we take damage, drop the item
        if (this.grabbedObj) {
            this.doDrop();
        }
    }

    draw() {
        // handle grabbed object or attack behind player
        if(this.facing === Animator.idleNorth) {
            if (this.grabbedObj) this.grabbedObj.draw();
            if (this.currentAttack) this.currentAttack.render(canvasContext);
        }
        drawBitmapCenteredAtLocationWithRotation(this.sketch, this.x+this.xOff, this.y+this.yOff, 0.0);
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