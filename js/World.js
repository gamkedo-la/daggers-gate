// world, room, and tile constants, variables
const ROOM_COLS = 16;
const ROOM_ROWS = 12;

var roomGrid =
    [ 11, 1, 1, 1, 1, 1,16, 1, 1, 1,16, 1,16, 1, 1, 9,
      11,34, 0, 0, 0, 0,15,36, 0,37, 5, 0,15,35, 0, 9,
      11, 0, 4, 0, 4, 0,15, 0, 2, 0,15, 0,15, 4, 4, 9,
      11, 0, 0, 0, 0, 0,15, 0, 0, 0,15,19, 1,19, 1, 9,
      11, 1,20,19,20, 1,14, 0, 4, 0,15, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0,30, 0, 0,15, 0, 4, 0, 0, 9,
      11,30, 0, 0, 0, 0, 0,38, 0,39,15, 0, 0, 0, 0, 9,
      11, 0,16, 1,16, 1,16, 1, 1, 1,15, 0, 4, 0, 0, 9,
      11, 0,15, 0,15, 0,15,33, 0,32,15, 0, 0, 0, 0, 9,
      11, 0, 5, 0, 5, 0, 5, 0, 3, 0,15, 0, 0, 0, 0, 9,
      11, 0,15, 0,15, 0,15, 0, 0, 0,15, 0, 0, 0, 0, 9,
      17, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,18];

const TILE_W = 50;
const TILE_H = 50;

const TILE_GROUND = 0;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_DOOR = 5;
const TILE_WALL_1 = 6;
const TILE_WALL_2 = 7;
const TILE_WALL_3 = 8;
const TILE_WALL_4 = 9;
const TILE_WALL_5 = 10;
const TILE_WALL_6 = 11;
const TILE_WALL_7 = 12;
const TILE_WALL_8 = 1;
const TILE_WALL_9 = 14;
const TILE_WALL_10 = 15;
const TILE_WALL_11 = 16;
const TILE_WALL_12 = 17;
const TILE_WALL_13 = 18;
const TILE_WALL_14 = 20;
const TILE_KEY = 4;
const TILE_DOOR_YELLOW_FRONT = 19;
const TILE_ENEMY = 30;
const TILE_WALL_15 = 31;
const TILE_FIRE_RUNE = 32;
const TILE_WIND_RUNE = 33;
const TILE_WATER_RUNE = 34;
const TILE_EARTH_RUNE = 35;
const TILE_FLOOR_FIRE_RUNE = 36;
const TILE_FLOOR_WIND_RUNE = 37;
const TILE_FLOOR_WATER_RUNE = 38;
const TILE_FLOOR_EARTH_RUNE = 39;

function roomTileToIndex(tileCol, tileRow) {
  return (tileCol + ROOM_COLS*tileRow);
}

function getTileIndexAtPixelCoord(pixelX,pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the tile coords fall within valid bounds
  if(tileCol < 0 || tileCol >= ROOM_COLS ||
     tileRow < 0 || tileRow >= ROOM_ROWS) {
     document.getElementById("debugText").innerHTML = "out of bounds:"+pixelX+","+pixelY;
     return undefined;
  }
  
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}

function tileTypeHasTransparency(checkTileType) {
  return (checkTileType == TILE_GOAL ||
          checkTileType == TILE_KEY ||
		  checkTileType == TILE_DOOR_YELLOW_FRONT ||
          checkTileType == TILE_FLOOR_FIRE_RUNE ||
          checkTileType == TILE_FLOOR_WATER_RUNE ||
		  checkTileType == TILE_FLOOR_WIND_RUNE ||
	      checkTileType == TILE_FLOOR_EARTH_RUNE ||
		  checkTileType == TILE_DOOR);
}

//Draws Black "Title Screen"
function drawTitleScreen(color) {
  colorRect(0,0, canvas.width,canvas.height, color)
  customText("Dagger's", 200, 200, 'white', 100, 'Garamond')
  customText("Gate", 250, 280, 'white', 100, 'Garamond')
  customText("© HomeTeam Gamedev 2021", 300, 550, 'white', 12, 'monospace')
  customText("Press the -SPACEBAR- to Begin", 270, 450, 'yellow', 12, 'monospace')
  customText("Press  -9-  to go into EDITOR MODE", 270, 480, 'yellow', 12, 'monospace')
  //customText(showWords, textX,textY, fillColor, textSize, fontStyle)
}


function drawRoom(whichRoom) {
  var tileIndex = 0;
  var tileLeftEdgeX = 0;
  var tileTopEdgeY = 0;
  
  for(var eachRow=0; eachRow<ROOM_ROWS; eachRow++) { // deal with one row at a time
    
    tileLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) { // left to right in each row

      var tileTypeHere = whichRoom[ tileIndex ]; // getting the tile code for this index
      if( tileTypeHasTransparency(tileTypeHere) ) {
        canvasContext.drawImage(tilePics[TILE_GROUND], tileLeftEdgeX, tileTopEdgeY);
      }
      canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);
      
      tileIndex++; // increment which index we're going to next check for in the room
      tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    
    tileTopEdgeY += TILE_H; // jump horizontal draw position down by one full tile height
    
  } // end of for eachRow    
} // end of drawRoom()

