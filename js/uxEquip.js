
class UxEquipCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            layer: 1,
            xchild: [{
                cls: "UxPanel",
                tag: "topPanel",
                xxform: { origx:0, origy: 0 },
                xsketch: {
                    cls: 'Rect',
                    color: new Color(20,70,20,1),
                    xfitter: { cls: "FitToParent" },
                },
                xchild: [

                    // PLAYER --------------------------------------------------
                    {
                        cls: "UxPanel",
                        tag: "playerPanel",
                        xsketch: {
                            cls: 'Rect',
                            color: new Color(200,200,200,.25),
                            xfitter: { cls: "FitToParent" },
                        },
                        xxform: { left: .1, right: .55, top: .1, bottom: .65 },
                        xchild: [
                            {
                                cls: "UxText",
                                tag: "nameText",
                                xxform: { left: .25, right:.75, top: 0, bottom: .7, width:100, height:40 },
                                xtext: {
                                    color: new Color(255,0,0,.75),
                                    text: "Apollo",
                                },
                            },

                            {
                                cls: "UxPanel",
                                tag: "portraitPanel",
                                xsketch: {
                                    cls: 'Rect',
                                    color: new Color(200,150,200,1),
                                    xfitter: { cls: "FitToParent" },
                                },
                                xxform: { left: .25, right:.75, top: .6, bottom: .4, width:100, height:100 },
                            },
                            {
                                cls: "UxPanel",
                                tag: "heartsPanel",
                                xsketch: {
                                    cls: 'Rect',
                                    color: new Color(200,200,200,.25),
                                    xfitter: { cls: "FitToParent" },
                                },
                                xxform: { left: .5, right: .1, top: .1, bottom: .55 },
                            },
                            {
                                cls: "UxPanel",
                                tag: "manaPanel",
                                xsketch: {
                                    cls: 'Rect',
                                    color: new Color(200,200,200,.25),
                                    xfitter: { cls: "FitToParent" },
                                },
                                xxform: { left: .5, right: .1, top: .55, bottom: .1 },
                            },
                        ]
                    },

                    // EQUIP --------------------------------------------------

                    {
                        cls: "UxPanel",
                        tag: "equipPanel",
                        xsketch: {
                            cls: 'Rect',
                            color: new Color(200,200,200,.25),
                            xfitter: { cls: "FitToParent" },
                        },
                        xxform: { left: .55, right: .1, top: .1, bottom: .65 },
                        xchild: [
                            {
                                cls: "UxText",
                                tag: "equipText",
                                xxform: { left: .5, right:.5, top: 0, bottom: .7, width:100, height:80 },
                                xtext: {
                                    color: new Color(0,0,200,.75),
                                    text: "Equipment",
                                },
                            },

                        ],
                    },

                ],
            }],
        });
        this.setup();
    }

    setup() {
        //this.portraitPanel = this.view.find((v) => v.tag === "portraitPanel");
        //console.log("pp: " + this.portraitPanel);
        //console.log("pp.layer: " + this.portraitPanel.layer);
    }

    keyReleased(key) {
        if (key === KEY_ESCAPE) {
            this.onRestoreGame();
        }
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onRestoreGame() {
        console.log("onRestoreGame");
        // restore game controller
        currentCtrl = lastCtrl;
        // tear down equip view
        this.view.destroy();
    }

}