class UxQuestInfoCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        this.quest = spec.quest;
        const titleColor = spec.titleColor || new Color(168,36,36);
        const dialogColor = spec.dialogColor || new Color(168,36,36);
        this._font = spec.font || new Font({size:25});

        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            layer: 2,
            xchild: [
                {
                    cls: "UxPanel",
                    tag: "dialogPanel",
                    xsketch: Object.assign({}, assets.get("BUTTON_BLU_S1_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                    xxform: { left: .1, right: .1, top: .5, bottom: .5, height: 100 },
                    xchild: [
                        {
                            cls: "UxButton",
                            tag: "titleText",
                            xtext: { color: titleColor, text: this.quest.title, xfitter: {cls: "FitToParent", top: .2, bottom: .125} },
                            xxform: {top: 0, bottom:1, left: .25, right: .25, height: 35},
                            xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
                            active: false,
                        },
                        {
                            cls: "UxText",
                            tag: "dialogText",
                            xtext: { color: dialogColor, text: "dialog", wrap: true, fit: false, font: this._font},
                            xxform: { otop: 25, oleft: 10, oright: 5 },
                        },

                        // BACK ---------------------------
                        {
                            cls: "UxButton",
                            tag: "backButton",
                            xtext: { color: titleColor, text: " Back " },
                            xxform: {top: .95, bottom: .05, left: .75, right: .05, height: 35},
                            xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
                            xpressed: Object.assign({}, assets.get("BUTTON_RED_S2_OPAQ")),
                            xhighlight: Object.assign({}, assets.get("BUTTON_RED_S3_OPAQ")),
                        },
                    ],
                },
            ],
        });
        // lookup UI elements
        this.titleText = this.view.find((v) => v.tag === "titleText");
        this.dialogPanel = this.view.find((v) => v.tag === "dialogPanel");
        this.dialogText = this.view.find((v) => v.tag === "dialogText");
        this.backButton = this.view.find((v) => v.tag === "backButton");
        // hook actions
        this.backButton.evtClicked.listen(this.onBack.bind(this));
    }

    keyPressed(key) {
        if (key === KEY_ESCAPE || key === KEY_LETTER_Z || key === KEY_LETTER_X) { // Z
            this.onBack();
        }
    }

    updateDialog(ctx) {
        if (this.quest.text !== this.lastText) {
            this.lastText = this.quest.text;
            let height = Text.measureWrapHeight(this._font, this.quest.text, this.dialogText.width) + 65;
            this.dialogPanel.xform.height = height;
            this.dialogText.text = this.quest.text;
        }
    }

    update(ctx) {
        this.updateDialog(ctx);
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onBack() {
        // restore game controller
        ctrlSys.pop();
        // tear down current view
        this.view.destroy();
        ctrlSys.current.view.active = true;
    }
}

class UxQuestCtrl extends UxCtrl {

