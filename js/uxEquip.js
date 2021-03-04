
class UxEquipCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        const slotSize = 50;
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            layer: 1,
            xchild: [{
                cls: "UxPanel",
                tag: "topPanel",
                xxform: { origx:0, origy: 0 },
                xsketch: Object.assign({}, assets.get("WINDOW_BORDER"), {xfitter: { cls: "FitToParent" }}),
                /*
                xsketch: {
                    cls: 'Rect',
                    color: new Color(20,70,20,1),
                    xfitter: { cls: "FitToParent" },
                },
                */
                xchild: [

                    // PLAYER --------------------------------------------------
                    {
                        cls: "UxPanel",
                        tag: "playerPanel",
                        xxform: { left: .05, right: .5, top: .05, bottom: .6 },
                        xsketch: {},
                        xchild: [
                            {
                                cls: "UxText",
                                xxform: { left: .25, right:.75, top: 0, bottom: .7, width:120, height:40 },
                                xtext: { color: new Color(168,36,36), outlineWidth:1, outlineColor: new Color(235,138,6), text: "Apollo", },
                            },
                            {
                                cls: "UxPanel",
                                tag: "portraitPanel",
                                xsketch: {
                                    cls: 'Rect',
                                    color: new Color(200,150,200,1),
                                    xfitter: { cls: "FitToParent" },
                                },
                                xxform: { left: .25, right:.75, top: .6, bottom: .4, width:115, height:115 },
                            },
                            {
                                cls: "UxPanel",
                                xsketch: Object.assign({}, assets.get("BUTTON_GRN_S2_TRAN"), {xfitter: { cls: "FitToParent" }}),
                                xxform: { left: .25, right:.75, top: .6, bottom: .4, width:115, height:115 },
                            },

                            // HEARTS --------------------------------------------------
                            {
                                cls: "UxText",
                                xxform: { left: .5, right:.1, top: 0, bottom: .85, otop: 5 },
                                xtext: { color: new Color(48,51,134), text: "Health", },
                            },
                            {
                                cls: "UxPanel",
                                tag: "heartsPanel",
                                xxform: { left: .5, right: .1, top: .15, bottom: .5 },
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot1",
                                        xxform: { width:slotSize, height:slotSize, left:.1, right:.9, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot2",
                                        xxform: { width:slotSize, height:slotSize, left:.3, right:.7, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot3",
                                        xxform: { width:slotSize, height:slotSize, left:.5, right:.5, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot4",
                                        xxform: { width:slotSize, height:slotSize, left:.7, right:.3, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot5",
                                        xxform: { width:slotSize, height:slotSize, left:.9, right:.1, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot6",
                                        xxform: { width:slotSize, height:slotSize, left:.1, right:.9, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot7",
                                        xxform: { width:slotSize, height:slotSize, left:.3, right:.7, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot8",
                                        xxform: { width:slotSize, height:slotSize, left:.5, right:.5, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot9",
                                        xxform: { width:slotSize, height:slotSize, left:.7, right:.3, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot10",
                                        xxform: { width:slotSize, height:slotSize, left:.9, right:.1, top:.75, bottom:.25},
                                    },
                                ],
                            },

                            // MANA --------------------------------------------------
                            {
                                cls: "UxText",
                                xxform: { left: .5, right:.1, top: .5, bottom: .35, otop: 5 },
                                xtext: { color: new Color(48,51,134), text: "Mana", },
                            },
                            {
                                cls: "UxPanel",
                                tag: "manaPanel",
                                xxform: { left: .5, right: .1, top: .65 },
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot1",
                                        xxform: { width:slotSize, height:slotSize, left:.1, right:.9, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot2",
                                        xxform: { width:slotSize, height:slotSize, left:.3, right:.7, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot3",
                                        xxform: { width:slotSize, height:slotSize, left:.5, right:.5, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot4",
                                        xxform: { width:slotSize, height:slotSize, left:.7, right:.3, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot5",
                                        xxform: { width:slotSize, height:slotSize, left:.9, right:.1, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot6",
                                        xxform: { width:slotSize, height:slotSize, left:.1, right:.9, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot7",
                                        xxform: { width:slotSize, height:slotSize, left:.3, right:.7, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot8",
                                        xxform: { width:slotSize, height:slotSize, left:.5, right:.5, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot9",
                                        xxform: { width:slotSize, height:slotSize, left:.7, right:.3, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot10",
                                        xxform: { width:slotSize, height:slotSize, left:.9, right:.1, top:.75, bottom:.25},
                                    },
                                ],
                            },
                        ]
                    },

                    // EQUIP --------------------------------------------------

                    {
                        cls: "UxPanel",
                        tag: "equipPanel",
                        xxform: { left: .5, right: .05, top: .05, bottom: .6 },
                        xchild: [
                            {
                                cls: "UxText",
                                tag: "equipText",
                                xxform: { left: .5, right:.5, top: 0, bottom: .7, width: 175 },
                                xtext: { color: new Color(48,51,134), text: "EQUIPMENT", },
                            },

                            {
                                cls: "UxPanel",
                                tag: "equipButtonPanel",
                                xxform: { top: .3, bottom: .1 },
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxPanel",
                                        tag: "equipButton1",
                                        xxform: { left: .125, right:.875, top: .5, bottom: .5, width:65, height:65 },
                                        xsketch: {
                                            cls: 'Rect',
                                            color: new Color(20,70,20,1),
                                            xfitter: { cls: "FitToParent" },
                                            width: 50,
                                            height: 50,
                                            lockRatio: true,
                                        },
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "equipButton2",
                                        xxform: { left: .375, right:.625, top: .5, bottom: .5, width:65, height:65 },
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "equipButton3",
                                        xxform: { left: .625, right:.375, top: .5, bottom: .5, width:65, height:65 },
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "equipButton3",
                                        xxform: { left: .875, right:.125, top: .5, bottom: .5, width:65, height:65 },
                                    },

                                ],
                            },

                        ],
                    },

                    // ACTIVE -------------------------------------------------
                    {
                        cls: "UxPanel",
                        tag: "activePanel",
                        xxform: { left: .1, right: .1, top: .4, bottom: .45 },
                        /*
                        xchild: [
                            {
                                cls: "UxText",
                                tag: "equipText",
                                xxform: { left: .5, right:.5, top: 0, bottom: .7, width: 150 },
                                xtext: {
                                    color: new Color(0,0,200,.75),
                                    text: "Equipment",
                                },
                            },
                        ],
                        */
                    },

                    // AVAILABLE ----------------------------------------------
                    {
                        cls: "UxPanel",
                        tag: "activePanel",
                        xxform: { left: .2, right: .2, top: .6, bottom: .1 },
                        /*
                        xchild: [
                            {
                                cls: "UxText",
                                tag: "equipText",
                                xxform: { left: .5, right:.5, top: 0, bottom: .7, width: 150 },
                                xtext: {
                                    color: new Color(0,0,200,.75),
                                    text: "Equipment",
                                },
                            },
                        ],
                        */
                    },

                ],
            }],
        });
        for (let i=1; i<=10; i++) {
            let key = "healthSlot" + i.toString();
            this[key] = this.view.find((v) => v.tag === key);
            key = "manaSlot" + i.toString();
            this[key] = this.view.find((v) => v.tag === key);
        }

    }

    keyReleased(key) {
        if (key === KEY_ESCAPE) {
            this.onRestoreGame();
        }
    }

    updatePlayerHealth(updateCtx) {
        // skip update if no change
        if (p1.health === this.lastHealth && p1.maxHealth === this.lastMaxHealth) return;
        // cache last health values
        this.lastHealth = p1.health;
        this.lastMaxHealth = p1.maxHealth;
        p1.maxHealth = 100;
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

    updatePlayerMana(updateCtx) {
        // skip update if no change
        if (p1.mana === this.lastMana && p1.maxMana === this.lastMaxMana) return;
        // cache last mana values
        this.lastMana = p1.mana;
        this.lastMaxMana = p1.maxMana;
        p1.maxMana = 100;
        // update view for current mana and max mana
        for (let i=1; i<=10; i++) {
            let key = "manaSlot" + i.toString();
            let slot = this[key];
            // full mana
            if (p1.mana >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("MANA_PIECE"), {xfitter: { cls: "FitToParent" }});
                //let xsketch = Object.assign({parent: slot}, assets.get("HEART_PIECE1"));
                this[key].sketch = Sketch.generate(xsketch);
            // partial mana
            } else if (p1.mana < i*10 && p1.mana > (i-1)*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("MANA_HALF_EMPTY"), {xfitter: { cls: "FitToParent" }});
                //this[key].sketch = assets.generate("HEART_HALF_EMPTY");
                this[key].sketch = Sketch.generate(xsketch);
            } else if (p1.maxMana >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("MANA_EMPTY"), {xfitter: { cls: "FitToParent" }});
                //this[key].sketch = assets.generate("HEART_EMPTY");
                this[key].sketch = Sketch.generate(xsketch);
            } else {
                this[key].sketch = Sketch.zero;
            }
        }
    }

    update(updateCtx) {
        this.updatePlayerHealth(updateCtx);
        this.updatePlayerMana(updateCtx);
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onRestoreGame() {
        console.log("onRestoreGame");
        // restore game controller
        currentCtrl = lastCtrl;
        // tear down equip view
        this.view.destroy();
    }

}