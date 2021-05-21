const WRAP_HACK = "                                                                                                                                                                                                                                                                                                                                                            ";
const LINE_SKIP_STYLE = "|"+WRAP_HACK; // may be a more elegant way, just needed something working for now :)

class UxCreditsCtrl extends UxCtrl {
    static dialogs = [
        "• Vince McKeown: Project lead, initial gameplay, quest authoring, collisions, unvisited areas hidden, door puzzle functionality, instructions, main character code, reference gathering, object interaction, sounds (mana, health, doors, pot breaking, coin pickup, arrow collection), potions (mana, healing), art (ax dwarf with animations, coins, pot), pathfinding, drops (health, arrows, coins), slime enemy, debug cheats, audio code, trap damage, pickups (heart, bow), player health display, object runes, object carrying, Godwin, level design (water rooms, wind rooms, town interior connections), tiles (wooden floors, benches, altar, church parts, dresser, cabinet, bed, painting, money box, bridge), store NPC art (alchemist, fletcher), music integration"+WRAP_HACK+
LINE_SKIP_STYLE+
"• Tylor Allison: Asset system, enemy AI, expanded custom level editor functionality, sprite sheet loader, art (player sprite), grid system double door, tall sprite support, animation features, camera code, display optimizations, chest opening, collision improvements, entity definition tables, UI code, equipment menu, mouse control, melee animation, goblin loot drops, loot table, breakability, arrow attack, 9-slice support, dialog box system, button art integration, button frame colors, quest screen, text wrap, npc interaction, magic attacks, pit variants, particle systems, shops (alchemist, fletcher), healer interface, assorted bug fixes, wall traps, poison, reset button, chasm, elder NPCs, storyline setup, loading fade, additional level design and related art (incl. church, cellar, caves), gem respawn"+WRAP_HACK+
LINE_SKIP_STYLE+
"• Kyle Knutson: Sprites (sword, fire wand, tunics, chest, heart pieces, goblins, windows, mana drop, button frame improvements, stairs, buildings, spear gate animation, burning village, majority of tiles), color palette, text draw code, basic map editor (core functionality, layers, painting), initial title screen, CSS style, font selection, level design (goblin cave, temple, entryway, dungeon design, fire puzzles), teleport, additional music (shop)"+WRAP_HACK+
LINE_SKIP_STYLE+
"• Alan Zaring: Dungeon music"+WRAP_HACK+
LINE_SKIP_STYLE+
"• Vaan Hope Khani: New puzzle level, final dungeon, sounds (slime movement, player hurt, all goblin noise)"+WRAP_HACK+
LINE_SKIP_STYLE+
"• Grygoriy Kulesko: Sound integration, alternative floor tile asset"+WRAP_HACK+
LINE_SKIP_STYLE+
"• Cam Newton: Breakable vase (sprite, destruction behavior, animation)"+WRAP_HACK+
LINE_SKIP_STYLE+
"• MrPhil (Philip Ludington): Dark wall tile and green growth variant"+WRAP_HACK+
LINE_SKIP_STYLE+
"• Filipe Dottori: Mana regeneration"+WRAP_HACK+
LINE_SKIP_STYLE+
"• Chris DeLeon: Compile credits, minor git state assist"+WRAP_HACK+
LINE_SKIP_STYLE+
"• Robin Scott: Practice commit"
    ]
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        const dialogColor = spec.dialogColor || new Color(226,83,34);
        this.extraSpace = 25;
        this.dialogIndex = 0;
        this.lastDialogIndex = 0;
        this._font = spec.font || new Font({size:10});
        let dialog = UxCreditsCtrl.dialogs[0];
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            xchild: [
                {
                    cls: "UxPanel",
                    tag: "storyPanel",
                    xxform: { origx: 0, origy: 0 },
                    xsketch: Object.assign({}, assets.get("BURNING_VILLAGE"), {xfitter: { cls: "FitToParent" }}),
                    //xsketch: { cls: 'Rect', color: new Color(20,20,20,1), xfitter: { cls: "FitToParent" }, },
                    xchild: [
                        {
                            cls: "UxPanel",
                            tag: "dialogPanel",
                            xsketch: {},
                            xsketch: { cls: 'Rect', color: new Color(20,20,20,.55), xfitter: { cls: "FitToParent" }, },
                            xxform: { left: .02, right: .02, top: .01, bottom: .3, height: 5 },
                            xchild: [
                                {
                                    cls: "UxText",
                                    tag: "dialogText",
                                    xtext: { color: dialogColor, text: dialog, wrap: true, fit: false, font: this._font},
                                    xxform: { otop: 1, oleft: 10, oright: 5 },
                                },
                            ],
                        },
                        {
                            cls: "UxText",
                            xxform: { left: .2, right: .2, top: .7, bottom: .05},
                            xtext: { color: new Color(168,36,36), outlineWidth:1, outlineColor: new Color(255,201,92), text: "Space or Escape to return"},
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
            this.onBack();
        }
        if (key === KEY_SPACE) {
            this.dialogIndex++;
            if (this.dialogIndex >= UxCreditsCtrl.dialogs.length) {
                this.onBack();
            }
        }
    }

    updateDialog(ctx) {
        if (this.dialogIndex !== this.lastDialogIndex) {
            this.lastDialogIndex = this.dialogIndex;
            let dialog = UxCreditsCtrl.dialogs[this.dialogIndex];
            let height = Text.measureWrapHeight(this._font, dialog, this.dialogText.width) + this.extraSpace;
            this.dialogPanel.xform.height = height;
            this.dialogText.text = dialog;
        }
    }

    update(ctx) {
        this.updateDialog(ctx);
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onBack(evt) {
        // build out next controller
        ctrlSys.assign(new UxMainCtrl());
        // tear down my view
        this.view.destroy();
    }

}