class characterClass {
    constructor(spec={}) {
        this.tileid = spec.tileid || 0;
        this.sketch = spec.sketch || Sketch.zero;
        this.myName = spec.name || this.constructor.name;
        this.myCollisionColor = spec.collisionColor || "black";
        this.homeX = spec.x || 0;
        this.homeY = spec.y || 0;
        // variables to keep track of position
        this.x;
        this.y;
        this.tilePath = [];
        this.pathfindingNow = false;
        this.movingSpeed = 20; // should be overwritten by specific class.
        // move states
        this.move_North = false;
        this.move_East = false;
        this.move_South = false;
        this.move_West = false;
        //collisions
        this.colHeight = 100;
        this.colWidth = 100;
        this.colXOff = 0;        // collider x/y offsets from origin x,y
        this.colYOff = 0;
        this.xOff = 0;          // x/y offsets for drawing sprite from origin x,y
        this.yOff = 0;
        this.colTopLeftX;
        this.colTopLeftY;
        this.colTLIdx = 0;
        this.colTRIdx = 0;
        this.colBLIdx = 0;
        this.colBRIdx = 0;
        this.reset();
    }

    reset() {
        this.x = this.homeX;
        this.y = this.homeY;
    } // end of reset

    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
        console.log("UNDEFINED FOR THIS SUBCLASS");
    }

    move() {
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
        var walkIntoTileType = TILE.WALL_7;

        if (walkIntoTileIndex != undefined) {
            //walkIntoTileType = roomGrid[walkIntoTileIndex];
            walkIntoTileType = currentLevel.fgi(walkIntoTileIndex);
        }

        this.tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY);


        //updates to collision boxes
        this.colTopLeftX = this.x - this.colWidth / 2 + this.colXOff;
        this.colTopLeftY = this.y - this.colHeight / 2 + this.colYOff;
        this.colTLIdx = currentLevel.idxfromxy(this.colTopLeftX, this.colTopLeftY);
        this.colTRIdx = currentLevel.idxfromxy(this.colTopLeftX+this.colWidth, this.colTopLeftY);
        this.colBLIdx = currentLevel.idxfromxy(this.colTopLeftX, this.colTopLeftY+this.colHeight);
        this.colBRIdx = currentLevel.idxfromxy(this.colTopLeftX+this.colWidth, this.colTopLeftY+this.colHeight);
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
        drawBitmapCenteredAtLocationWithRotation(this.sketch, this.x+this.xOff, this.y+this.yOff, 0.0);
        if (showCollisions) {
            colorRect(this.colTopLeftX, this.colTopLeftY, this.colWidth, this.colHeight, this.collisionColor);
            colorRect(this.x-4, this.y-4, 8, 8, "black");
        }
    }
} 