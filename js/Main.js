// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1;
var pathFindingDisplay = false;
var cheatSeeThroughCeiling = true;
var disableCollisions = false;
// enable global debug to allow key bindings cheats
var globalDebug = false;

// Font definitions
fontDefault = "Texturina";
fontTitle = "Texturina";
fontMenu = "Texturina";
// override font default in Font class
Font.dfltFamily = fontDefault;

// Added to support Tile Editor Mode
var titleScreen = true;

var assets = new Assets({
	refs: daggerAssets,
	//dbg: true,
});
// FIXME: remove after we have real sword
//assets._items.add(Object.assign({tag: "SWORD", id: 999, tileset: true}, swordSpec));

var loaders = [ 
	assets,
];
var props;
var currentLevel;

// global quest state
var quests = Quests.instance;
// global particle state
var particles = ParticleSystem.instance;

// controller system
var ctrlSys = new UxCtrlSys();
var queuedExit;
var framesToDisplayMessage = 800;
var levelLoader = new LevelLoader({
	lvls: allLevels,
	// FYI: uncomment to disable enemies in maps
	//dbgNoEnemy: true,
	dbg: true,
});
var framesPerSecond = 30;
var deltaTime = 1000/framesPerSecond;
var updateCtx = {
	deltaTime: deltaTime,
}
var camera = new Camera({
	width: 800,
	height: 600,
	//dbg: true,
});

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
	DaggerAssets.init();
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
	//viewMgr = new ViewMgr({dbg: true});
	viewMgr = new ViewMgr();
	viewSys = new ViewSystem({vmgr: viewMgr});
	// load starting level
	levelLoader.load(startingLevel);

	// setup ux controller
	ctrlSys.assign(new UxTitleCtrl());

	// instantiate player
	p1 = new warriorClass({
		sketch: animators["PLAYER"],
		name: "Player",
	});
	p1.reset(true)
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
	if(!titleScreen){loadLevel(freshMap);} //can't find loadLevel used 
}

function moveEverything() {

	// pass control to current UI controller
	if(ctrlSys.current) ctrlSys.current.update(updateCtx);

	// update mouse
	UxMouse.instance.update(updateCtx);

	// update views
	viewSys.update(updateCtx);
	viewMgr.update(updateCtx);
}

function drawEverything() {
	// render views
	viewMgr.render();
}