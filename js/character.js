// FIXME: remove when we have real sword
const sword = new Shape({
    cls: "Shape",
	fill: false,
	verts: [
		{x:4, y:0},
		{x:8, y:0},
		{x:8, y:4},
		{x:28, y:4},
		{x:30, y:6},
		{x:28, y:8},
		{x:8, y:8},
		{x:8, y:12},
		{x:4, y:12},
		{x:4, y:8},
		{x:0, y:8},
		{x:0, y:4},
		{x:4, y:4},
	],
	borderWidth: 1,
	borderColor: "rgba(200,200,0,1)",
});

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
        this.wantAttack = false;
        // collisions
        this.collider = new Collider(Object.assign({}, spec.collider, {x: this.x, y:this.y}));
        this.nextCollider = this.collider.copy();
        this.interactCollider = (spec.interactCollider) ? new Collider(Object.assign({}, spec.interactCollider, {x: this.x, y:this.y})) : undefined;
        // melee attack
        // -- specs for attack
        this.xattacks = {
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
            },
        };
        this.delayBetweenAttacks = 200;
        this.attackDelayTTL = 0;
        this.xattacks[Animator.idle] = this.xattacks[Animator.idleSouth];
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
        this.immuneToDamageCounter = 100;
    }

    get idleState() {
        return this._state;
    }
    get state() {
        // handle moving states
        if (this.move_West) {
            return Animator.walkWest;
        } else if (this.move_East) {
            return Animator.walkEast;
        } else if (this.move_North) {
            return Animator.walkNorth;
        } else if (this.move_South) {
            return Animator.walkSouth;
        }
        // handle idle state
        return this._state;
    }

    get facing() {
        switch (this._state) {
        case Animator.idleEast:
        case Animator.attackEast:
            return Animator.idleEast;
        case Animator.idleWest:
        case Animator.attackWest:
            return Animator.idleWest;
        case Animator.idleNorth:
        case Animator.attackNorth:
            return Animator.idleNorth;
        }
        return Animator.idleSouth;
    }

    set state(v) {
        if (v !== this._state) {
            this._state = v;
            if (this.linkVars.includes("state")) for (const link of this.links) link._state = v;
        }
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

    getAnimState() {
    }

    // update character based on current state and inputs
    update(updateCtx) {
        // check interaction/attack inputs
        switch (this.idleState) {
        case Animator.attackEast:
        case Animator.attackWest:
        case Animator.attackNorth:
        case Animator.attackSouth:
            //console.log("we are attacking...");
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
            break;
        }

        // update idle TTLS
        if (this.attackDelayTTL > 0) this.attackDelayTTL -= updateCtx.deltaTime;

        // check for wanting to attack
        if (this.wantAttack && !this.currentAttack && this.attackDelayTTL <= 0) {
            //console.log("creating attack");
            // instantiate new attack
            let xattack = Object.assign({}, this.xattacks[this.idleState], {actor: this, idleState: this.idleState});
            xattack.collider = Object.assign({}, xattack.collider, {x:this.x, y:this.y});
            this.currentAttack = new Attack(xattack);
            // transition to attack state (based on idle direction)
            this.state = xattack.state;
        }

        // if attacking... other actions are blocked
        if (this.currentAttack) return;

        // fall into movement
        this.move(updateCtx);
    }

    move(updateCtx) {

        // character immunity timer
        this.immuneToDamageCounter--;
        
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

        // handle pause between interactions (so we don't pick stuff up and immediately drop it because the key is still down)
        if (this.waitForInteraction > 0) {
            this.waitForInteraction--;
            this.interactWithObject = false;
        } else if (this.interactWithObject) {
            this.waitForInteraction = interactionWaitIterations;
        }

        var nextX = this.x;
        var nextY = this.y;
        var charCol = Math.floor(this.x / TILE_W);
        var charRow = Math.floor(this.y / TILE_H);

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

        // determine facing direction
        if (this.move_East) {
            this.state = Animator.idleEast;
        } else if (this.move_West) {
            this.state = Animator.idleWest;
        } else if (this.move_North) {
            this.state = Animator.idleNorth;
        } else if (this.move_South) {
            this.state = Animator.idleSouth;
        }

        if (this.move_North || this.move_East || this.move_South || this.move_West) {
            this.moving = true;
        } else {
            this.moving = false;
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
            switch (this.idleState) {
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

        // update sketch
        this._updateCtx.deltaTime = updateCtx.deltaTime;
        this._updateCtx.state = this.state;
        this.sketch.update(this._updateCtx);
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
        if(this.immuneToDamageCounter <= 0){
            var damageAmount = amount;
            let oldHealth = this.health;
            this.health = this.health - damageAmount;
            console.log(this + " taking damage: " + amount + " health from: " + oldHealth + " to: " + this.health);
            this.immuneToDamageCounter = 300;
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