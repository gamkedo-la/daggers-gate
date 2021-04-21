class UxDialogCtrl extends UxCtrl {
    
    constructor(spec={}) {
        super(spec);

        this._dialog = spec.dialog;
        this._responseColor || new Color(168,36,36);
        const titleColor = spec.titleColor || new Color(168,36,36);
        const dialogColor = spec.dialogColor || new Color(168,36,36);
        this._font = spec.font || new Font({size:25});

        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            xchild: [
                {
                    cls: "UxPanel",
                    tag: "dialogPanel",
                    xsketch: Object.assign({}, assets.get("BUTTON_BLU_S1_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                    xxform: { left: .2, right: .2, top: .5, bottom: .5, height: 100 },
                    xchild: [
                        {
                            cls: "UxButton",
                            tag: "titleText",
                            xtext: { color: titleColor, text: "title", xfitter: {cls: "FitToParent", top: .2, bottom: .125} },
                            xxform: {top: 0, bottom:1, left: .35, right: .35, height: 35},
                            xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
                            active: false,
                        },
                        {
                            cls: "UxText",
                            tag: "dialogText",
                            xtext: { color: dialogColor, text: "dialog", wrap: true, fit: false, font: this._font},
                            xxform: { otop: 25, oleft: 20, oright: 15 },
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

    addResponseButton(parent, responseColor, response, left, right) {
        let bspec = {
            cls: "UxButton",
            dfltDepth: parent.depth + 1,
            dfltLayer: parent.layer,
            parent: parent,
            xxform: {parent: parent.xform, top: 1, bottom:0, left: left, right: right, height: 32},
            xunpressed: Object.assign({}, assets.get("BUTTON_GRN_S3_OPAQ")),
            xpressed: Object.assign({}, assets.get("BUTTON_GLD_S3_OPAQ")),
            xhighlight: Object.assign({}, assets.get("BUTTON_GLD_S3_OPAQ")),
            xtext: {color: responseColor, text: response, xfitter: {cls: "FitToParent", top: .2, bottom: .15} },
        };
        let b = UxView.generate(bspec);
        if (b) {
            b.evtClicked.listen((evt) => { this._dialog.chooseResponse(response)});
            parent.adopt(b);
        }
        return b;
    }

    keyPressed(key) {
        if (key === KEY_ESCAPE || key === KEY_LETTER_Z || key === KEY_LETTER_X) { // Z
            this.onBack();
        }
    }

    updateTitle(ctx) {
        if (this._dialog.title !== this.lastTitle) {
            this.lastTitle = this._dialog.title;
            this.titleText.text = this._dialog.title;
        }
    }

    updateDialog(ctx) {
        if (this._dialog.text !== this.lastText) {
            this.lastText = this._dialog.text;
            let height = Text.measureWrapHeight(this._font, this._dialog.text, this.dialogText.width) + 25;
            this.dialogPanel.xform.height = height;
            this.dialogText.text = this._dialog.text;
        }
    }

    updateResponses(ctx) {
        let responses = this._dialog.responses;
        if (!Util.collectionEqual(responses, this.lastResponses)) {
            this.lastResponses = responses.slice(0);
            for (const b of this.responseButtons) b.destroy();
            this.responseButtons = [];
            if (responses.length === 1) {
                this.responseButtons.push(this.addResponseButton(this.dialogPanel, this._responseColor, responses[0], .35, .35));
            } else if (responses.length === 2) {
                this.responseButtons.push(this.addResponseButton(this.dialogPanel, this._responseColor, responses[0], .15, .55));
                this.responseButtons.push(this.addResponseButton(this.dialogPanel, this._responseColor, responses[1], .55, .15));
            } else if (responses.length === 3) {
                this.responseButtons.push(this.addResponseButton(this.dialogPanel, this._responseColor, responses[0], .05, .7));
                this.responseButtons.push(this.addResponseButton(this.dialogPanel, this._responseColor, responses[1], .375, .375));
                this.responseButtons.push(this.addResponseButton(this.dialogPanel, this._responseColor, responses[2], .7, .05));
            }
        }
    }

    update(ctx) {
        // check for dialog completion
        if (this._dialog.done) this.onBack();
        this.updateTitle(ctx);
        this.updateDialog(ctx);
        this.updateResponses(ctx);
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onBack() {
        // restore game controller
        ctrlSys.pop();
        // tear down current view
        this.view.destroy();
    }

}