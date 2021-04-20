
class UxStoryCtrl extends UxCtrl {
    static dialogs = [
        "Weird...",
        "You've had many dreams of many things throughout your life, but never any dreams so... vivid... so... disturbing...",
        "You saw your village... destroyed!  Your friends... all of them... dead!  And yourself... <you shudder>...",
        "Something's wrong... the last few days you've felt it, something... something dark.  You haven't felt like yourself, and you don't know why.  Is your dream a premonition?",
        "As you wake you decide that you should seek out Elder Clarice.  Perhaps she can give you some clarity on the visions you've experienced..."
    ]
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        const dialogColor = spec.dialogColor || new Color(168,36,36);
        this.extraSpace = 25;
        this.dialogIndex = 0;
        this.lastDialogIndex = 0;
        this._font = spec.font || new Font({size:25});
        let dialog = UxStoryCtrl.dialogs[0];
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            xchild: [
                {
                    cls: "UxPanel",
                    tag: "storyPanel",
                    xxform: { origx: 0, origy: 0 },
                    xsketch: {
                        cls: 'Rect',
                        color: new Color(20,20,20,1),
                        xfitter: { cls: "FitToParent" },
                    },
                    xchild: [
                        {
                            cls: "UxPanel",
                            tag: "dialogPanel",
                            //xsketch: Object.assign({}, assets.get("BUTTON_BLU_S1_OPAQ"), {xfitter: { cls: "FitToParent" }}),
                            xsketch: {},
                            xxform: { left: .15, right: .15, top: .7, bottom: .3, height: 50 },
                            xchild: [
                                {
                                    cls: "UxText",
                                    tag: "dialogText",
                                    xtext: { color: dialogColor, text: dialog, wrap: true, fit: false, font: this._font},
                                    xxform: { otop: 25, oleft: 20, oright: 5 },
                                },
                            ],
                        },
                        {
                            cls: "UxText",
                            xxform: { left: .2, right: .2, top: .8, bottom: .05},
                            xtext: { color: new Color(168,36,36), outlineWidth:1, outlineColor: new Color(255,201,92), text: "Space to advance, Escape to skip"},
                        }
                    ],
                },
                {
                    cls: "UxFader",
                    fadeTTL: 2500,
                    depth: 10,
                    xxform: { origx: 0, origy: 0 },
                },
            ],
        });

        // lookup UI elements
        this.dialogPanel = this.view.find((v) => v.tag === "dialogPanel");
        this.dialogText = this.view.find((v) => v.tag === "dialogText");

        let height = Text.measureWrapHeight(this._font, dialog, this.dialogText.width) + this.extraSpace;
        this.dialogPanel.xform.height = height;
    }

    // METHODS -------------------------------------------------------------
    keyPressed(key) {
        if (key === KEY_ESCAPE) {
            this.onStart();
        }
        if (key === KEY_SPACE) {
            this.dialogIndex++;
            if (this.dialogIndex >= UxStoryCtrl.dialogs.length) {
                this.onStart();
            }
        }
    }

    updateDialog(ctx) {
        if (this.dialogIndex !== this.lastDialogIndex) {
            this.lastDialogIndex = this.dialogIndex;
            let dialog = UxStoryCtrl.dialogs[this.dialogIndex];
            let height = Text.measureWrapHeight(this._font, dialog, this.dialogText.width) + this.extraSpace;
            this.dialogPanel.xform.height = height;
            this.dialogText.text = dialog;
        }
    }

    update(ctx) {
        this.updateDialog(ctx);
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onStart(evt) {
        // build out next controller
        ctrlSys.assign(new UxPlayCtrl());
        // tear down my view
        this.view.destroy();
    }

}