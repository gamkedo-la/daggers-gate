class UxEditorView extends UxPanel {
    constructor(spec={}) {
        super(spec);
        console.log("starting ux editor view");
    }

    render(ctx) {
        super.render(ctx);
		// Wrapped in IF/ELSE to support Tile Editor Mode	
		ctx.translate(-camera.x, -camera.y);
		if (editorLvl) {
            editorLvl.render(ctx);
            editorLvl.lateRender(ctx);
        }
		ctx.translate(camera.x, camera.y);
    }
}

class UxLoadLvlPopUpCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            layer: 1,
            xchild: [
                {
                    cls: "UxPanel",
                    xxform: { border: .2},
                    xsketch: { cls: 'Rect', borderWidth: 5, borderColor: "green", color: new Color(25,25,25,1), xfitter: { cls: "FitToParent" }, },
                    xchild: [
                        {
                            cls: "UxText",
                            xxform: { top: .075, bottom: .85 },
                            xtext: { color: new Color(0,255,0,.75), text: "Choose Level", },
                        },
                        {
                            cls: "UxPanel",
                            tag: "lvlPanel",
                            xxform: { top: .2, bottom: .1 },
                        },
                        {
                            cls: "UxButton",
                            tag: "backButton",
                            xxform: { top: .9, offset: 5, left: .4, right: .4 },
                            xtext: { text: "Back", color: new Color(255,255,0,.75)},
                        },
                    ],
                },
            ],
        });

        this.lvlPanel = this.view.find((v) => v.tag === "lvlPanel");
        this.backButton = this.view.find((v) => v.tag === "backButton");
        this.backButton.evtClicked.listen(this.onBack.bind(this));

        // build out level buttons
        let row = 0;
        let col = 0;
        let maxCols = 2;
        let colStep = 1/maxCols;
        let maxRows = Math.floor(this.lvlPanel.height/50);
        let rowStep = 1/maxRows;
        for (const lvlName in allLevels) {
            let bspec = {
                cls: "UxButton",
                dfltDepth: this.lvlPanel.depth + 1,
                dfltLayer: this.lvlPanel.layer,
                parent: this.lvlPanel,
                xxform: {parent: this.lvlPanel.xform, left: col*colStep, right: 1-(col+1)*colStep, top: row*rowStep, bottom: 1-(row+1)*rowStep, offset: 5},
                xtext: {text: lvlName, color: new Color(255,255,0,.75)},
            };
            let b = UxView.generate(bspec);
            if (b) {
                b.lvlName = lvlName;
                b.evtClicked.listen(this.onLvlSelect.bind(this));
                this.lvlPanel.adopt(b);
                col++;
                if (col >= maxCols) {
                    row++;
                    col = 0;
                }
            }
        }

    }

    keyReleased(key) {
        if (key === KEY_ESCAPE) {
            this.onBack();
        }
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onBack() {
        console.log("onBack");
        // restore last controller
        currentCtrl = lastCtrl;
        // tear down view
        if (this.view) this.view.destroy();
        // restore last view
        currentCtrl.view.active = true;
    }

    onLvlSelect(evt) {
        console.log("onLvlSelect: " + Fmt.ofmt(evt));
        if (!confirm("Loading new level will erase current level data, OK to proceed?")) return;
        // load level
        let lvl = evt.actor.lvlName;
        levelLoader.load(lvl, true)
        editorLvl = currentLevel;
        // reset tracker and camera
        lastCtrl.tracker.x = 0;
        lastCtrl.tracker.y = 0;
        camera.reset();
        // close window
        this.onBack();
    }

}


class UxEditorCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            tag: "editorCanvas",
            resize: true,
            xchild: [
                {
                    cls: "UxEditorView",
                    tag: "editorPanel",
                    xxform: { origx: 0, origy: 0, right: .3 },
                    xsketch: { cls: 'Rect', color: new Color(0,20,200,1), xfitter: { cls: "FitToParent" }, },
                },
                {
                    cls: "UxPanel",
                    tag: "menuPanel",
                    xxform: { left: .7, bottom: 0},
                    xsketch: { cls: 'Rect', color: new Color(0,0,0,1), xfitter: { cls: "FitToParent" }, },
                    xchild: [
                        {
                            cls: "UxText",
                            xxform: { top: .01, bottom: .95},
                            xtext: { color: new Color(0,255,0,.75), text: "Editor Menu", },
                        },
                        {
                            cls: "UxButton",
                            tag: "helpButton",
                            xxform: { top: .01, bottom: .95, left: .9, right: .025},
                            xtext: { color: new Color(0,255,0,.75), text: "?", },
                        },

                        {
                            cls: "UxButton",
                            tag: "newButton",
                            xxform: { top: .05, bottom: .9, right: .67, offset: 5},
                            xtext: { color: new Color(0,255,0,.75), text: "New", },
                        },

                        {
                            cls: "UxButton",
                            tag: "loadButton",
                            xxform: { top: .05, bottom: .9, right: .33, left: .33, offset: 5},
                            xtext: { color: new Color(0,255,0,.75), text: "Load", },
                        },

                        {
                            cls: "UxButton",
                            tag: "generateButton",
                            xxform: { top: .05, bottom: .9, left: .67, offset: 5},
                            xtext: { color: new Color(0,255,0,.75), text: "Generate", },
                        },

                        {
                            cls: "UxPanel",
                            xxform: { top: .1, bottom: .8, right: .67, offset: 5},
                            xsketch: { cls: 'Rect', color: new Color(0,20,200,1), xfitter: { cls: "FitToParent" }, },
                            xchild: [
                                {
                                    cls: "UxPanel",
                                    tag: "fgSelectPanel",
                                    xxform: {offset: 3},
                                    xsketch: { cls: 'Rect', borderWidth: 5, borderColor: new Color(255,0,0,.5), xfitter: { cls: "FitToParent" }, },
                                },
                                {
                                    cls: "UxButton",
                                    tag: "fgButton",
                                    xxform: { bottom: .6, offset: 5 },
                                    xtext: { color: new Color(0,255,0,.75), text: "FG", },
                                },
                                {
                                    cls: "UxPanel",
                                    tag: "fgPanel",
                                    xxform: { top: .65, bottom: .35, left: .5, right: .5, width: 40, height: 40},
                                },
                            ],
                        },

                        {
                            cls: "UxPanel",
                            xxform: { top: .1, bottom: .8, left: .33, right: .33, offset: 5},
                            xsketch: { cls: 'Rect', color: new Color(0,20,200,1), xfitter: { cls: "FitToParent" }, },
                            xchild: [
                                {
                                    cls: "UxPanel",
                                    tag: "bgSelectPanel",
                                    xxform: {offset: 3},
                                    xsketch: { cls: 'Rect', borderWidth: 5, borderColor: new Color(255,0,0,.5), xfitter: { cls: "FitToParent" }, },
                                },
                                {
                                    cls: "UxButton",
                                    tag: "bgButton",
                                    xxform: { bottom: .6, offset: 5 },
                                    xtext: { color: new Color(0,255,0,.75), text: "BG", },
                                },
                                {
                                    cls: "UxPanel",
                                    tag: "bgPanel",
                                    xxform: { top: .65, bottom: .35, left: .5, right: .5, width: 40, height: 40},
                                },
                            ],
                        },

                        {
                            cls: "UxPanel",
                            xxform: { top: .1, bottom: .8, left: .67, offset: 5},
                            xsketch: { cls: 'Rect', color: new Color(0,20,200,1), xfitter: { cls: "FitToParent" }, },
                            xchild: [
                                {
                                    cls: "UxPanel",
                                    tag: "roomSelectPanel",
                                    xxform: {offset: 3},
                                    xsketch: { cls: 'Rect', borderWidth: 5, borderColor: new Color(255,0,0,.5), xfitter: { cls: "FitToParent" }, },
                                },
                                {
                                    cls: "UxButton",
                                    tag: "roomButton",
                                    xxform: { bottom: .6, offset: 5 },
                                    xtext: { color: new Color(0,255,0,.75), text: "Room", },
                                },
                                {
                                    cls: "UxPanel",
                                    tag: "roomPanel",
                                    xxform: { top: .65, bottom: .35, left: .5, right: .5, width: 40, height: 40},
                                },
                            ],
                        },

                        {
                            cls: "UxPanel",
                            tag: "tilePanel",
                            xxform: { top: .2, offset: 5 },
                        },
                    ],
                },

            ],
        });
        this.dbg = spec.dbg;
        // bind UI elements
        this.editorPanel = this.view.find((v) => v.tag === "editorPanel");
        this.tilePanel = this.view.find((v) => v.tag === "tilePanel");
        this.fgPanel = this.view.find((v) => v.tag === "fgPanel");
        this.bgPanel = this.view.find((v) => v.tag === "bgPanel");
        this.roomPanel = this.view.find((v) => v.tag === "roomPanel");
        this.fgSelect = this.view.find((v) => v.tag === "fgSelectPanel");
        this.bgSelect = this.view.find((v) => v.tag === "bgSelectPanel");
        this.roomSelect = this.view.find((v) => v.tag === "roomSelectPanel");
        for (const tag of ["fg", "bg", "room"]) {
            let b = this.view.find((v) => v.tag === tag + "Button");
            if (b) {
                b.evtClicked.listen((evt) => { 
                    if (this.dbg) console.log(tag + " selected");
                    this.selectMode = tag; 
                });
            }
        }
        this.loadButton = this.view.find((v) => v.tag === "loadButton");
        this.loadButton.evtClicked.listen(this.onLoadLevel.bind(this));
        this.genButton = this.view.find((v) => v.tag === "generateButton");
        this.genButton.evtClicked.listen(this.onGenerate.bind(this));

        // build out tile buttons
        let row = 0;
        let col = 0;
        let maxCols = Math.floor(this.tilePanel.width/40);
        let colStep = 1/maxCols;
        let maxRows = Math.floor(this.tilePanel.height/40);
        let rowStep = 1/maxRows;
        for (const asset of assets) {
            if (!asset.tileset) continue;
            let bspec = {
                cls: "UxButton",
                dfltDepth: this.tilePanel.depth + 1,
                dfltLayer: this.tilePanel.layer,
                parent: this.tilePanel,
                xxform: {parent: this.tilePanel.xform, left: col*colStep, right: 1-(col+1)*colStep, top: row*rowStep, bottom: 1-(row+1)*rowStep},
                xunpressed: asset,
                xtext: {text: " " + asset.id.toString() + " ", color: new Color(255,255,0,.175)},
            };
            let b = UxView.generate(bspec);
            if (b) {
                b.assetId = asset.id;
                b.evtClicked.listen(this.onTileSelect.bind(this));
                this.tilePanel.adopt(b);
                col++;
                if (col >= maxCols) {
                    row++;
                    col = 0;
                }
            }
        }

        // editor state
        this.selectMode = "fg";
        this.fgId = TILE.WALL_BOTTOM;
        this.bgId = TILE.GROUND;
        this.roomId = 1;

        // handle resize of canvas/window
        camera.resize(this.editorPanel.width, this.editorPanel.height);
        this.view.evtResized.listen(this.onCanvasResize.bind(this));
        // FIXME: setup globals???
        // reset levels
        levelLoader.clear();
        editorMode = true;
        // update camera to track mouse position
        this.tracker = {x:0, y:0};
        camera.follow(this.tracker);
        camera.dbg = true;
        startEditor();
    }

    mouseClicked(mouseX, mouseY) {
        // skip mouse click if not on camera
        if (!camera.contains(mouseX, mouseY)) return;
        // lookup idx of current mouse position
        let idx = currentLevel.idxfromxy(mouseX, mouseY);
        if (this.selectMode === "fg") {
            currentLevel.setfgi(idx, this.fgId);
        }
        if (this.selectMode === "bg") {
            currentLevel.setbgi(idx, this.bgId);
        }
        if (this.selectMode === "room") {
            // FIXME: need to redo room code
            //currentLvl.setbgi(idx, this.bgId);
        }

    }

    mouseMoved(mouseX, mouseY) {
        //console.log("tracker is: " + Fmt.ofmt(this.tracker));
        if(mouseDragging) {
            let idx = currentLevel.idxfromxy(mouseX, mouseY);
            if (this.selectMode === "fg") {
                currentLevel.setfgi(idx, this.fgId);
            }
            if (this.selectMode === "bg") {
                currentLevel.setbgi(idx, this.bgId);
            }
            if (this.selectMode === "room") {
                // FIXME: need to redo room code
                //currentLvl.setbgi(idx, this.bgId);
            }
        }
    }

    keyReleased(key) {
        let wmaxx = currentLevel.maxx;
        let wmaxy = currentLevel.maxy;
        if (key === KEY_RIGHT_ARROW) {
            if (camera.x < wmaxx-camera.dx) this.tracker.x = camera.x+camera.width - camera.dx + currentLevel.sketchWidth;
        }
        if (key === KEY_LEFT_ARROW) {
           if (camera.x > 0) this.tracker.x = camera.x + camera.dx - currentLevel.sketchWidth;
        }
        if (key === KEY_DOWN_ARROW) {
            if (camera.y < wmaxy-camera.dy) this.tracker.y = camera.y+camera.height - camera.dy + currentLevel.sketchWidth;
        }
        if (key === KEY_UP_ARROW) {
           if (camera.y > 0) this.tracker.y = camera.y + camera.dy - currentLevel.sketchWidth;
        }
        /*
        if (key === KEY_ESCAPE) {
            this.onPopupMenu();
        }
        */
    }

    updateSelectedPanels() {
        if (this.selectMode !== this.lastSelectMode) {
            this.lastSelectMode = this.selectMode;
            this.fgSelect.visible = (this.selectMode === "fg");
            this.bgSelect.visible = (this.selectMode === "bg");
            this.roomSelect.visible = (this.selectMode === "room");
        }
        if (this.fgId !== this.lastFgId) {
            this.lastFgId = this.fgId;
            let xsketch = Object.assign({parent: this.fgPanel}, assets.get(props.getTag(this.fgId)), {xfitter: { cls: "FitToParent" }});
            this.fgPanel.sketch = Sketch.generate(xsketch);
        }
        if (this.bgId !== this.lastBgId) {
            this.lastBgId = this.bgId;
            let xsketch = Object.assign({parent: this.bgPanel}, assets.get(props.getTag(this.bgId)), {xfitter: { cls: "FitToParent" }});
            this.bgPanel.sketch = Sketch.generate(xsketch);
        }
        if (this.roomId !== this.lastRoomId) {
            this.lastRoomId = this.roomId;
            let xsketch = {parent: this.bgPanel, cls: "Text", text: this.roomId.toString(), xfitter: { cls: "FitToParent" }, color: new Color(255,255,0,.75)};
            this.roomPanel.sketch = Sketch.generate(xsketch);
        }
    }

    update(updateCtx) {
		// camera movement
		camera.update(updateCtx);
        //console.log("updating camera");
        this.updateSelectedPanels();
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onLoadLevel() {
        console.log("onLoadLevel");
        // create new controller for equip menu
        let ctrl = new UxLoadLvlPopUpCtrl();
        // activate new controller, move editor controller to last
        lastCtrl = this;
        this.view.active = false;
        currentCtrl = ctrl;
    }

    onGenerate() {
        console.log("onGenerate");
        const modal = document.getElementById('lvl-generate-modal');
        console.log("modal is: " + modal);
        modal.classList.add('is--visible');
        const bodyBlackout = document.querySelector('.body-blackout');
        bodyBlackout.classList.add('is-blacked-out');
        modal.querySelector('.popup-modal__close').addEventListener('click', () => {
            console.log("clicked");
            modal.classList.remove('is--visible');
            bodyBlackout.classList.remove('is-blacked-out');
        });

        // FIXME: query from modal?
        // FIXME: add generated level data...
        document.getElementById('lvl-text').innerText = "hello world";
        /*
        const text = modal.getElementsByTagName('lvl-text');
        console.log("text is: " + text);
        text.innerText = "no es bueno";
        */
        bodyBlackout.addEventListener('click', () => {
            modal.classList.remove('is--visible')
            bodyBlackout.classList.remove('is-blacked-out')
        });
    }

    onCanvasResize(evt) {
        console.log("onCanvasResize");
        // update camera viewport based on current size of game panel
        camera.resize(this.editorPanel.width, this.editorPanel.height);
    }

    onTileSelect(evt) {
        console.log("onTileSelect: " + evt.actor.assetId);
        if (this.selectMode === "fg") {
            this.fgId = evt.actor.assetId;
        } else if (this.selectMode === "bg") {
            this.bgId = evt.actor.assetId;
        }
    }

}