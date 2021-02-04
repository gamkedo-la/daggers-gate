// world, room, and tile constants, variables
const ROOM_COLS = 16;
const ROOM_ROWS = 12;

var lvl1Spec = {
  width: 16,
  height: 12,
  rooms:[
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  2,  0,
        0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  2,  0,
        0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  2,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  2,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  2,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  2,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  2,  0,
        0,  3,  3,  3,  3,  4,  4,  5,  5,  5,  0,  2,  2,  2,  2,  0,
        0,  3,  3,  3,  3,  4,  4,  5,  5,  5,  0,  2,  2,  2,  2,  0,
        0,  3,  3,  3,  3,  4,  4,  5,  5,  5,  0,  2,  2,  2,  2,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ],
  bg:[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0, 10, 10, 10,  0, 10, 10, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10,  0, 10, 10, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10,  0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,  0,
        0,  0,  0, 10,  0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,  0,
        0, 10, 10, 10, 10, 10, 10, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10, 10, 10, 10, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10,  0,  0,  0,  0,  0,  0,  0,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10,  0, 10,  0, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10,  0, 10,  0, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ],
  fg:[ 21, 13, 13, 13, 22, 13, 13, 13, 13, 13, 22, 13, 13, 13, 13, 20, 
       21,  0, 32,  0, 22,  0,  0,  2,  0,  0, 22,  0,  0, 34,  0, 20, 
       21,  0,  0,  0, 22,  0,  0,  0,  0,  0, 30,  0,  0,  0,  0, 20, 
       21, 18, 50, 18, 21,  0,  0,  0,  0,  0, 31,  0,  0,  0,  0, 20, 
       21, 15, 28, 15, 14, 12, 11,  0,  0,  4, 23,  0,  0,  0,  0, 20, 
       21, 16, 29, 16, 13, 11, 11,  0,  0,  0, 20, 19, 12, 11, 17, 25, 
       21,  0,  0,  0,  0,  0,  0,  0,  0,  0, 22, 14, 46, 12, 14, 20, 
       25, 18, 50, 18, 18, 18, 18, 18, 18, 18, 21, 13, 12, 11, 13, 20, 
       21, 14, 26, 14, 22, 14, 22, 14, 14, 14, 22,  0,  0,  0,  4, 20, 
       21, 13, 27, 13, 30, 13, 30, 13, 13, 13, 22,  0,  0,  0,  0, 20, 
       21,  4,  0,  0, 31, 11, 31, 12,  0, 37, 22,  0, 38, 41,  0, 20, 
       25, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 25,
  ],

}
// var roomGrid =   RIP
//     [ 11, 1, 1, 1, 1, 1,16, 1, 1, 1,16, 1,16, 1, 1, 9,
//       11,33,34,35,32, 0,15,36, 0,37, 5, 0,15, 0, 0, 9,
//       11, 0, 4, 0, 4, 0,15, 0, 2, 0,15, 0,15, 4, 4, 9,
//       11, 0, 0, 0, 0, 0,15, 0, 0, 0,15,19, 1,19, 1, 9,
//       11, 1,20,19,20, 1,14, 0, 4, 0,15, 0, 0, 0, 0, 9,
//       11,36,37,38,39, 0, 0,30, 0, 0,15, 0, 4, 0, 0, 9,
//       11,30, 0, 0, 0, 0, 0,38, 0,39,15, 0, 0, 0, 0, 9,
//       11, 0,16, 1,16, 1,16, 1, 1, 1,15, 0, 4, 0, 0, 9,
//       11, 0,15, 0,15, 0,15, 0, 0, 0,15, 0, 0, 0, 0, 9,
//       11, 0, 5, 0, 5, 0, 5, 0, 3, 0,15, 0, 0, 0, 0, 9,
//       11, 0,15, 0,15, 0,15, 0, 0, 0,15, 0, 0, 0, 0, 9,
//       17, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,18];

/*
var roomGrid =
    [ 21, 13, 13, 13, 22, 13, 13, 13, 13, 13, 22, 13, 13, 13, 13, 20, 
      21, 10, 32, 10, 22, 10, 10,  2, 10, 10, 22, 10, 10, 34, 10, 20, 
      21, 10, 10, 10, 22, 10, 10, 10, 10, 10, 30, 10, 10, 10, 10, 20, 
      21, 18, 18, 18, 21, 10, 10, 10, 10, 10, 31, 10, 10, 10, 10, 20, 
      21, 15, 28, 15, 14, 12, 11, 10, 10,  4, 23, 10, 10, 10, 10, 20, 
      21, 16, 29, 16, 13, 11, 11, 10, 10, 10, 20, 19, 12, 11, 17, 25, 
      21, 10, 10, 10, 10, 10, 10, 10, 10, 10, 22, 14, 46, 12, 14, 20, 
      25, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 13, 12, 11, 13, 20, 
      21, 14, 26, 14, 22, 14, 22, 14, 14, 14, 22, 10, 10, 10,  4, 20, 
      21, 13, 27, 13, 30, 13, 30, 13, 13, 13, 22, 10, 10, 10, 10, 20, 
      21,  4, 10, 10, 31, 11, 31, 12, 10, 37, 22, 10, 38, 41, 10, 20, 
      25, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 25 ]
      */

const TILE_W = 50;
const TILE_H = 50;

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
      // handle transparency by drawing ground tile first
      if (props.isTransparent(tileTypeHere)) {
        let groundSprite = props.getImage(TILE.GROUND);
        if (groundSprite) groundSprite.render(canvasContext, tileLeftEdgeX, tileTopEdgeY);
      }
      let sprite = props.getImage(tileTypeHere);
      if (sprite) sprite.render(canvasContext, tileLeftEdgeX, tileTopEdgeY);
      
      tileIndex++; // increment which index we're going to next check for in the room
      tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    
    tileTopEdgeY += TILE_H; // jump horizontal draw position down by one full tile height
    
  } // end of for eachRow    
} // end of drawRoom()

