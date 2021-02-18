class UxPlayView extends UxView {
    constructor(spec={}) {
        super(spec);
    }

    render(ctx) {
		// Wrapped in IF/ELSE to support Tile Editor Mode	
		ctx.translate(-camera.x, -camera.y);
		currentLevel.render(ctx);
		if(pathFindingDisplay){
			drawPathingFindingTiles();
	    }
		p1.draw();
		ctx.translate(camera.x, camera.y);
		
        /*
		if(framesToDisplayMessage-- > 600){
			colorText("HELPER CODE", 500, 400, fillColor = "black", font = "26px Arial Black");
			colorText("'1' : Toggles Pathfinding Display", 500, 450, fillColor = "black", font = "14px Arial Black");
			colorText("'2' : Toggles Collision Boxes Display", 500, 500, fillColor = "black", font = "14px Arial Black");
			colorText("'3' : Toggles Room Numbers Display", 500, 550, fillColor = "black", font = "14px Arial Black");		
		} else if (framesToDisplayMessage < 600 && framesToDisplayMessage > 300){ 	
			colorText("Player Movements", 500, 400, fillColor = "black", font = "26px Arial Black");
			colorText("'Up Arrow' : Move Up", 500, 450, fillColor = "black", font = "14px Arial Black");
			colorText("'Left Arrow' : Move Left", 500, 475, fillColor = "black", font = "14px Arial Black");
			colorText("'Down Arrow' : Move Down", 500, 500, fillColor = "black", font = "14px Arial Black");
			colorText("'Right Arrow' : Move Right", 500, 525, fillColor = "black", font = "14px Arial Black");		
			colorText("'Left Click' : Player uses pathfinding", 500, 550, fillColor = "black", font = "14px Arial Black");
			colorText("to that location", 500, 575, fillColor = "black", font = "14px Arial Black");		
		} else if (framesToDisplayMessage < 250 && framesToDisplayMessage > 0){ 	
			colorText("USE KEYS TO FIND THE TREASURE", 400, 400, fillColor = "black", font = "14px Arial Black");
		}
        */

		for(var i = 0; i < p1.health; i++){
			var heartSpacing = 20;
			drawBitmapCenteredAtLocationWithRotation(props.getImage(TILE.HEART), 20 + (i*heartSpacing), 40, 0.0);
		}		
		       customText("Press  -9-  to go into EDITOR MODE", 270, 480, 'yellow', 12, 'monospace')
    }
}


class UxPlayCtrl extends UxCtrl {
    constructor(spec={}) {
        super(spec);
        // construct the UI elements
        this.view = UxView.generate({
            cls: "UxCanvas",
            cvsid: "gameCanvas",
            tag: "playCanvas",
            xchild: [
                {
                    cls: "UxPlayView",
                    tag: "play",
                    xxform: { origx: 0, origy: 0 },
                }
            ],
        });
    }

    keyPressed(key) {
        setKeyHoldState(key, p1, true);
        if(key === KEY_NUMBER_1){
            pathFindingDisplay = !pathFindingDisplay;
        } else if (key === KEY_NUMBER_2){
            showCollisions = !showCollisions;
        } else if (key === KEY_NUMBER_3){
            showRoomNumbers = !showRoomNumbers;
        }
    }

    keyReleased(key) {
        setKeyHoldState(key, p1, false);
        if (key === KEY_ESCAPE) {
            this.onEquipMenu();
        }
    }

    update(updateCtx) {
		// handle level exit
		if (queuedExit) {
			// load queued level
			levelLoader.load(queuedExit.lvl);
			// respawn player
			currentLevel.placeCharacter(p1, queuedExit.spawn);
			queuedExit = undefined;
			SetupPathfindingGridData(p1);
		}
		// camera movement
		camera.update(updateCtx);
		// Wrapped in IF/ELSE to support Tile Editor Mode	
		// movement
		//p1.move(updateCtx);
		p1.update(updateCtx);
		currentLevel.update(updateCtx);
    }

    mouseClicked(x, y) {
        // pathfinding
        if(grid[tileOverIdx].elementType != WALL) {
            startPath(tileOverIdx, p1); 
        }
    }

    // EVENT CALLBACKS -----------------------------------------------------
    onEquipMenu() {
        console.log("onEquipMenu");
        // create new controller for equip menu
        let ctrl = new UxEquipCtrl();
        // activate new controller, move play controller to last
        lastCtrl = this;
        currentCtrl = ctrl;
    }


}