class UxDialogCtrl extends UxCtrl {

    static FIXME_RESPONSES = ["Hello", "Okay", "No way!"];
    static FIXME_NRESP = 1;


    
    constructor(spec={}) {
        const nameColor = new Color(168,36,36);
        const dialogColor = new Color(168,36,36);
        const responseColor = new Color(168,36,36);
        const dialogFont = new Font({size:25});
        let text = UxQuestCtrl.lorem;
        let rlen = Math.floor(Math.random() * text.length);
        text = text.slice(0, rlen);
        let npcName = "Billy Bob";
        super(spec);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            xchild: [
                {
                    cls: "UxPanel",
                    tag: "dialogPanel",
                    xsketch: {},
                    xsketch: Object.assign({}, assets.get("BUTTON_BLU_S1_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                    xxform: { left: .2, right: .2, top: .5, bottom: .5, height: 100 },
                    xchild: [
                        {
                            cls: "UxButton",
                            xtext: { color: nameColor, text: npcName, xfitter: {cls: "FitToParent", top: .2, bottom: .125} },
                            xxform: {top: 0, bottom:1, left: .35, right: .35, height: 35},
                            xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
                            active: false,
                        },
                        {
                            cls: "UxText",
                            xtext: { color: dialogColor, text: text, wrap: true, fit: false, font: dialogFont},
                            xxform: { otop: 25, oleft: 10, oright: 5 },
                        },
                    ],
                },
            ],
        });
        this.dialogPanel = this.view.find((v) => v.tag === "dialogPanel");
        // resize dialog to fit wrapped text
        let height = Text.measureWrapHeight(dialogFont, text, this.dialogPanel.width) + 25;
        this.dialogPanel.xform.height = height;
        // add response buttons
        const nresp = UxDialogCtrl.FIXME_NRESP;
        const responses = UxDialogCtrl.FIXME_RESPONSES;
        if (nresp === 1) {
            this.addResponseButton(this.dialogPanel, responseColor, responses[0], .35, .35);
        } else if (nresp === 2) {
            this.addResponseButton(this.dialogPanel, responseColor, responses[0], .15, .55);
            this.addResponseButton(this.dialogPanel, responseColor, responses[1], .55, .15);
        } else if (nresp === 3) {
            this.addResponseButton(this.dialogPanel, responseColor, responses[0], .05, .7);
            this.addResponseButton(this.dialogPanel, responseColor, responses[1], .375, .375);
            this.addResponseButton(this.dialogPanel, responseColor, responses[2], .7, .05);
        }
        UxDialogCtrl.FIXME_NRESP = (UxDialogCtrl.FIXME_NRESP === UxDialogCtrl.FIXME_RESPONSES.length) ? 1 : UxDialogCtrl.FIXME_NRESP+1;
        // lookup UI elements
        //this.backButton = this.view.find((v) => v.tag === "backButton");
        // hook actions
        //this.backButton.evtClicked.listen(this.onBack.bind(this));
    }

    // METHODS -------------------------------------------------------------

    addResponseButton(parent, responseColor, response, left, right) {
        let bspec = {
            cls: "UxButton",
            dfltDepth: parent.depth + 1,
            dfltLayer: parent.layer,
            parent: parent,
            //xxform: {parent: parent.xform, left: left, right: right, top: .94, bottom: -.04},
            xxform: {parent: parent.xform, top: 1, bottom:0, left: left, right: right, height: 32},
            xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
            xpressed: Object.assign({}, assets.get("BUTTON_GLD_S3_OPAQ")),
            xhighlight: Object.assign({}, assets.get("BUTTON_GLD_S3_OPAQ")),
            //xtext: {text: response, color: responseColor},
            xtext: {color: responseColor, text: response, xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
        };
        let b = UxView.generate(bspec);
        if (b) {
            //b.lvlName = lvlName;
            //b.evtClicked.listen(this.onLvlSelect.bind(this));
            parent.adopt(b);
        }
    }

    keyPressed(key) {
        if (key === KEY_ESCAPE || key === KEY_LETTER_Z || key === KEY_LETTER_X) { // Z
            this.onBack();
        }
        // FIXME: remvoe
        if (key === 81) {  // Q
            this.onBack();
        }
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onBack() {
        // restore game controller
        currentCtrl = lastCtrl;
        // tear down current view
        this.view.destroy();
    }

}