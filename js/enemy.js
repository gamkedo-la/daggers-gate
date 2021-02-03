// tuning constants
const ENEMY_MOVE_SPEED = 2.0;
const AI_FRAME_THINK_TIME = 60;
var enemyList = [];

function addEnemy() {
    var tempEnemy = new enemyClass();
    enemyList.push(tempEnemy);
}

enemyClass.prototype = new characterClass();

function enemyClass() {
    this.framesBeforeReThink = AI_FRAME_THINK_TIME;
    this.moving = false;
    this.patrolling = true;
    this.resting = false;
    this.trackPlayerRange = 250;

    this.superInit = this.init;
    this.init = function(whichGraphic, whichName) {
        this.superInit(whichGraphic, whichName);
        this.movingSpeed = ENEMY_MOVE_SPEED;
        this.colHeight = 40;
        this.colWidth = 20;
        this.myCollisionColor = "green";
    }

    this.superReset = this.reset;
    this.reset = function() {
        this.superReset();
    }

    //must override this function.  No super version
    this.tileCollisionHandle = function(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
        switch (walkIntoTileType) {
            case TILE.GROUND:
            case TILE.GOAL:
            case TILE.FLOOR_FIRE_RUNE:
            case TILE.FLOOR_WATER_RUNE:
            case TILE.FLOOR_WIND_RUNE:
            case TILE.FLOOR_EARTH_RUNE:
            case TILE.KEY:
                this.x = nextX;
                this.y = nextY;
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

    this.superMove = this.move;
    this.move = function() {
        //pathfinding
        if (this.framesBeforeReThink-- < 0) {
            this.framesBeforeReThink = AI_FRAME_THINK_TIME;
            //check if within range of the player
            var playerDistance = dist(p1.x, p1.y, this.x, this.y);

            this.resting = this.patrolling = false;

            if (playerDistance >= this.trackPlayerRange) {
                if (randomIntFromInterval(0, 10) < 4) {
                    this.resting = true;
                } else {
                    this.patrolling = true;
                }
            }

            if (this.patrolling) { //patrolling
                var patrolLocationX = randomIntFromInterval(0, 800);
                var patrolLocationY = randomIntFromInterval(0, 600);
                var patrolToLocation = pixCoordToIndex(patrolLocationX, patrolLocationY);
                startPath(patrolToLocation, this);

            } else if (this.resting) {
                this.move_East = this.move_West = this.move_North = this.move_South = false;
            } else { // tracking player
                var playerIdx = pixCoordToIndex(p1.x, p1.y);
                startPath(playerIdx, this);
            }
        } // end of Rethink Delay
        this.superMove();
    } //end of move function
} // end of class