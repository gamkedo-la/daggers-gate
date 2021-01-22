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
}

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
}