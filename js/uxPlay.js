class UxPlayView extends UxView {
    constructor(spec={}) {
        super(spec);
    }

    render(ctx) {
		// Wrapped in IF/ELSE to support Tile Editor Mode	
		ctx.translate(-camera.x, -camera.y);
		currentLevel.render(ctx);
		if(pathFindingDisplay){
			drawPathingFindingTiles();
	    }
		p1.draw();
		ctx.translate(camera.x, camera.y);
		
        /*
		if(framesToDisplayMessage-- > 600){
			colorText("HELPER CODE", 500, 400, fillColor = "black", font = "26px Arial Black");
			colorText("'1' : Toggles Pathfinding Display", 500, 450, fillColor = "black", font = "14px Arial Black");
			colorText("'2' : Toggles Collision Boxes Display", 500, 500, fillColor = "black", font = "14px Arial Black");
			colorText("'3' : Toggles Room Numbers Display", 500, 550, fillColor = "black", font = "14px Arial Black");		
		} else if (framesToDisplayMessage < 600 && framesToDisplayMessage > 300){ 	
			colorText("Player Movements", 500, 400, fillColor = "black", font = "26px Arial Black");
			colorText("'Up Arrow' : Move Up", 500, 450, fillColor = "black", font = "14px Arial Black");
			colorText("'Left Arrow' : Move Left", 500, 475, fillColor = "black", font = "14px Arial Black");
			colorText("'Down Arrow' : Move Down", 500, 500, fillColor = "black", font = "14px Arial Black");
			colorText("'Right Arrow' : Move Right", 500, 525, fillColor = "black", font = "14px Arial Black");		
			colorText("'Left Click' : Player uses pathfinding", 500, 550, fillColor = "black", font = "14px Arial Black");
			colorText("to that location", 500, 575, fillColor = "black", font = "14px Arial Black");		
		} else if (framesToDisplayMessage < 250 && framesToDisplayMessage > 0){ 	
			colorText("USE KEYS TO FIND THE TREASURE", 400, 400, fillColor = "black", font = "14px Arial Black");
		}
        */

    }
}


class UxPlayCtrl extends UxCtrl {
    constructor(spec={}) {
        // variables for UI
        const slotSize = 50;
        super(spec);
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
                    cls: "UxPanel",
                    tag: "zpanel",
                    xxform: { width:40, height:40, left:.05, right:.95, top:.05, bottom:.95},
                    xchild: [
                        {
                            cls: "UxText",
                            xtext: {
                                color: new Color(225,225,0,.75),
                                text: "z",
                                outlineWidth: 1,
                                outlineColor: new Color(0,0,0,.5),
                                font: new Font({style:"bold"}),
                            },
                            xxform: { width:40, height:40, left:1, right:0, top:.95, bottom:0.05},
                        },
                    ],
                },
                {
                    cls: "UxPanel",
                    tag: "xpanel",
                    xxform: { width:40, height:40, left:.05, right:.95, top:.125, bottom:.875},
                    xchild: [
                        {
                            cls: "UxText",
                            xtext: {
                                color: new Color(225,225,0,.75),
                                text: "x",
                                outlineWidth: 1,
                                outlineColor: new Color(0,0,0,.5),
                                font: new Font({style:"bold"}),
                            },
                            xxform: { width:40, height:40, left:1, right:0, top:.95, bottom:0.05},
                        },
                    ],
                },

                {
                    cls: "UxPanel",
                    tag: "healthPanel",
                    xxform: { left:.1, right:.6, top:.02, bottom:.91},
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

                {
                    cls: "UxPanel",
                    tag: "manaPanel",
                    xxform: { left:.1, right:.6, top:.1, bottom:.83},
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

                {
                    cls: "UxPanel",
                    tag: "keyPanel",
                    xxform: { width:35, height:35, left:.1, right:.9, top:.2, bottom:.8},
                    xsketch: Object.assign({}, assets.get("KEY"), {xfitter: { cls: "FitToParent" }}),
                    xchild: [
                        {
                            cls: "UxText",
                            tag: "keyText",
                            xtext: {
                                color: new Color(225,225,0,.75),
                                text: "1",
                                outlineWidth: 1,
                                outlineColor: new Color(0,0,0,.5),
                                font: new Font({style:"bold"}),
                            },
                            xxform: { width:25, height:25, left:1, right:0, top:.95, bottom:0.05},
                        },
                    ],
                },

            ],
        });

        // setup UI links
        this.zpanel = this.view.find((v) => v.tag === "zpanel");
        this.xpanel = this.view.find((v) => v.tag === "xpanel");
        this.keyText = this.view.find((v) => v.tag === "keyText");
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
        if(key === KEY_NUMBER_1){
            pathFindingDisplay = !pathFindingDisplay;
        } else if (key === KEY_NUMBER_2){
            showCollisions = !showCollisions;
        } else if (key === KEY_NUMBER_3){
            showRoomNumbers = !showRoomNumbers;
        }
    }

    keyReleased(key) {
        setKeyHoldState(key, p1, false);
        if (key === KEY_ESCAPE) {
            this.onEquipMenu();
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
            } else if (p1.health < i*10 && p1.health > (i-1)*10) {
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
            } else if (p1.mana < i*10 && p1.mana > (i-1)*10) {
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

    update(updateCtx) {
		// handle level exit
		if (queuedExit) {
			// load queued level
			levelLoader.load(queuedExit.lvl);
			// respawn player
			currentLevel.placeCharacter(p1, queuedExit.spawn);
			queuedExit = undefined;
			SetupPathfindingGridData(p1);
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
        this.updatePlayerHealth();
        this.updatePlayerMana();
        //console.log("this.keyText: " + this.keyText);
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
        let ctrl = new UxEquipCtrl();
        // activate new controller, move play controller to last
        lastCtrl = this;
        currentCtrl = ctrl;
    }


}