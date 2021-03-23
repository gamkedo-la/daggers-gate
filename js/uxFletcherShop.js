class UxFletcherShopCtrl extends UxCtrl {
    
    constructor(spec={}) {
        super(spec);

        //this._dialog = spec.dialog;
        this._responseColor || new Color(168,36,36);
        const titleColor = spec.titleColor || new Color(168,36,36);
        const dialogColor = spec.dialogColor || new Color(168,36,36);
        this._font = spec.font || new Font({size:25});
        this.availColor = spec.availColor || new Color(27,78,68);
        this.unavailColor = spec.availColor || new Color(105,27,40);

        this.oneCost = 4;
        this.fiveCost = 15;

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
                            xsketch: {},
                            xxform: { top: .05, bottom: .6, offset: 20 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: " Fletcher ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
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
                                        text: "I have but a simple trade, but you may find use in what I sell.", 
                                    },
                                }

                            ],
                        },
                        
                        // Your Inventory ---------------------------
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_BLU_S4_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                            //xxform: { top: .4, bottom: .35, offset: 12, left: .25, right: .25 },
                            xxform: { top: .4, bottom: .35, offset: 12, left: .325, right: .325 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: "  Inventory  ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
                                    xxform: {top: -0.1, bottom:1.1, left: .3, right: .3, height: 40},
                                    xunpressed: Object.assign({}, assets.get("BUTTON_BLU_S2_OPAQ")),
                                    active: false,
                                },

                                // GOLD PANEL
                                {
                                    cls: "UxPanel",
                                    xxform: { top: .125, bottom: .125, right: .5, offset:5 },
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

                                // ARROW PANEL
                                {
                                    cls: "UxPanel",
                                    xxform: { top: .125, bottom: .125, left: .5, offset:5 },
                                    xsketch: {},
                                    xchild: [
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_GLD_S3_OPAQ") ),
                                        },
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("ARROW_ONE_DROP") ),
                                            xxform: { angle: Math.PI*.25, border: .15 },
                                        },
                                        {
                                            cls: "UxText",
                                            tag: "arrowText",
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

                                // 1 ARROW SALE
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
                                                    tag: "buyOneButton",
                                                    xtext: {text: ""},
                                                    xunpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_GLD_S3_OPAQ")),
                                                    xpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S2_OPAQ")),
                                                    xhighlight: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S3_OPAQ")),
                                                },
                                                {
                                                    cls: "UxPanel",
                                                    xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("ARROW_ONE_DROP") ),
                                                    xxform: { angle: Math.PI*.25, border: .15 },
                                                },
                                            ],
                                        },
                                        {
                                            cls: "UxText",
                                            tag: "buyOneText",
                                            xtext: { color: this.availColor, text: this.oneCost.toString() + "g" },
                                            xxform: { top:.715, bottom: .035},
                                        },
                                    ],
                                },

                                // 5 ARROW SALE
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
                                                    tag: "buyFiveButton",
                                                    xtext: {text: ""},
                                                    xunpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_GLD_S3_OPAQ")),
                                                    xpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S2_OPAQ")),
                                                    xhighlight: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S3_OPAQ")),
                                                },
                                                {
                                                    cls: "UxPanel",
                                                    xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("ARROW_FIVE_DROP") ),
                                                    xxform: { left: .15, right: .15, top:.15, bottom:.2 },
                                                },
                                            ],
                                        },
                                        {
                                            cls: "UxText",
                                            tag: "buyFiveText",
                                            xtext: { color: this.availColor, text: this.fiveCost.toString() + "g" },
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
        this.arrowText = this.view.find((v) => v.tag === "arrowText");
        this.buyOneButton = this.view.find((v) => v.tag === "buyOneButton");
        this.buyOneText = this.view.find((v) => v.tag === "buyOneText");
        this.buyFiveButton = this.view.find((v) => v.tag === "buyFiveButton");
        this.buyFiveText = this.view.find((v) => v.tag === "buyFiveText");
        this.backButton = this.view.find((v) => v.tag === "backButton");
        // wire UI elements
        this.buyOneButton.evtClicked.listen(this.onBuyOne.bind(this));
        this.buyFiveButton.evtClicked.listen(this.onBuyFive.bind(this));
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
        if (p1.arrows !== this.lastArrows) {
            this.lastArrows = p1.arrows;
            this.arrowText.text = p1.arrows.toString();
        }
    }

    updateButtons(updateCtx) {
        // not enough gold to buy one
        if (p1.gold < this.oneCost) {
            this.buyOneButton.active = false;
            this.buyOneText._textSketch._color = this.unavailColor;
        } else {
            this.buyOneButton.active = true;
            this.buyOneText._textSketch._color = this.availColor;
        }
        // not enough gold to buy five
        if (p1.gold < this.fiveCost) {
            this.buyFiveButton.active = false;
            this.buyFiveText._textSketch._color = this.unavailColor;
        } else {
            this.buyFiveButton.active = true;
            this.buyFiveText._textSketch._color = this.availColor;
        }
    }

    update(ctx) {
        this.updateCounts(ctx);
        this.updateButtons(ctx);
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onBuyOne() {
        console.log("onBuyOne");
        p1.gold -= this.oneCost;
        p1.arrows++;
    }

    onBuyFive() {
        console.log("onBuyFive");
        p1.gold -= this.fiveCost;
        p1.arrows += 5;
    }

    onBack() {
        // restore game controller
        ctrlSys.pop();
        // tear down current view
        this.view.destroy();
    }

}
