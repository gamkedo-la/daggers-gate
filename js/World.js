// world, room, and tile constants, variables

const gMaxLvlSize = 100;

var allLevels = {
  "lvl1": Object.assign(lvl1Spec, {
    exits: [
      { x: 15, y: 3, lvl: "lvl2", spawn: "fromlvl1" },
    ],
    spawns: {
      "start": { x: 8, y: 5 },
      "fromlvl2": { x: 14, y: 3 },
    },
  }),
  "lvl2": Object.assign(lvl2Spec, {
    exits: [
      { x: 0, y: 3, lvl: "lvl1", spawn: "fromlvl2" },
    ],
    spawns: {
      "fromlvl1": { x: 1, y: 3 },
    },
  }),
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