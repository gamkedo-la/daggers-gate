// tuning 
var objectNameList = ['fireRune', 'windRune', 'waterRune', 'earthRune'];

//gameObjects have similar code to Character class for movement.
class gameObjectClass extends characterClass {
    constructor(spec={}) {
        spec.collider = Object.assign({
            color: "rgba(245,133,73,.5)", 
        }, spec.collider);
        // set spec defaults
        spec.kind = spec.kind || "object";
        super(spec);
        this.grabbedByPlayer = false;
        this.correctPuzzleLocation = false;
    }

    /**
     * lookup sketch for current state...
     * defaults to this.sketch if unassigned
     */
    get stateSketch() {
        // lookup state sketch cache
        let sketch = this.stateSketches[this.state];
        if (sketch) return sketch;
        // lookup sketch tag for current state
        let sketchTag = this.sketchTags[this.state];
        if (!sketchTag) return this.sketch;
        // -- special case... "none"
        let stateSketch;
        if (sketchTag === "none") {
            stateSketch = Sketch.zero;
            this.stateSketches[this.state] = stateSketch;
        }
        // attempt to generate new sketch for tag
        stateSketch = assets.generate(sketchTag);
        if (stateSketch) {
            this.stateSketches[this.state] = stateSketch;
        }
        // remove sketch tag to avoid spinning on asset lookups for failed sketches
        delete this.sketchTags[sketchTag];
        return (stateSketch) ? stateSketch : this.sketch;
    }


    interact(character) {
        //console.log("interact... kind is: " + this.kind + " state: " + this.state);
        if (this.kind === "door" && this.state !== "open") {
            if (character.keysHeld > 0) {
                character.keysHeld--; // one less key
                document.getElementById("debugText").innerHTML = "Keys: " + character.keysHeld;
                this.state = "open";
                this.active = false;
            }
        }
    }

    /**
     * What to do when another character has collided with us
     * @param {*} thisEntity 
     */
    checkCollisionAgainst(thisEntity) {

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
        // resolve link during move/update of object
        if (this.wantLink) {
            for (const target of this.wantLink.targets || []) {
                if (target === "left") {
                    let linkObj = currentLevel.findObject((v) => v.x === this.x-currentLevel.sketchWidth && v.y === this.y);
                    console.log("linkObj: " + linkObj);
                    this.link(linkObj);
                } else if (target === "up") {
                    let linkObj = currentLevel.findObject((v) => v.x === this.x && v.y === this.y-currentLevel.sketchHeight);
                    this.link(linkObj);
                    console.log("linkObj: " + linkObj);
                }
            }
            this.wantLink = undefined;
        }
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

    draw() {
        drawBitmapCenteredAtLocationWithRotation(this.stateSketch, this.x+this.xOff, this.y+this.yOff, 0.0);
        if (showCollisions) {
            this.collider.draw(canvasContext);
        }
    }

} // end of class