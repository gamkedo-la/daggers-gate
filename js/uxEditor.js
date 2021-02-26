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

class UxLvlPopUpCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        // construct the UI elements
        let vspec = {
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            xchild: [
                /*
                {
                    cls: "UxButton",
                    tag: "startButton",
                    xxform: { left: .2, top:.15, bottom: .75, right: .2},
                    xtext: { text: "Start" },
                },
                */
            ],
        };

        // build out buttons for levels
        let i = 0;
        let j = 0;
        for (const key in allLevels) {
            let ypt = j * .1;
            let ypb = 1 - (ypt + .1);
            let spec = {
                cls: "UxButton",
                tag: "button." + key,
                xxform: { left: .2, top: ypt, bottom: ypb, right: .6, offset: 10},
                xtext: { text: key },
            }
            vspec.xchild.push(spec);
            j++;
            if (j >= 10) {
                i++;
                j = 0;
            }
        }

        this.view = UxView.generate(vspec);

        // bind buttons
        for (const key in allLevels) {
            let tag = "button." + key;
            let b = this.view.find((v) => v.tag === tag);
            b.savedName = key;
            if (b) {
                console.log("b found: " + b);
                b.evtClicked.listen(this.onClickLvl.bind(this));
            }
        }

        // clear level loader cache ... this flushes any game level that may have been loaded for the game (not in editor mode)
        levelLoader.clear();
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
        // tear down equip view
        if (this.view) this.view.destroy();
    }

    onClickLvl(evt) {
        console.log("onClickLvl: " + Fmt.ofmt(evt));
        // load level
        let lvl = evt.actor.savedName;
        levelLoader.load(lvl, true)
        editorLvl = currentLevel;
        // reset tracker and camera
        lastCtrl.tracker.x = 0;
        lastCtrl.tracker.y = 0;
        camera.reset();
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
                            cls: "UxButton",
                            tag: "fgButton",
                            xxform: { top: .1, bottom: .85, right: .67, offset: 5},
                            xtext: { color: new Color(0,255,0,.75), text: "FG", },
                        },
                        {
                            cls: "UxButton",
                            tag: "bgButton",
                            xxform: { top: .1, bottom: .85, left: .33, right: .33, offset: 5},
                            xtext: { color: new Color(0,255,0,.75), text: "BG", },
                        },
                        {
                            cls: "UxButton",
                            tag: "roomButton",
                            xxform: { top: .1, bottom: .85, left: .67, offset: 5},
                            xtext: { color: new Color(0,255,0,.75), text: "Room", },
                        },
                        {
                            cls: "UxPanel",
                            tag: "fgPanel",
                            xxform: { top: .175, bottom: .825, left: .167, right: .833, width: 50, height: 50},
                        },
                        {
                            cls: "UxPanel",
                            tag: "bgPanel",
                            xxform: { top: .175, bottom: .825, left: .5, right: .5, width: 50, height: 50},
                        },
                        {
                            cls: "UxPanel",
                            tag: "roomPanel",
                            xxform: { top: .175, bottom: .825, right: .167, left: .833, width: 50, height: 50},
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
        for (const tag of ["fg", "bg", "room"]) {
            let b = this.view.find((v) => v.tag === tag + "Button");
            console.log("b: " + b);
            if (b) {
                b.evtClicked.listen((evt) => { 
                    if (this.dbg) console.log(tag + " selected");
                    this.selectMode = tag; 
                });
            }
        }

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
        if(editing_level === "BG") {
            console.log("clicked: " + currentLevel.ifromidx(idx) + "," + currentLevel.jfromidx(idx));
            editorLvl.setbgi(idx, storedTileValue);
        }
        if(editing_level === "FG") {
            console.log("clicked: " + currentLevel.ifromidx(idx) + "," + currentLevel.jfromidx(idx));
            editorLvl.setfgi(idx, storedTileValue);
        }
        
        // Doesn't edit Rooms currently --need to learn how
        if(editing_level === "ROOM") {
            // FIXME
            // console.log(freshMap[clickedIndex], storedTileValue);
            //editorLvl.setbgi(idx, storedTileValue);
        }
    }

    mouseMoved(mouseX, mouseY) {
        //console.log("tracker is: " + Fmt.ofmt(this.tracker));
        if(mouseDragging) {
            let idx = currentLevel.idxfromxy(mouseX, mouseY);
            editorLvl.setfgi(idx, storedTileValue);
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
        if (key === KEY_ESCAPE) {
            this.onPopupMenu();
        }
    }

    updateSelectedPanels() {
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
    onPopupMenu() {
        console.log("onPopupMenu");
        // create new controller for equip menu
        let ctrl = new UxLvlPopUpCtrl();
        // activate new controller, move play controller to last
        lastCtrl = this;
        currentCtrl = ctrl;
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