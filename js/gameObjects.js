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
        this.trap = (spec.trap) ? Object.assign({}, spec.trap) : undefined;
        if (this.trap) {
            // pick random ttl, so that traps do not go off at the same time
            let ttl = Math.floor(Math.random() * this.trap.idleTTL);
            this.trap.ttl = ttl;
            this.active = false;
        }
        this.correctPuzzleLocation = false;
        this.want = spec.want || undefined;
        //console.log("created gameobject: " + this);
    }

    interact(character) {
        //console.log("game object kind: " + this.kind);
        switch (this.kind) {
        case "door":
            if (this.state !== Animator.open) {
                if (character.keysHeld > 0) {
                    character.keysHeld--; // one less key
                    document.getElementById("debugText").innerHTML = "Keys: " + character.keysHeld;
                    this.state = Animator.open;
                    this.active = false;
                }
            }
            break;
        case "chest":
            if (this.state !== Animator.open) {
                if (character.keysHeld > 0) {
                    character.keysHeld--; // one less key
                    document.getElementById("debugText").innerHTML = "Keys: " + character.keysHeld;
                    this.state = Animator.open;
                    // FIXME: add loot tables to object definition?
                    // FIXME: add animation for loot spilling out of chest, then being collected?
                    character.gold += 10;
                }
            }
            break;
        case "pickup":
            if (!character.grabbedObj) {
                character.grabbedObj = this;
                this.visible = false; // object is drawn during player render, don't draw during lvl render
                console.log("picked up: " + this);
            }
            break;
        case "altar":
            if (character.grabbedObj && character.grabbedObj.tag === this.want) {
                console.log("placing gem on altar...");
                // character drops object
                let obj = character.grabbedObj;
                character.grabbedObj = undefined;
                // change altar state
                this.state = Animator.solved;
                // destroy dropped object
                currentLevel.destroyObject(obj);
            }
            break;
        }
    }

    /**
     * What to do when another character has collided with us
     * @param {*} thisEntity 
     */
    checkCollisionAgainst(thisEntity) {
        // FIXME: handling damage by player running into spikes goes here...

    }

    move(updateCtx) {
        // handle trap updates
        if (this.trap) {
            let duration = (this.state === Animator.idle) ? this.trap.idleTTL : this.trap.activeTTL;
            this.trap.ttl += updateCtx.deltaTime;
            //console.log("this.trap.ttl: " + this.trap.ttl);
            // swap states once we have reached state TTL
            if (this.trap.ttl > duration) {
                this.trap.ttl = 0;
                this.state = (this.state === Animator.idle) ? Animator.active : Animator.idle;
                this.active = (this.state === Animator.active);
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

    /*
    draw() {
        drawBitmapCenteredAtLocationWithRotation(this.stateSketch, this.x+this.xOff, this.y+this.yOff, 0.0);
        if (showCollisions) {
            this.collider.draw(canvasContext);
        }
    }
    */

} // end of class