class UxHealerCtrl extends UxCtrl {
    
    constructor(spec={}) {
        super(spec);

        const titleColor = spec.titleColor || new Color(168,36,36);
        const dialogColor = spec.dialogColor || new Color(168,36,36);
        this._font = spec.font || new Font({size:25});
        this.availColor = spec.availColor || new Color(27,78,68);
        this.unavailColor = spec.availColor || new Color(105,27,40);
        this.cooldown = spec.cooldown || 10*60; // ten minutes

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
                                    xtext: { color: titleColor, text: " Healer ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
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
                                        text: "Enter child and rest.  All are welcome here.  Let your body by strengthed and your spirit cleansed!", 
                                    },
                                }

                            ],
                        },
                        
                        // Your Inventory ---------------------------
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_BLU_S4_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                            xxform: { top: .45, bottom: .25, offset: 12, left: .325, right: .325 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: "  Services  ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
                                    xxform: {top: -0.1, bottom:1.1, left: .3, right: .3, height: 40},
                                    xunpressed: Object.assign({}, assets.get("BUTTON_BLU_S2_OPAQ")),
                                    active: false,
                                },

                                // HEAL PANEL
                                {
                                    cls: "UxPanel",
                                    xxform: { top: .22, bottom: .25 },
                                    xsketch: {},
                                    xchild: [
                                        {
                                            cls: "UxButton",
                                            tag: "healButton",
                                            xtext: {text: ""},
                                            xunpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_GLD_S3_OPAQ")),
                                            xpressed: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S2_OPAQ")),
                                            xhighlight: Object.assign({lockRatio: true}, assets.get("BUTTON_RED_S3_OPAQ")),
                                        },
                                        {
                                            cls: "UxPanel",
                                            xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("HEAL_ICON") ),
                                        },
                                    ],
                                },

                                {
                                    cls: "UxText",
                                    tag: "cooldownText",
                                    xtext: { color: this.unavailColor, text: "13:69" },
                                    xxform: { width: 100, height: 20, left:.5, right:.5, top:.85, bottom:.15},
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
        this.cooldownText = this.view.find((v) => v.tag === "cooldownText");
        this.healButton = this.view.find((v) => v.tag === "healButton");
        this.backButton = this.view.find((v) => v.tag === "backButton");
        // wire UI elements
        this.healButton.evtClicked.listen(this.onHeal.bind(this));
        this.backButton.evtClicked.listen(this.onBack.bind(this));
    }

    // METHODS -------------------------------------------------------------

    keyPressed(key) {
        if (key === KEY_ESCAPE || key === KEY_LETTER_Z || key === KEY_LETTER_X || key === 83) {
            this.onBack();
        }
    }

    update(ctx) {
        let time = Math.round(new Date().getTime() * .001);
        if (p1.lastHeal && time-p1.lastHeal < this.cooldown) {
            let delta = this.cooldown - (time-p1.lastHeal);
            this.healButton.active = false;
            let minutes = Math.floor(delta/60);
            let seconds = delta%60;
            let secondStr = seconds.toString().padStart(2,"0");
            this.cooldownText.text = `${minutes}:${secondStr}`;
        } else {
            this.healButton.active = true;
            this.cooldownText.text = "";
        }
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onHeal() {
        console.log("onHeal");
        p1.health = p1.maxHealth;
        p1.mana = p1.maxMana;
        p1.lastHeal = Math.round(new Date().getTime() * .001);
    }

    onBack() {
        // restore game controller
        ctrlSys.pop();
        // tear down current view
        this.view.destroy();
    }

}
