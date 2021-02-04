// tuning 
var gameObjectList = [];
var objectNameList = ['fireRune', 'windRune', 'waterRune', 'earthRune'];

function addObject(whichObject) {
    var tempObject = new gameObjectClass(whichObject);
    gameObjectList.push(tempObject);
}

//gameObjects have similar code to Character class for movement.
class gameObjectClass extends characterClass {
    constructor(spec={}) {
        spec.collisionColor = spec.collisionColor || "orange";
        super(spec);
        //collisions
        this.colHeight = 50;
        this.colWidth = 50;
        this.myIdentity = spec.tileid || 0;
        this.grabbedByPlayer = false;
        this.correctPuzzleLocation = false;
    }

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

    move() {
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
		super.move();
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