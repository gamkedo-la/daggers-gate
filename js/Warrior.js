// tuning constants
const PLAYER_MOVE_SPEED = 5.0;

class warriorClass extends characterClass {
    constructor(spec={}) {
        // set default specs for warrior
        spec.collider = Object.assign({
            color: "blue", 
            width: 20, 
            height: 30, 
        }, spec.collider);
        spec.interactCollider = Object.assign({
            color: "rgba(255,255,0,.25)", 
            width: 50, 
            height: 50, 
        }, spec.interact);
        spec.yOff = spec.yOff || -25;
        spec.movingSpeed = spec.movingSpeed || PLAYER_MOVE_SPEED;
        super(spec);
    }

    // key controls used for this
    setupControls(northKey, eastKey, southKey, westKey, spaceKey) {
        this.controlKeyForNorth = northKey;
        this.controlKeyForEast = eastKey;
        this.controlKeyForSouth = southKey;
        this.controlKeyForWest = westKey;
        this.controlKeyForinteractWithObject = spaceKey;
    }

    reset() {
        this.keysHeld = 8;
        this.gold = 0;
        this.haveBow = false;
        super.reset();
    } // end of reset

    // handle collisions of player w/ objects
    /*
    checkCollisionAgainst(other) {
        if (this.isOverLapping(other.x, other.y)) {
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
    */

    //must override this function.  No super version
    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
        // check for interaction collisions
        if (this.interactWithObject) {
            for (const obj of currentLevel.objects) {
                if (obj.collider.overlaps(this.interactCollider)) {
                    console.log("interact object collider");
                    obj.interact(this);
                }
            }
        }

        // check for collider collisions
        for (const obj of currentLevel.objects) {
            if (obj.active && obj.collider.overlaps(this.nextCollider)) {
                console.log("hit object collider");
                return;
            }
        }
        for (const obj of currentLevel.enemies) {
            if (obj.collider.overlaps(this.nextCollider)) {
                console.log("hit enemy collider");
                return;
            }
        }

        // check for tile collisions
        // check for level exit
        if (walkIntoTileIndex in currentLevel.exits) {
            if (!queuedExit) {
                console.log("hit exit: " + Fmt.ofmt(currentLevel.exits[walkIntoTileIndex]));
                queuedExit = currentLevel.exits[walkIntoTileIndex];
            }
        }

        // we walked into a fg tile that is empty or is passable... keep walking
        if (0 === walkIntoTileType || props.passable(walkIntoTileType)) {
            this.x = nextX;
            this.y = nextY;
            return;  // FIXME: remove after switch statement cleanup?
        }

        // otherwise
        switch (walkIntoTileType) {
            case 0:
            case TILE.GROUND:
            case TILE.FLOOR_FIRE_RUNE:
            case TILE.FLOOR_WATER_RUNE:
            case TILE.FLOOR_WIND_RUNE:
            case TILE.FLOOR_EARTH_RUNE:
            case TILE.WALL_15: //OPEN DOOR
                this.x = nextX;
                this.y = nextY;
                break;
            case TILE.GOAL:
                this.reset();
                break;
            case TILE.DOOR:
                if (p1.interactWithObject) {
                    //if (this.controlKeyForinteractWithObject = spaceKey;
                    if (this.keysHeld > 0) {
                        this.keysHeld--; // one less key
                        document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                        currentLevel.setfgi(walkIntoTileIndex, TILE.WALL_15);
                        //roomGrid[walkIntoTileIndex] = TILE.WALL_15; // remove door
                        SetupPathfindingGridData(p1);
                    }
                }
                break;
            case TILE.DOOR_YELLOW_FRONT:
                if (this.keysHeld > 0) {
                    this.keysHeld--; // one less key
                    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                    //roomGrid[walkIntoTileIndex] = TILE.GROUND; // remove door
                    currentLevel.setfgi(walkIntoTileIndex, 0);
                    SetupPathfindingGridData(p1);
                }
                break;

            case TILE.KEY:
                this.keysHeld++; // gain key
                document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                //roomGrid[walkIntoTileIndex] = TILE.GROUND; // remove key
                currentLevel.setfgi(walkIntoTileIndex, 0);
                SetupPathfindingGridData(p1);
                console.log("key")
                break;
            case TILE.CHEST1_CLOSE:
                    this.keysHeld--; // use key
                    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld + " Gold:" + this.gold;
                    //roomGrid[walkIntoTileIndex] = TILE.GROUND; // remove key
                    currentLevel.setfgi(walkIntoTileIndex, 33);
                    this.gold = 10;

                break;
            case TILE.HEART_TILE:
                    this.health++;; // use key
                    currentLevel.setfgi(walkIntoTileIndex, 0);
                    SetupPathfindingGridData(p1);
                    console.log("Heart");
                break;
            case TILE.BOW:
                this.haveBow = true; // use key
                currentLevel.setfgi(walkIntoTileIndex, 0);
                SetupPathfindingGridData(p1);
                console.log("Bow: " + this.haveBow);
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