    constructor(spec={}) {
        super(spec);
        const titleColor = spec.titleColor || new Color(168,36,36);
        const questColor = spec.questColor || new Color(48,51,134);
        this._qsys = spec.qsys || Quests.instance;
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            xchild: [
                {
                    cls: "UxPanel",
                    xsketch: Object.assign({}, assets.get("BUTTON_TAN_S1_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                    xxform: { border: .1 },
                    xchild: [
                        // MAIN ---------------------------
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_GLD_S4_TRAN"), {xfitter: { cls: "FitToParent" }}),
                            xxform: { top: .05, bottom: .6, offset: 20 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: " Main Quest ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
                                    xxform: {top: 0, bottom:1, left: .325, right: .325, height: 45},
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GLD_S2_OPAQ")),
                                    active: false,
                                },
                                {
                                    cls: "UxButton",
                                    tag: "mainQuestButton",
                                    xtext: { color: questColor, text: " QUEST TITLE ", xfitter: {cls: "FitToParent", top: .3, bottom: .25} },
                                    xxform: {top: .25, bottom:.25, left: .05, right: .05 },
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S2_OPAQ")),
                                    xhighlight: Object.assign({}, assets.get("BUTTON_RED_S2_OPAQ")),
                                    xpressed: Object.assign({}, assets.get("BUTTON_RED_S1_OPAQ")),
                                    active: false,
                                    visible: false,
                                }
                            ],
                        },
                        
                        // SIDE ---------------------------
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_GLD_S4_TRAN"), {xfitter: { cls: "FitToParent" }}),
                            xxform: { top: .4, bottom: .1, offset: 20 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: " Side Quests ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
                                    xxform: {top: 0, bottom:1, left: .325, right: .325, height: 45},
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GLD_S2_OPAQ")),
                                    active: false,
                                },
                                {
                                    cls: "UxButton",
                                    tag: "sideQuestButton1",
                                    xtext: { color: questColor, text: " SIDE QUEST TITLE ", xfitter: {cls: "FitToParent", top: .3, bottom: .25} },
                                    xxform: {top: .2, bottom:.6, left: .05, right: .05 },
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
                                    xhighlight: Object.assign({}, assets.get("BUTTON_RED_S3_OPAQ")),
                                    xpressed: Object.assign({}, assets.get("BUTTON_RED_S2_OPAQ")),
                                    active: false,
                                    visible: false,
                                },
                                {
                                    cls: "UxButton",
                                    tag: "sideQuestButton2",
                                    xtext: { color: questColor, text: " SIDE QUEST TITLE ", xfitter: {cls: "FitToParent", top: .3, bottom: .25} },
                                    xxform: {top: .45, bottom:.35, left: .05, right: .05 },
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
                                    xhighlight: Object.assign({}, assets.get("BUTTON_RED_S3_OPAQ")),
                                    xpressed: Object.assign({}, assets.get("BUTTON_RED_S2_OPAQ")),
                                    active: false,
                                    visible: false,
                                },
                                {
                                    cls: "UxButton",
                                    tag: "sideQuestButton3",
                                    xtext: { color: questColor, text: " SIDE QUEST TITLE ", xfitter: {cls: "FitToParent", top: .3, bottom: .25} },
                                    xxform: {top: .7, bottom:.1, left: .05, right: .05 },
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
                                    xhighlight: Object.assign({}, assets.get("BUTTON_RED_S3_OPAQ")),
                                    xpressed: Object.assign({}, assets.get("BUTTON_RED_S2_OPAQ")),
                                    active: false,
                                    visible: false,
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
        this.backButton = this.view.find((v) => v.tag === "backButton");
        this.mainQuestButton = this.view.find((v) => v.tag === "mainQuestButton");
        this.sideQuestButton1 = this.view.find((v) => v.tag === "sideQuestButton1");
        this.sideQuestButton2 = this.view.find((v) => v.tag === "sideQuestButton2");
        this.sideQuestButton3 = this.view.find((v) => v.tag === "sideQuestButton3");
        // hook actions
        this.backButton.evtClicked.listen(this.onBack.bind(this));
        this.mainQuestButton.evtClicked.listen(this.onQuestInfo.bind(this));
        this.sideQuestButton1.evtClicked.listen(this.onQuestInfo.bind(this));
        this.sideQuestButton2.evtClicked.listen(this.onQuestInfo.bind(this));
        this.sideQuestButton3.evtClicked.listen(this.onQuestInfo.bind(this));
    }

    // METHODS -------------------------------------------------------------
    keyPressed(key) {
        if (key === KEY_ESCAPE || key === 81) { // Q
            this.onBack();
        }
    }

    updateQuests(ctx) {
        if (this._qsys.main !== this.lastMain) {
            let quest = this._qsys.main;
            this.lastMain = quest;
            if (quest) {
                this.mainQuestButton.active = true;
                this.mainQuestButton.visible = true;
                this.mainQuestButton.text = quest.title;
                this.mainQuestButton.quest = quest;
            } else {
                this.mainQuestButton.active = false;
                this.mainQuestButton.visible = false;
            }
        }

        for (let i=1; i<=3; i++) {
            let tag = `side${i}`
            let ltag = `lastSide${i}`;
            let btag = `sideQuestButton${i}`;
            let quest = this._qsys[tag];
            if (quest !== this[ltag]) {
                this[ltag] = quest;
                console.log("quest: " + quest);
                if (quest) {
                    this[btag].active = true;
                    this[btag].visible = true;
                    this[btag].text = quest.title;
                    this[btag].quest = quest;
                } else {
                    this[btag].active = false;
                    this[btag].visible = false;
                }
            }
        }

    }

    update(ctx) {
        this.updateQuests(ctx);
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onQuestInfo(evt) {
        console.log("clicked: " + evt.actor + " quest: " + evt.actor.quest);
        ctrlSys.assign(new UxQuestInfoCtrl({quest: evt.actor.quest}), true);
        this.view.active = false;
    }

    onBack() {
        // restore game controller
        ctrlSys.pop();
        // tear down current view
        this.view.destroy();
    }

}