//export { daggerAssets };

const daggerAssets = [

     { id: 1, src: "images/heart.png", cls: "Image", width: 10, height: 50, xoffset: 25, yoffset: 0, tag: "HEART"}, 
     //{ id: 2, src: "images/basicPlayerSprite-25.png", cls: "Image", tag: "PLAYER", pathFindingWalkable: true },
     { id: 3, src: "images/world_goal.png", cls: "Image", tag: "GOAL", transparent: true, pathFindingWalkable: true},
     { id: 4, src: "images/world_key.png", cls: "Image", tag: "KEY", transparent: true, pathFindingWalkable: true },

    { src: "images/spritesheet_Dungeon_01.png", cls: "Sheet", assets: [
        
        {tag: "GROUND",                 id: 10, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 0, pathFindingWalkable: true },
        {tag: "GROUND_SPIKES_DOWN",     id: 11, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 0, passable: true, pathFindingWalkable: true },
        {tag: "GROUND_SPIKES_UP",       id: 12, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 0, passable: true, pathFindingWalkable: true },
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
        {tag: "DOOR_OPEN_TOP",          id: 26, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 50, passable: true, pathFindingWalkable: true },
        {tag: "DOOR_OPEN_BOTTOM",       id: 27, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 50, passable: true, pathFindingWalkable: true },
        {tag: "DOOR_CLOSE_TOP",         id: 28, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 50, swap: "DOOR_OPEN_TOP" },
        {tag: "DOOR_CLOSE_BOTTOM",      id: 29, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 50, swap: "DOOR_OPEN_BOTTOM", door: true },

        {tag: "DOOR_RIGHTSIDE_TOP",     id: 30, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 100, swap: "WALL_BOTTOM" },
        {tag: "DOOR_RIGHTSIDE_BOTTOM",  id: 31, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 100, door: true },
        {tag: "CHEST1_CLOSE",           id: 32, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 100, transparent: true},
        {tag: "CHEST1_OPEN",            id: 33, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 100, transparent: true },
        {tag: "CHEST2_CLOSE",           id: 34, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 100, transparent: true },
        {tag: "GEM_WIND",               id: 35, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 100, transparent: true, pathFindingWalkable: true },
        {tag: "GEM_WATER",              id: 36, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 100, transparent: true, pathFindingWalkable: true },
        {tag: "GEM_FIRE",               id: 37, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 100, transparent: true, pathFindingWalkable: true },
        {tag: "GEM_EARTH",              id: 38, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 100, transparent: true, pathFindingWalkable: true },
        {tag: "ALTAR_WIND",             id: 39, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 100 },

        {tag: "ALTAR_WATER",            id: 40, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 150 },
        {tag: "ALTAR_FIRE",             id: 41, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 150 },
        {tag: "ALTAR_EARTH",            id: 42, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 150 },
        {tag: "ALTAR_GEM_WIND",         id: 43, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 150 },
        {tag: "ALTAR_GEM_WATER",        id: 44, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 150 },
        {tag: "ALTAR_GEM_FIRE",         id: 45, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 150 },
        {tag: "ALTAR_GEM_EARTH",        id: 46, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 150 },
        {tag: "DEADBONES",              id: 47, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 150, passable: true },
        {tag: "EMPTY2",                 id: 48, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 150 },
        {tag: "EMPTY3",                 id: 49, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 150 },

        {tag: "CEIL_UPPER_DOOR",        id: 50, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 0, passable: true },
    ]},

    { src: "images/player.png", cls: "Sheet", assets: [
        {tag: "PLAYER",                 id: 60, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 0 },
        {tag: "PLAYER_BACK",            id: 61, cls: "Sprite", width: 50, height: 100, xoffset: 50, yoffset: 0 },
        {tag: "PLAYER_LEFT",            id: 62, cls: "Sprite", width: 50, height: 100, xoffset: 100, yoffset: 0 },
        {tag: "PLAYER_RIGHT",           id: 63, cls: "Sprite", width: 50, height: 100, xoffset: 150, yoffset: 0 },
    ]},

    { id: 100, src: "images/basicPlayerSprite-25.png", cls: "Image", tag: "TESTENEMY", enemy: true },

];