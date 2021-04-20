class UxMainCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            tag: "mainCanvas",
            xchild: [
                {
                    cls: "UxPanel",
                    tag: "menuPanel",
                    xsketch: Object.assign({xfitter: { cls: "FitToParent" }}, assets.get("MAIN_BG") ),
                    /*
                    xsketch: {
                        cls: 'Rect',
                        color: new Color(20,20,20,1),
                        xfitter: { cls: "FitToParent" },
                    },
                    */
                    xchild: [
                        {
                            cls: "UxText",
                            tag: "titleText",
                            xxform: { top: .05, bottom: .85},
                            //xtext: { color: new Color(168,36,36), outlineWidth:2, outlineColor: new Color(235,138,6), text: "Dagger's Gate", font: new Font({family:fontMenu})},
                            xtext: { color: new Color(168,36,36), outlineWidth:1, outlineColor: new Color(255,201,92), text: "Dagger's Gate", font: new Font({family:fontMenu})},
                        },
                        {
                            cls: "UxPanel",
                            tag: "buttonPanel",
                            xxform: { top: .15, bottom: .15, left: .65, right: .05},
                            xsketch: {},
                            xchild: [
                                Object.assign({}, UxTemplates.button, {
                                    tag: "startButton",
                                    cls: "UxButton",
                                    xxform: { left: .2, top:.145, bottom: .745, right: .2},
                                    xtext: { text: "Start", font: new Font({family:fontMenu}), },
                                }), 
                                Object.assign({}, UxTemplates.button, {
                                    tag: "editorButton",
                                    xxform: { left: .2, top:.345, bottom: .545, right: .2},
                                    xtext: { text: "Editor", font: new Font({family:fontMenu}) },
                                }),
                                Object.assign({}, UxTemplates.button, {
                                    tag: "creditsButton",
                                    xxform: { left: .2, top:.545, bottom: .345, right: .2},
                                    xtext: { text: "Credits", font: new Font({family:fontMenu}) },
                                }),
                                Object.assign({}, UxTemplates.button, {
                                    tag: "optionsButton",
                                    xxform: { left: .2, top:.745, bottom: .145, right: .2},
                                    xtext: { text: "Options", font: new Font({family:fontMenu}) },
                                }),
                            ],
                        },
                    ],
                },
            ],
        });
        this.setup();
    }

    setup() {
        // lookup UI elements
        this.startButton = this.view.find((v) => v.tag === "startButton");
        this.editorButton = this.view.find((v) => v.tag === "editorButton");
        this.creditsButton = this.view.find((v) => v.tag === "creditsButton");
        this.optionsButton = this.view.find((v) => v.tag === "optionsButton");
        // hook actions
        this.startButton.evtClicked.listen(this.onStart.bind(this));
        this.editorButton.evtClicked.listen(this.onEditor.bind(this));
        this.creditsButton.evtClicked.listen(this.onCredits.bind(this));
        this.optionsButton.evtClicked.listen(this.onOptions.bind(this));
    }

    keyPressed(key) {
        if (key === KEY_SPACE) {
            this.onStart();
        }
    }

    onStart(evt) {
        console.log("onStart");
        // build out next controller
        ctrlSys.assign(new UxStoryCtrl());
        // tear down my view
        this.view.destroy();
    }

    onEditor(evt) {
        // build out next controller
        ctrlSys.assign(new UxEditorCtrl());
        // tear down my view
        this.view.destroy();
        // FIXME: remove global???
        titleScreen = false;
    }

    onCredits(evt) {
        console.log("onCredits");
    }

    onOptions(evt) {
        console.log("onOptions");
    }


}