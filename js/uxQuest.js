class UxQuestCtrl extends UxCtrl {

    static lorem = "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    constructor(spec={}) {
        super(spec);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            xchild: [
                {
                    cls: "UxPanel",
                    xsketch: { cls: 'Rect', color: new Color(20,20,20,1), xfitter: { cls: "FitToParent" }, },
                    xxform: { border: .15 },
                    xchild: [
                        {
                            cls: "UxText",
                            xtext: { color: new Color(168,36,36), text: UxQuestCtrl.lorem, wrap: true, fit: false, font: new Font({size:30})},
                            //xtext: { color: new Color(168,36,36), text: "questing...", font: new Font({size:30})},
                        },
                    ],
                },
            ],
        });
        // lookup UI elements
        //this.backButton = this.view.find((v) => v.tag === "backButton");
        // hook actions
        //this.backButton.evtClicked.listen(this.onBack.bind(this));
    }

    // METHODS -------------------------------------------------------------
    keyPressed(key) {
        if (key === KEY_ESCAPE || key === 81) { // Q
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