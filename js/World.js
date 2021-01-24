// world, room, and tile constants, variables
const ROOM_COLS = 16;
const ROOM_ROWS = 12;

var roomGrid =
    [ 11, 1, 1, 1, 1, 1,16, 1, 1, 1,16, 1,16, 1, 1, 9,
      11, 0, 0, 0, 0, 0,15, 0, 0, 0, 5, 0,15, 0, 0, 9,
      11, 0, 4, 0, 4, 0,15, 0, 2, 0,15, 0,15, 4, 4, 9,
      11, 0, 0, 0, 0, 0,15, 0, 0, 0,15,19, 1,19, 1, 9,
      11, 1,20,19,20, 1,14, 0, 4, 0,15, 0, 0, 0, 0, 9,
      11, 0, 0, 0, 0, 0, 0, 0, 0, 0,15, 0, 4, 0, 0, 9,
      11,30, 0, 0, 0, 0, 0,30, 0, 0,15, 0, 0, 0, 0, 9,
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
          checkTileType == TILE_DOOR);
}

function drawRoom() {
  var tileIndex = 0;
  var tileLeftEdgeX = 0;
  var tileTopEdgeY = 0;
  
  for(var eachRow=0; eachRow<ROOM_ROWS; eachRow++) { // deal with one row at a time
    
    tileLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) { // left to right in each row

      var tileTypeHere = roomGrid[ tileIndex ]; // getting the tile code for this index
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

var unexploredRoom_1 = true;
var room_1_x = 0;
var room_1_y = 0;
var room_1_Width = 6 * TILE_W;
var room_1_Length = 4 * TILE_H;

var unexploredRoom_2 = true;
var room_2_x = 11 * TILE_W - 20;
var room_2_y = 0 * TILE_H + 8;
var room_2_Width = 2 * TILE_W - 30;
var room_2_Length = 4 * TILE_H;

var unexploredRoom_3 = true;
var room_3_x = 11 * TILE_W - 20;
var room_3_y = 4 * TILE_H;
var room_3_Width = 5 * TILE_W;
var room_3_Length = 8 * TILE_H;

var unexploredRoom_4 = true;
var room_4_x = 11 * TILE_W - 20;
var room_4_y = 0 * TILE_H;
var room_4_Width = 5 * TILE_W - 30;
var room_4_Length = 4 * TILE_H;

var unexploredRoom_5 = true;
var room_5_x = 3 * TILE_W - 20;
var room_5_y = 7 * TILE_H + 8;
var room_5_Width = 2 * TILE_W+2;
var room_5_Length = 5 * TILE_H;

var unexploredRoom_6 = true;
var room_6_x = 5 * TILE_W - 20;
var room_6_y = 7 * TILE_H + 8;
var room_6_Width = 2 * TILE_W+2;
var room_6_Length = 5 * TILE_H;

var unexploredRoom_7 = true;
var room_7_x = 7 * TILE_W - 20;
var room_7_y = 7 * TILE_H + 8;
var room_7_Width = 4 * TILE_W+10;
var room_7_Length = 5 * TILE_H;

var unexploredRoom_8 = true;
var room_8_x = 13 * TILE_W - 40;
var room_8_y = 0 * TILE_H;
var room_8_Width = 3 * TILE_W+2;
var room_8_Length = 3 * TILE_H;


function playerExploredRooms(){
	console.log
	console.log(room_1_x, room_1_x + room_1_Width, room_1_y, room_1_y + room_1_Length);
	  
	if(p1.x > room_1_x && p1.x < room_1_x + room_1_Width && p1.y > room_1_y && p1.y < room_1_y + room_1_Length) {
		unexploredRoom_1 = false;
	}
	if( p1.x > room_2_x && p1.x < room_2_x + room_2_Width && p1.y > room_2_y && p1.y < room_2_y + room_2_Length){
		unexploredRoom_2 = false;
	}
	if(p1.x > room_3_x && p1.x < room_3_x + room_3_Width && p1.y > room_3_y && p1.y < room_3_y + room_3_Length){
		unexploredRoom_3 = false;
	}
	if(p1.x > room_4_x && p1.x < room_4_x + room_4_Width && p1.y > room_4_y && p1.y < room_4_y + room_4_Length){
		unexploredRoom_4 = false;
	}
	if(p1.x > room_5_x && p1.x < room_5_x + room_5_Width && p1.y > room_5_y && p1.y < room_5_y + room_5_Length){
		unexploredRoom_5 = false;
	}
	if(p1.x > room_6_x && p1.x < room_6_x + room_6_Width && p1.y > room_6_y && p1.y < room_6_y + room_6_Length){
		unexploredRoom_6 = false;
	}
	if(p1.x > room_7_x && p1.x < room_7_x + room_7_Width && p1.y > room_7_y && p1.y < room_7_y + room_7_Length){
		unexploredRoom_7 = false;
	}
	if(p1.x > room_8_x && p1.x < room_8_x + room_8_Width && p1.y > room_8_y && p1.y < room_8_y + room_8_Length){
		unexploredRoom_8 = false;
	}
	
}

function drawDungeonCeilings(){
	if(unexploredRoom_1){
		colorRect(room_1_x, room_1_y, room_1_Width+40, room_1_Length, '#243751');
	}
	if(unexploredRoom_2){
		colorRect(room_2_x, room_2_y, room_2_Width+40, room_2_Length, '#243751');		
	}
	if(unexploredRoom_3){	
		colorRect(room_3_x, room_3_y-5, room_3_Width+40, room_3_Length, '#243751');
		colorRect(room_3_x + TILE_W * 2 - 20, room_3_y - TILE_H, TILE_W*4, TILE_H, '#243751');
	}
	if(unexploredRoom_4){	
		colorRect(room_4_x + TILE_W * 2 - 20, room_4_y - TILE_H, room_4_Width, room_4_Length, '#243751');
	}
	if(unexploredRoom_5){	
		colorRect(room_5_x, room_5_y, room_5_Width, room_5_Length, '#243751');
		colorRect(room_5_x-20, room_5_y+TILE_H*3, TILE_W, TILE_H+5, '#243751');
	}
	if(unexploredRoom_6){	
		colorRect(room_6_x, room_6_y, room_6_Width, room_6_Length, '#243751');
		colorRect(room_6_x-20, room_6_y+TILE_H*3, TILE_W, TILE_H+5, '#243751');
	}
	if(unexploredRoom_7){	
		colorRect(room_7_x, room_7_y, room_7_Width, room_7_Length, '#243751');
		colorRect(room_7_x-20, room_7_y+TILE_H*3, TILE_W, TILE_H+5, '#243751');
	}
	if(unexploredRoom_8){	
		colorRect(room_8_x, room_8_y, room_8_Width, room_8_Length, '#243751');
	}
	
}