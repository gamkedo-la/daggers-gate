class UxAlchemistShopCtrl extends UxCtrl {
    
    constructor(spec={}) {
        super(spec);

        //this._dialog = spec.dialog;
        this._responseColor || new Color(168,36,36);
        const titleColor = spec.titleColor || new Color(168,36,36);
        const dialogColor = spec.dialogColor || new Color(168,36,36);
        this._font = spec.font || new Font({size:21});
        this.availColor = spec.availColor || new Color(27,78,68);
        this.unavailColor = spec.availColor || new Color(105,27,40);

        this.manaCost = 10;
        this.healthCost = 15;

        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            xchild: [
                {
                    cls: "UxPanel",
                    xsketch: Object.assign({}, assets.get("BUTTON_GRN_S1_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                    xxform: { border: .1 },
                    xchild: [
                        // NPC ---------------------------
                        {
                            cls: "UxPanel",
                            //xsketch: Object.assign({}, assets.get("BUTTON_GLD_S4_TRAN"), {xfitter: { cls: "FitToParent" }}),
                            xsketch: {},
                            xxform: { top: .05, bottom: .6, offset: 20 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: " Alchemist ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
                                    xxform: {top: 0, bottom:1, left: .325, right: .325, height: 45},
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GLD_S2_OPAQ")),
                                    active: false,
                                },
                                {
                                    cls: "UxPanel",
                                    xxform: {right: .75, offset: 15 },
                                    xsketch: {},
                                    xchild: [
                                        {
                                            cls: "UxPanel",
                                            xsketch: { cls: 'Rect', color: new Color(117,157,169,1), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, },
                                            xxform: { offset: 5 },
                                        },
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("ALCHEMIST_PORT") ),
                                            xxform: { offset: 5 },
                                        },
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_BLU_S2_TRAN") ),
                                        },
                                    ],
                                },
                                {
                                    cls: "UxText",
                                    xxform: {left: .25, offset: 5, top: .2 },
                                    xtext: { 
                                        color: dialogColor, wrap: true, fit: false, font: this._font,
                                        text: "Come and check out the finest potions in town.  Yep, they are the only potions in town, but they will still get you out of a pinch when needed!", 
                                    },
                                }

                            ],
                        },
                        
                        // Your Inventory ---------------------------
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_BLU_S4_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                            xxform: { top: .4, bottom: .35, offset: 12, left: .25, right: .25 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: "  Inventory  ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
                                    xxform: {top: -0.1, bottom:1.1, left: .325, right: .325, height: 40},
                                    xunpressed: Object.assign({}, assets.get("BUTTON_BLU_S2_OPAQ")),
                                    active: false,
                                },

                                // GOLD PANEL
                                {
                                    cls: "UxPanel",
                                    xxform: { top: .125, bottom: .125, right: .67, offset:5 },
                                    xsketch: {},
                                    xchild: [
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_GLD_S3_OPAQ") ),
                                        },
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("GOLD_COINS_TWO_DROP") ),
                                        },
                                        {
                                            cls: "UxText",
                                            tag: "goldText",
                                            xtext: { color: new Color(225,225,0,1), text: "1", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                            xxform: { width:50, height:50, left:.75, right:.25, top:.95, bottom:0.05},
                                        },
                                    ],
                                },

                                // HEALTH POTION PANEL
                                {
                                    cls: "UxPanel",
                                    xxform: { top: .125, bottom: .125, right: .33, left: .33, offset:5 },
                                    xsketch: {},
                                    xchild: [
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_GLD_S3_OPAQ") ),
                                        },
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("HEALING_POTION") ),
                                            xxform: { left: .15, right: .15, top:.15, bottom:.2 },
                                        },
                                        {
                                            cls: "UxText",
                                            tag: "healthPotionText",
                                            xtext: { color: new Color(225,225,0,1), text: "1", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                            xxform: { width:50, height:50, left:.75, right:.25, top:.95, bottom:0.05},
                                        },
                                    ],
                                },

                                // MANA POTION PANEL
                                {
                                    cls: "UxPanel",
                                    xxform: { top: .125, bottom: .125, left: .67, offset:5 },
                                    xsketch: {},
                                    xchild: [
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_GLD_S3_OPAQ") ),
                                        },
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("MANA_POTION") ),
                                            xxform: { left: .15, right: .15, top:.15, bottom:.2 },
                                        },
                                        {
                                            cls: "UxText",
                                            tag: "manaPotionText",
                                            xtext: { color: new Color(225,225,0,1), text: "1", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                            xxform: { width:50, height:50, left:.75, right:.25, top:.95, bottom:0.05},
                                        },
                                    ],
                                },

                            ],
                        },
                        
                        // For Sale ---------------------------
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_GRN_S4_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                            xxform: { top: .675, bottom: .05, offset: 12, left: .325, right: .325 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: "  For Sale  ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
                                    xxform: {top: -0.1, bottom:1.1, left: .3, right: .3, height: 40},
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S2_OPAQ")),
                                    active: false,
                                },

                                // HEALTH POTION SALE
                                {
                                    cls: "UxPanel",
                                    xxform: { right: .5, offset:5 },
                                    xsketch: {},
                                    xchild: [
                                        {
                                            cls: "UxPanel",
                                            xxform: { top: .125, bottom: .25 },
                                            xsketch: {},
                                            xchild: [
                                                {
                                                    cls: "UxButton",
                                                    tag: "buyHealthButton",
                                                    xtext: {text: ""},
                                                    xunpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_GLD_S3_OPAQ")),
                                                    xpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S2_OPAQ")),
                                                    xhighlight: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S3_OPAQ")),
                                                },
                                                {
                                                    cls: "UxPanel",
                                                    xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("HEALING_POTION") ),
                                                    xxform: { left: .15, right: .15, top:.15, bottom:.2 },
                                                },
                                            ],
                                        },
                                        {
                                            cls: "UxText",
                                            tag: "buyHealthText",
                                            xtext: { color: this.availColor, text: this.healthCost.toString() + "g" },
                                            xxform: { top:.715, bottom: .035},
                                        },
                                    ],
                                },

                                // MANA POTION SALE
                                {
                                    cls: "UxPanel",
                                    xxform: { left: .5, offset:5 },
                                    xsketch: {},
                                    xchild: [
                                        {
                                            cls: "UxPanel",
                                            xxform: { top: .125, bottom: .25 },
                                            xsketch: {},
                                            xchild: [
                                                {
                                                    cls: "UxButton",
                                                    tag: "buyManaButton",
                                                    xtext: {text: ""},
                                                    xunpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_GLD_S3_OPAQ")),
                                                    xpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S2_OPAQ")),
                                                    xhighlight: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S3_OPAQ")),
                                                },
                                                {
                                                    cls: "UxPanel",
                                                    xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("MANA_POTION") ),
                                                    xxform: { left: .15, right: .15, top:.15, bottom:.2 },
                                                },
                                            ],
                                        },
                                        {
                                            cls: "UxText",
                                            tag: "buyManaText",
                                            xtext: { color: this.availColor, text: this.manaCost.toString() + "g" },
                                            xxform: { top:.715, bottom: .035},
                                        },
                                    ],
                                },

                            ],
                        },

                        // BACK ---------------------------
                        {
                            cls: "UxButton",
                            tag: "backButton",
                            xtext: { color: titleColor, text: " Back " },
                            xxform: {top: .88, bottom: .04, left: .75, right: .05, otop: 5},
                            xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
                            xpressed: Object.assign({}, assets.get("BUTTON_RED_S2_OPAQ")),
                            xhighlight: Object.assign({}, assets.get("BUTTON_RED_S3_OPAQ")),
                        },
                    ],
                },
            ],
        });

        // lookup UI elements
        this.goldText = this.view.find((v) => v.tag === "goldText");
        this.healthPotionText = this.view.find((v) => v.tag === "healthPotionText");
        this.manaPotionText = this.view.find((v) => v.tag === "manaPotionText");
        this.buyHealthButton = this.view.find((v) => v.tag === "buyHealthButton");
        this.buyHealthText = this.view.find((v) => v.tag === "buyHealthText");
        this.buyManaButton = this.view.find((v) => v.tag === "buyManaButton");
        this.buyManaText = this.view.find((v) => v.tag === "buyManaText");
        this.backButton = this.view.find((v) => v.tag === "backButton");
        //console.log("bht: " + this.buyHealthText);
        //console.log("bht.sketch: " + this.buyHealthText._textSketch);
        // wire UI elements
        this.buyHealthButton.evtClicked.listen(this.onBuyHealth.bind(this));
        this.buyManaButton.evtClicked.listen(this.onBuyMana.bind(this));
        this.backButton.evtClicked.listen(this.onBack.bind(this));
    }

    // METHODS -------------------------------------------------------------

    keyPressed(key) {
        if (key === KEY_ESCAPE || key === KEY_LETTER_Z || key === KEY_LETTER_X || key === 83) {
            this.onBack();
        }
    }

    updateCounts(updateCtx) {
        if (p1.gold !== this.lastGold) {
            this.lastGold = p1.gold;
            this.goldText.text = p1.gold.toString();
        }
        if (p1.healthPotions !== this.lastHealthPotions) {
            this.lastHealthPotions = p1.healthPotions;
            this.healthPotionText.text = p1.healthPotions.toString();
        }
        if (p1.manaPotions !== this.lastManaPotions) {
            this.lastManaPotions = p1.manaPotions;
            this.manaPotionText.text = p1.manaPotions.toString();
        }
    }

    updateButtons(updateCtx) {
        // not enough gold to buy health
        if (p1.gold < this.healthCost) {
            this.buyHealthButton.active = false;
            this.buyHealthText._textSketch._color = this.unavailColor;
        } else {
            this.buyHealthButton.active = true;
            this.buyHealthText._textSketch._color = this.availColor;
        }
        // not enough gold to buy mana
        if (p1.gold < this.manaCost) {
            this.buyManaButton.active = false;
            this.buyManaText._textSketch._color = this.unavailColor;
        } else {
            this.buyManaButton.active = true;
            this.buyManaText._textSketch._color = this.availColor;
        }

    }

    update(ctx) {
        this.updateCounts(ctx);
        this.updateButtons(ctx);
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onBuyHealth() {
        console.log("onBuyHealth");
        p1.gold -= this.healthCost;
        p1.healthPotions++;
    }

    onBuyMana() {
        console.log("onBuyMana");
        p1.gold -= this.manaCost;
        p1.manaPotions++;
    }

    onBack() {
        // restore game controller
        ctrlSys.pop();
        // tear down current view
        this.view.destroy();
    }

}
