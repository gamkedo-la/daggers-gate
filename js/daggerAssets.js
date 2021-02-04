//export { daggerAssets };

const daggerAssets = [
    { id: 1, src: "images/world_ground.png", cls: "Image", tag: "GROUND", },
    { id: 2, src: "images/basicPlayerSprite-25.png", cls: "Image", tag: "PLAYER", },
    { id: 3, src: "images/world_goal.png", cls: "Image", tag: "GOAL", transparent: true },
    { id: 4, src: "images/world_key.png", cls: "Image", tag: "KEY", transparent: true },
    { id: 5, src: "images/world_door.png", cls: "Image", tag: "DOOR", transparent: true },
    { id: 6, src: "images/dungeonWall_1.png", cls: "Image", tag: "WALL_1", },
    { id: 7, src: "images/dungeonWall_2.png", cls: "Image", tag: "WALL_2", },
    { id: 8, src: "images/dungeonWall_3.png", cls: "Image", tag: "WALL_3", },
    { id: 9, src: "images/dungeonWall_4.png", cls: "Image", tag: "WALL_4", },
    { id: 10, src: "images/dungeonWall_5.png", cls: "Image", tag: "WALL_5", },
    { id: 11, src: "images/dungeonWall_6.png", cls: "Image", tag: "WALL_6", },
    { id: 12, src: "images/dungeonWall_7.png", cls: "Image", tag: "WALL_7", },

    { id: 13, src: "images/dungeonWall_8.png", cls: "Image", tag: "WALL_8", obstructs: true },

    { id: 14, src: "images/dungeonWall_9.png", cls: "Image", tag: "WALL_9", },
    { id: 15, src: "images/dungeonWall_10.png", cls: "Image", tag: "WALL_10", },
    { id: 16, src: "images/dungeonWall_11.png", cls: "Image", tag: "WALL_11", },
    { id: 17, src: "images/dungeonWall_12.png", cls: "Image", tag: "WALL_12", },
    { id: 18, src: "images/dungeonWall_13.png", cls: "Image", tag: "WALL_13", },
    { id: 19, src: "images/yellowDoor_front.png", cls: "Image", tag: "DOOR_YELLOW_FRONT", transparent: true },
    { id: 20, src: "images/dungeonWall_14.png", cls: "Image", tag: "WALL_14", },

    { id: 30, src: "images/goblin.png", cls: "Image", tag: "GOBLIN", transparent: true, enemy: true },
    { id: 31, src: "images/dungeonWall_15.png", cls: "Image", tag: "WALL_15", },
    { id: 32, src: "images/fireRune.png", cls: "Image", tag: "FIRE_RUNE", name: "Fire Rune", transparent: true },
    { id: 33, src: "images/windRune.png", cls: "Image", tag: "WIND_RUNE", name: "Wind Rune", transparent: true },
    { id: 34, src: "images/waterRune.png", cls: "Image", tag: "WATER_RUNE", name: "Water Rune", transparent: true },
    { id: 35, src: "images/earthRune.png", cls: "Image", tag: "EARTH_RUNE", name: "Earth Rune", transparent: true },
    { id: 36, src: "images/floorTileForFireRune.png", cls: "Image", tag: "FLOOR_FIRE_RUNE", transparent: true },
    { id: 37, src: "images/floorTileForWaterRune.png", cls: "Image", tag: "FLOOR_WATER_RUNE", transparent: true },
    { id: 38, src: "images/floorTileForWindRune.png", cls: "Image", tag: "FLOOR_WIND_RUNE", transparent: true },
    { id: 39, src: "images/floorTileForEarthRune.png", cls: "Image", tag: "FLOOR_EARTH_RUNE", transparent: true },

    { src: "images/spritesheet_Dungeon_01.png", cls: "Sheet", assets: [
        { id: 102, tag: "GREEN_GEM", cls: "Sprite",  width: 50, height: 50, xoffset: 50*4, yoffset: 50*2 },
        { id: 103, tag: "BLUE_GEM", cls: "Sprite",  width: 50, height: 50, xoffset: 50*5, yoffset: 50*2 },
        { id: 104, tag: "RED_GEM", cls: "Sprite",  width: 50, height: 50, xoffset: 50*6, yoffset: 50*2 },
        { id: 104, tag: "YELLOW_GEM", cls: "Sprite",  width: 50, height: 50, xoffset: 50*7, yoffset: 50*2 },
    ]},


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