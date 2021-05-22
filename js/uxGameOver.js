class UxGameOverCtrl extends UxCtrl {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            xchild: [
                {
                    cls: "UxFader",
                    depth: 10,
                    fadein: true,
                    fadeTTL: 2500,
                    xxform: { origx: 0, origy: 0 },
                },
                {
                    cls: "UxText",
                    depth: 11,
                    xxform: { top: .4, bottom: .4, left: .15, right: .15},
                    xtext: {
                        color: new Color(255,0,0,.75),
                        text: "GAME OVER",
                    },
                },
                {
                    cls: "UxText",
                    depth: 11,
                    xxform: { top: .75, bottom: .2},
                    xtext: {
                        color: new Color(235,138,6,.75),
                        text: "...press <space> to continue...",
                    },
                },
            ],
        });
    }

    // METHODS -------------------------------------------------------------
    keyPressed(key) {
        if (key === KEY_SPACE) {
            this.onStart();
        }
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onStart() {
        // reset levels...
        console.log("reset levels...");
        levelLoader.clear();
        // reset player...
        console.log("reset player...");
        p1.reset(true);
        console.log(`player pos: ${p1.x},${p1.y}`);
        // reset quests...
        quests.reset();
        // build out next controller
        //let ctrl = new UxPlayCtrl();
        ctrlSys.clear();
        ctrlSys.assign(new UxMainCtrl());
        // tear down my view
        this.view.destroy();
    }

}