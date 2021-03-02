//export { daggerAssets };

const _meleeFrameDuration = 40;

const animators = {
    "PLAYER": {
        cls: "Animator",
        animations: {
            [Animator.idle]: "PLAYER",
            [Animator.idleSouth]: "PLAYER",
            [Animator.idleNorth]: "PLAYER_IDLE_NORTH",
            [Animator.idleWest]: "PLAYER_IDLE_WEST",
            [Animator.idleEast]: "PLAYER_IDLE_EAST",
            [Animator.walkSouth]: "PLAYER_WALK_SOUTH",
            [Animator.walkNorth]: "PLAYER_WALK_NORTH",
            [Animator.walkWest]: "PLAYER_WALK_WEST",
            [Animator.walkEast]: "PLAYER_WALK_EAST",
            [Animator.attackSouth]: "PLAYER_MELEE_SOUTH",
            [Animator.attackNorth]: "PLAYER_MELEE_NORTH",
            [Animator.attackWest]: "PLAYER_MELEE_WEST",
            [Animator.attackEast]: "PLAYER_MELEE_EAST",
        },
    },
    "GOBLIN": {
        cls: "Animator",
        animations: {
            [Animator.idle]: "GOBLIN",
            [Animator.idleSouth]: "GOBLIN",
            [Animator.idleNorth]: "GOBLIN_IDLE_NORTH",
            [Animator.idleWest]: "GOBLIN_IDLE_WEST",
            [Animator.idleEast]: "GOBLIN_IDLE_EAST",
            [Animator.walkSouth]: "GOBLIN_WALK_SOUTH",
            [Animator.walkNorth]: "GOBLIN_WALK_NORTH",
            [Animator.walkWest]: "GOBLIN_WALK_WEST",
            [Animator.walkEast]: "GOBLIN_WALK_EAST",
        }
    },
    "SLIME": {
        cls: "Animator",
        animations: {
            [Animator.idle]: "SLIME",
            [Animator.idleSouth]: "SLIME",
            [Animator.idleNorth]: "SLIME_IDLE_NORTH",
            [Animator.idleWest]: "SLIME_IDLE_WEST",
            [Animator.idleEast]: "SLIME_IDLE_EAST",
            [Animator.walkSouth]: "SLIME_WALK_SOUTH",
            [Animator.walkNorth]: "SLIME_WALK_NORTH",
            [Animator.walkWest]: "SLIME_WALK_WEST",
            [Animator.walkEast]: "SLIME_WALK_EAST",
        }
    },
    "DWARF_AX_MAN": {
        cls: "Animator",
        animations: {
            [Animator.idle]: "DWARF_AX_MAN",
            [Animator.idleSouth]: "DWARF_AX_MAN",
            [Animator.idleNorth]: "DWARF_AX_MAN_IDLE_NORTH",
            [Animator.idleWest]: "DWARF_AX_MAN_IDLE_WEST",
            [Animator.idleEast]: "DWARF_AX_MAN_IDLE_EAST",
            [Animator.walkSouth]: "DWARF_AX_MAN_WALK_SOUTH",
            [Animator.walkNorth]: "DWARF_AX_MAN_WALK_NORTH",
            [Animator.walkWest]: "DWARF_AX_MAN_WALK_WEST",
            [Animator.walkEast]: "DWARF_AX_MAN_WALK_EAST",
        }
    }
}

/**
 * loot table should be of the form:
 * [
 * {
 *      chance: 0-1, (0 means will not drop, 1 means will always drop)
 *      kind: "gold"|"health"|"mana"|"arrow"
 *      min: int
 *      max: int
 *      amt: int  (amount for fixed amount, min,max for range)
 * }
 * ]
 */
