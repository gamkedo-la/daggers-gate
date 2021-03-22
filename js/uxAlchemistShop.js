class UxAlchemistShopCtrl extends UxCtrl {
    
    constructor(spec={}) {
        super(spec);

        //this._dialog = spec.dialog;
        this._responseColor || new Color(168,36,36);
        const titleColor = spec.titleColor || new Color(168,36,36);
        const dialogColor = spec.dialogColor || new Color(168,36,36);
        this._font = spec.font || new Font({size:21});

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
                            xsketch: Object.assign({}, assets.get("BUTTON_GLD_S4_TRAN"), {xfitter: { cls: "FitToParent" }}),
                            xxform: { top: .4, bottom: .35, offset: 12, left: .2, right: .2 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: "  Inventory  ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
                                    xxform: {top: 0, bottom:1, left: .325, right: .325, height: 45},
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GLD_S2_OPAQ")),
                                    active: false,
                                },
                                /*
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
                                */
                            ],
                        },
                        
                        // For Sale ---------------------------
                        {
                            cls: "UxPanel",
                            xsketch: Object.assign({}, assets.get("BUTTON_GLD_S4_TRAN"), {xfitter: { cls: "FitToParent" }}),
                            xxform: { top: .65, bottom: .1, offset: 12, left: .2, right: .2 },
                            xchild: [
                                {
                                    cls: "UxButton",
                                    xtext: { color: titleColor, text: "  For Sale  ", xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
                                    xxform: {top: 0, bottom:1, left: .325, right: .325, height: 45},
                                    xunpressed: Object.assign({}, assets.get("BUTTON_GLD_S2_OPAQ")),
                                    active: false,
                                },
                                /*
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
                                */
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
        this.titleText = this.view.find((v) => v.tag === "titleText");
        this.dialogPanel = this.view.find((v) => v.tag === "dialogPanel");
        this.dialogText = this.view.find((v) => v.tag === "dialogText");
        this.responseButtons = [];
    }

    // METHODS -------------------------------------------------------------

    keyPressed(key) {
        if (key === KEY_ESCAPE || key === KEY_LETTER_Z || key === KEY_LETTER_X || key === 83) {
            this.onBack();
        }
    }

    update(ctx) {
        // check for dialog completion
        /*
        if (this._dialog.done) this.onBack();
        this.updateTitle(ctx);
        this.updateDialog(ctx);
        this.updateResponses(ctx);
        */
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onBack() {
        // restore game controller
        ctrlSys.pop();
        // tear down current view
        this.view.destroy();
    }

}
