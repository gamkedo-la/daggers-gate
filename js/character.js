class characterClass {
    constructor(spec={}) {
        this.tileid = spec.tileid || 0;
        this.myName = spec.name || this.constructor.name;
        this.homeX = spec.x || 0;
        this.homeY = spec.y || 0;
        // x/y offsets for drawing sprite from origin x,y
        this.sketch = spec.sketch || Sketch.zero;
        this.xOff = spec.xOff || 0;          
        this.yOff = spec.yOff || 0;
        // variables to keep track of position
        this.x;
        this.y;
        this.tilePath = [];
        this.pathfindingNow = false;
        this.movingSpeed = spec.movingSpeed || 4.0; // should be overwritten by specific class.
        // move states
        this.move_North = false;
        this.move_East = false;
        this.move_South = false;
        this.move_West = false;
        this.facing = Animator.idleSouth;
        // collisions
        this.active = true;
        this.collider = new Collider(Object.assign({}, spec.collider, {x: this.x, y:this.y}));
        this.nextCollider = this.collider.copy();
        this.interact = (spec.interact) ? new Collider(Object.assign({}, spec.interact, {x: this.x, y:this.y})) : undefined;
        // variables for held objects
        this.grabbedObj;
        this.reset();
    }

    reset() {
        this.x = this.homeX;
        this.y = this.homeY;
    } // end of reset

    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
        console.log("UNDEFINED FOR THIS SUBCLASS");
    }

    getAnimState() {
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
        return this.facing;
    }

    move(updateCtx) {
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
            this.facing = Animator.idleEast;
        } else if (this.move_West) {
            this.facing = Animator.idleWest;
        } else if (this.move_North) {
            this.facing = Animator.idleNorth;
        } else if (this.move_South) {
            this.facing = Animator.idleSouth;
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

        // FIXME
        let tmp = this.collider;
        this.collider = this.nextCollider;
        this.nextCollider = tmp;
        if (this.interact) this.interact.update(this.x, this.y, currentLevel.idxfromxy.bind(currentLevel));

        //updates to collision boxes
        /*
        this.colTopLeftX = this.x - this.colWidth / 2 + this.colXOff;
        this.colTopLeftY = this.y - this.colHeight / 2 + this.colYOff;
        this.colTLIdx = currentLevel.idxfromxy(this.colTopLeftX, this.colTopLeftY);
        this.colTRIdx = currentLevel.idxfromxy(this.colTopLeftX+this.colWidth, this.colTopLeftY);
        this.colBLIdx = currentLevel.idxfromxy(this.colTopLeftX, this.colTopLeftY+this.colHeight);
        this.colBRIdx = currentLevel.idxfromxy(this.colTopLeftX+this.colWidth, this.colTopLeftY+this.colHeight);
        */

        // update animation state
        this.sketch.update(Object.assign({state: this.getAnimState()}, updateCtx));

        // update position of grabbed object, based on current player position and facing direction
        if (this.grabbedObj) {
            let xoff, yoff;
            switch (this.facing) {
            case Animator.idleNorth:
                xoff = 0;
                yoff = -15;
                break;
            case Animator.idleWest:
                xoff = -15;
                yoff = 0;
                break;
            case Animator.idleEast:
                xoff = 15;
                yoff = 0;
                break;
            default: // south
                xoff = 0;
                yoff = 15;
                break;
            }
            this.grabbedObj.x = this.x + this.xoff + xoff;
            this.grabbedObj.y = this.y + this.yoff + yoff;
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

    draw() {
        // handle grabbed object behind player
        if (this.grabbedObj && this.facing === Animator.idleNorth) {
            this.grabbedObj.draw();
        }
        drawBitmapCenteredAtLocationWithRotation(this.sketch, this.x+this.xOff, this.y+this.yOff, 0.0);
        if (showCollisions) {
            if (this.interact) this.interact.draw(canvasContext);
            this.collider.draw(canvasContext);
            //colorRect(this.colTopLeftX, this.colTopLeftY, this.colWidth, this.colHeight, this.collisionColor);
            //colorRect(this.x-4, this.y-4, 8, 8, "black");
        }
        // handle grabbed object in front or side of player
        if (this.grabbedObj && this.facing !== Animator.idleNorth) {
            this.grabbedObj.draw();
        }
    }
} 