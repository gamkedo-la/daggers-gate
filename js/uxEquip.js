
class UxEquipCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        const slotSize = 50;
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            layer: 1,
            xchild: [{
                cls: "UxPanel",
                tag: "topPanel",
                xxform: { origx:0, origy: 0 },
                xsketch: Object.assign({}, assets.get("WINDOW_BORDER"), {xfitter: { cls: "FitToParent" }}),
                xchild: [

                    // PLAYER --------------------------------------------------
                    {
                        cls: "UxPanel",
                        tag: "playerPanel",
                        xxform: { left: .05, right: .5, top: .05, bottom: .6 },
                        xsketch: {},
                        xchild: [
                            // PORTRAIT --------------------------------------------------
                            {
                                cls: "UxPanel",
                                xxform: { right: .55 },
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxText",
                                        xxform: { top: .05, bottom: .7 },
                                        xtext: { font: new Font({weight:400}), color: new Color(168,36,36), outlineWidth:1, outlineColor: new Color(235,138,6), text: "Apollo", },
                                    },

                                    {
                                        cls: "UxPanel",
                                        xxform: { top: .3, offset: 10 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                // FIXME: replace w/ character portrait sketch
                                                xsketch: {
                                                    cls: 'Rect',
                                                    color: new Color(200,150,200,1),
                                                    xfitter: { cls: "FitToParent" },
                                                    width: 50,
                                                    height: 50,
                                                    lockRatio: true,
                                                },
                                                xxform: { offset: 5 },
                                            },
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_GRN_S1_TRAN") ),
                                            },
                                        ],
                                    },

                                ],
                            },


                            // HEARTS --------------------------------------------------
                            {
                                cls: "UxText",
                                xxform: { left: .5, right:.1, top: 0, bottom: .85, otop: 5 },
                                xtext: { color: new Color(48,51,134), text: "Health", },
                            },
                            {
                                cls: "UxPanel",
                                tag: "heartsPanel",
                                xxform: { left: .5, right: .1, top: .15, bottom: .5 },
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot1",
                                        xxform: { width:slotSize, height:slotSize, left:.1, right:.9, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot2",
                                        xxform: { width:slotSize, height:slotSize, left:.3, right:.7, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot3",
                                        xxform: { width:slotSize, height:slotSize, left:.5, right:.5, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot4",
                                        xxform: { width:slotSize, height:slotSize, left:.7, right:.3, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot5",
                                        xxform: { width:slotSize, height:slotSize, left:.9, right:.1, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot6",
                                        xxform: { width:slotSize, height:slotSize, left:.1, right:.9, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot7",
                                        xxform: { width:slotSize, height:slotSize, left:.3, right:.7, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot8",
                                        xxform: { width:slotSize, height:slotSize, left:.5, right:.5, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot9",
                                        xxform: { width:slotSize, height:slotSize, left:.7, right:.3, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "healthSlot10",
                                        xxform: { width:slotSize, height:slotSize, left:.9, right:.1, top:.75, bottom:.25},
                                    },
                                ],
                            },

                            // MANA --------------------------------------------------
                            {
                                cls: "UxText",
                                xxform: { left: .5, right:.1, top: .5, bottom: .35, otop: 5 },
                                xtext: { color: new Color(48,51,134), text: "Mana", },
                            },
                            {
                                cls: "UxPanel",
                                tag: "manaPanel",
                                xxform: { left: .5, right: .1, top: .65 },
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot1",
                                        xxform: { width:slotSize, height:slotSize, left:.1, right:.9, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot2",
                                        xxform: { width:slotSize, height:slotSize, left:.3, right:.7, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot3",
                                        xxform: { width:slotSize, height:slotSize, left:.5, right:.5, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot4",
                                        xxform: { width:slotSize, height:slotSize, left:.7, right:.3, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot5",
                                        xxform: { width:slotSize, height:slotSize, left:.9, right:.1, top:.25, bottom:.75},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot6",
                                        xxform: { width:slotSize, height:slotSize, left:.1, right:.9, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot7",
                                        xxform: { width:slotSize, height:slotSize, left:.3, right:.7, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot8",
                                        xxform: { width:slotSize, height:slotSize, left:.5, right:.5, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot9",
                                        xxform: { width:slotSize, height:slotSize, left:.7, right:.3, top:.75, bottom:.25},
                                    },
                                    {
                                        cls: "UxPanel",
                                        tag: "manaSlot10",
                                        xxform: { width:slotSize, height:slotSize, left:.9, right:.1, top:.75, bottom:.25},
                                    },
                                ],
                            },
                        ]
                    },

                    // EQUIP --------------------------------------------------

                    {
                        cls: "UxPanel",
                        tag: "equipPanel",
                        xxform: { left: .5, right: .05, top: .05, bottom: .6 },
                        xsketch: {},
                        xchild: [
                            {
                                cls: "UxText",
                                tag: "equipText",
                                xxform: { left: .2, right:.2, top: 0, bottom: .5 },
                                xtext: { color: new Color(48,51,134), text: "Equipment", },
                            },
                            {
                                cls: "UxPanel",
                                tag: "equipButtonPanel",
                                xxform: { top: .3, bottom: .1 },
                                xsketch: {},
                                xchild: [
                                    // MAIN HAND
                                    {
                                        cls: "UxPanel",
                                        xxform: { right:.75, offset:7 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: { cls: 'Rect', color: new Color(227,196,176), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, },
                                                xxform: {offset: 5},
                                            },

                                            {
                                                cls: "UxButton",
                                                tag: "mainHandButton",
                                                xunpressed: Object.assign( {lockRatio: true}, assets.get("BUTTON_RED_S2_TRAN") ),
                                                xpressed: Object.assign( {lockRatio: true}, assets.get("BUTTON_BLU_S2_TRAN") ),
                                                xhighlight: Object.assign( {lockRatio: true}, assets.get("BUTTON_BLU_S2_TRAN") ),
                                                xtext: {text:""},
                                            },

                                            {
                                                cls: "UxPanel",
                                                tag: "mainHandPanel",
                                                xsketch: {},
                                                xxform: { border: .1 },
                                            },
                                        ],
                                    },
                                    // OFF HAND
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .25, right:.5, offset:7 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: { cls: 'Rect', color: new Color(227,196,176), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, },
                                                xxform: {offset: 5},
                                            },
                                            {
                                                cls: "UxButton",
                                                tag: "offHandButton",
                                                xunpressed: Object.assign( {lockRatio: true}, assets.get("BUTTON_RED_S2_TRAN") ),
                                                xpressed: Object.assign( {lockRatio: true}, assets.get("BUTTON_BLU_S2_TRAN") ),
                                                xhighlight: Object.assign( {lockRatio: true}, assets.get("BUTTON_BLU_S2_TRAN") ),
                                                xtext: {text:""},
                                            },
                                            {
                                                cls: "UxPanel",
                                                tag: "offHandPanel",
                                                xsketch: {},
                                                xxform: { border: .1 },
                                            },
                                        ],
                                    },
                                    // SHIRT
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .5, right:.25, offset:7 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_RED_S2_OPAQ") ),
                                            },
                                            {
                                                cls: "UxPanel",
                                                tag: "shirtPanel",
                                                xsketch: {},
                                                xxform: { border: .1 },
                                            },
                                        ],
                                    },
                                    // PANTS
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .75, offset:7 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_RED_S2_OPAQ") ),
                                            },
                                            {
                                                cls: "UxPanel",
                                                tag: "pantsPanel",
                                                xsketch: {},
                                                xxform: { border: .1 },
                                            },
                                        ],
                                    },
                                ],
                            },

                        ],
                    },

                    // ACTIVE -------------------------------------------------
                    {
                        cls: "UxPanel",
                        xxform: { left: .1, right: .1, top: .45, bottom: .4 },
                        xsketch: {},
                        xchild: [

                            // ACTIVE ACTIONS
                            {
                                cls: "UxPanel",
                                xxform: { right: .75},
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxText",
                                        xxform: { top: -.25, bottom: .75, offset:5 },
                                        xtext: { color: new Color(48,51,134), text: "Active", },
                                    },
                                    // Z PANEL
                                    {
                                        cls: "UxPanel",
                                        xxform: { top: .125, right: .5, offset:5 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_BLU_S2_OPAQ") ),
                                            },
                                            {
                                                cls: "UxPanel",
                                                tag: "zpanel",
                                                xsketch: {},
                                            },
                                            {
                                                cls: "UxText",
                                                xtext: { color: new Color(225,225,0,1), text: "z", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                                xxform: { width:50, height:50, left:1, right:0, top:.95, bottom:0.05},
                                            },
                                        ],
                                    },
                                    // X PANEL
                                    {
                                        cls: "UxPanel",
                                        xxform: { top: .125, left: .5, offset:5 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_BLU_S2_OPAQ") ),
                                            },
                                            {
                                                cls: "UxPanel",
                                                tag: "xpanel",
                                                xsketch: {},
                                            },
                                            {
                                                cls: "UxText",
                                                xtext: { color: new Color(225,225,0,1), text: "x", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                                xxform: { width:50, height:50, left:1, right:0, top:.95, bottom:0.05},
                                            },
                                        ],
                                    },
                                ],
                            },

                            // CONSUMABLES 
                            {
                                cls: "UxPanel",
                                xxform: { left: .35},
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxText",
                                        xxform: { top: -.25, bottom: .75, offset:5 },
                                        xtext: { color: new Color(48,51,134), text: "Consumables", },
                                    },
                                    // GOLD PANEL
                                    {
                                        cls: "UxPanel",
                                        xxform: { top: .125, right: .8, offset:5 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_TAN_S2_OPAQ") ),
                                            },
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("GOLD_COINS_TWO_DROP") ),
                                            },
                                            {
                                                cls: "UxText",
                                                tag: "goldText",
                                                xtext: { color: new Color(225,225,0,1), text: "1", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                                xxform: { width:50, height:50, left:1, right:0, top:.95, bottom:0.05},
                                            },
                                        ],
                                    },

                                    // KEY PANEL
                                    {
                                        cls: "UxPanel",
                                        xxform: { top: .125, left: .2, right: .6, offset:5 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_TAN_S2_OPAQ") ),
                                            },
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("KEY") ),
                                                xxform: { border: .1 },
                                            },
                                            {
                                                cls: "UxText",
                                                tag: "keyText",
                                                xtext: { color: new Color(225,225,0,1), text: "1", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                                xxform: { width:50, height:50, left:1, right:0, top:.95, bottom:0.05},
                                            },
                                        ],
                                    },

                                    // ARROW PANEL
                                    {
                                        cls: "UxPanel",
                                        xxform: { top: .125, left: .4, right: .4, offset:5 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_TAN_S2_OPAQ") ),
                                            },
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("ARROW_ONE_DROP") ),
                                                xxform: { angle: Math.PI*.25, border: .1 },
                                            },
                                            {
                                                cls: "UxText",
                                                tag: "arrowText",
                                                xtext: { color: new Color(225,225,0,1), text: "1", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                                xxform: { width:50, height:50, left:1, right:0, top:.95, bottom:0.05},
                                            },
                                        ],
                                    },

                                    // HEALTH POTION PANEL
                                    {
                                        cls: "UxPanel",
                                        xxform: { top: .125, left: .6, right: .2, offset:5 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_TAN_S2_OPAQ") ),
                                            },
                                            {
                                                cls: "UxPanel",
                                                // FIXME: add health potion
                                                xsketch: {},
                                            },
                                            {
                                                cls: "UxText",
                                                tag: "healthPotionText",
                                                xtext: { color: new Color(225,225,0,1), text: "1", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                                xxform: { width:50, height:50, left:1, right:0, top:.95, bottom:0.05},
                                            },
                                        ],
                                    },

                                    // MANA POTION PANEL
                                    {
                                        cls: "UxPanel",
                                        xxform: { top: .125, left: .8, offset:5 },
                                        xsketch: {},
                                        xchild: [
                                            {
                                                cls: "UxPanel",
                                                xsketch: Object.assign( {lockRatio: true, xfitter: { cls: "FitToParent" }}, assets.get("BUTTON_TAN_S2_OPAQ") ),
                                            },
                                            {
                                                cls: "UxPanel",
                                                // FIXME: add mana potion
                                                xsketch: {},
                                            },
                                            {
                                                cls: "UxText",
                                                tag: "manaPotionText",
                                                xtext: { color: new Color(225,225,0,1), text: "1", outlineWidth: 1, outlineColor: new Color(0,0,0,1), },
                                                xxform: { width:50, height:50, left:1, right:0, top:.95, bottom:0.05},
                                            },
                                        ],
                                    },

                                ],
                            },

                        ],
                    },

                    // INVENTORY ----------------------------------------------
                    {
                        cls: "UxPanel",
                        xxform: { left: .25, right: .25, top: .65, bottom: .05 },
                        xsketch: {},
                        xchild: [
                            {
                                cls: "UxText",
                                xxform: { top: -.15, bottom: .85, offset:5 },
                                xtext: { color: new Color(48,51,134), text: "Inventory", },
                            },

                            // ROW1
                            {
                                cls: "UxPanel",
                                xxform: { top: .125, bottom: .5 },
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxPanel",
                                        xxform: { right: .8, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton1"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot1", xsketch: {}, },
                                        ],
                                    },
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .2, right: .6, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton2"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot2", xsketch: {}, },
                                        ],
                                    },
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .4, right: .4, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton3"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot3", xsketch: {}, },
                                        ],
                                    },
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .6, right: .2, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton4"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot4", xsketch: {}, },
                                        ],
                                    },
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .8, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton5"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot5", xsketch: {}, },
                                        ],
                                    },
                                ],
                            },

                            // ROW2
                            {
                                cls: "UxPanel",
                                xxform: { top: .5, bottom: .125 },
                                xsketch: {},
                                xchild: [
                                    {
                                        cls: "UxPanel",
                                        xxform: { right: .8, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton6"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot6", xsketch: {}, },
                                        ],
                                    },
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .2, right: .6, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton7"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot7", xsketch: {}, },
                                        ],
                                    },
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .4, right: .4, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton8"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot8", xsketch: {}, },
                                        ],
                                    },
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .6, right: .2, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton9"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot9", xsketch: {}, },
                                        ],
                                    },
                                    {
                                        cls: "UxPanel",
                                        xxform: { left: .8, offset:2 },
                                        xsketch: {},
                                        xchild: [
                                            { cls: "UxPanel", xsketch: { cls: 'Rect', color: new Color(255,191,137), xfitter: { cls: "FitToParent" }, width: 50, height: 50, lockRatio: true, }, xxform: {offset: 5}, },
                                            Object.assign({tag: "invButton10"}, UxTemplates.invButton),
                                            { cls: "UxPanel", tag: "invSlot10", xsketch: {}, },
                                        ],
                                    },
                                ],
                            },

                        ],
                    },

                ],
            }],
        });
        for (let i=1; i<=10; i++) {
            let key = "healthSlot" + i.toString();
            this[key] = this.view.find((v) => v.tag === key);
            key = "manaSlot" + i.toString();
            this[key] = this.view.find((v) => v.tag === key);
            key = "invSlot" + i.toString();
            this[key] = this.view.find((v) => v.tag === key);
            key = "invButton" + i.toString();
            this[key] = this.view.find((v) => v.tag === key);
            this[key].slot = i;
            this[key].evtClicked.listen(this.onInvSlotClick.bind(this));
        }

        this.zpanel = this.view.find((v) => v.tag === "zpanel");
        this.xpanel = this.view.find((v) => v.tag === "xpanel");
        this.mainHandPanel = this.view.find((v) => v.tag === "mainHandPanel");
        this.mainHandButton = this.view.find((v) => v.tag === "mainHandButton");
        this.mainHandButton.evtClicked.listen(this.onMainClick.bind(this));
        this.offHandPanel = this.view.find((v) => v.tag === "offHandPanel");
        this.offHandButton = this.view.find((v) => v.tag === "offHandButton");
        this.offHandButton.evtClicked.listen(this.onOffClick.bind(this));
        this.shirtPanel = this.view.find((v) => v.tag === "shirtPanel");
        this.pantsPanel = this.view.find((v) => v.tag === "pantsPanel");

        this.goldText = this.view.find((v) => v.tag === "goldText");
        this.keyText = this.view.find((v) => v.tag === "keyText");
        this.arrowText = this.view.find((v) => v.tag === "arrowText");
        this.healthPotionText = this.view.find((v) => v.tag === "healthPotionText");
        this.manaPotionText = this.view.find((v) => v.tag === "manaPotionText");

        // state
        this.swapMain = false;
        this.swapOff = false;
        this.matchSlots = [];
        this.lastMatchSlots = [];
        this.lastInvSlots = [];

    }

    keyReleased(key) {
        if (key === KEY_ESCAPE) {
            this.onRestoreGame();
        }
    }

    updateActive(updateCtx) {
        if (p1.chosenPrimary !== this.lastPrimary) {
            this.lastPrimary = p1.chosenPrimary;
            let xsketch = Object.assign({parent: this.zpanel, xfitter: {cls: "FitToParent"}, lockRatio: true}, DaggerAssets.actionSketches[p1.chosenPrimary]);
            this.zpanel.sketch = Sketch.generate(xsketch) || Sketch.zero;
        }
        if (p1.chosenSecondary !== this.lastSecondary) {
            this.lastSecondary = p1.chosenSecondary;
            let xsketch = Object.assign({parent: this.xpanel, xfitter: {cls: "FitToParent"}, lockRatio: true}, DaggerAssets.actionSketches[p1.chosenSecondary]);
            this.xpanel.sketch = Sketch.generate(xsketch) || Sketch.zero;
        }
    }

    updateEquipped(updateCtx) {
        if (p1.mainHand !== this.lastMainHand) {
            this.lastMainHand = p1.mainHand;
            let xsketch = Object.assign({parent: this.mainHandPanel, xfitter: {cls: "FitToParent"}, lockRatio: true}, assets.get(p1.mainHand));
            this.mainHandPanel.sketch = Sketch.generate(xsketch);
        }
        if (p1.offHand !== this.lastOffHand) {
            this.lastOffHand = p1.offHand;
            let xsketch = Object.assign({parent: this.offHandPanel, xfitter: {cls: "FitToParent"}, lockRatio: true}, assets.get(p1.offHand));
            this.offHandPanel.sketch = Sketch.generate(xsketch);
        }
    }

    updatePlayerHealth(updateCtx) {
        // skip update if no change
        if (p1.health === this.lastHealth && p1.maxHealth === this.lastMaxHealth) return;
        // cache last health values
        this.lastHealth = p1.health;
        this.lastMaxHealth = p1.maxHealth;
        //p1.maxHealth = 100;
        // update view for current health and max health
        for (let i=1; i<=10; i++) {
            let key = "healthSlot" + i.toString();
            let slot = this[key];
            // full health
            if (p1.health >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("HEART_PIECE1"), {xfitter: { cls: "FitToParent" }});
                //let xsketch = Object.assign({parent: slot}, assets.get("HEART_PIECE1"));
                this[key].sketch = Sketch.generate(xsketch);
            // partial health
            } else if (p1.health < i*10 && p1.health > (i-1)*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("HEART_HALF_EMPTY"), {xfitter: { cls: "FitToParent" }});
                //this[key].sketch = assets.generate("HEART_HALF_EMPTY");
                this[key].sketch = Sketch.generate(xsketch);
            } else if (p1.maxHealth >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("HEART_EMPTY"), {xfitter: { cls: "FitToParent" }});
                //this[key].sketch = assets.generate("HEART_EMPTY");
                this[key].sketch = Sketch.generate(xsketch);
            } else {
                this[key].sketch = Sketch.zero;
            }
        }
    }

    updatePlayerMana(updateCtx) {
        // skip update if no change
        if (p1.mana === this.lastMana && p1.maxMana === this.lastMaxMana) return;
        // cache last mana values
        this.lastMana = p1.mana;
        this.lastMaxMana = p1.maxMana;
        //p1.maxMana = 100;
        // update view for current mana and max mana
        for (let i=1; i<=10; i++) {
            let key = "manaSlot" + i.toString();
            let slot = this[key];
            // full mana
            if (p1.mana >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("MANA_PIECE"), {xfitter: { cls: "FitToParent" }});
                //let xsketch = Object.assign({parent: slot}, assets.get("HEART_PIECE1"));
                this[key].sketch = Sketch.generate(xsketch);
            // partial mana
            } else if (p1.mana < i*10 && p1.mana > (i-1)*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("MANA_HALF_EMPTY"), {xfitter: { cls: "FitToParent" }});
                //this[key].sketch = assets.generate("HEART_HALF_EMPTY");
                this[key].sketch = Sketch.generate(xsketch);
            } else if (p1.maxMana >= i*10) {
                let xsketch = Object.assign({parent: slot}, assets.get("MANA_EMPTY"), {xfitter: { cls: "FitToParent" }});
                //this[key].sketch = assets.generate("HEART_EMPTY");
                this[key].sketch = Sketch.generate(xsketch);
            } else {
                this[key].sketch = Sketch.zero;
            }
        }
    }

    updateCounts(updateCtx) {
        if (p1.gold !== this.lastGold) {
            this.lastGold = p1.gold;
            this.goldText.text = p1.gold.toString();
        }
        if (p1.keysHeld !== this.lastKeysHeld) {
            this.lastKeysHeld = p1.keysHeld;
            this.keyText.text = p1.keysHeld.toString();
        }
        if (p1.arrows !== this.lastArrows) {
            this.lastArrows = p1.arrows;
            this.arrowText.text = p1.arrows.toString();
        }
        if (p1.healthPotions !== this.lastHealthPotions) {
            this.lastHealthPotions = p1.healthPotions;
            this.healthPotionText.text = p1.healthPotions.toString();
        }
        if (p1.manaPotions !== this.lastManaPotions) {
            this.lastManaPotions = p1.manaPotions;
            this.manaPotionText.text = p1.manaPotions.toString();
        }
    }

    updateInventory(updateCtx) {
        for (let i=0; i<10; i++) {
            if (p1.inventory[i] !== this.lastInvSlots[i]) {
                let tag = `invSlot${i+1}`;
                this.lastInvSlots[i] = p1.inventory[i];
                let xsketch = Object.assign({parent: this[tag], xfitter: {cls: "FitToParent"}, lockRatio: true}, assets.get(p1.inventory[i]));
                this[tag].sketch = Sketch.generate(xsketch);
            }
            if (this.matchSlots[i] !== this.lastMatchSlots[i]) {
                this.lastMatchSlots[i] = this.matchSlots[i];
                let tag = `invButton${i+1}`;
                if(this.matchSlots[i]) {
                    this[tag].unpressed = Sketch.generate( Object.assign({parent: this[tag], xfitter: {cls: "FitToParent"}, lockRatio: true}, assets.get("BUTTON_GRN_S2_TRAN")));
                    console.log("matched")
                } else {
                    this[tag].unpressed = Sketch.generate( Object.assign({parent: this[tag], xfitter: {cls: "FitToParent"}, lockRatio: true}, assets.get("BUTTON_TAN_S2_TRAN")));
                }
            }
        }
    }

    update(updateCtx) {
        this.updateActive(updateCtx);
        this.updateEquipped(updateCtx);
        this.updatePlayerHealth(updateCtx);
        this.updatePlayerMana(updateCtx);
        this.updateCounts(updateCtx);
        this.updateInventory(updateCtx);
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onRestoreGame() {
        console.log("onRestoreGame");
        // restore game controller
        currentCtrl = lastCtrl;
        // tear down equip view
        this.view.destroy();
    }

    onMainClick(evt) {
        console.log("onMainClick");
        if (this.swapMain) {
            this.swapMain = false;
            this.matchSlots = [];
        } else {
            this.swapMain = true;
            if (this.swapOff) this.swapOff = false;
            for (let i=0; i<10; i++) {
                let item = p1.inventory[i];
                this.matchSlots[i] = (item === "SWORD" || item === "ICEWAND" || item === "FIREWAND");
            }
        }
        console.log(`swapmain: ${this.swapMain} swapoff: ${this.swapOff} matchSlots: ${this.matchSlots}`);
    }

    onOffClick(evt) {
        console.log("onOffClick");
        if (this.swapOff) {
            this.swapOff = false;
            this.matchSlots = [];
        } else {
            this.swapOff = true;
            if (this.swapMain) this.swapMain = false;
            for (let i=0; i<10; i++) {
                let item = p1.inventory[i];
                this.matchSlots[i] = (item === "BOW" || item === "ICEWAND" || item === "FIREWAND");
            }
        }
        console.log(`swapmain: ${this.swapMain} swapoff: ${this.swapOff} matchSlots: ${this.matchSlots}`);
    }

    onInvSlotClick(evt) {
        console.log("onInvSlotClick");
        console.log("actor.slot: " + evt.actor.slot);
    }

}