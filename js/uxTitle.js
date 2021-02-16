class UxTitleView extends UxPanel {
    constructor(spec={}) {
        super(spec);
    }

    render(ctx) {
        super.render(ctx);
        customText("Dagger's", 200, 200, 'white', 100, 'Garamond')
        customText("Gate", 250, 280, 'white', 100, 'Garamond')
        customText("© HomeTeam Gamedev 2021", 300, 550, 'white', 12, 'monospace')
        customText("Press the -SPACEBAR- to Begin", 270, 450, 'yellow', 12, 'monospace')
        //customText("Press  -9-  to go into EDITOR MODE", 270, 480, 'yellow', 12, 'monospace')
    }

}

class UxTitleCtrl extends UxCtrl {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            tag: "titleCanvas",
            xchild: [
                {
                    cls: "UxTitleView",
                    tag: "titlePanel",
                    xxform: { origx: 0, origy: 0 },
                    xsketch: {
                        cls: 'Rect',
                        color: new Color(20,20,20,1),
                        xfitter: { cls: "FitToParent" },
                    },
                }
            ],
        });
    }

    // METHODS -------------------------------------------------------------
    keyReleased(key) {
        if (key === KEY_SPACE) {
            this.onStart();
        }
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onStart() {
        // build out next controller
        //let ctrl = new UxPlayCtrl();
        let ctrl = new UxMainCtrl();
        currentCtrl = ctrl;
        // tear down my view
        this.view.destroy();
        // FIXME: remove global???
        titleScreen = false;
    }

    onEditor() {
        // build out next controller
        let ctrl = new UxEditorCtrl();
        //let ctrl = new UxMainCtrl();
        currentCtrl = ctrl;
        // tear down my view
        this.view.destroy();
        // FIXME: remove global???
        titleScreen = false;
    }

}