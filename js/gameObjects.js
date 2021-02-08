// tuning 
var objectNameList = ['fireRune', 'windRune', 'waterRune', 'earthRune'];

//gameObjects have similar code to Character class for movement.
class gameObjectClass extends characterClass {
    constructor(spec={}) {
        // set spec defaults
        spec.collisionColor = spec.collisionColor || "orange";
        super(spec);
        this.kind = spec.kind || "object";
        this.openSketch = assets.generate(spec.openTag) || Sketch.zero;
        this.grabbedByPlayer = false;
        this.correctPuzzleLocation = false;
    }

    interface(character) {
        if (this.kind === "door" && !this.open) {
            if (character.keysHeld > 0) {
                character.keysHeld--; // one less key
                document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                //let swapid = props.swappable(walkIntoTileType);
                //console.log("swapid: " + swapid);
                //currentLevel.setfgi(walkIntoTileIndex, swapid || 0);
                this.sketch = this.openSketch;
                this.open = true;
                this.active = false;
                /*
                // check for double-height door
                let aboveIdx = currentLevel.upFromIdx(walkIntoTileIndex);
                console.log("aboveIdx: " + aboveIdx + " from: " + walkIntoTileIndex);
                if (aboveIdx !== walkIntoTileIndex) {
                    let aboveSwapId = props.swappable(currentLevel.fgi(aboveIdx));
                    console.log("aboveSwapId: " + aboveSwapId);
                    if (aboveSwapId) currentLevel.setfgi(aboveIdx, aboveSwapId);
                }
                */
            }
        }
    }

    /**
     * What to do when another character has collided with us
     * @param {*} thisEntity 
     */
    checkCollisionAgainst(thisEntity) {

        /*
        if (props.isDoor(walkIntoTileType)) {
            if (p1.interactWithObject) {
                if (this.keysHeld > 0) {
                    this.keysHeld--; // one less key
                    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                    let swapid = props.swappable(walkIntoTileType);
                    console.log("swapid: " + swapid);
                    currentLevel.setfgi(walkIntoTileIndex, swapid || 0);
                    // check for double-height door
                    let aboveIdx = currentLevel.upFromIdx(walkIntoTileIndex);
                    console.log("aboveIdx: " + aboveIdx + " from: " + walkIntoTileIndex);
                    if (aboveIdx !== walkIntoTileIndex) {
                        let aboveSwapId = props.swappable(currentLevel.fgi(aboveIdx));
                        console.log("aboveSwapId: " + aboveSwapId);
                        if (aboveSwapId) currentLevel.setfgi(aboveIdx, aboveSwapId);
                    }
                }
            }
        }
        */

        if (this.isOverLapping(thisEntity.x, thisEntity.y)) {
            this.myCollisionColor = "yellow";
            if (p1.interactWithObject) {
                this.grabbedByPlayer = !this.grabbedByPlayer;
                this.myCollisionColor = "green";
            }
        } else {
            this.myCollisionColor = "orange";
            if (this.grabbedByPlayer) {
                this.myCollisionColor = "green";
                this.grabbedByPlayer = false;
            }
        }
    }

    move(updateCtx) {
        //player to move this object
        //player should grab this object, then the player can either pull or push the object.
        if (this.grabbedByPlayer) {
            if (p1.move_North) {
                this.y = p1.movingSpeed;
            }
            if (p1.move_East) {
                this.x += p1.movingSpeed;
            }
            if (p1.move_South) {
                this.y += p1.movingSpeed;
            }
            if (p1.move_West) {
                this.x -= p1.movingSpeed;
            }
        }
		super.move(updateCtx);
    }

    //must override this function.  No super version
    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
        switch (walkIntoTileType) {
            case TILE.GROUND:
            case TILE.GOAL:
            case TILE.KEY:
            case TILE.WALL_15: //OPEN DOOR
                this.x = nextX;
                this.y = nextY;
                break;
			case TILE.FLOOR_FIRE_RUNE:
				if(this.myName == "Fire Rune"){
					this.correctPuzzleLocation = true;
				} else {
					this.x = nextX;
					this.y = nextY;
				}
				break;
            case TILE.FLOOR_WATER_RUNE:
				if(this.myName == "Water Rune"){
					this.correctPuzzleLocation = true;
				} else {
					this.x = nextX;
					this.y = nextY;
				}
				break;
            case TILE.FLOOR_WIND_RUNE:
            if(this.myName == "Wind Rune"){
					this.correctPuzzleLocation = true;
				} else {
					this.x = nextX;
					this.y = nextY;
				}
				break;
			case TILE.FLOOR_EARTH_RUNE:
				if(this.myName == "Earth Rune"){
					this.correctPuzzleLocation = true;
				} else {
					this.x = nextX;
					this.y = nextY;
				}
				break;
            case TILE.DOOR:
            case TILE.DOOR_YELLOW_FRONT:
            case TILE.WALL_1:
            case TILE.WALL_2:
            case TILE.WALL_3:
            case TILE.WALL_4:
            case TILE.WALL_5:
            case TILE.WALL_6:
            case TILE.WALL_7:
            case TILE.WALL_8:
            case TILE.WALL_9:
            case TILE.WALL_10:
            case TILE.WALL_11:
            case TILE.WALL_12:
            case TILE.WALL_13:
            default:
                // any other tile type number was found... do nothing, for now
                break;
        }
    }
} // end of class