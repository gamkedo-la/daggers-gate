// world, room, and tile constants, variables

const gMaxLvlSize = 100;

var allLevels = {
  "lvl1": Object.assign(lvl1Spec, {
    exits: [
      { x: 15, y: 3, lvl: "lvl2", spawn: "lvl1" },
      { x: 8, y: 5, lvl: "town", spawn: "lvl1" },
    ],
    spawns: {
      "town": { x: 8, y: 4 },
      "lvl2": { x: 14, y: 3 },
    },
  }),

  "lvl2": Object.assign(lvl2Spec, {
    exits: [
      { x: 0, y: 3, lvl: "lvl1",            spawn: "lvl2" },
      { x: 5, y: 0, lvl: "testroom",        spawn: "lvl2" },
      { x: 2, y: 1, lvl: "temple_entryway", spawn: "lvl2" },
    ],
    spawns: {
      "lvl1":             { x: 1, y: 3 },
      "testroom":         { x: 5, y: 1 },
      "temple_entryway":  { x: 2, y: 3 },
    },
  }),

  "testroom": Object.assign(testroomSpec, {
    exits: [
      { x: 3, y: 6, lvl: "lvl2",    spawn: "testroom" },
    ],
    spawns: {
      "lvl2":   { x: 3, y: 5 },
    },
    lockPredicate: (lvl) => lvl.enemies.length !== 0,
  }),

  "temple_entryway": Object.assign(temple_entrywaySpec, {
      exits: [
        { x: 8, y: 12,  lvl: "churchCellar",      spawn: "temple_entryway" }, //leaves church to spawn in Temple Entryway
        { x: 3, y: 4,   lvl: "temple_area1",      spawn: "temple_entryway" },
      ],
      spawns: {
        "churchCellar":   { x: 8, y: 10 }, //Spawn location from Church Cellar
        "temple_area1":   { x: 3 , y: 5 },
      },
      //lockPredicate: (lvl) => lvl.enemies.length !== 0,
    }),

  "temple_area1": Object.assign(temple_area1Spec, {
      exits: [
        { x: 8, y: 14, lvl: "temple_entryway",   spawn: "temple_area1" }, //leaves Area1 to Temple Entryway
        { x: 8,  y: 1,  lvl: "temple_area1B",    spawn: "temple_area1"}
      ],
      spawns: {
        "temple_entryway":  { x: 8, y: 12 },
        "temple_area1B":  { x: 8, y: 2 },
        "house1": { x: 8, y: 12 },

      },
      //lockPredicate: (lvl) => lvl.enemies.length !== 0,
    }),

  "temple_area1B": Object.assign(temple_area1BSpec, {
      exits: [
        { x: 8, y: 14, lvl: "temple_area1",   spawn: "temple_area1" }, //leaves Area 1B to Area 1
      ],
      spawns: {
        "temple_area1":  { x: 8, y: 12 },
      },
    }),

  "town": Object.assign(townSpec, {
      exits: [
        { x: 8, y: 0, lvl: "lvl1",          spawn: "town" },
        { x: 31, y: 8, lvl: "alchemist",    spawn: "town" },
        { x: 33, y: 25, lvl: "fletcher",    spawn: "town" },
        { x: 21, y: 6, lvl: "healer",       spawn: "town" },
        { x: 32, y: 35, lvl: "house1",      spawn: "town" },
        { x: 18, y: 8, lvl: "house2",       spawn: "town" },
        { x: 17, y: 34, lvl: "house3",      spawn: "town" },
        { x: 12, y: 25, lvl: "tavern",      spawn: "town"},
        { x: 20, y: 25, lvl: "tavern",      spawn: "town2"},
        { x: 43, y: 11, lvl: "church",      spawn: "town"},

      ],
      spawns: {
        
        "alchemist":  { x: 31, y: 9 },
        "fletcher":   { x: 33, y: 26 },
        "healer":     { x: 21, y: 7 },
        "house1":     { x: 32, y: 36 },
        "house2":     { x: 18, y: 9 },
        "house3":     { x: 17, y: 35 },
        "tavern":     { x: 12, y: 26 },
        "tavern2":    { x: 20, y: 26 },
        "church":     { x: 43, y: 12 },
      },
  }),

  "house1": Object.assign(house1Spec, {
      exits: [
        { x: 4, y: 6, lvl: "town",    spawn: "house1" },
        { x: 1, y: 5, lvl: "temple_area1", spawn: "house1" },
      ],
      spawns: {
        "start":  { x: 2, y: 3 },
        "town":   { x: 4, y: 5 },
        "temple_area1": { x: 4, y: 5  }, // when spawning from temple_area1; spawn at door
      },
  }),

  "house2": Object.assign(house2Spec, {
    exits: [
      { x: 4, y: 5, lvl: "town",    spawn: "house2" },
    ],
    spawns: {
      "town":   { x: 4, y: 3 },
    },
}),
  "house3": Object.assign(house3Spec, {
  exits: [
    { x: 2, y: 4, lvl: "town",    spawn: "house3" },
  ],
  spawns: {
    "town":   { x: 2, y: 2 },
  },
}),
  "tavern": Object.assign(tavernSpec, {
  exits: [
    { x: 4, y: 8, lvl: "town",    spawn: "tavern" },
    { x: 9, y: 8, lvl: "town",    spawn: "tavern2" },
  ],
  spawns: {
    "town":   { x: 4, y: 5 },
    "town2":  { x: 9, y: 5 },
  },
}),
  "alchemist": Object.assign(alchemistSpec, {
      exits: [
        { x: 4, y: 8, lvl: "town",    spawn: "alchemist" },
      ],
      spawns: {
        "town":  { x: 4, y: 6 },
      },
  }),

  "fletcher": Object.assign(fletcherSpec, {
      exits: [
        { x: 4, y: 7, lvl: "town",    spawn: "fletcher" },
      ],
      spawns: {
        "town":  { x: 4, y: 6 },
      },
  }),

  "healer": Object.assign(healerSpec, {
      exits: [
        { x: 2, y: 4, lvl: "town",    spawn: "healer" },
      ],
      spawns: {
        "town":  { x: 2, y: 3 },
      },
  }),

  "church": Object.assign(churchSpec, {
      exits: [
        { x: 3, y: 11, lvl: "town",          spawn: "church" },
        { x: 1, y: 1, lvl: "churchCellar",  spawn: "church" },
      ],
      spawns: {
        "town":  { x: 3, y: 10 },
        "churchCellar":  { x: 1, y: 2 },
      },
  }),

  "churchCellar": Object.assign(churchCellarSpec, {
      exits: [
        { x: 3, y: 8, lvl: "church",            spawn: "churchCellar" },
        { x: 3, y: 0, lvl: "temple_entryway",   spawn: "churchCellar" },
      ],
      spawns: {
        "church":           { x: 3, y: 7 },
        "temple_entryway":  { x: 3, y: 1 },
      },
  }),

}
//var startingLevel = "lvl1";
//var startingSpawn = "town";
var startingLevel = "house1";
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