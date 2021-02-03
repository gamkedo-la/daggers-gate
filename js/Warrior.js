// tuning constants
const PLAYER_MOVE_SPEED = 4.0;

warriorClass.prototype = new characterClass();

function warriorClass() {

    // key controls used for this
    this.setupControls = function(northKey, eastKey, southKey, westKey, spaceKey) {
        this.controlKeyForNorth = northKey;
        this.controlKeyForEast = eastKey;
        this.controlKeyForSouth = southKey;
        this.controlKeyForWest = westKey;
		this.controlKeyForinteractWithObject = spaceKey;
    }

    this.superInit = this.init;
    this.init = function(whichGraphic, whichName) {
        this.superInit(whichGraphic, whichName);
        this.movingSpeed = PLAYER_MOVE_SPEED;
        this.colHeight = 40;
        this.colWidth = 20;
        this.myCollisionColor = "blue";
    }

    this.reset = function() {
        this.keysHeld = 8;
        if (this.homeX == undefined) {
            for (var i = 0; i < roomGrid.length; i++) {
                if (roomGrid[i] == TILE.PLAYER) {
                    var tileRow = Math.floor(i / ROOM_COLS);
                    var tileCol = i % ROOM_COLS;
                    this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
                    this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
                    roomGrid[i] = TILE.GROUND;
                    break; // found it, so no need to keep searching 
                } // end of if
            } // end of for
        } // end of if position not saved yet

        this.x = this.homeX;
        this.y = this.homeY;

    } // end of reset

    //must override this function.  No super version
    this.tileCollisionHandle = function(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
        switch (walkIntoTileType) {
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
                    roomGrid[walkIntoTileIndex] = TILE.WALL_15; // remove door
                    SetupPathfindingGridData(p1);
                }
                break;
            case TILE.DOOR_YELLOW_FRONT:
                if (this.keysHeld > 0) {
                    this.keysHeld--; // one less key
                    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                    roomGrid[walkIntoTileIndex] = TILE.GROUND; // remove door
                    SetupPathfindingGridData(p1);
                }
                break;
            case TILE.KEY:
                this.keysHeld++; // gain key
                document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                roomGrid[walkIntoTileIndex] = TILE.GROUND; // remove key
                SetupPathfindingGridData(p1);
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