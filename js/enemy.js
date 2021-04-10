// tuning constants
const ENEMY_MOVE_SPEED = 2.0;
const AI_FRAME_THINK_TIME = 60;

class enemyClass extends characterClass {
    constructor(spec={}) {
        // set spec defaults
        spec.collider = Object.assign({}, {
            color: "green",
            width: 20,
            height: 40,
        }, spec.collider);
        spec.health = spec.health || 15;
        spec.maxHealth = spec.maxHealth || 15;
        //console.log("enemy collider spec: " + Fmt.ofmt(spec.collider));
        spec.movingSpeed = spec.movingSpeed || ENEMY_MOVE_SPEED;
        super(spec);
        this.framesBeforeReThink = AI_FRAME_THINK_TIME;
        this.moving = false;
        this.patrolling = true;
        this.resting = false;
        this.trackPlayerRange = 250;
    }

    //must override this function.  No super version
    tileCollisionHandle(nextX, nextY) {
        let walkIntoTileIndex = currentLevel.idxfromxy(nextX, nextY);
        let fgtile = currentLevel.fgi(walkIntoTileIndex);
        let bgtile = currentLevel.bgi(walkIntoTileIndex);

        // check for collisions against objects...
        for (const obj of currentLevel.objects) {
            if (obj.active && obj.collider.blocking && obj.collider.overlaps(this.nextCollider)) {
                //console.log(`${this} hit object collider: ${obj}`);
                return;
            }
        }

        // check for bg collisions
        if (bgtile && !props.passable(bgtile)) {
            //console.log("bg not passable: " + bgtile);
            return;
        }

        // we walked into a fg tile that is empty or is passable... keep walking
        if (0 === fgtile || props.passable(fgtile)) {
            this.x = nextX;
            this.y = nextY;
        }

    }

    move(updateCtx) {
        //pathfinding
        if (this.framesBeforeReThink-- < 0) {
            this.framesBeforeReThink = AI_FRAME_THINK_TIME;
            //check if within range of the player
            var playerDistance = dist(p1.x, p1.y, this.x, this.y);
            //console.log("playerdistance: " + playerDistance);

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
                var patrolToLocation = currentLevel.idxfromxy(patrolLocationX, patrolLocationY);
                startPath(patrolToLocation, this);

            } else if (this.resting) {
                this.move_East = this.move_West = this.move_North = this.move_South = false;
            } else { // tracking player
                var playerIdx = currentLevel.idxfromxy(p1.x, p1.y);
              //  console.log(currentLevel.fg)
                startPath(playerIdx, this);
            }
        } // end of Rethink Delay
        super.move(updateCtx);
    } //end of move function


    takeDamage(amount) {
        enemyDefaultGrunt.play();
        super.takeDamage(amount);
    }
} // end of class