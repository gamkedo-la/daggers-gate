// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();
var pathFindingDisplay = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    SetupPathfindingGridData(p1);
    loadImages();
	for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_ENEMY){
			addEnemy();
		} 
		if (roomGrid[i] == TILE_FIRE_RUNE){
			addObject('fireRune');
		}
		if (roomGrid[i] == TILE_WIND_RUNE){
			addObject('windRune');
		}
		if (roomGrid[i] == TILE_WATER_RUNE){
			addObject('waterRune');
		}
		if (roomGrid[i] == TILE_EARTH_RUNE){
			addObject('earthRune');
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
		gameObjectList[i].init(fireRunePic, "red");
	}
    initInput();
}

function moveEverything() {
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
		p1.checkCollisionAgainst(gameObjectList[i]);
	}
	
	playerExploredRooms();
}

var framesToDisplayMessage = 800;

function drawEverything() {
	
    drawRoom();
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
	drawDungeonCeilings();
	
	if(framesToDisplayMessage-- > 600){
		colorText("HELPER CODE", 500, 400, fillColor = "black", font = "26px Arial Black");
		colorText("'1' : Toggles Pathfinding Display", 500, 450, fillColor = "black", font = "14px Arial Black");
		colorText("'2' : Toggles Collision Boxes Display", 500, 500, fillColor = "black", font = "14px Arial Black");
		colorText("'3' : Toggles Room Numbers Display", 500, 550, fillColor = "black", font = "14px Arial Black");		
	} else if (framesToDisplayMessage < 600 && framesToDisplayMessage > 300){ 	
		colorText("Player Movements", 500, 400, fillColor = "black", font = "26px Arial Black");
		colorText("'W' : Move Up", 500, 450, fillColor = "black", font = "14px Arial Black");
		colorText("'A' : Move Left", 500, 475, fillColor = "black", font = "14px Arial Black");
		colorText("'S' : Move Down", 500, 500, fillColor = "black", font = "14px Arial Black");
		colorText("'D' : Move Right", 500, 525, fillColor = "black", font = "14px Arial Black");		
		colorText("'Left Click' : Player uses pathfinding", 500, 550, fillColor = "black", font = "14px Arial Black");
		colorText("to that location", 500, 575, fillColor = "black", font = "14px Arial Black");		
	} else if (framesToDisplayMessage < 250 && framesToDisplayMessage > 0){ 	
		colorText("USE KEYS TO FIND THE TREASURE", 400, 400, fillColor = "black", font = "14px Arial Black");
	}
}