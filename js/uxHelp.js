
class UxMainHelpPopUpCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        const textColor = spec.titleColor || new Color(168,36,36);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            layer: 1,
            xchild: [
                {
                    cls: "UxPanel",
                    xxform: { border: .1},
                    xsketch: Object.assign({}, assets.get("BUTTON_BLU_S1_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                    xchild: [
                        {
                            cls: "UxText",
                            xxform: { top: .075, bottom: .85 },
                            xtext: { color: textColor, text: "Key Bindings", },
                        },
                        {
                            cls: "UxPanel",
                            xxform: { top: .2, bottom: .1, left: .05, right: .05 },
                            xchild: [
                                {
                                    cls: "UxText",
                                    xxform: { bottom: .8, right: .7, left: .05, otop: 20, obottom:10},
                                    xtext: { color: textColor, text: "Arrows", align: "left"},
                                },
                                {
                                    cls: "UxText",
                                    xxform: { bottom: .8, left: .3, offset:10 },
                                    xtext: { color: textColor, text: "Character Movement"},
                                },
                                {
                                    cls: "UxText",
                                    xxform: { top: .2, bottom: .6, right: .7, left: .05, otop: 20, obottom:10},
                                    xtext: { color: textColor, text: "Z, X", align: "left"},
                                },
                                {
                                    cls: "UxText",
                                    xxform: { top: .2, bottom: .6, left: .3, offset:10 },
                                    xtext: { color: textColor, text: "Main/Secondary Actions"},
                                },
                                {
                                    cls: "UxText",
                                    xxform: { top: .4, bottom: .4, right: .7, left: .05, otop: 20, obottom:10},
                                    xtext: { color: textColor, text: "<Escape>", align: "left"},
                                },
                                {
                                    cls: "UxText",
                                    xxform: { top: .4, bottom: .4, left: .3, offset:10 },
                                    xtext: { color: textColor, text: "Character Inventory"},
                                },
                                {
                                    cls: "UxText",
                                    xxform: { top: .6, bottom: .2, right: .7, left: .05, otop: 20, obottom:10},
                                    xtext: { color: textColor, text: "Q", align: "left"},
                                },
                                {
                                    cls: "UxText",
                                    xxform: { top: .6, bottom: .2, left: .3, offset:10 },
                                    xtext: { color: textColor, text: "Quest Screen"},
                                },
                                {
                                    cls: "UxText",
                                    xxform: { top: .8, bottom: 0, right: .7, left: .05, otop: 20, obottom:10},
                                    xtext: { color: textColor, text: "H", align: "left"},
                                },
                                {
                                    cls: "UxText",
                                    xxform: { top: .8, bottom: 0, left: .3, offset:10 },
                                    xtext: { color: textColor, text: "Help Screen"},
                                },
                            ]
                        },
                        {
                            cls: "UxButton",
                            tag: "backButton",
                            xtext: { color: textColor, text: " Back " },
                            xxform: {top: .88, bottom: .04, left: .75, right: .05, otop: 5},
                            xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
                            xpressed: Object.assign({}, assets.get("BUTTON_RED_S2_OPAQ")),
                            xhighlight: Object.assign({}, assets.get("BUTTON_RED_S3_OPAQ")),
                        }
                    ],
                },
            ],
        });

        this.backButton = this.view.find((v) => v.tag === "backButton");
        this.backButton.evtClicked.listen(this.onBack.bind(this));

    }

    keyPressed(key) {
        if (key === KEY_ESCAPE || key === KEY_LETTER_Z || key === KEY_LETTER_X || key === KEY_LETTER_H || key === KEY_SPACE) {
            this.onBack();
        }
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onBack() {
        console.log("onBack");
        // restore last controller
        ctrlSys.pop();
        if (this.view) this.view.destroy();
        // restore last view
        ctrlSys.current.view.active = true;
    }

}