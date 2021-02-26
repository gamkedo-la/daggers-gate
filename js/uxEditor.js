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

        //let b1 = this.view.find((v) => v.tag === "button.lvl1");
        //console.log("b1: " + b1);

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
        console.log("saved level name: " + evt.actor.savedName);
        // load level
        let lvl = evt.actor.savedName;
        levelLoader.load(lvl, true)
        editorLvl = currentLevel;
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
            xchild: [
                {
                    cls: "UxEditorView",
                    tag: "editorPanel",
                    xxform: { origx: 0, origy: 0 },
                    xsketch: {
                        cls: 'Rect',
                        color: new Color(0,20,200,1),
                        xfitter: { cls: "FitToParent" },
                    },
                }
            ],
        });
        // FIXME: setup globals???
        editorMode = true;
        // update camera to track mouse position
        this.tracker = {x:0, y:0};
        camera.follow(this.tracker);
        camera.dbg = true;
        startEditor();
    }

    mouseClicked(mouseX, mouseY) {
        // translate mouse x/y based on current camera position
        mouseX += camera.x;
        mouseY += camera.y;
        if(editing_level = "BG") {
            if (currentLevel.containsPoint(mouseX, mouseY)) {
                let idx = currentLevel.idxfromxy(mouseX, mouseY);
                console.log("clicked: " + currentLevel.ifromidx(idx) + "," + currentLevel.jfromidx(idx));
                // console.log(freshMap[clickedIndex], storedTileValue);
                editorLvl.setbgi(idx, storedTileValue);
                //blank_Map[idx] = storedTileValue;
                mouseDragging = true;
            }
        }
        if(editing_level = "FG") {
            if (currentLevel.containsPoint(mouseX, mouseY)) {
                let idx = currentLevel.idxfromxy(mouseX, mouseY);
                console.log("clicked: " + currentLevel.ifromidx(idx) + "," + currentLevel.jfromidx(idx));
                // console.log(freshMap[clickedIndex], storedTileValue);
                editorLvl.setfgi(idx, storedTileValue);
                //blank_Map[idx] = storedTileValue;
                mouseDragging = true;
            }
        }
        
        // Doesn't edit Rooms currently --need to learn how
        if(editing_level = "ROOM") {
            if (currentLevel.containsPoint(mouseX, mouseY)) {
                let idx = currentLevel.idxfromxy(mouseX, mouseY);
                // console.log(freshMap[clickedIndex], storedTileValue);
                editorLvl.setbgi(idx, storedTileValue);
                //blank_Map[idx] = storedTileValue;
                mouseDragging = true;
            }
        }
    }

    mouseMoved(mouseX, mouseY) {
        //console.log("tracker is: " + Fmt.ofmt(this.tracker));
        if(mouseDragging) {
            editorLvl.setfgi(tileOverIdx, storedTileValue);
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

    update(updateCtx) {
		// camera movement
		camera.update(updateCtx);
        //console.log("updating camera");
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

}