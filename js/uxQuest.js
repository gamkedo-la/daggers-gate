class UxQuestCtrl extends UxCtrl {

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
                },
            ],
        });
        // lookup UI elements
        //this.backButton = this.view.find((v) => v.tag === "backButton");
        // hook actions
        //this.backButton.evtClicked.listen(this.onBack.bind(this));
    }

    // METHODS -------------------------------------------------------------
    keyReleased(key) {
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