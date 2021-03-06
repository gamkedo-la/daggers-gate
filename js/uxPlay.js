class UxPlayView extends UxView {
    constructor(spec={}) {
        super(spec);
        this.useCamera = true;
    }

    render(ctx) {
		currentLevel.render(ctx);
		if(pathFindingDisplay){
			drawPathingFindingTiles();
	    }
        // render particles
        //particles.render(ctx);
    }
}


class UxPlayCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);

        // variables for UI
        const slotSize = 40;
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            tag: "playCanvas",
            xchild: [
                {
                    cls: "UxPlayView",
                    tag: "play",
                    xxform: { origx: 0, origy: 0 },
                },
                {
                    cls: "UxFader",
                    fadeTTL: 2500,
                    xxform: { origx: 0, origy: 0 },
                },

                // Z panel ---------------------------------------------------------------------------------
                {
                    cls: "UxPanel",
                    xxform: { width:40, height:40, left:.035, right:.965, top:.05, bottom:.95},
                    xsketch: {},
                    xchild: [
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_BLU_S3_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                        },
                        {
                            cls: "UxPanel",
                            tag: "zpanel",
                        },
                        {
                            cls: "UxText",
                            xtext: {
                                color: new Color(225,225,0,1),
                                text: "z",
                                outlineWidth: 1,
                                outlineColor: new Color(0,0,0,1),
                                //font: new Font({style:"bold"}),
                            },
                            xxform: { width:40, height:40, left:1, right:0, top:.95, bottom:0.05},
                        },
                    ],
                },

                // X panel ---------------------------------------------------------------------------------
                {
                    cls: "UxPanel",
                    xxform: { width:40, height:40, left:.035, right:.965, top:.125, bottom:.875},
                    xsketch: {},
                    xchild: [
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_BLU_S3_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                        },
                        {
                            cls: "UxPanel",
                            tag: "xpanel",
                        },
                        {
                            cls: "UxText",
                            xtext: {
                                color: new Color(225,225,0,1),
                                text: "x",
                                outlineWidth: 1,
                                outlineColor: new Color(0,0,0,1),
                                //font: new Font({style:"bold"}),
                            },
                            xxform: { width:40, height:40, left:1, right:0, top:.95, bottom:0.05},
                        },
                    ],
                },

                // health panel ---------------------------------------------------------------------------------
                {
                    cls: "UxPanel",
                    tag: "healthPanel",
                    xxform: { left:.1, right:.65, top:.01, bottom:.92},
                    xsketch: {},
                    xchild: [
                        {
                            cls: "UxPanel",
                            tag: "healthSlot1",
                            xxform: { width:slotSize, height:slotSize, left:.05, right:.95, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "healthSlot2",
                            xxform: { width:slotSize, height:slotSize, left:.15, right:.85, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "healthSlot3",
                            xxform: { width:slotSize, height:slotSize, left:.25, right:.75, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "healthSlot4",
                            xxform: { width:slotSize, height:slotSize, left:.35, right:.65, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "healthSlot5",
                            xxform: { width:slotSize, height:slotSize, left:.45, right:.55, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "healthSlot6",
                            xxform: { width:slotSize, height:slotSize, left:.55, right:.45, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "healthSlot7",
                            xxform: { width:slotSize, height:slotSize, left:.65, right:.35, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "healthSlot8",
                            xxform: { width:slotSize, height:slotSize, left:.75, right:.25, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "healthSlot9",
                            xxform: { width:slotSize, height:slotSize, left:.85, right:.15, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "healthSlot10",
                            xxform: { width:slotSize, height:slotSize, left:.95, right:.05, top:.5, bottom:.5},
                        },
                    ],
                },

                // mana panel ---------------------------------------------------------------------------------
                {
                    cls: "UxPanel",
                    tag: "manaPanel",
                    xxform: { left:.4, right:.35, top:.01, bottom:.92},
                    xsketch: {},
                    xchild: [
                        {
                            cls: "UxPanel",
                            tag: "manaSlot1",
                            xxform: { width:slotSize, height:slotSize, left:.05, right:.95, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "manaSlot2",
                            xxform: { width:slotSize, height:slotSize, left:.15, right:.85, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "manaSlot3",
                            xxform: { width:slotSize, height:slotSize, left:.25, right:.75, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "manaSlot4",
                            xxform: { width:slotSize, height:slotSize, left:.35, right:.65, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "manaSlot5",
                            xxform: { width:slotSize, height:slotSize, left:.45, right:.55, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "manaSlot6",
                            xxform: { width:slotSize, height:slotSize, left:.55, right:.45, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "manaSlot7",
                            xxform: { width:slotSize, height:slotSize, left:.65, right:.35, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "manaSlot8",
                            xxform: { width:slotSize, height:slotSize, left:.75, right:.25, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "manaSlot9",
                            xxform: { width:slotSize, height:slotSize, left:.85, right:.15, top:.5, bottom:.5},
                        },
                        {
                            cls: "UxPanel",
                            tag: "manaSlot10",
                            xxform: { width:slotSize, height:slotSize, left:.95, right:.05, top:.5, bottom:.5},
                        },
                    ],
                },

                // key panel ---------------------------------------------------------------------------------
                {
                    cls: "UxPanel",
                    tag: "keyPanel",
                    xxform: { width:35, height:35, left:.035, right:.965, top:.2, bottom:.8},
                    xsketch: {},
                    xchild: [
                        {
                            cls: "UxPanel",
                            xxform: { border: .1 },
                            xsketch: { cls: 'Rect', color: new Color(0,0,0), xfitter: { cls: "FitToParent" }, },
                        },
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_RED_S3_TRAN"), {xfitter: { cls: "FitToParent" }}),
                        },
                        {
                            cls: "UxPanel",
                            tag: "xpanel",
                            xsketch: Object.assign({}, assets.get("KEY"), {xfitter: { cls: "FitToParent" }}),
                            xxform: { border: .15 },
                        },
                        {
                            cls: "UxText",
                            tag: "keyText",
                            xtext: { color: new Color(225,225,0), text: "1", outlineWidth: .5, outlineColor: new Color(0,0,0), },
                            xxform: { width:30, height:30, left:1, right:0, top:.95, bottom:0.05},
                        },
                    ],
                },

                // arrow panel ---------------------------------------------------------------------------------
                {
                    cls: "UxPanel",
                    tag: "arrowPanel",
                    //xxform: { width:35, height:35, left:.035, right:.965, top:.2, bottom:.8},
                    xxform: { width:35, height:35, left:.035, right:.965, top:.27, bottom:.73},
                    xsketch: {},
                    //xsketch: Object.assign({}, assets.get("ARROW_ONE_DROP"), {xfitter: { cls: "FitToParent" }}),
                    xchild: [
                        {
                            cls: "UxPanel",
                            xxform: { border: .1 },
                            xsketch: { cls: 'Rect', color: new Color(0,0,0), xfitter: { cls: "FitToParent" }, },
                        },
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_RED_S3_TRAN"), {xfitter: { cls: "FitToParent" }}),
                        },
                        {
                            cls: "UxPanel",
                            tag: "xpanel",
                            xsketch: Object.assign({}, assets.get("ARROW_ONE_DROP"), {xfitter: { cls: "FitToParent" }}),
                            xxform: { border: .1, angle: Math.PI*.25 },
                        },
                        {
                            cls: "UxText",
                            tag: "arrowText",
                            xtext: { color: new Color(225,225,0), text: "1", outlineWidth: .5, outlineColor: new Color(0,0,0), },
                            xxform: { width:30, height:30, left:1, right:0, top:.95, bottom:0.05},
                        },
                    ],
                },

            ],
        });

        // setup UI links
        this.zpanel = this.view.find((v) => v.tag === "zpanel");
        this.xpanel = this.view.find((v) => v.tag === "xpanel");
        this.keyText = this.view.find((v) => v.tag === "keyText");
        this.arrowText = this.view.find((v) => v.tag === "arrowText");
        for (let i=1; i<=10; i++) {
            let key = "healthSlot" + i.toString();
            this[key] = this.view.find((v) => v.tag === key);
            key = "manaSlot" + i.toString();
            this[key] = this.view.find((v) => v.tag === key);
        }

        // other state
        this.lastHealth = 0;
        this.lastMaxHealth = 0;
        this.lastMana = 0;
        this.lastMaxMana = 0;

    }

    keyPressed(key) {
        setKeyHoldState(key, p1, true);
        if (globalDebug) {
            if(key === KEY_NUMBER_1){
                pathFindingDisplay = !pathFindingDisplay;
            } else if (key === KEY_NUMBER_2){
                showCollisions = !showCollisions;
            } else if (key === KEY_NUMBER_3){
                showRoomNumbers = !showRoomNumbers;
            } else if (key === KEY_NUMBER_4) {
                disableCollisions = !disableCollisions;
                if (disableCollisions) {
                    p1.movingSpeed = PLAYER_MOVE_SPEED * 2;
                } else {
                    p1.movingSpeed = PLAYER_MOVE_SPEED;
                }
            }
        }

        if (key === KEY_ESCAPE) {
            this.onEquipMenu();
        }
        if (key === KEY_LETTER_Q) {
            this.onQuestMenu();
        }
        if (key === KEY_LETTER_H) {
            this.onHelp();
        }
        if (globalDebug) {
            if (key === 121) { // F10
                console.log("player debug animation toggle");
                p1.dbgAnim = !p1.dbgAnim;
            }
            if (p1.dbgAnim) this.checkDbgAnimKeys(key);
        }
    }

    keyReleased(key) {
        setKeyHoldState(key, p1, false);

    }

    /**
     * check for player attack animation debug and positioning of weapon...  use keys described below to modify
     * current frame animation weapon offset/angles/etc
     * @param {*} key 
     */
    checkDbgAnimKeys(key) {
        if (p1.currentAttack) {
            let cidx = p1.currentAttack._animIdx;
            if (key === 187) { // =
                let delta = Math.PI*.05;
                p1.currentAttack._xform.angle += delta;
                p1.currentAttack._syncMap[cidx].angle += delta;
                console.log("idx: " + cidx + " - " + Fmt.ofmt(p1.currentAttack._syncMap[cidx]));
            }
            if (key === 189) { // -
                let delta = -Math.PI*.05;
                p1.currentAttack._xform.angle += delta
                p1.currentAttack._syncMap[cidx].angle += delta;
                console.log("idx: " + cidx + " - " + Fmt.ofmt(p1.currentAttack._syncMap[cidx]));
            }
            if (key === 78) { // n
                console.log("setting sketch next");
                p1.sketch._anim._step = "next";
            }
            if (key === 80) { // p
                console.log("setting sketch prev");
                p1.sketch._anim._step = "prev";
            }
            if (key === 74) { // J
                p1.currentAttack._xform._offy -= 1;
                p1.currentAttack._syncMap[cidx].offy = p1.currentAttack._xform._offy;
                console.log("idx: " + cidx + " - " + Fmt.ofmt(p1.currentAttack._syncMap[cidx]));
            } else if (key === 75) { // K
                p1.currentAttack._xform._offx += 1;
                p1.currentAttack._syncMap[cidx].offx = p1.currentAttack._xform._offx;
                console.log("idx: " + cidx + " - " + Fmt.ofmt(p1.currentAttack._syncMap[cidx]));
            } else if (key === 76) { // L
                p1.currentAttack._xform._offy += 1;
                p1.currentAttack._syncMap[cidx].offy = p1.currentAttack._xform._offy;
                console.log("idx: " + cidx + " - " + Fmt.ofmt(p1.currentAttack._syncMap[cidx]));
            } else if (key === 73) { // I
                p1.currentAttack._xform._offx -= 1;
                p1.currentAttack._syncMap[cidx].offx = p1.currentAttack._xform._offx;
                console.log("idx: " + cidx + " - " + Fmt.ofmt(p1.currentAttack._syncMap[cidx]));
            }
        }
    }

    updatePlayerHealth() {
        // skip update if no change
        if (p1.health === this.lastHealth && p1.maxHealth === this.lastMaxHealth) return;
        // cache last health values
        this.lastHealth = p1.health;
        this.lastMaxHealth = p1.maxHealth;
        // update view for current health and max health
        for (let i=1; i<=10; i++) {
            let key = "healthSlot" + i.toString();
            let slot = this[key];
            // full health
            if (p1.health >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("HEART_PIECE1"), {xfitter: { cls: "FitToParent" }});
                //let xsketch = Object.assign({parent: slot}, assets.get("HEART_PIECE1"));
                this[key].sketch = Sketch.generate(xsketch);
            // partial health
            } else if (p1.health < i*10 && p1.health > (i-1)*10 + 2) {
                let xsketch = Object.assign({parent: slot}, assets.get("HEART_HALF_EMPTY"), {xfitter: { cls: "FitToParent" }});
                //this[key].sketch = assets.generate("HEART_HALF_EMPTY");
                this[key].sketch = Sketch.generate(xsketch);
            } else if (p1.maxHealth >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("HEART_EMPTY"), {xfitter: { cls: "FitToParent" }});
                //this[key].sketch = assets.generate("HEART_EMPTY");
                this[key].sketch = Sketch.generate(xsketch);
            } else {
                this[key].sketch = Sketch.zero;
            }
        }
    }

    updatePlayerMana() {
        // skip update if no change
        if (p1.mana === this.lastMana && p1.maxMana === this.lastMaxMana) return;
        // cache last mana values
        this.lastMana = p1.mana;
        this.lastMaxMana = p1.maxMana;
        // update view for current mana and max mana
        for (let i=1; i<=10; i++) {
            let key = "manaSlot" + i.toString();
            let slot = this[key];
            // full 
            if (p1.mana >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("MANA_PIECE"), {xfitter: { cls: "FitToParent" }});
                this[key].sketch = Sketch.generate(xsketch);
            // partial
            } else if (p1.mana < i*10 && p1.mana > (i-1)*10+2) {
                let xsketch = Object.assign({parent: slot}, assets.get("MANA_HALF_EMPTY"), {xfitter: { cls: "FitToParent" }});
                this[key].sketch = Sketch.generate(xsketch);
            // empty
            } else if (p1.maxMana >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("MANA_EMPTY"), {xfitter: { cls: "FitToParent" }});
                this[key].sketch = Sketch.generate(xsketch);
            // not unlocked
            } else {
                this[key].sketch = Sketch.zero;
            }
        }
    }

    updatePlayerActions() {
        if (p1.chosenPrimary !== this.lastPrimary) {
            this.lastPrimary = p1.chosenPrimary;
            let xsketch = Object.assign({parent: this.zpanel}, DaggerAssets.actionSketches[p1.chosenPrimary], {xfitter: { cls: "FitToParent" }});
            this.zpanel.sketch = Sketch.generate(xsketch) || Sketch.zero;
        }
        if (p1.chosenSecondary !== this.lastSecondary) {
            this.lastSecondary = p1.chosenSecondary;
            let xsketch = Object.assign({parent: this.xpanel}, DaggerAssets.actionSketches[p1.chosenSecondary], {xfitter: { cls: "FitToParent" }});
            this.xpanel.sketch = Sketch.generate(xsketch) || Sketch.zero;
        }
    }

    update(updateCtx) {
		// handle level exit
		if (queuedExit) {
            // remove any current fx
            let vmgr = ViewMgr.instance;
             for (const fx of vmgr.findall((v) => (v instanceof(GameFx)))) {
                fx.eol = true;
            }
			// load queued level
			levelLoader.load(queuedExit.lvl);
			// respawn player
			currentLevel.placeCharacter(p1, queuedExit.spawn);
            p1.lastSpawn = queuedExit.spawn;
			queuedExit = undefined;
			SetupPathfindingGridData(p1);
            // reset camera
            camera.reset();
            this.cameraXoff = 0;
            this.cameraYoff = 0;
		}
        // update camera offset
        let cameraXoff = Math.max(0, (camera.width-currentLevel.maxx) * .5);
        if (cameraXoff != this.cameraXoff) {
            this.cameraXoff = cameraXoff;
            camera._x = -cameraXoff;
        }
        let cameraYoff = Math.max(0, (camera.height-currentLevel.maxy) * .5);
        if (cameraYoff != this.cameraYoff) {
            this.cameraYoff = cameraYoff;
            camera._y = -cameraYoff;
        }
		// camera movement
		camera.update(updateCtx);
		// Wrapped in IF/ELSE to support Tile Editor Mode	
		// movement
		//p1.move(updateCtx);
		p1.update(updateCtx);
		currentLevel.update(updateCtx);

        // update view
        this.keyText.text = p1.keysHeld.toString();
        this.arrowText.text = p1.arrows.toString();
        this.updatePlayerHealth();
        this.updatePlayerMana();
        this.updatePlayerActions();
        //console.log("this.keyText: " + this.keyText);
        // update particles
        particles.update(updateCtx);
    }

    mouseClicked(x, y) {
        // pathfinding
        if(grid[tileOverIdx].elementType != WALL) {
            startPath(tileOverIdx, p1); 
        }
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onEquipMenu() {
        console.log("onEquipMenu");
        // create new controller for equip menu
        ctrlSys.assign(new UxEquipCtrl(), true);
    }

    onQuestMenu() {
        console.log("onQuestMenu");
        // activate new controller, move play controller to last
        ctrlSys.assign(new UxQuestCtrl(), true);
    }

    onShopMenu() {
        console.log("onShopMenu");
        // activate new controller, move play controller to last
        ctrlSys.assign(new UxHealerCtrl(), true);
    }

    onGameOver() {
        console.log("onGameOver");
        // activate new controller, move play controller to last
        ctrlSys.assign(new UxGameOverCtrl(), true);
    }

    onHelp() {
        console.log("onHelp");
        // activate new controller, move play controller to last
        ctrlSys.assign(new UxMainHelpPopUpCtrl(), true);
    }

    onStartDialog(dialog) {
        console.log("onDialog");
        // create new controller for equip menu
        ctrlSys.assign(new UxDialogCtrl({dialog: dialog}), true);
    }


}