const daggerLootTables = {
    GOBLIN: [
        { chance: 1, kind: "MANA_DROP", amt: 5, },
        { chance: 1, kind: "HEALTH_DROP", amt: 5, },
        { chance: 1, kind: "GOLD_COINS_TWO_DROP", min: 2, max: 5},
    ],
    SLIME: [
        { chance: 1, kind: "HEALTH_DROP", amt: 5, },
        { chance: 1, kind: "GOLD_COINS_TWO_DROP", min: 2, max: 5},
        { chance: .5, kind: "GOLD_COINS_SIX_DROP", min: 7, max: 12},
    ],
    DWARF_AX_MAN: [
        { chance: 1, kind: "MANA_DROP", amt: 5, },
        { chance: 1, kind: "HEALTH_DROP", amt: 5, },
        { chance: 1, kind: "GOLD_COINS_TWO_DROP", min: 2, max: 5},
    ],
    CHEST1_CLOSE: [
        { chance: 1, kind: "GOLD_COINS_TWO_DROP", min: 2, max: 5},
        { chance: 1, kind: "GOLD_COINS_TWO_DROP", min: 2, max: 5},
        { chance: .5, kind: "GOLD_COINS_SIX_DROP", min: 7, max: 12},
        { chance: .5, kind: "GOLD_COINS_SIX_DROP", min: 7, max: 12},
    ],
    CRATE: [
        { chance: .5, kind: "GOLD_COINS_TWO_DROP", min: 2, max: 5},
        { chance: .25, kind: "GOLD_COINS_TWO_DROP", min: 2, max: 5},
        { chance: 1, kind: "ARROW_ONE_DROP", min: 1, max: 3},
        { chance: .5, kind: "ARROW_FIVE_DROP", min: 5, max: 8},
    ],
}

const daggerEnemies = {
    GOBLIN: {
        sketch: animators["GOBLIN"],
        collider: {
            blocking: false,
        },
    },
    SLIME: {
        sketch: animators["SLIME"],
        collider: {
            blocking: false,
        }
    },
    DWARF_AX_MAN: {
        sketch: animators["DWARF_AX_MAN"],
        collider: {
            blocking: false,
        }
    }
};


const daggerObjects = {
    DOOR_CLOSE_TOP: {
        kind: "link",
        overlay: true,
        lateRender: true,
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "DOOR_CLOSE_TOP",
                [Animator.open]: "DOOR_OPEN_TOP",
                [Animator.openTransparent]: "DOOR_OPEN_TOP_TRANS",
            }
        },
    },
    DOOR_OPEN_TOP: {
        overlay: true,
        lateRender: true,
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "DOOR_OPEN_TOP",
                [Animator.idleTransparent]: "DOOR_OPEN_TOP_TRANS",
            }
        },
        collider: { blocking: false },
    },
    DOOR_CLOSE_BOTTOM: {
        kind: "door",
        link: { targets: ["up"] },
        sketch: {
            cls: "Animator",
            animations: {
                [Animator.idle]: "DOOR_CLOSE_BOTTOM",
                [Animator.open]: "DOOR_OPEN_BOTTOM",
            }
        },
        collider: {
            height: 36, 
            yoff: -8, 
        }, 
    },
    DOOR_RIGHTSIDE_TOP: {
        kind: "link",
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "DOOR_RIGHTSIDE_TOP",
                [Animator.open]: "WALL_BOTTOM",
            },
        },
    },
    DOOR_RIGHTSIDE_BOTTOM: {
        kind: "door",
        link: { targets: ["up"], vars: ["state"] },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "DOOR_RIGHTSIDE_BOTTOM",
                [Animator.open]: "none",
            },
        },
    },
    CHEST1_CLOSE: {
        kind: "chest",
        collider: {
            height: 30, 
            width: 36, 
            yoff: -6, 
        }, 
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "CHEST1_CLOSE",
                [Animator.open]: "CHEST1_OPEN",
            },
        },
    },
    GEM_WIND: {
        kind: "pickup",
        collider: {
            height: 20, 
            width: 8, 
            blocking: false,
        }, 
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "GEM_WIND",
            },
        },
    },
    GEM_WATER: {
        kind: "pickup",
        collider: {
            height: 20, 
            width: 8, 
            blocking: false,
        }, 
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "GEM_WATER",
            },
        },
    },
    GEM_FIRE: {
        kind: "pickup",
        collider: {
            height: 20, 
            width: 8, 
            blocking: false,
        }, 
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "GEM_FIRE",
            },
        },
    },
    GEM_EARTH: {
        kind: "pickup",
        collider: {
            height: 20, 
            width: 8, 
            blocking: false,
        }, 
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "GEM_EARTH",
            },
        },
    },
    ALTAR_WIND: {
        kind: "altar",
        want: "GEM_WIND",
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "ALTAR_WIND",
                [Animator.solved]: "ALTAR_GEM_WIND",
            },
        },
    },
    ALTAR_WATER: {
        kind: "altar",
        want: "GEM_WATER",
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "ALTAR_WATER",
                [Animator.solved]: "ALTAR_GEM_WATER",
            },
        },
    },
    ALTAR_FIRE: {
        kind: "altar",
        want: "GEM_FIRE",
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "ALTAR_FIRE",
                [Animator.solved]: "ALTAR_GEM_FIRE",
            },
        },
    },
    ALTAR_EARTH: {
        kind: "altar",
        want: "GEM_EARTH",
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "ALTAR_EARTH",
                [Animator.solved]: "ALTAR_GEM_EARTH",
            },
        },
    },
    GROUND_SPIKES_UP: {
        kind: "trap",
        trap: {
            activeTTL: 1500,
            idleTTL: 3500,
            damage: 5,
        },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "GROUND_SPIKES_DOWN",
                [Animator.active]: "GROUND_SPIKES_UP",
            },
        },
    },
    CRATE: {
        kind: "breakable",
        health: 10,
        maxHealth: 10,
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "CRATE",
            },
        },
    },
    KEY: {
        kind: "loot",
        loot: {
            amt: 1,
        },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "KEY",
            },
        },
        collider: { blocking: false, width:25, height: 25 },
    },
    BOW: {
        kind: "loot",
        loot: {
            amt: 1,
        },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "BOW",
            },
        },
        collider: { blocking: false, width:45, height: 45 },
    },
    DOOR_ARCH: {
        overlay: true,
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "DOOR_ARCH",
                [Animator.idleTransparent]: "DOOR_ARCH_TRANS",
            },
        },
        collider: { blocking: false },
        lateRender: true,
    },

};

