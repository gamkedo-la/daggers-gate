//export { daggerAssets };

const daggerAssets = [
    // { id: 0, src: "images/world_ground.png", cls: "Image", tag: "GROUND", },
    // { id: 1, src: "images/dungeonWall_8.png", cls: "Image", tag: "WALL_8", obstructs: true },
     { id: 2, src: "images/basicPlayerSprite-25.png", cls: "Image", tag: "PLAYER", },
     { id: 3, src: "images/world_goal.png", cls: "Image", tag: "GOAL", transparent: true },
     { id: 4, src: "images/world_key.png", cls: "Image", tag: "KEY", transparent: true },
    // { id: 5, src: "images/world_door.png", cls: "Image", tag: "DOOR", transparent: true },
    // { id: 6, src: "images/dungeonWall_1.png", cls: "Image", tag: "WALL_1", },
    // { id: 7, src: "images/dungeonWall_2.png", cls: "Image", tag: "WALL_2", },
    // { id: 8, src: "images/dungeonWall_3.png", cls: "Image", tag: "WALL_3", },
    // { id: 9, src: "images/dungeonWall_4.png", cls: "Image", tag: "WALL_4", },
    // { id: 10, src: "images/dungeonWall_5.png", cls: "Image", tag: "WALL_5", },
    // { id: 11, src: "images/dungeonWall_6.png", cls: "Image", tag: "WALL_6", },
    // { id: 12, src: "images/dungeonWall_7.png", cls: "Image", tag: "WALL_7", },

    // { id: 14, src: "images/dungeonWall_9.png", cls: "Image", tag: "WALL_9", },
    // { id: 15, src: "images/dungeonWall_10.png", cls: "Image", tag: "WALL_10", },
    // { id: 16, src: "images/dungeonWall_11.png", cls: "Image", tag: "WALL_11", },
    // { id: 17, src: "images/dungeonWall_12.png", cls: "Image", tag: "WALL_12", },
    // { id: 18, src: "images/dungeonWall_13.png", cls: "Image", tag: "WALL_13", },
    // { id: 19, src: "images/yellowDoor_front.png", cls: "Image", tag: "DOOR_YELLOW_FRONT", transparent: true },
    // { id: 20, src: "images/dungeonWall_14.png", cls: "Image", tag: "WALL_14", },

    // { id: 30, src: "images/goblin.png", cls: "Image", tag: "GOBLIN", transparent: true },
    // { id: 31, src: "images/dungeonWall_15.png", cls: "Image", tag: "WALL_15", },
    // { id: 32, src: "images/fireRune.png", cls: "Image", tag: "FIRE_RUNE", name: "Fire Rune", transparent: true },
    // { id: 33, src: "images/windRune.png", cls: "Image", tag: "WIND_RUNE", name: "Wind Rune", transparent: true },
    // { id: 34, src: "images/waterRune.png", cls: "Image", tag: "WATER_RUNE", name: "Water Rune", transparent: true },
    // { id: 35, src: "images/earthRune.png", cls: "Image", tag: "EARTH_RUNE", name: "Earth Rune", transparent: true },
    // { id: 36, src: "images/floorTileForFireRune.png", cls: "Image", tag: "FLOOR_FIRE_RUNE", transparent: true },
    // { id: 37, src: "images/floorTileForWaterRune.png", cls: "Image", tag: "FLOOR_WATER_RUNE", transparent: true },
    // { id: 38, src: "images/floorTileForWindRune.png", cls: "Image", tag: "FLOOR_WIND_RUNE", transparent: true },
    // { id: 39, src: "images/floorTileForEarthRune.png", cls: "Image", tag: "FLOOR_EARTH_RUNE", transparent: true },

    // { src: "images/spritesheet_Dungeon_01.png", cls: "Sheet", assets: [
    //     { id: 102, tag: "GREEN_GEM", cls: "Sprite",  width: 50, height: 50, xoffset: 50*4, yoffset: 50*2 },
    //     { id: 103, tag: "BLUE_GEM", cls: "Sprite",  width: 50, height: 50, xoffset: 50*5, yoffset: 50*2 },
    //     { id: 104, tag: "RED_GEM", cls: "Sprite",  width: 50, height: 50, xoffset: 50*6, yoffset: 50*2 },
    //     { id: 104, tag: "YELLOW_GEM", cls: "Sprite",  width: 50, height: 50, xoffset: 50*7, yoffset: 50*2 },
    // ]},

    { src: "images/spritesheet_Dungeon_01.png", cls: "Sheet", assets: [
        
        {tag: "GROUND",                 id: 10, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 0 },
        {tag: "GROUND_SPIKES_DOWN",     id: 11, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 0, passable: true },
        {tag: "GROUND_SPIKES_UP",       id: 12, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 0, passable: true },
        {tag: "WALL_BOTTOM",            id: 13, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 0 },
        {tag: "WALL_TOP",               id: 14, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 0 },
        {tag: "WALL_FLAG_BOTTOM",       id: 15, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 0 },
        {tag: "WALL_FLAG_TOP",          id: 16, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 0 },
        {tag: "CEIL_UPPER_LEFT",        id: 17, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 0 },
        {tag: "CEIL_UPPER_MID",         id: 18, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 0 },
        {tag: "CEIL_UPPER_RIGHT",       id: 19, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 0 },

        {tag: "CEIL_LEFT",              id: 20, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 50 },
        {tag: "CEIL_RIGHT",             id: 21, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 50 },
        {tag: "CEIL_LEFT_RIGHT",        id: 22, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 50 },
        {tag: "CEIL_LEFT_RIGHT_TOP",    id: 23, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 50 },
        {tag: "CEIL_TOP_BOTTOM",        id: 24, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 50 },
        {tag: "CEIL_EMPTY",             id: 25, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 50 },
        {tag: "DOOR_OPEN_TOP",          id: 26, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 50, passable: true },
        {tag: "DOOR_OPEN_BOTTOM",       id: 27, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 50, passable: true },
        {tag: "DOOR_CLOSE_TOP",         id: 28, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 50, swap: "DOOR_OPEN_TOP" },
        {tag: "DOOR_CLOSE_BOTTOM",      id: 29, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 50, swap: "DOOR_OPEN_BOTTOM", door: true },

        {tag: "DOOR_RIGHTSIDE_TOP",     id: 30, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 100, swap: "WALL_BOTTOM" },
        {tag: "DOOR_RIGHTSIDE_BOTTOM",  id: 31, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 100, door: true },
        {tag: "CHEST1_CLOSE",           id: 32, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 100, transparent: true},
        {tag: "CHEST1_OPEN",            id: 33, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 100, transparent: true },
        {tag: "GEM_WIND",               id: 34, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 100, transparent: true },
        {tag: "GEM_WATER",              id: 35, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 100, transparent: true },
        {tag: "GEM_FIRE",               id: 36, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 100, transparent: true },
        {tag: "GEM_EARTH",              id: 37, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 100, transparent: true },
        {tag: "ALTAR_WIND",             id: 38, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 100 },
        {tag: "ALTAR_WATER",            id: 39, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 100 },

        {tag: "ALTAR_FIRE",             id: 40, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 150 },
        {tag: "ALTAR_EARTH",            id: 41, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 150 },
        {tag: "ALTAR_GEM_WIND",         id: 42, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 150 },
        {tag: "ALTAR_GEM_WATER",        id: 43, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 150 },
        {tag: "ALTAR_GEM_FIRE",         id: 44, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 150 },
        {tag: "ALTAR_GEM_EARTH",        id: 45, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 150 },
        {tag: "DEADBONES",              id: 46, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 150 },
        {tag: "EMPTY1",                 id: 47, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 150, passable: true },
        {tag: "EMPTY2",                 id: 48, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 150 },
        {tag: "EMPTY3",                 id: 49, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 150 },

        {tag: "CEIL_UPPER_DOOR",        id: 50, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 0, passable: true },
    ]}


    //{ src: "src/audio/hover.mp3", cls: "Audio", tag: "hover" },
    /*
    { src: "src/img/human.png", cls: "Sheet", assets: [
        {tag: "human1", cls: "Sprite", width: 32, height: 32, xoffset: 32, yoffset: 32 },
        {tag: "human2", cls: "Sprite", width: 32, height: 32, xoffset: 32*6, yoffset: 32 },
        {tag: "human.walkf", cls: "Animation", cels: [
            { xoffset: 32*0, yoffset: 32*1, width: 32, height: 32, duration: 80 },
            { xoffset: 32*1, yoffset: 32*1, width: 32, height: 32, duration: 80 },
            { xoffset: 32*2, yoffset: 32*1, width: 32, height: 32, duration: 80 },
            { xoffset: 32*3, yoffset: 32*1, width: 32, height: 32, duration: 80 },
            { xoffset: 32*4, yoffset: 32*1, width: 32, height: 32, duration: 80 },
            { xoffset: 32*5, yoffset: 32*1, width: 32, height: 32, duration: 80 },
            { xoffset: 32*6, yoffset: 32*1, width: 32, height: 32, duration: 80 },
            { xoffset: 32*7, yoffset: 32*1, width: 32, height: 32, duration: 80 },
        ]},
    ]},
    { src: "src/img/bonfire.png", cls: "Sheet", assets: [
        {tag: "bonfire", cls: "Animation", cels: [
            { xoffset: 50*0, yoffset: 0, width: 50, height: 50, duration: 80 },
            { xoffset: 50*1, yoffset: 0, width: 50, height: 50, duration: 80 },
            { xoffset: 50*2, yoffset: 0, width: 50, height: 50, duration: 80 },
            { xoffset: 50*3, yoffset: 0, width: 50, height: 50, duration: 80 },
            { xoffset: 50*4, yoffset: 0, width: 50, height: 50, duration: 80 },
            { xoffset: 50*5, yoffset: 0, width: 50, height: 50, duration: 80 },
            { xoffset: 50*6, yoffset: 0, width: 50, height: 50, duration: 80 },
            { xoffset: 50*7, yoffset: 0, width: 50, height: 50, duration: 80 },
        ]},
    ]},
    */
];