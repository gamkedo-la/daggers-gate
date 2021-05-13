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
        this.moveable = true;
        this.framesBeforeReThink = AI_FRAME_THINK_TIME;
        this.moving = false;
        this.patrolling = true;
        this.resting = false;
        this.restTTL = 0;
        this.restDelay = spec.restDelay || 5000;
        this.repathTTL = 0;
        this.repathDelay = spec.repathDelay || 200;
        this.repathIndex = -1;
        this.trackPlayerRange = 250;
        this.attackRange = spec.attackRange || 25;
        this.closeRange = spec.closeRange || 64;
        this.attackTag = spec.attackTag || undefined;
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

    aiUpdate(updateCtx) {
        // handle ai delay
        //this.framesBeforeReThink--;
        //if (this.framesBeforeReThink > 0) return;
        // skip AI planning if already attacking...
        if (this.currentAttack) return;

        //console.log("rethink");

        // new round of AI planning...
        //this.framesBeforeReThink = AI_FRAME_THINK_TIME;

        // calc distance to player
        var playerDistance = dist(p1.x, p1.y, this.x, this.y);
        //console.log("distance to player: " + playerDistance);

        // player out of tracking range...
        this.moveTarget = undefined;
        if (playerDistance >= this.trackPlayerRange) {
            // if not already resting or patrolling... pick one...
            if (!this.resting && !this.patrolling) {
                if (randomIntFromInterval(0, 10) < 4) {
                    this.stopPathfinding();
                    this.restTTL = this.restDelay;
                    this.resting = true;
                } else {
                    this.patrolling = true;
                    var patrolLocationX = randomIntFromInterval(0, currentLevel.maxx);
                    var patrolLocationY = randomIntFromInterval(0, currentLevel.maxy);
                    var patrolToLocation = currentLevel.idxfromxy(patrolLocationX, patrolLocationY);
                    startPath(patrolToLocation, this);
                }
            }

            // handle patrolling
            if (this.patrolling) { 
                // patrol until end of path reached...
                if (!this.tilePath || this.tilePath.length === 0) {
                    this.patrolling = false;
                }

            // handle resting
            } else if (this.resting) {
                this.restTTL -= updateCtx.deltaTime;
                if (this.restTTL <= 0) {
                    this.restTTL = 0;
                    this.resting = false;
                }
            }

        // player within tracking range...
        } else { // tracking player
            this.resting = false;
            this.patrolling = false;
            // is player within attack range?
            if (playerDistance <= this.attackRange) {
                this.stopPathfinding();
                this.faceTowards(p1);
                if (this.attackDelayTTL <= 0) {
                    //console.log("attack");
                    if (this.attackTag) {
                        this.doMeleeAttack({tag: this.attackTag});
                    }
                }
            // close range... move directly towards player
            } else if (playerDistance <= this.closeRange) {
                this.stopPathfinding();
                this.moveTarget = p1;
                //console.log("close");
            // use pathfinding to player ...
            } else {
                this.repathTTL -= updateCtx.deltaTime;
                if (this.repathTTL <= 0) {
                    var playerIdx = currentLevel.idxfromxy(p1.x, p1.y);
                    if (!this.tilePath || this.tilePath.length == 0 || playerIdx != this.repathIndex) {
                        startPath(playerIdx, this);
                        this.repathIndex = playerIdx;
                    }
                    this.repathTTL = this.repathDelay;
                }
            }
        }

    }

    takeDamage(amount) {
        enemyDefaultGrunt.play();
        super.takeDamage(amount);
    }
} // end of class