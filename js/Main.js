// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();
var pathFindingDisplay = false;

// Added to support Tile Editor Mode
var titleScreen = true;
var editorMode = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    SetupPathfindingGridData(p1);
    loadImages();
	for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_ENEMY){
			addEnemy();
		} 
		if (roomGrid[i] == TILE_FIRE_RUNE ||
			roomGrid[i] == TILE_WIND_RUNE ||		
			roomGrid[i] == TILE_WATER_RUNE ||
			roomGrid[i] == TILE_EARTH_RUNE){
				addObject();
		}
	}
}

function loadingDoneSoStartGame() {
    // these next few lines set up our game logic and render to happen 30 times per second
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    p1.init(playerPic, "Blue");
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].init(goblinPic, "red");
	}
	for(var i = 0; i < gameObjectList.length; i++){
		gameObjectList[i].init('fireRune');
		console.log("Add Object");
	}

    initInput();


    // Added to support Tile Editor Mode
	setupTileButtons();
	if(!titleScreen){loadLevel(freshMap);}
}

function moveEverything() {

	if(titleScreen) {} 
	else if(editorMode) {}
	else
	{
		// Wrapped in IF/ELSE to support Tile Editor Mode	
		//movement
		p1.move();
		for(var i = 0; i < enemyList.length; i++){
			enemyList[i].move();
		}
		for(var i = 0; i < gameObjectList.length; i++){
			gameObjectList[i].move();
		}


		//collisions
		/*for(var i = 0; i < enemyList.length; i++){
			for (var ii = i+1; ii < enemyList.length; i++){
				enemyList[i].checkCollisionAgainst(enemyList[ii]);
			}
		}*/
		for(var i = 0; i < enemyList.length; i++){
			enemyList[i].checkCollisionAgainst(p1);
		}
		for(var i = 0; i < enemyList.length; i++){
			p1.checkCollisionAgainst(enemyList[i]);
		}
		for(var i = 0; i < gameObjectList.length; i++){
			gameObjectList[i].checkCollisionAgainst(p1);
		}
		
		room_0.playerExploredRooms();
		room_1.playerExploredRooms(); 
		room_2.playerExploredRooms();
		room_3.playerExploredRooms();
		room_4.playerExploredRooms();
		room_5.playerExploredRooms();
		room_6.playerExploredRooms();
	}
}

var framesToDisplayMessage = 800;

function drawEverything() {


	if(titleScreen) {
		console.log("title screen")
		drawTitleScreen("black");
	} 
	if(!titleScreen && editorMode) {
		console.log("editor mode")
		drawTitleScreen("blue");
		// loadLevel(freshMap)
		drawRoom(cleanMap);
	}
	if(!titleScreen && !editorMode)
	{
		// Wrapped in IF/ELSE to support Tile Editor Mode	
	    drawRoom(roomGrid);
		if(pathFindingDisplay){
			drawPathingFindingTiles();
	    }
		p1.draw();
		for(var i = 0; i < enemyList.length; i++){
			enemyList[i].draw();
		}
		for(var i = 0; i < gameObjectList.length; i++){
			gameObjectList[i].draw();
		}
		room_0.draw();
		room_1.draw(); 
		room_2.draw();
		room_3.draw();
		room_4.draw();
		room_5.draw();
		room_6.draw();
		
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
	}
}