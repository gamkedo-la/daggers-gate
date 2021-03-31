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
            height: 65, 
            yoff: -10,
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
        this.inventory = new Inventory();
        this.inventory.evtMainHandUpdated.listen((evt) => {
            let weapon = evt.value;
            this.selectedPrimary = (weapon) ? weapon.attackKind : "none";
        });
        this.inventory.evtOffHandUpdated.listen((evt) => {
            let weapon = evt.value;
            this.selectedSecondary = (weapon) ? weapon.attackKind : "none";
        });
    }

    // properties
    get haveBow() {
        return this.inventory.includes("BOW");
    }
    get haveSword() {
        return this.inventory.includes("SWORD");
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
    tileCollisionHandle(nextX, nextY) {
        let walkIntoTileIndex = currentLevel.idxfromxy(nextX, nextY);
        let fgtile = currentLevel.fgi(walkIntoTileIndex);
        let bgtile = currentLevel.bgi(walkIntoTileIndex);

        // check for collider collisions
        // -- ran into object?
        if (!disableCollisions) {
            for (const obj of currentLevel.objects) {
                if (obj.active && obj.collider.blocking && obj.collider.overlaps(this.nextCollider)) {
                    console.log(`${this} hit object collider: ${obj}`);
                    return;
                }
            }
            // -- ran into enemy?
            for (const obj of currentLevel.enemies) {
                if (obj.collider.blocking && obj.collider.overlaps(this.nextCollider)) {
                    console.log(`${this} hit enemy collider: ${obj}`);
                    return;
                }
            }
            // -- ran into npc?
            for (const obj of currentLevel.npcs) {
                if (obj.collider.blocking && obj.collider.overlaps(this.nextCollider)) {
                    console.log(`${this} hit npc collider: ${obj}`);
                    return;
                }
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

        // check for bg collisions
        if (bgtile && !props.passable(bgtile) && !disableCollisions) {
            console.log("bg not passable: " + bgtile);
            return;
        }

        // we walked into a fg tile that is empty or is passable... keep walking
        if (0 === fgtile || props.passable(fgtile) || disableCollisions) {
            this.x = nextX;
            this.y = nextY;
        }

    }

    choosePrimary() {
        // are we carrying rune and are we close to matching altar?
        if (this.grabbedObj) {
            let obj = currentLevel.findObject((obj) => obj.collider.overlaps(this.interactCollider) && obj.kind === "altar" && this.grabbedObj.tag === obj.want, true);
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
            let obj = currentLevel.findAll((obj) => {
                if (!obj.wantAction) return false;
                if (!obj.collider.overlaps(this.interactCollider)) return false;
                if (obj.wantAction === "open" && this.keysHeld <= 0) return false;
                return true;
            }, true);
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
        // if loot is a weapon...
        if (loot.mainHand || loot.offHand) {
            console.log(" ----- INVENTORY ADD");
            this.inventory.add(loot);
        } else {
            // determine loot amount
            let amt = (loot.loot) ? loot.loot.amt : loot.amt || 1;
            // add loot to player
            switch (loot.tag) {
            case "MANA_DROP":
                console.log("mana + " + amt);
                this.mana += amt;
                if (this.mana > this.maxMana) this.man = this.maxMana;
                manaGain.play();
            break;
            case "HEALTH_DROP":
                console.log("health + " + amt);
                this.health += amt;
                if (this.health > this.maxHealth) this.health = this.maxHealth;
                healthGain.play();
            break;
            case "GOLD_COINS_TWO_DROP":
                console.log("gold coins + " + amt);
                this.gold += amt;
                pickingUpCoins.play();
            break;
            case "GOLD_COINS_SIX_DROP":
                console.log("gold coins + " + amt);
                this.gold += amt;
                pickingUpCoins.play();
            break;
            case "ARROW_ONE_DROP":
                console.log("arrows + " + amt);
                this.arrows += amt;
                pickingUpArrows.play();
            break;
            case "ARROW_FIVE_DROP":
                console.log("arrows + " + amt);
                this.arrows += amt;
                pickingUpArrows.play();
            break;
            case "KEY":
                console.log("keys + " + amt);
                this.keysHeld += amt;
            break;
            case "HEALING_POTION":
                console.log("hpotion + " + amt);
                this.healthPotions += amt;
            break;
            case "MANA_POTION":
                console.log("mpotion + " + amt);
                this.manaPotions += amt;
            break;
            case "HEART_PIECE1":
                console.log("++ heart ++");
                if (this.maxHealth < 100) {
                    this.maxHealth += 10;
                }
                this.health += 10;
                if (this.health > this.maxHealth) this.health = this.maxHealth;
            break;
            case "MANA_PIECE":
                console.log("++ mana ++");
                if (this.maxMana < 100) {
                    this.maxMana += 10;
                }
                this.mana += 10;
                if (this.mana > this.maxMana) this.mana = this.maxMana;
            break;

            }
            // trigger global event
            GameEvents.looted.trigger({loot: { tag: loot.tag, amt: amt }});
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
        for (const loot of currentLevel.findObject((v) => v.kind === "loot" && !v.loot.delayTTL && this.interactCollider.overlaps(v.collider))) {
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