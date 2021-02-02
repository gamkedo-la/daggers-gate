// tuning 
var gameObjectList = [];
var objectNameList = ['fireRune', 'windRune', 'waterRune', 'earthRune'];

function addObject(whichObject) {
    var tempObject = new gameObjectClass(whichObject);
    gameObjectList.push(tempObject);
}

//gameObjects have similar code to Character class for movement.
gameObjectClass.prototype = new characterClass();

function gameObjectClass(whichObject) {
    //collisions
    this.id = whichObject;
    this.colHeight = 50;
    this.colWidth = 50;
    this.myCollisionColor = "orange";
    this.myIdentity = whichObject
    this.grabbedByPlayer = false;
    this.correctPuzzleLocation = false;
    
    // setup sprite/name
    this.myBitmap = props.getImage(this.id);
    this.myName = props.getName(this.id);

    /*
    this.init = function(name) {
        if (name == 'fireRune') {
            this.myBitmap = fireRunePic;
            this.myName = "Fire Rune";
        } else if (name == 'windRune') {
            this.myBitmap = windRunePic;
            this.myName = 'Wind Rune';
        } else if (name == 'waterRune') {
            this.myBitmap = waterRunePic;
            this.myName = 'Water Rune';
        } else if (name == 'earthRune') {
            this.myBitmap = earthRunePic;
            this.myName = 'Earth Rune';
        }
        this.reset();
    }
    */

    this.reset = function() {
        if (this.homeX == undefined) {
            for (var i = 0; i < roomGrid.length; i++) {
                if (roomGrid[i] == TILE_FIRE_RUNE ||
                    roomGrid[i] == TILE_WIND_RUNE ||
                    roomGrid[i] == TILE_WATER_RUNE ||
                    roomGrid[i] == TILE_EARTH_RUNE) {
                    var tileRow = Math.floor(i / ROOM_COLS);
                    var tileCol = i % ROOM_COLS;
                    this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
                    this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
                    roomGrid[i] = TILE_GROUND;
                    break; // found it, so no need to keep searching 
                } // end of if
            } // end of for
        } // end of if position not saved yet

        this.x = this.homeX;
        this.y = this.homeY;
    } // end of reset

    this.checkCollisionAgainst = function(thisEntity) {
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

    this.superMove = this.move;
    this.move = function() {
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
		this.superMove();
    }

    //must override this function.  No super version
    this.tileCollisionHandle = function(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
        switch (walkIntoTileType) {
            case TILE_GROUND:
            case TILE_GOAL:
            case TILE_KEY:
            case TILE_WALL_15: //OPEN DOOR
                this.x = nextX;
                this.y = nextY;
                break;
			case TILE_FLOOR_FIRE_RUNE:
				if(this.myName == "Fire Rune"){
					this.correctPuzzleLocation = true;
				} else {
					this.x = nextX;
					this.y = nextY;
				}
				break;
            case TILE_FLOOR_WATER_RUNE:
				if(this.myName == "Water Rune"){
					this.correctPuzzleLocation = true;
				} else {
					this.x = nextX;
					this.y = nextY;
				}
				break;
            case TILE_FLOOR_WIND_RUNE:
            if(this.myName == "Wind Rune"){
					this.correctPuzzleLocation = true;
				} else {
					this.x = nextX;
					this.y = nextY;
				}
				break;
			case TILE_FLOOR_EARTH_RUNE:
				if(this.myName == "Earth Rune"){
					this.correctPuzzleLocation = true;
				} else {
					this.x = nextX;
					this.y = nextY;
				}
				break;
            case TILE_DOOR:
            case TILE_DOOR_YELLOW_FRONT:
            case TILE_WALL_1:
            case TILE_WALL_2:
            case TILE_WALL_3:
            case TILE_WALL_4:
            case TILE_WALL_5:
            case TILE_WALL_6:
            case TILE_WALL_7:
            case TILE_WALL_8:
            case TILE_WALL_9:
            case TILE_WALL_10:
            case TILE_WALL_11:
            case TILE_WALL_12:
            case TILE_WALL_13:
            default:
                // any other tile type number was found... do nothing, for now
                break;
        }
    }
} // end of class