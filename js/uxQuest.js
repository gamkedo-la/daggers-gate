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
    onBack() {
        // restore game controller
        currentCtrl = lastCtrl;
        // tear down current view
        this.view.destroy();
    }

}