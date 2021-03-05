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
            width: 55, 
            height: 55, 
        }, spec.interact);
        spec.yOff = spec.yOff || -25;
        spec.movingSpeed = spec.movingSpeed || PLAYER_MOVE_SPEED;
        spec.health = 30;
        spec.maxHealth = 30;
        spec.mana = 15;
        spec.maxMana = 30;
        super(spec);
        this.lootRange = 15;
        this.lootPullSpeed = .25; // pixels per ms
        this.inventory = []; // just a list of strings
        this.mainHand = "";
        this.offHand = "";
    }

    // properties
    get haveBow() {
        return this.inventory.includes("bow");
    }
    get haveSword() {
        return this.inventory.includes("sword");
    }

    // key controls used for this
    setupControls(northKey, eastKey, southKey, westKey, primActKey, secActKey) {
        this.controlKeyForNorth = northKey;
        this.controlKeyForEast = eastKey;
        this.controlKeyForSouth = southKey;
        this.controlKeyForWest = westKey;
        this.primActKey = primActKey;
        this.secActKey = secActKey;
    }

    reset() {
        this.keysHeld = 8;
        this.gold = 0;
        this.arrows = 0;
        this.healthPotions = 0;
        this.manaPotions = 0;
        super.reset();
    } // end of reset

    takeDamage(amount) {
        warriorOuch.play();
        super.takeDamage(amount);
    }

    //must override this function.  No super version
    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {

        // check for collider collisions
        // -- ran into object?
        for (const obj of currentLevel.objects) {
            if (obj.active && obj.collider.blocking && obj.collider.overlaps(this.nextCollider)) {
                console.log("hit object collider " + walkIntoTileType);
                return;
            }
        }
        // -- ran into enemy?
        for (const obj of currentLevel.enemies) {
            if (obj.collider.blocking && obj.collider.overlaps(this.nextCollider)) {
                console.log("hit enemy collider");
                return;
            }
        }

        // check for tile collisions
        // -- ran into level exit?
        if (walkIntoTileIndex in currentLevel.exits) {
            // check for locked exit
            if (currentLevel.isLocked()) {
                console.log("hit locked exit: " + Fmt.ofmt(currentLevel.exits[walkIntoTileIndex]));
                return;
            }
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
        console.log("Tile Type: " + walkIntoTileType);
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
                        currentLevel.setfgi(walkIntoTileIndex, TILE.WALL_15); //remove door
                        SetupPathfindingGridData(p1);
                    }
                }
                break;
            case TILE.DOOR_YELLOW_FRONT:
                if (this.keysHeld > 0) {
                    this.keysHeld--; // one less key
                    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                    currentLevel.setfgi(walkIntoTileIndex, 0); //remove door
                    SetupPathfindingGridData(p1);
                }
                break;

            case TILE.CHEST1_CLOSE:
                    this.keysHeld--; // use key
                    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld + " Gold:" + this.gold;
                    currentLevel.setfgi(walkIntoTileIndex, 33); //open chest
                    this.gold = 10;
                break;

            case TILE.HEART_PIECE1:
                if (this.maxHealth < 100) {
                    this.maxHealth += 10;
                }
                this.health += 10;
                if (this.health > this.maxHealth) this.health = this.maxHealth;
                currentLevel.setfgi(walkIntoTileIndex, 0); //remove heart
                SetupPathfindingGridData(p1);
                console.log("Heart");
                break;
            case TILE.HEART_TILE:
            case TILE.HEART_PIECE2:
                    this.health++;; 
                    currentLevel.setfgi(walkIntoTileIndex, 0); //remove heart
                    SetupPathfindingGridData(p1);
                    console.log("Heart");
                break;
            case TILE.GROUND_SPIKES_UP:
                this.takeDamage(5);
                SetupPathfindingGridData(p1);
                console.log("Take Damage from Spike");
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

    equipMainHand(item) {
        if (this.mainHand) {
            this.inventory.push(this.mainHand);
        }
        this.mainHand = item;
        switch (item) {
        case "sword":
            this.selectedPrimary = "melee";
            break;
        case "icewand":
            this.selectedPrimary = "magic";
            break;
        case "firewand":
            this.selectedPrimary = "magic";
            break;
        default:
            this.selectedPrimary = "none";
            break;
        }
    }

    equipOffHand(item) {
        if (this.offHand) {
            this.inventory.push(this.offHand);
        }
        this.offHand = item;
        switch (item) {
        case "bow":
            this.selectedSecondary = "ranged";
            break;
        case "icewand":
            this.selectedSecondary = "magic";
            break;
        case "firewand":
            this.selectedSecondary = "magic";
            break;
        default:
            this.selectedSecondary = "none";
            break;
        }
    }

    choosePrimary() {
        // are we carrying rune and are we close to matching altar?
        if (this.grabbedObj) {
            let obj = currentLevel.findObject((obj) => obj.collider.overlaps(this.interactCollider) && obj.kind === "altar" && this.grabbedObj.tag === obj.want);
            this.targetObj = obj;
            if (obj) return "place";
        }
        // but are we currently carrying something?
        if (this.grabbedObj) {
            return "drop";
        }
        // are we in combat?
        if (this.inCombat) {
            return this.selectedPrimary;
        }
        // are we in range of interactable object?
        // FIXME: we may need to change this to be either a) closest object or b) iterate through/assign priority to objects we can interact with...
        if (this.interactCollider) {
            let obj = currentLevel.findObject((obj) => {
                if (!obj.wantAction) return false;
                if (!obj.collider.overlaps(this.interactCollider)) return false;
                if (obj.wantAction === "open" && this.keysHeld <= 0) return false;
                return true;
            });
            if (obj) {
                this.targetObj = obj;
                return obj.wantAction;
            }
        }
        // otherwise, use selected main action
        return this.selectedPrimary;
    }

    chooseSecondary() {
        // can't perform secondary action if we carrying something...
        if (this.grabbedObj) {
            return "none";
        }
        // otherwise, use selected secondary action
        return this.selectedSecondary;
    }

    gatherLoot(loot) {
        // determine loot amount
        let amt = (loot.loot) ? loot.loot.amt : 1;
        // add loot to player
        switch (loot.tag) {
        case "MANA_DROP":
            console.log("mana + " + amt);
            this.mana += amt;
        break;
        case "HEALTH_DROP":
            console.log("health + " + amt);
            this.health += amt;
        break;
        case "GOLD_COINS_TWO_DROP":
            console.log("gold coins + " + amt);
            this.gold += amt;
        break;
        case "GOLD_COINS_SIX_DROP":
            console.log("gold coins + " + amt);
            this.gold += amt;
        break;
        case "ARROW_ONE_DROP":
            console.log("arrows + " + amt);
            this.arrows += amt;
        break;
        case "ARROW_FIVE_DROP":
            console.log("arrows + " + amt);
            this.arrows += amt;
        break;
        case "KEY":
            console.log("keys + " + amt);
            this.keysHeld += amt;
        break;
        case "SWORD":
            if (!this.mainHand) {
                this.equipMainHand("sword");
                console.log("equipped sword!");
            } else {
                console.log("picked up sword");
                this.inventory.push("sword");
            }
        break;
        case "BOW":
            if (!this.offHand) {
                this.equipOffHand("bow");
                console.log("equipped bow!");
            } else {
                console.log("picked up bow");
                this.inventory.push("bow");
            }
        break;
        }
        // destroy loot objectcase 
        currentLevel.destroyObject(loot);
    }

    update(updateCtx) {
        // select primary/secondary actions...
        let newPrimary = this.choosePrimary()
        if (newPrimary !== this.chosenPrimary) {
            console.log("new primary action: " + newPrimary);
            this.chosenPrimary = newPrimary;
        }
        let newSecondary = this.chooseSecondary()
        if (newSecondary !== this.chosenSecondary) {
            console.log("new secondary action: " + newSecondary);
            this.chosenSecondary = newSecondary;
        }

        // gathering loot
        for (const loot of currentLevel.findAllObjectEnemy((v) => v.kind === "loot" && !v.loot.delayTTL && this.interactCollider.overlaps(v.collider))) {
            // is object "close enough" to pick up?
            if (dist(this.x, this.y, loot.x, loot.y) <= this.lootRange) {
                // pickup
                this.gatherLoot(loot);
            // otherwise... move the loot closer
            } else {
                let v = new Vect(this.x-loot.x, this.y-loot.y);
                v.normalize().mult(this.lootPullSpeed);
                loot.x += (v.x * updateCtx.deltaTime);
                loot.y += (v.y * updateCtx.deltaTime);
            }
        }

        // start primary or secondary action
        if (this.startPrimaryAction) {
            this.primaryAction();
        }
        if (this.startSecondaryAction) {
            this.secondaryAction();
        }
        super.update(updateCtx);
    }
} // end of class