// world, room, and tile constants, variables

// world level specifications
var lvl1Spec = {
  name: "lvl1",
  width: 16,
  height: 12,
  exits: [
    { x: 15, y: 3, lvl: "lvl2", spawn: "fromlvl1" },
  ],
  enemies: [],
  spawns: {
    "start": { x: 8, y: 5 },
    "fromlvl2": { x: 14, y: 3 },
  },
  rooms:[
        0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  2,  2,  2,  2,  0,
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
        0, 10, 10, 10,  0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        0,  0, 10, 10,  0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,  0,
        0, 10, 10, 10, 10, 10, 10, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10, 10, 10, 10, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10,  0,  0,  0,  0,  0,  0,  0,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10,  0, 10,  0, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10,  0, 10,  0, 10, 10, 10,  0, 10, 10, 10, 10,  0,
        0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ],
  fg:[ 21, 13, 13, 13, 22, 13, 13, 13, 13, 13, 22, 13, 13, 13, 13, 20, 
       21,  0, 32, 99, 22, 64,  0,  0,  0, 50, 22,109,  0, 34, 64, 20, 
       21,  0,  0,  0, 22,  0,  0,  0,  0,  0, 30,  0,  0,  0,  0, 20, //30
       21, 18, 65, 18, 21,  0,  0,  0,  0,  0, 31,  0,  0,  0,  0,  0, //31
       21, 15, 28, 15, 14, 12, 11,  0,  0,  4, 23,  0,  0,  0,  0, 20, 
       21, 16, 29, 16, 13, 11, 11,  0,  0,  0, 20, 19, 12, 11, 17, 25, 
       21,  0,  0,  0,  0,  0,  0,  0,  0,  0, 22, 14, 46, 12, 14, 20, 
       25, 18, 65, 18, 18, 18, 18, 18, 18, 18, 21, 13, 12, 11, 13, 20, 
       21, 14, 26, 14, 22, 14, 22, 14, 14, 14, 22,  0,  0,  0,  4, 20, 
       21, 13, 27, 13, 30, 13, 30, 13, 13, 13, 22,  0,  0,  0,  0, 20, 
       21,  4,  0,  0, 31, 11, 31, 12,  0, 37, 22,  0, 38, 41,  0, 20, 
       25, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 25,
  ],
};

var lvl2Spec = {
  name: "lvl2",
  width: 20,
  height: 16,
  exits: [
    { x: 0, y: 3, lvl: "lvl1", spawn: "fromlvl2" },
  ],
  spawns: {
    "fromlvl1": { x: 1, y: 3 },
  },
  rooms:[
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  ],
  bg:[  10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  ],
  fg:[  21, 13, 13, 13, 22, 13, 13, 13, 13, 13, 22, 13, 13, 13, 13, 13, 13, 13, 13, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        25, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 25,
  ],
};

var allLevels = {
  "lvl1": lvl1Spec,
  "lvl2": lvl2Spec,
}
var startingLevel = "lvl1";
var startingSpawn = "start";

const TILE_W = 50;
const TILE_H = 50;

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