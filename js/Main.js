// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1;
var pathFindingDisplay = false;
var cheatSeeThroughCeiling = true;

// Added to support Tile Editor Mode
var titleScreen = true;
var editorMode = false;

var assets = new Assets({
	refs: daggerAssets,
	//dbg: true,
});
var loaders = [ 
	assets,
];
var props;
var currentLevel;
var currentCtrl;
var lastCtrl;
var queuedExit;
var framesToDisplayMessage = 800;
var levelLoader = new LevelLoader({lvls: allLevels});
var framesPerSecond = 30;
var deltaTime = 1000/framesPerSecond;
var updateCtx = {
	deltaTime: deltaTime,
}
var camera = new Camera({
	width: 800,
	height: 600,
});

// FIXME: remove
/*
var sword = new Shape({
	fill: false,
	verts: [
		{x:4, y:0},
		{x:8, y:0},
		{x:8, y:4},
		{x:28, y:4},
		{x:30, y:6},
		{x:28, y:8},
		{x:8, y:8},
		{x:8, y:12},
		{x:4, y:12},
		{x:4, y:8},
		{x:0, y:8},
		{x:0, y:4},
		{x:4, y:4},
	],
	borderWidth: 1,
	borderColor: "rgba(200,200,0,1)",
});
*/

var viewMgr;
var viewSys;

async function load() {
	return new Promise( (resolve) => {
		let promises = [];
		let ctx = {};
		for (const loader of loaders) {
			let promise = loader.load(ctx);
			promises.push(promise);
		}
		Promise.all(promises).then(() => {
			console.log("game loaded...");
			resolve();
		})
	});
}

window.onload = async function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

	await load();
	props = new Props({
		assets: assets,
		//dbg: true,
	});

	loadingDoneSoStartGame();
}

function loadingDoneSoStartGame() {
	// initialize constructor registry/ui templates
	Registry.init();
	UxTemplates.init();
	// initialize view manager and view system
	// - view manager will track all "views" from the game and is responsible for updating/rendering all views
	// - view system is the "glue" that watches the global object store for new views (or deleted ones) and informs view manager of changes
	viewMgr = new ViewMgr();
	viewSys = new ViewSystem({vmgr: viewMgr});
	// load starting level
	levelLoader.load(startingLevel);

	// test canvas/panel
	/*
	let view = UxView.generate({
		cls: "UxCanvas",
		cvsid: "gameCanvas",
		tag: "cvs.1",
		xchild: [
			{
				cls: "UxPanel",
				tag: "panel.1",
				dbg: true,
				xxform: { border: .1 },
				xsketch: {
					cls: 'Rect',
					borderWidth: 5,
					color: new Color(255,255,255,.25),
					borderColor: new Color(0,127,127,1),
					xfitter: { cls: "FitToParent" },
				},
				xchild: [{
					cls: "UxPanel",
					tag: "panel.2",
					dbg: true,
					xxform: { border: .2, scalex: 2 },
					xsketch: {
						cls: 'Rect',
						borderWidth: 5,
						color: new Color(255,255,255,.25),
						borderColor: new Color(255,0,0,1),
						xfitter: { cls: "FitToParent" },
					},
				}],
			},
		],
	});
	*/

	// setup ux controller
	currentCtrl = new UxTitleCtrl();
	//currentCtrl = new UxEquipCtrl();

	// instantiate player
	p1 = new warriorClass({
		sketch: animators["PLAYER"],
		name: "Player",
	});
	// relocate player to spawn point
	currentLevel.placeCharacter(p1, startingSpawn);
	// camera follows player
	camera.follow(p1);

    SetupPathfindingGridData(p1);
    // these next few lines set up our game logic and render to happen 30 times per second
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, deltaTime);

    initInput();


    // Added to support Tile Editor Mode
	setupTileButtons();
	if(!titleScreen){loadLevel(freshMap);} //can't find loadLevel used 
}

function moveEverything() {

	currentCtrl.update(updateCtx);
	/*
	if(titleScreen) {} 
	else if(editorMode) {}
	else
	{
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
		p1.move(updateCtx);
		currentLevel.update(updateCtx);
	}
	*/

	// update mouse
	UxMouse.instance.update(updateCtx);

	// update views
	viewSys.update(updateCtx);
	viewMgr.update(updateCtx);
}


function drawEverything() {


	/*
	if(titleScreen) {
		drawTitleScreen("black");
	} 
	if(!titleScreen && editorMode) {
		drawTitleScreen("blue"); 
		if (editorLvl) editorLvl.render(canvasContext);
	}
	if(!titleScreen && !editorMode)
	{
		// Wrapped in IF/ELSE to support Tile Editor Mode	
		canvasContext.translate(-camera.x, -camera.y);
		currentLevel.render(canvasContext);
		if(pathFindingDisplay){
			drawPathingFindingTiles();
	    }
		p1.draw();
		canvasContext.translate(camera.x, camera.y);
		
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

		for(var i = 0; i < p1.health; i++){
			var heartSpacing = 20;
			drawBitmapCenteredAtLocationWithRotation(props.getImage(TILE.HEART), 20 + (i*heartSpacing), 40, 0.0);
		}		
	}
	*/

	// render views
	viewMgr.render();
}