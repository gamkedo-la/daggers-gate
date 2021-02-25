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
    }

    update(updateCtx) {
		// camera movement
		camera.update(updateCtx);
        //console.log("updating camera");
    }

}