const daggerAssets = [

    { src: "images/heart.png", cls: "Sheet", assets: [
        {tag: "HEART",                 id:  1, cls: "Sprite", width: 37, height: 34, xoffset: 0, yoffset: 0 },
        {tag: "HEART_HALF",            id:  2, cls: "Sprite", width: 37, height: 34, xoffset: 37, yoffset: 0 },
    ]},

    /*
     { id: 2, src: "images/basicPlayerSprite-25.png", cls: "Image", tag: "PLAYER", pathFindingWalkable: true },
     */
     { id: 3, src: "images/world_goal.png", cls: "Image", tag: "GOAL", pathFindingWalkable: true},
     { id: 4, src: "images/world_key.png", cls: "Image", tag: "KEY", pathFindingWalkable: true },

    { src: "images/spritesheet_Dungeon_01.png", cls: "Sheet", assets: [
        //ROW 1
        {tag: "GROUND",                 id: 10, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 0, pathFindingWalkable: true, tileset: true },
        {tag: "GROUND_SPIKES_DOWN",     id: 11, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 0, passable: true, pathFindingWalkable: true, tileset: true },
        {tag: "GROUND_SPIKES_UP",       id: 12, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 0, passable: true, pathFindingWalkable: true, tileset: true },
        {tag: "WALL_BOTTOM",            id: 13, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 0, tileset: true },
        {tag: "WALL_TOP",               id: 14, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 0, tileset: true },
        {tag: "WALL_FLAG_BOTTOM",       id: 15, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 0, tileset: true },
        {tag: "WALL_FLAG_TOP",          id: 16, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 0, tileset: true },
        {tag: "CEIL_UPPER_LEFT",        id: 17, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 0, tileset: true, lateRender: true },
        {tag: "CEIL_UPPER_MID",         id: 18, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 0, tileset: true, lateRender: true },
        {tag: "CEIL_UPPER_RIGHT",       id: 19, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 0, tileset: true, lateRender: true },
        //row 2
        {tag: "CEIL_LEFT",              id: 20, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 50, tileset: true },
        {tag: "CEIL_RIGHT",             id: 21, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 50, tileset: true },
        {tag: "CEIL_LEFT_RIGHT",        id: 22, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 50, tileset: true },
        {tag: "CEIL_LEFT_RIGHT_TOP",    id: 23, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 50, tileset: true },
        {tag: "CEIL_TOP_BOTTOM",        id: 24, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 50, tileset: true, lateRender: true },
        {tag: "CEIL_EMPTY",             id: 25, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 50, tileset: true },
        {tag: "DOOR_OPEN_TOP",          id: 26, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 50, passable: true, pathFindingWalkable: true, tileset: true },
        {tag: "DOOR_OPEN_BOTTOM",       id: 27, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 50, passable: true, pathFindingWalkable: true, tileset: true },
        {tag: "DOOR_CLOSE_TOP",         id: 28, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 50, tileset: true },
        {tag: "DOOR_CLOSE_BOTTOM",      id: 29, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 50, tileset: true },
        //ROW 3
        {tag: "DOOR_RIGHTSIDE_TOP",     id: 30, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 100, tileset: true },
        {tag: "DOOR_RIGHTSIDE_BOTTOM",  id: 31, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 100, tileset: true },
        {tag: "CHEST1_CLOSE",           id: 32, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 100, tileset: true },
        {tag: "CHEST1_OPEN",            id: 33, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 100, tileset: true },
        {tag: "GEM_WIND",               id: 34, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 100, tileset: true },
        {tag: "GEM_WATER",              id: 35, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 100, tileset: true },
        {tag: "GEM_FIRE",               id: 36, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 100, tileset: true },
        {tag: "GEM_EARTH",              id: 37, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 100, tileset: true },
        {tag: "ALTAR_WIND",             id: 38, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 100, tileset: true },
        {tag: "ALTAR_WATER",            id: 39, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 100, tileset: true },
        //ROW 4
        {tag: "ALTAR_FIRE",             id: 40, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 150, tileset: true },
        {tag: "ALTAR_EARTH",            id: 41, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 150, tileset: true },
        {tag: "ALTAR_GEM_WIND",         id: 42, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 150 },
        {tag: "ALTAR_GEM_WATER",        id: 43, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 150 },
        {tag: "ALTAR_GEM_FIRE",         id: 44, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 150 },
        {tag: "ALTAR_GEM_EARTH",        id: 45, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 150 },
        {tag: "DEADBONES",              id: 46, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 150, tileset: true },
        {tag: "HEART_TILE",             id: 47, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 150, pathFindingWalkable: true },
        {tag: "HEART_PIECE1",           id: 48, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 150, tileset: true, pathFindingWalkable: true },
        {tag: "HEART_PIECE2",           id: 49, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 150, pathFindingWalkable: true },   
        //ROW 5
        {tag: "BOW",                    id: 50, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 200, tileset: true, pathFindingWalkable: true },
        {tag: "CEIL_UPPER_DOOR",        id: 51, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 200, tileset: true, passable: true },
        {tag: "HEART_EMPTY",            id: 52, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 200, },
        {tag: "HEART_HALF_EMPTY",       id: 53, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 200, },
        {tag: "MANA_PIECE",             id: 54, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 200, tileset: true, pathFindingWalkable: true },
        {tag: "MANA_HALF_EMPTY",        id: 55, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 200, },
        {tag: "MANA_EMPTY",             id: 56, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 200, },
        {tag: "MANA_DROP",              id: 57, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 200, pathFindingWalkable: true },
        {tag: "HEALTH_DROP",            id: 58, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 200, pathFindingWalkable: true },
        {tag: "WOOD_FLOOR",             id: 59, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 200,  pathFindingWalkable: true, tileset: true },
        //ROW 6
        {tag: "GOLD_COINS_TWO_DROP",    id: 60, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 250, },
        {tag: "GOLD_COINS_SIX_DROP",    id: 61, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 250, },
        {tag: "ARROW_ONE_DROP",         id: 62, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 250, },
        {tag: "ARROW_FIVE_DROP",        id: 63, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 250, },
        {tag: "CRATE",                  id: 64, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 250, tileset: true },
        {tag: "DOOR_ARCH",              id: 65, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 250, tileset: true },
        {tag: "DOOR_ARCH_TRANS",        id: 66, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 250, },
        {tag: "DOOR_OPEN_TOP_TRANS",    id: 67, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 250, }, 
    ]},

      { src: "images/window_tiles.png", cls: "Sheet", assets: [

        // T = TOP,  M = MIDDLE,  B = BOTTOM,  L = LEFT,  R = RIGHT
        {tag: "WINDOW_BORDER_TL",       id: 500, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*0 },
        {tag: "WINDOW_BORDER_TM",       id: 501, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*0 },
        {tag: "WINDOW_BORDER_TR",       id: 502, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*0 },

        {tag: "WINDOW_BORDER_ML",       id: 503, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*1 },
        {tag: "WINDOW_INSIDE",          id: 504, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*1 },
        {tag: "WINDOW_BORDER_MR",       id: 505, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*1 },

        {tag: "WINDOW_BORDER_BL",       id: 506, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*2 },
        {tag: "WINDOW_BORDER_BM",       id: 507, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*2 },
        {tag: "WINDOW_BORDER_BR",       id: 508, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*2 }
    ]},

    { src: "images/playerAnim.png", cls: "Sheet", assets: [
        {tag: "PLAYER",                 id: 200, cls: "Sprite", width: 64, height: 100, xoffset: 0, yoffset: 0 },
        {tag: "PLAYER_IDLE_NORTH",      cls: "Sprite", width: 64, height: 100, xoffset: 64, yoffset: 0 },
        {tag: "PLAYER_IDLE_WEST",       cls: "Sprite", width: 64, height: 100, xoffset: 128, yoffset: 0 },
        {tag: "PLAYER_IDLE_EAST",       cls: "Sprite", width: 64, height: 100, xoffset: 192, yoffset: 0 },
        {tag: "PLAYER_WALK_SOUTH",      cls: "Animation", cels: [
            { xoffset: 0, yoffset: 200, width: 64, height: 100, duration: 100 },
            { xoffset: 0, yoffset: 300, width: 64, height: 100, duration: 100 },
            { xoffset: 0, yoffset: 400, width: 64, height: 100, duration: 100 },
            { xoffset: 0, yoffset: 500, width: 64, height: 100, duration: 100 },
            { xoffset: 0, yoffset: 600, width: 64, height: 100, duration: 100 },
            { xoffset: 0, yoffset: 700, width: 64, height: 100, duration: 100 },
            { xoffset: 0, yoffset: 800, width: 64, height: 100, duration: 100 },
            { xoffset: 0, yoffset: 100, width: 64, height: 100, duration: 100 },
        ]},
        {tag: "PLAYER_WALK_NORTH",      cls: "Animation", cels: [
            { xoffset: 64, yoffset: 200, width: 64, height: 100, duration: 100 },
            { xoffset: 64, yoffset: 300, width: 64, height: 100, duration: 100 },
            { xoffset: 64, yoffset: 400, width: 64, height: 100, duration: 100 },
            { xoffset: 64, yoffset: 500, width: 64, height: 100, duration: 100 },
            { xoffset: 64, yoffset: 600, width: 64, height: 100, duration: 100 },
            { xoffset: 64, yoffset: 700, width: 64, height: 100, duration: 100 },
            { xoffset: 64, yoffset: 800, width: 64, height: 100, duration: 100 },
            { xoffset: 64, yoffset: 100, width: 64, height: 100, duration: 100 },
        ]},
        {tag: "PLAYER_WALK_WEST",      cls: "Animation", cels: [
            { xoffset: 128, yoffset: 200, width: 64, height: 100, duration: 100 },
            { xoffset: 128, yoffset: 300, width: 64, height: 100, duration: 100 },
            { xoffset: 128, yoffset: 400, width: 64, height: 100, duration: 100 },
            { xoffset: 128, yoffset: 500, width: 64, height: 100, duration: 100 },
            { xoffset: 128, yoffset: 600, width: 64, height: 100, duration: 100 },
            { xoffset: 128, yoffset: 700, width: 64, height: 100, duration: 100 },
            { xoffset: 128, yoffset: 800, width: 64, height: 100, duration: 100 },
            { xoffset: 128, yoffset: 100, width: 64, height: 100, duration: 100 },
        ]},
        {tag: "PLAYER_WALK_EAST",      cls: "Animation", cels: [
            { xoffset: 192, yoffset: 200, width: 64, height: 100, duration: 100 },
            { xoffset: 192, yoffset: 300, width: 64, height: 100, duration: 100 },
            { xoffset: 192, yoffset: 400, width: 64, height: 100, duration: 100 },
            { xoffset: 192, yoffset: 500, width: 64, height: 100, duration: 100 },
            { xoffset: 192, yoffset: 600, width: 64, height: 100, duration: 100 },
            { xoffset: 192, yoffset: 700, width: 64, height: 100, duration: 100 },
            { xoffset: 192, yoffset: 800, width: 64, height: 100, duration: 100 },
            { xoffset: 192, yoffset: 100, width: 64, height: 100, duration: 100 },
        ]},
        {tag: "PLAYER_MELEE_SOUTH",      cls: "Animation", loop: false, cels: [
            //{ xoffset: 0, yoffset: 900, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 0, yoffset: 1000, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 0, yoffset: 1100, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 0, yoffset: 1200, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 0, yoffset: 1300, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 0, yoffset: 1400, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 0, yoffset: 1500, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 0, yoffset: 1600, width: 64, height: 100, duration: _meleeFrameDuration },
        ]},
        {tag: "PLAYER_MELEE_NORTH",      cls: "Animation", loop: false, cels: [
            //{ xoffset: 64, yoffset: 900, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 64, yoffset: 1000, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 64, yoffset: 1100, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 64, yoffset: 1200, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 64, yoffset: 1300, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 64, yoffset: 1400, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 64, yoffset: 1500, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 64, yoffset: 1600, width: 64, height: 100, duration: _meleeFrameDuration },
        ]},
        {tag: "PLAYER_MELEE_WEST",      cls: "Animation", loop: false, cels: [
            //{ xoffset: 128, yoffset: 900, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 128, yoffset: 1000, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 128, yoffset: 1100, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 128, yoffset: 1200, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 128, yoffset: 1300, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 128, yoffset: 1400, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 128, yoffset: 1500, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 128, yoffset: 1600, width: 64, height: 100, duration: _meleeFrameDuration },
        ]},
        {tag: "PLAYER_MELEE_EAST",      cls: "Animation", loop: false, cels: [
            //{ xoffset: 192, yoffset: 900, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 192, yoffset: 1000, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 192, yoffset: 1100, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 192, yoffset: 1200, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 192, yoffset: 1300, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 192, yoffset: 1400, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 192, yoffset: 1500, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 192, yoffset: 1600, width: 64, height: 100, duration: _meleeFrameDuration },
        ]},

    ]},

      
    { src: "images/enemies.png", cls: "Sheet", assets: [
        // ---- GOBLIN ----
        {tag: "GOBLIN_IDLE_NORTH",              id: 90, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 0 },
        {tag: "GOBLIN_WALK_NORTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 0, width: 50, height: 100, duration: 200 },
            { xoffset: 50, yoffset: 0, width: 50, height: 100, duration: 200 },
            { xoffset: 100, yoffset: 0, width: 50, height: 100, duration: 200 },
        ]},
        {tag: "GOBLIN_IDLE_EAST",               id: 93, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 100 },
        {tag: "GOBLIN_WALK_EAST",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 100, width: 50, height: 100, duration: 200 },
            { xoffset: 50, yoffset: 100, width: 50, height: 100, duration: 200 },
            { xoffset: 100, yoffset: 100, width: 50, height: 100, duration: 200 },
        ]},
        {tag: "GOBLIN_IDLE_WEST",               id: 96, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 200 },
        {tag: "GOBLIN_WALK_WEST",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 300, width: 50, height: 100, duration: 200 },
            { xoffset: 50, yoffset: 300, width: 50, height: 100, duration: 200 },
            { xoffset: 100, yoffset: 300, width: 50, height: 100, duration: 200 },
        ]},
        {tag: "GOBLIN",                         id: 99, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 300, tileset: true },
        {tag: "GOBLIN_WALK_SOUTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 200, width: 50, height: 100, duration: 200 },
            { xoffset: 50, yoffset: 200, width: 50, height: 100, duration: 200 },
            { xoffset: 100, yoffset: 200, width: 50, height: 100, duration: 200 },
        ]},

    ]},

    { src: "images/slime.png", cls: "Sheet", assets: [
        // ---- SLIME ----
        {tag: "SLIME_IDLE_NORTH",              id: 100, cls: "Sprite", width: 50, height: 31, xoffset: 0, yoffset: 0 },
        {tag: "SLIME_WALK_NORTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 0, width: 50, height: 31, duration: 200 },
            { xoffset: 50, yoffset: 0, width: 50, height: 31, duration: 200 },
            { xoffset: 100, yoffset: 0, width: 50, height: 31, duration: 200 },
        ]},
        {tag: "SLIME_IDLE_EAST",               id: 103, cls: "Sprite", width: 50, height: 31, xoffset: 0, yoffset: 31 },
        {tag: "SLIME_WALK_EAST",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 31, width: 50, height: 31, duration: 200 },
            { xoffset: 50, yoffset: 31, width: 50, height: 31, duration: 200 },
            { xoffset: 100, yoffset: 31, width: 50, height: 31, duration: 200 },
        ]},
        {tag: "SLIME_IDLE_WEST",               id: 106, cls: "Sprite", width: 50, height: 31, xoffset: 0, yoffset: 62 },
        {tag: "SLIME_WALK_WEST",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 62, width: 50, height: 31, duration: 200 },
            { xoffset: 50, yoffset: 62, width: 50, height: 31, duration: 200 },
            { xoffset: 100, yoffset: 62, width: 50, height: 31, duration: 200 },
        ]},
        {tag: "SLIME",                         id: 109, cls: "Sprite", width: 50, height: 31, xoffset: 0, yoffset: 93, tileset: true },
        {tag: "SLIME_WALK_SOUTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 93, width: 50, height: 31, duration: 200 },
            { xoffset: 50, yoffset: 93, width: 50, height: 31, duration: 200 },
            { xoffset: 100, yoffset: 93, width: 50, height: 31, duration: 200 },
        ]},

    ]},

    
    { src: "images/dwarfAxeman.png", cls: "Sheet", assets: [
        // ---- DWARF AX MAN ----
        {tag: "DWARF_AX_MAN_IDLE_NORTH",              id: 110, cls: "Sprite", width: 50, height: 75, xoffset: 50, yoffset: 0 },
        {tag: "DWARF_AX_MAN_WALK_NORTH",              cls: "Animation", cels: [
            { xoffset: 50, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 50, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 50, yoffset: 0, width: 50, height: 75, duration: 200 },
        ]},
        {tag: "DWARF_AX_MAN_IDLE_EAST",               id: 113, cls: "Sprite", width: 50, height: 75, xoffset: 150, yoffset: 0 },
        {tag: "DWARF_AX_MAN_WALK_EAST",              cls: "Animation", cels: [
            { xoffset: 150, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 150, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 150, yoffset: 0, width: 50, height: 75, duration: 200 },
        ]},
        {tag: "DWARF_AX_MAN_IDLE_WEST",               id: 116, cls: "Sprite", width: 50, height: 75, xoffset: 100, yoffset: 0 },
        {tag: "DWARF_AX_MAN_WALK_WEST",              cls: "Animation", cels: [
            { xoffset: 100, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 100, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 100, yoffset: 0, width: 50, height: 75, duration: 200 },
        ]},
        {tag: "DWARF_AX_MAN",                         id: 119, cls: "Sprite", width: 50, height: 75, xoffset: 0, yoffset: 0, tileset: true },
        {tag: "DWARF_AX_MAN_WALK_SOUTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 0, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 0, yoffset: 0, width: 50, height: 75, duration: 200 },
        ]},

    ]},
];