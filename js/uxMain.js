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
                    xsketch: {
                        cls: 'Rect',
                        color: new Color(20,20,20,1),
                        xfitter: { cls: "FitToParent" },
                    },
                    xchild: [
                        {
                            cls: "UxPanel",
                            tag: "menuPanel",
                            xsketch: {
                                cls: 'Rect',
                                color: new Color(20,20,20,1),
                                xfitter: { cls: "FitToParent" },
                            },
                            xxform: { top: .1, bottom: .1, left: .25, right: .25 },
                            xchild: [
                                {
                                    cls: "UxText",
                                    tag: "titleText",
                                    xxform: { top: .05, bottom: .875},
                                    xtext: {
                                        color: new Color(255,0,0,.75),
                                        text: "Daggers Gate",
                                        font: new Font({family:fontMenu}),
                                    },
                                },
                                {
                                    cls: "UxPanel",
                                    tag: "buttonPanel",
                                    xxform: { top: .15, bottom: .05, left: .15, right: .15},
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
                                            tag: "quitButton",
                                            xxform: { left: .2, top:.745, bottom: .145, right: .2},
                                            xtext: { text: "Quit", font: new Font({family:fontMenu}) },
                                        }),
                                    ],
                                },
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
        this.quitButton = this.view.find((v) => v.tag === "quitButton");
        // hook actions
        this.startButton.evtClicked.listen(this.onStart.bind(this));
        this.editorButton.evtClicked.listen(this.onEditor.bind(this));
        this.creditsButton.evtClicked.listen(this.onCredits.bind(this));
        this.quitButton.evtClicked.listen(this.onQuit.bind(this));
    }

    onStart(evt) {
        console.log("onStart");
        // build out next controller
        let ctrl = new UxPlayCtrl();
        currentCtrl = ctrl;
        // tear down my view
        this.view.destroy();
    }

    onEditor(evt) {
        // build out next controller
        let ctrl = new UxEditorCtrl();
        currentCtrl = ctrl;
        // tear down my view
        this.view.destroy();
        // FIXME: remove global???
        titleScreen = false;
    }

    onCredits(evt) {
        console.log("onCredits");
        /*
        // disable controls on main menu
        this.view.active = false;
        const creditsCtrl = new CreditsCtrl();
        // re-enable controls when credits window is closed
        creditsCtrl.view.evtDestroyed.listen(()=>{ this.view.active = true });
        */
    }

    onQuit(evt) {
        console.log("onQuit");
    }


}