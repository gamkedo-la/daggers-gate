// tuning constants
const PLAYER_MOVE_SPEED = 4.0;

class warriorClass extends characterClass {
    constructor(spec={}) {
        spec.collisionColor = spec.collisionColor || "blue";
        super(spec);
        // key controls used for this
        this.setupControls = function(northKey, eastKey, southKey, westKey, spaceKey) {
            this.controlKeyForNorth = northKey;
            this.controlKeyForEast = eastKey;
            this.controlKeyForSouth = southKey;
            this.controlKeyForWest = westKey;
            this.controlKeyForinteractWithObject = spaceKey;
        }
        this.movingSpeed = PLAYER_MOVE_SPEED;
        this.colHeight = 40;
        this.colWidth = 20;
    }

    reset() {
        this.keysHeld = 8;
        this.gold = 0;
        super.reset();
    } // end of reset

    //must override this function.  No super version
    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
        // check for level exit
        if (walkIntoTileIndex in currentLevel.exits) {
            if (!queuedExit) {
                console.log("hit exit: " + Fmt.ofmt(currentLevel.exits[walkIntoTileIndex]));
                queuedExit = currentLevel.exits[walkIntoTileIndex];
            }
        }
        if (props.isDoor(walkIntoTileType)) {
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
            return;  // FIXME: remove after switch statement cleanup?
        } else if (props.passable(walkIntoTileType)) {
            this.x = nextX;
            this.y = nextY;
            return;  // FIXME: remove after switch statement cleanup?
        }
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
                if (this.keysHeld > 0) {
                    this.keysHeld--; // one less key
                    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                    currentLevel.setfgi(walkIntoTileIndex, TILE.WALL_15);
                    //roomGrid[walkIntoTileIndex] = TILE.WALL_15; // remove door
                    SetupPathfindingGridData(p1);
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
                break;
            case TILE.CHEST1_CLOSE:
                    this.keysHeld--; // use key
                    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld + " Gold:" + this.gold;
                    //roomGrid[walkIntoTileIndex] = TILE.GROUND; // remove key
                    currentLevel.setfgi(walkIntoTileIndex, 33);
                    this.gold = 10;

                break;
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