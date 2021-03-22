//export { daggerAssets };

const _playerMeleeFrameDuration = 40;
const _playerIdleFrameDuration = 60;

// FIXME: remove when we have real sword
const swordSpec = {
    cls: "Shape",
	fill: false,
	verts: [
		{x:4, y:0},
		{x:8, y:0},
		{x:8, y:4},
		{x:28, y:4},
		{x:30, y:6},
		{x:28, y:8},
		{x:8, y:8},
		{x:8, y:12},
		{x:4, y:12},
		{x:4, y:8},
		{x:0, y:8},
		{x:0, y:4},
		{x:4, y:4},
	],
	borderWidth: 1,
	borderColor: "rgba(200,200,0,1)",
};
const sword = new Shape(swordSpec);

const iceballSpec = {
    cls: "Shape",
	fill: true,
	verts: [
		{x:0, y:2},
		{x:4, y:0},
		{x:8, y:0},
		{x:12, y:2},
		{x:8, y:4},
		{x:4, y:4},
	],
	borderWidth: 2,
	borderColor: "rgba(94,215,239,1)",
    color: "rgba(117,157,169,1)"
};
const iceball = new Shape(iceballSpec);

const fireballSpec = {
    cls: "Shape",
	fill: true,
	verts: [
		{x:0, y:6},
		{x:6, y:0},
		{x:12, y:6},
		{x:6, y:12},
	],
	borderWidth: 2,
	borderColor: "rgba(226,83,34,1)",
    color: "rgba(255,201,92,1)"
};
const fireball = new Shape(fireballSpec);

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
    },

    "NPC1": {
        cls: "Animator",
        animations: {
            [Animator.idle]: "NPC1",
            [Animator.idleSouth]: "NPC1",
            [Animator.idleNorth]: "NPC1_IDLE_NORTH",
            [Animator.idleWest]: "NPC1_IDLE_WEST",
            [Animator.idleEast]: "NPC1_IDLE_EAST",
        }
    },

    "NPC2": {
        cls: "Animator",
        animations: {
            [Animator.idle]: "NPC2",
            [Animator.idleSouth]: "NPC2",
            [Animator.idleNorth]: "NPC2_IDLE_NORTH",
            [Animator.idleWest]: "NPC2_IDLE_WEST",
            [Animator.idleEast]: "NPC2_IDLE_EAST",
        }
    },

    "ALCHEMIST": {
        cls: "Animator",
        animations: {
            [Animator.idle]: "ALCHEMIST",
        }
    },

    "HEALER": {
        cls: "Animator",
        animations: {
            [Animator.idle]: "HEALER",
        }
    },

    "FLETCHER": {
        cls: "Animator",
        animations: {
            [Animator.idle]: "FLETCHER",
        }
    },

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
    POT: [
        { chance: .25, kind: "GOLD_COINS_TWO_DROP", min: 2, max: 5},
        { chance: .1, kind: "ARROW_ONE_DROP", min: 1, max: 3},
    ],
    BIG_POT: [
    { chance: .25, kind: "GOLD_COINS_SIX_DROP", min: 5, max: 10},
    { chance: .1, kind: "ARROW_FIVE_DROP", min: 3, max: 5},
    ]  
}

const daggerNpcs = {
    NPC1: {
        sketch: animators["NPC1"],
        yOff: -25,
        collider: {
            color: "rgba(175,175,175,.75)",
            width: 20, 
            height: 30, 
            //blocking: false,
        },
        dialogs: [
            { tag: "q1Start", predicate: (npc) => !quests.checkStarted("q1") && !quests.checkDone("q1") && !quests.checkCompleted("q1")},
            { tag: "q1Wait", predicate: (npc) => quests.checkStarted("q1") },
            { tag: "q1Done", predicate: (npc) => quests.checkDone("q1") },
            { tag: "q1Complete", predicate: (npc) => quests.checkCompleted("q1") },
        ],
    },

    NPC2: {
        sketch: animators["NPC2"],
        yOff: -25,
        collider: {
            color: "rgba(175,175,175,.75)",
            width: 20, 
            height: 30, 
            //blocking: false,
        },
        dialogs: [
            { tag: "q2Start", predicate: (npc) => !quests.checkStarted("q2") && !quests.checkDone("q2") && !quests.checkCompleted("q2")},
            { tag: "q2Wait", predicate: (npc) => quests.checkStarted("q2") },
            { tag: "q2Done", predicate: (npc) => quests.checkDone("q2") },
            { tag: "q2Complete", predicate: (npc) => quests.checkCompleted("q2") },
        ],
    },

    ALCHEMIST: {
        sketch: animators["ALCHEMIST"],
        yOff: -25,
        collider: {
            color: "rgba(175,175,175,.75)",
            width: 20, 
            height: 30, 
            //blocking: false,
        },
    },

    HEALER: {
        sketch: animators["HEALER"],
        yOff: -25,
        collider: {
            color: "rgba(175,175,175,.75)",
            width: 20, 
            height: 30, 
            //blocking: false,
        },
    },

    FLETCHER: {
        sketch: animators["FLETCHER"],
        yOff: -25,
        collider: {
            color: "rgba(175,175,175,.75)",
            width: 20, 
            height: 30, 
            //blocking: false,
        },
    },

};

const daggerEnemies = {
    GOBLIN: {
        sketch: animators["GOBLIN"],
        yOff: -25,
        collider: {
            blocking: false,
            width: 25, 
            height: 40, 
        },
    },
    SLIME: {
        sketch: animators["SLIME"],
        collider: {
            color: "rgba(0,200,0,.65)",
            width: 40, 
            height: 30, 
            blocking: false,
        }
    },
    DWARF_AX_MAN: {
        sketch: animators["DWARF_AX_MAN"],
        yOff: -12,
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
    VDOOR1_T: {
        kind: "link",
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "VDOOR1_T",
                [Animator.open]: "VDOOR1_OPEN_T",
            },
        },
    },
    VDOOR1_B: {
        kind: "door",
        link: { targets: ["up"], vars: ["state"] },
        locked: false,
        autoclose: true,
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "VDOOR1_B",
                [Animator.open]: "VDOOR1_OPEN_B",
            },
        },
    },
    VDOOR2_T: {
        kind: "link",
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "VDOOR2_T",
                [Animator.open]: "VDOOR2_OPEN_T",
            },
        },
    },
    VDOOR2_B: {
        kind: "door",
        link: { targets: ["up"], vars: ["state"] },
        locked: false,
        autoclose: true,
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "VDOOR2_B",
                [Animator.open]: "VDOOR2_OPEN_B",
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
    POT: {
        kind: "breakable",
        health: 5,
        maxHealth: 5,
        collider: { width:25, height: 25 },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "POT",
            },
        },
    },
    BIG_POT: {
        kind: "breakable",
        health: 5,
        maxHealth: 5,
        collider: { width:25, height: 25 },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "BIG_POT",
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
        offHand: true,
        attackKind: "ranged",
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
    FIREWAND: {
        kind: "loot",
        mainHand: true,
        offHand: true,
        attackKind: "magic",
        loot: {
            amt: 1,
        },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "FIREWAND",
            },
        },
        collider: { blocking: false, width:45, height: 45 },
    },
    ICEWAND: {
        kind: "loot",
        mainHand: true,
        offHand: true,
        attackKind: "magic",
        loot: {
            amt: 1,
        },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "ICEWAND",
            },
        },
        collider: { blocking: false, width:45, height: 45 },
    },
    HEALING_POTION: {
        kind: "loot",
        loot: {
            amt: 1,
        },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "HEALING_POTION",
            },
        },
        collider: { blocking: false, width:25, height: 25 },
    },
    MANA_POTION: {
        kind: "loot",
        loot: {
            amt: 1,
        },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "MANA_POTION",
            },
        },
        collider: { blocking: false, width:25, height: 25 },
    },
    SWORD: {
        kind: "loot",
        mainHand: true,
        attackKind: "melee",
        loot: {
            amt: 1,
        },
        sketch: { 
            cls: "Animator",
            animations: {
                [Animator.idle]: "SWORD",
            },
        },
        xxform: {
            origx:.155,
            origy:.9,
            scalex:.85,
            scaley:.85,
            angle:Math.PI*.25,
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

    /* === 1 - 899 ========================================================================= */
    // bg/fg tiles and objects

    { src: "images/heart.png", cls: "Sheet", assets: [
        {tag: "HEART",                  id:  1, cls: "Sprite", width: 37, height: 34, xoffset: 0, yoffset: 0 },
        {tag: "HEART_HALF",             id:  2, cls: "Sprite", width: 37, height: 34, xoffset: 37, yoffset: 0 },
    ]},

    {    tag: "GOAL",                   id: 3, src: "images/world_goal.png", cls: "Image", tag: "GOAL", pathFindingWalkable: true},
    {    tag: "KEY",                    id: 4, src: "images/world_key.png", cls: "Image", tag: "KEY", pathFindingWalkable: true },

    { src: "images/spritesheet_Dungeon_01.png", cls: "Sheet", assets: [
        //ROW 1
        {tag: "GROUND",                 id: 10, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 0, pathFindingWalkable: true, tileset: true },
        {tag: "GROUND_SPIKES_DOWN",     id: 11, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 0, passable: true, pathFindingWalkable: true, tileset: true, bgr: true },
        {tag: "GROUND_SPIKES_UP",       id: 12, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 0, passable: true, pathFindingWalkable: true, tileset: true, bgr: true },
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
        {tag: "BOW",                    id: 50, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 200, tileset: true },
        {tag: "SWORD",                  id: 51, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 200, tileset: true },
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
        {tag: "WALL_TORCH_TOP",         id: 68, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 250, tileset: true },
        {tag: "WALL_TORCH_BOTTOM",      id: 69, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 250, tileset: true },
        //ROW 7
        {tag: "STONE_FLOOR",             id: 70, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 300, tileset: true },
        {tag: "STONE_FLOOR2",            id: 71, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 300, tileset: true },
        {tag: "STONE_FLOOR3",            id: 72, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 300, tileset: true },
        {tag: "STONE_FLOOR4",            id: 73, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 300, tileset: true },
        {tag: "POT",                     id: 74, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 300, tileset: true },
        {tag: "WOOD_FLOOR2",             id: 75, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 300, tileset: true },
        {tag: "FIREWAND",                id: 76, cls: "Sprite", width: 50, height: 50, xoffset: 300, yoffset: 300, },
        {tag: "MANA_POTION",             id: 77, cls: "Sprite", width: 50, height: 50, xoffset: 350, yoffset: 300, tileset: true },
        {tag: "HEALING_POTION",          id: 78, cls: "Sprite", width: 50, height: 50, xoffset: 400, yoffset: 300, tileset: true },
        {tag: "ICEWAND",                 id: 79, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 300, },
        //ROW 8
        {tag: "GREEN_TUNIC",             id: 80, cls: "Sprite", width: 50, height: 50, xoffset: 0, yoffset: 350 },
        {tag: "BLUE_TUNIC",              id: 81, cls: "Sprite", width: 50, height: 50, xoffset: 50, yoffset: 350 },
        {tag: "STONE_STAIRS",            id: 82, cls: "Sprite", width: 50, height: 50, xoffset: 100, yoffset: 350, passable: true, tileset: true },
        {tag: "PIT",                     id: 83, cls: "Sprite", width: 50, height: 50, xoffset: 150, yoffset: 350, tileset: true, permeable: true, bgr: true },
        {tag: "PIT_SPIKES",              id: 84, cls: "Sprite", width: 50, height: 50, xoffset: 200, yoffset: 350, tileset: true, permeable: true, bgr: true },
        {tag: "BIG_POT",                 id: 85, cls: "Sprite", width: 50, height: 50, xoffset: 250, yoffset: 350, tileset: true },
        {tag: "WOOD_FLOOR_ALT",          id: 89, cls: "Sprite", width: 50, height: 50, xoffset: 450, yoffset: 350,  pathFindingWalkable: true, tileset: true }
    ]},

    { src: "images/spritesheet_Overworld.png", cls: "Sheet", assets: [
        {tag: "TALL_GRASS",             id: 300, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*0, passable: true, tileset: true },
        {tag: "GRASS_2",                id: 301, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*0, passable: true, tileset: true },
        {tag: "GRASS_3",                id: 302, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*0, passable: true, tileset: true },
        {tag: "DIRT",                   id: 303, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*0, passable: true, tileset: true },
        {tag: "PLACEHOLDER_1",          id: 304, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*0, passable: true, tileset: false },
        {tag: "DIRT_3",                 id: 305, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*0, passable: true, tileset: true },
        {tag: "DIRT_PATH_DOOR",         id: 306, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*0, passable: true, tileset: true },
        {tag: "PLACEHOLDER_2",          id: 307, cls: "Sprite", width: 50, height: 50, xoffset: 50*7, yoffset: 50*0, passable: true, tileset: false },
        {tag: "BARREL",                 id: 308, cls: "Sprite", width: 50, height: 50, xoffset: 50*8, yoffset: 50*0, passable: true, tileset: true },
        {tag: "STONE",                  id: 309, cls: "Sprite", width: 50, height: 50, xoffset: 50*9, yoffset: 50*0, passable: true, tileset: true },

        {tag: "GRASS_CLIFF_TL",             id: 310, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*1, passable: true, tileset: true },
        {tag: "GRASS_CLIFF_TM",             id: 311, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*1, passable: true, tileset: true },
        {tag: "GRASS_CLIFF_TR",             id: 312, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*1, passable: true, tileset: true },
        {tag: "GRASS_PATCH_TL",             id: 313, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*1, passable: true, tileset: true },
        {tag: "GRASS_PATCH_TM",             id: 314, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*1, passable: true, tileset: true },
        {tag: "GRASS_PATCH_TR",             id: 315, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*1, passable: true, tileset: true },
        {tag: "GRASS_PATCH_DIAG_TL",        id: 316, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*1, passable: true, tileset: true },
        {tag: "GRASS_PATCH_DIAG_TR",        id: 317, cls: "Sprite", width: 50, height: 50, xoffset: 50*7, yoffset: 50*1, passable: true, tileset: true },
        {tag: "TREE_BIG",                   id: 318, cls: "Sprite", width: 100, height: 150, xoffset: 50*8, yoffset: 50*1, passable: true, tileset: true },
        //{tag: "TREE_BIG_TL",                id: 318, cls: "Sprite", width: 50, height: 50, xoffset: 50*8, yoffset: 50*1, passable: true, tileset: true },
        //{tag: "TREE_BIG_TR",                id: 319, cls: "Sprite", width: 50, height: 50, xoffset: 50*9, yoffset: 50*1, passable: true, tileset: true },

        {tag: "GRASS_CLIFF_ML",             id: 320, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*2, passable: true, tileset: true },
        {tag: "GRASS_CLIFF_MM",             id: 321, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*2, passable: true, tileset: true },
        {tag: "GRASS_CLIFF_MR",             id: 322, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*2, passable: true, tileset: true },
        {tag: "GRASS_PATCH_ML",             id: 323, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*2, passable: true, tileset: true },
        {tag: "STONE_PATH",                 id: 324, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*2, passable: true, tileset: true },
        {tag: "GRASS_PATCH_MR",             id: 325, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*2, passable: true, tileset: true },
        {tag: "GRASS_PATCH_DIAG_BL",        id: 326, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*2, passable: true, tileset: true },
        {tag: "GRASS_PATCH_DIAG_BR",        id: 327, cls: "Sprite", width: 50, height: 50, xoffset: 50*7, yoffset: 50*2, passable: true, tileset: true },
        //{tag: "TREE_BIG_ML",                id: 328, cls: "Sprite", width: 50, height: 50, xoffset: 50*8, yoffset: 50*2, passable: true, tileset: true },
        //{tag: "TREE_BIG_MR",                id: 329, cls: "Sprite", width: 50, height: 50, xoffset: 50*9, yoffset: 50*2, passable: true, tileset: true },

        {tag: "GRASS_CLIFF_BL",             id: 330, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*3, passable: true, tileset: true },
        {tag: "GRASS_CLIFF_BM",             id: 331, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*3, passable: true, tileset: true },
        {tag: "GRASS_CLIFF_BR",             id: 332, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*3, passable: true, tileset: true },
        {tag: "GRASS_PATCH_BL",             id: 333, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*3, passable: true, tileset: true },
        {tag: "GRASS_PATCH_BM",             id: 334, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*3, passable: true, tileset: true },
        {tag: "GRASS_PATCH_BR",             id: 335, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*3, passable: true, tileset: true },
        {tag: "GRASS_PATCH_DIAG_TR_BL",     id: 336, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*3, passable: true, tileset: true },
        {tag: "GRASS_PATCH_DIAG_TL_BR",     id: 337, cls: "Sprite", width: 50, height: 50, xoffset: 50*7, yoffset: 50*3, passable: true, tileset: true },
        //{tag: "TREE_BIG_BL",                id: 338, cls: "Sprite", width: 50, height: 50, xoffset: 50*8, yoffset: 50*3, passable: true, tileset: true },
        //{tag: "TREE_BIG_BR",                id: 339, cls: "Sprite", width: 50, height: 50, xoffset: 50*9, yoffset: 50*3, passable: true, tileset: true },

        {tag: "ROCK_CLIFF_L",               id: 340, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*4, passable: true, tileset: true },
        {tag: "ROCK_CLIFF_M",               id: 341, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*4, passable: true, tileset: true },
        {tag: "ROCK_CLIFF_R",               id: 342, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*4, passable: true, tileset: true },
        {tag: "ROCK_CLIFF_WATER_BL",        id: 343, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*4, passable: true, tileset: true },
        {tag: "ROCK_CLIFF_WATER_BM",        id: 344, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*4, passable: true, tileset: true },
        {tag: "ROCK_CLIFF_WATER_BR",        id: 345, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*4, passable: true, tileset: true },
        {tag: "WATER_1",                    id: 346, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*4, passable: true, tileset: true },
        {tag: "PLACEHOLDER_3",              id: 347, cls: "Sprite", width: 50, height: 50, xoffset: 50*7, yoffset: 50*4, passable: true, tileset: true },
        //{tag: "TREE_BIG_VERT_L",            id: 348, cls: "Sprite", width: 50, height: 50, xoffset: 50*8, yoffset: 50*4, passable: true, tileset: true },
        //{tag: "TREE_BIG_VERT_R",            id: 349, cls: "Sprite", width: 50, height: 50, xoffset: 50*9, yoffset: 50*4, passable: true, tileset: true },

        {tag: "ROCK_CLIFF_BL",              id: 350, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*5, passable: true, tileset: true },
        {tag: "ROCK_CLIFF_BM",              id: 351, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*5, passable: true, tileset: true },
        {tag: "ROCK_CLIFF_BR",              id: 352, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*5, passable: true, tileset: true },
        {tag: "FENCE_1",                    id: 353, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*5, passable: true, tileset: true },
        {tag: "FENCE_2",                    id: 354, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*5, passable: true, tileset: true },
        {tag: "FENCE_3",                    id: 355, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*5, passable: true, tileset: true },
        //{tag: "TREE_SMALL_VERT",            id: 356, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*5, passable: true, tileset: true },
        {tag: "TREE_SMALL",                 id: 357, cls: "Sprite", width: 50, height: 100, xoffset: 50*7, yoffset: 50*5, passable: true, tileset: true },
        //{tag: "TREE_BIG_CLUSTER_1",         id: 358, cls: "Sprite", width: 50, height: 50, xoffset: 50*8, yoffset: 50*5, passable: true, tileset: true },
        //{tag: "TREE_BIG_CLUSTER_2",         id: 359, cls: "Sprite", width: 50, height: 50, xoffset: 50*9, yoffset: 50*5, passable: true, tileset: true },

        {tag: "SIGN_1",                      id: 360, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*6, passable: true, tileset: true },
        {tag: "SIGN_2",                      id: 361, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*6, passable: true, tileset: true },
        {tag: "SIGN_3",                      id: 362, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*6, passable: true, tileset: true },
        {tag: "SIGN_4",                      id: 363, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*6, passable: true, tileset: true },
        {tag: "FENCE_4",                    id: 364, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*6, passable: true, tileset: true },
        {tag: "FENCE_5",                    id: 365, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*6, passable: true, tileset: true },
        {tag: "FENCE_6",                    id: 366, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*6, passable: true, tileset: true },
        //{tag: "TREE_SMALL_B",               id: 367, cls: "Sprite", width: 50, height: 50, xoffset: 50*7, yoffset: 50*6, passable: true, tileset: true },
        //{tag: "TREE_BIG_CLUSTER_3",         id: 368, cls: "Sprite", width: 50, height: 50, xoffset: 50*8, yoffset: 50*6, passable: true, tileset: true },
        //{tag: "TREE_BIG_CLUSTER_4",         id: 369, cls: "Sprite", width: 50, height: 50, xoffset: 50*9, yoffset: 50*6, passable: true, tileset: true },

        {tag: "RROOF_TL",                    id: 370, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*7, tileset: true },
        {tag: "RROOF_CHIMNEY",               id: 371, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*7, tileset: true },
        {tag: "RROOF_T",                     id: 372, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*7, tileset: true },
        {tag: "RROOF_TR",                    id: 373, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*7, tileset: true },
        {tag: "BROOF_TL",                    id: 374, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*7, tileset: true },
        {tag: "BROOF_CHIMNEY",               id: 375, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*7, tileset: true },
        {tag: "BROOF_T",                     id: 376, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*7, tileset: true },
        {tag: "BROOF_TR",                    id: 377, cls: "Sprite", width: 50, height: 50, xoffset: 50*7, yoffset: 50*7, tileset: true },
        {tag: "VDOOR1_OPEN_T",               id: 378, cls: "Sprite", width: 50, height: 50, xoffset: 50*8, yoffset: 50*7, tileset: true },
        {tag: "VDOOR2_OPEN_T",               id: 379, cls: "Sprite", width: 50, height: 50, xoffset: 50*9, yoffset: 50*7, tileset: true },

        {tag: "RROOF_L",                     id: 380, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*8, tileset: true },
        {tag: "RROOF_M",                     id: 381, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*8, tileset: true },
        {tag: "VDOOR1_T",                    id: 382, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*8, tileset: true },
        {tag: "RROOF_R",                     id: 383, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*8, tileset: true },
        {tag: "BROOF_L",                     id: 384, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*8, tileset: true },
        {tag: "BROOF_M",                     id: 385, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*8, tileset: true },
        {tag: "VDOOR2_T",                    id: 386, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*8, tileset: true },
        {tag: "BROOF_R",                     id: 387, cls: "Sprite", width: 50, height: 50, xoffset: 50*7, yoffset: 50*8, tileset: true },
        {tag: "VDOOR1_OPEN_B",               id: 388, cls: "Sprite", width: 50, height: 50, xoffset: 50*8, yoffset: 50*8, tileset: true },
        {tag: "VDOOR2_OPEN_B",               id: 389, cls: "Sprite", width: 50, height: 50, xoffset: 50*9, yoffset: 50*8, tileset: true },

        {tag: "RROOF_FL",                    id: 390, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*9, tileset: true },
        {tag: "RROOF_F",                     id: 391, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*9, tileset: true },
        {tag: "VDOOR1_B",                    id: 392, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*9, tileset: true },
        {tag: "RROOF_FR",                    id: 393, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*9, tileset: true },
        {tag: "BROOF_FL",                    id: 394, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*9, tileset: true },
        {tag: "BROOF_F",                     id: 395, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*9, tileset: true },
        {tag: "VDOOR2_B",                    id: 396, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*9, tileset: true },
        {tag: "BROOF_FR",                    id: 397, cls: "Sprite", width: 50, height: 50, xoffset: 50*7, yoffset: 50*9, tileset: true },

        {tag: "VWALL1_TL",                   id: 400, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*10, tileset: true },
        {tag: "VWALL1_WINDOW",               id: 401, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*10, tileset: true },
        {tag: "VWALL1_TR",                   id: 402, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*10, tileset: true },
        {tag: "VWALL1_T",                    id: 403, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*10, tileset: true },
        {tag: "VWALL2_TL",                   id: 404, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*10, tileset: true },
        {tag: "VWALL2_WINDOW",               id: 405, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*10, tileset: true },
        {tag: "VWALL2_TR",                   id: 406, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*10, tileset: true },

        {tag: "VWALL1_BL",                   id: 410, cls: "Sprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*11, tileset: true },
        {tag: "VWALL1_B",                    id: 411, cls: "Sprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*11, tileset: true },
        {tag: "VWALL1_BR",                   id: 412, cls: "Sprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*11, tileset: true },
        {tag: "VWALL2_T",                    id: 413, cls: "Sprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*11, tileset: true },
        {tag: "VWALL2_BL",                   id: 414, cls: "Sprite", width: 50, height: 50, xoffset: 50*4, yoffset: 50*11, tileset: true },
        {tag: "VWALL2_B",                    id: 415, cls: "Sprite", width: 50, height: 50, xoffset: 50*5, yoffset: 50*11, tileset: true },
        {tag: "VWALL2_BR",                   id: 416, cls: "Sprite", width: 50, height: 50, xoffset: 50*6, yoffset: 50*11, tileset: true },

    ]},

    /* === 900 - 999 ========================================================================= */
    // Player/Enemies/NPCs
    // === 900
    { src: "images/playerAnim.png", cls: "Sheet", assets: [
        {tag: "PLAYER",                 id: 900, cls: "Sprite", width: 64, height: 100, xoffset: 0, yoffset: 0 },
        {tag: "PLAYER_IDLE_NORTH",      cls: "Sprite", width: 64, height: 100, xoffset: 64, yoffset: 0 },
        {tag: "PLAYER_IDLE_WEST",       cls: "Sprite", width: 64, height: 100, xoffset: 128, yoffset: 0 },
        {tag: "PLAYER_IDLE_EAST",       cls: "Sprite", width: 64, height: 100, xoffset: 192, yoffset: 0 },
        {tag: "PLAYER_WALK_SOUTH",      cls: "Animation", cels: [
            { xoffset: 0, yoffset: 200, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 0, yoffset: 300, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 0, yoffset: 400, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 0, yoffset: 500, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 0, yoffset: 600, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 0, yoffset: 700, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 0, yoffset: 800, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 0, yoffset: 100, width: 64, height: 100, duration: _playerIdleFrameDuration },
        ]},
        {tag: "PLAYER_WALK_NORTH",      cls: "Animation", cels: [
            { xoffset: 64, yoffset: 200, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 64, yoffset: 300, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 64, yoffset: 400, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 64, yoffset: 500, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 64, yoffset: 600, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 64, yoffset: 700, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 64, yoffset: 800, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 64, yoffset: 100, width: 64, height: 100, duration: _playerIdleFrameDuration },
        ]},
        {tag: "PLAYER_WALK_WEST",      cls: "Animation", cels: [
            { xoffset: 128, yoffset: 200, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 128, yoffset: 300, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 128, yoffset: 400, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 128, yoffset: 500, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 128, yoffset: 600, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 128, yoffset: 700, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 128, yoffset: 800, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 128, yoffset: 100, width: 64, height: 100, duration: _playerIdleFrameDuration },
        ]},
        {tag: "PLAYER_WALK_EAST",      cls: "Animation", cels: [
            { xoffset: 192, yoffset: 200, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 192, yoffset: 300, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 192, yoffset: 400, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 192, yoffset: 500, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 192, yoffset: 600, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 192, yoffset: 700, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 192, yoffset: 800, width: 64, height: 100, duration: _playerIdleFrameDuration },
            { xoffset: 192, yoffset: 100, width: 64, height: 100, duration: _playerIdleFrameDuration },
        ]},
        {tag: "PLAYER_MELEE_SOUTH",      cls: "Animation", loop: false, cels: [
            //{ xoffset: 0, yoffset: 900, width: 64, height: 100, duration: _meleeFrameDuration },
            { xoffset: 0, yoffset: 1000, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 0, yoffset: 1100, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 0, yoffset: 1200, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 0, yoffset: 1300, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 0, yoffset: 1400, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 0, yoffset: 1500, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 0, yoffset: 1600, width: 64, height: 100, duration: _playerMeleeFrameDuration },
        ]},
        {tag: "PLAYER_MELEE_NORTH",      cls: "Animation", loop: false, cels: [
            //{ xoffset: 64, yoffset: 900, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 64, yoffset: 1000, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 64, yoffset: 1100, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 64, yoffset: 1200, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 64, yoffset: 1300, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 64, yoffset: 1400, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 64, yoffset: 1500, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 64, yoffset: 1600, width: 64, height: 100, duration: _playerMeleeFrameDuration },
        ]},
        {tag: "PLAYER_MELEE_WEST",      cls: "Animation", loop: false, cels: [
            //{ xoffset: 128, yoffset: 900, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 128, yoffset: 1000, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 128, yoffset: 1100, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 128, yoffset: 1200, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 128, yoffset: 1300, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 128, yoffset: 1400, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 128, yoffset: 1500, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 128, yoffset: 1600, width: 64, height: 100, duration: _playerMeleeFrameDuration },
        ]},
        {tag: "PLAYER_MELEE_EAST",      cls: "Animation", loop: false, cels: [
            //{ xoffset: 192, yoffset: 900, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 192, yoffset: 1000, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 192, yoffset: 1100, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 192, yoffset: 1200, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 192, yoffset: 1300, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 192, yoffset: 1400, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 192, yoffset: 1500, width: 64, height: 100, duration: _playerMeleeFrameDuration },
            { xoffset: 192, yoffset: 1600, width: 64, height: 100, duration: _playerMeleeFrameDuration },
        ]},

    ]},

      
    // === 901 ---- GOBLIN ----
    { src: "images/enemies.png", cls: "Sheet", assets: [
        {tag: "GOBLIN_IDLE_NORTH",              cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 0 },
        {tag: "GOBLIN_WALK_NORTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 0, width: 50, height: 100, duration: 200 },
            { xoffset: 50, yoffset: 0, width: 50, height: 100, duration: 200 },
            { xoffset: 100, yoffset: 0, width: 50, height: 100, duration: 200 },
        ]},
        {tag: "GOBLIN_IDLE_EAST",               cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 100 },
        {tag: "GOBLIN_WALK_EAST",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 100, width: 50, height: 100, duration: 200 },
            { xoffset: 50, yoffset: 100, width: 50, height: 100, duration: 200 },
            { xoffset: 100, yoffset: 100, width: 50, height: 100, duration: 200 },
        ]},
        {tag: "GOBLIN_IDLE_WEST",               cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 200 },
        {tag: "GOBLIN_WALK_WEST",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 300, width: 50, height: 100, duration: 200 },
            { xoffset: 50, yoffset: 300, width: 50, height: 100, duration: 200 },
            { xoffset: 100, yoffset: 300, width: 50, height: 100, duration: 200 },
        ]},
        {tag: "GOBLIN",                         id: 901, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 300, tileset: true },
        {tag: "GOBLIN_WALK_SOUTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 200, width: 50, height: 100, duration: 200 },
            { xoffset: 50, yoffset: 200, width: 50, height: 100, duration: 200 },
            { xoffset: 100, yoffset: 200, width: 50, height: 100, duration: 200 },
        ]},

    ]},

    // === 902 ---- SLIME ----
    { src: "images/slime.png", cls: "Sheet", assets: [
        {tag: "SLIME_IDLE_NORTH",              cls: "Sprite", width: 50, height: 31, xoffset: 0, yoffset: 0 },
        {tag: "SLIME_WALK_NORTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 0, width: 50, height: 31, duration: 200 },
            { xoffset: 50, yoffset: 0, width: 50, height: 31, duration: 200 },
            { xoffset: 100, yoffset: 0, width: 50, height: 31, duration: 200 },
        ]},
        {tag: "SLIME_IDLE_EAST",               cls: "Sprite", width: 50, height: 31, xoffset: 0, yoffset: 31 },
        {tag: "SLIME_WALK_EAST",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 31, width: 50, height: 31, duration: 200 },
            { xoffset: 50, yoffset: 31, width: 50, height: 31, duration: 200 },
            { xoffset: 100, yoffset: 31, width: 50, height: 31, duration: 200 },
        ]},
        {tag: "SLIME_IDLE_WEST",               cls: "Sprite", width: 50, height: 31, xoffset: 0, yoffset: 62 },
        {tag: "SLIME_WALK_WEST",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 62, width: 50, height: 31, duration: 200 },
            { xoffset: 50, yoffset: 62, width: 50, height: 31, duration: 200 },
            { xoffset: 100, yoffset: 62, width: 50, height: 31, duration: 200 },
        ]},
        {tag: "SLIME",                         id: 902, cls: "Sprite", width: 50, height: 31, xoffset: 0, yoffset: 93, tileset: true },
        {tag: "SLIME_WALK_SOUTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 93, width: 50, height: 31, duration: 200 },
            { xoffset: 50, yoffset: 93, width: 50, height: 31, duration: 200 },
            { xoffset: 100, yoffset: 93, width: 50, height: 31, duration: 200 },
        ]},
    ]},

    // === 903  ---- DWARF AX MAN ----
    { src: "images/dwarfAxeman.png", cls: "Sheet", assets: [
        {tag: "DWARF_AX_MAN_IDLE_NORTH",             cls: "Sprite", width: 50, height: 75, xoffset: 50, yoffset: 0 },
        {tag: "DWARF_AX_MAN_WALK_NORTH",             cls: "Animation", cels: [
            { xoffset: 50, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 50, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 50, yoffset: 0, width: 50, height: 75, duration: 200 },
        ]},
        {tag: "DWARF_AX_MAN_IDLE_EAST",              cls: "Sprite", width: 50, height: 75, xoffset: 150, yoffset: 0 },
        {tag: "DWARF_AX_MAN_WALK_EAST",              cls: "Animation", cels: [
            { xoffset: 150, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 150, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 150, yoffset: 0, width: 50, height: 75, duration: 200 },
        ]},
        {tag: "DWARF_AX_MAN_IDLE_WEST",              cls: "Sprite", width: 50, height: 75, xoffset: 100, yoffset: 0 },
        {tag: "DWARF_AX_MAN_WALK_WEST",              cls: "Animation", cels: [
            { xoffset: 100, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 100, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 100, yoffset: 0, width: 50, height: 75, duration: 200 },
        ]},
        {tag: "DWARF_AX_MAN",                         id: 903, cls: "Sprite", width: 50, height: 75, xoffset: 0, yoffset: 0, tileset: true },
        {tag: "DWARF_AX_MAN_WALK_SOUTH",              cls: "Animation", cels: [
            { xoffset: 0, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 0, yoffset: 0, width: 50, height: 75, duration: 200 },
            { xoffset: 0, yoffset: 0, width: 50, height: 75, duration: 200 },
        ]},

    ]},

    // NPC sheet
    // === 904  ---- NPC 1 ----
    { src: "images/npc.png", cls: "Sheet", assets: [
        {tag: "NPC1",                 id: 904, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 100 },
        {tag: "NPC1_IDLE_NORTH",      cls: "Sprite", width: 50, height: 100, xoffset: 50, yoffset: 100 },
        {tag: "NPC1_IDLE_WEST",       cls: "Sprite", width: 50, height: 100, xoffset: 150, yoffset: 100 },
        {tag: "NPC1_IDLE_EAST",       cls: "Sprite", width: 50, height: 100, xoffset: 200, yoffset: 100 },
    // 905   
        {tag: "NPC2",                 id: 905, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 200 },
        {tag: "NPC2_IDLE_NORTH",      cls: "Sprite", width: 50, height: 100, xoffset: 50, yoffset: 200 },
        {tag: "NPC2_IDLE_WEST",       cls: "Sprite", width: 50, height: 100, xoffset: 150, yoffset: 200 },
        {tag: "NPC2_IDLE_EAST",       cls: "Sprite", width: 50, height: 100, xoffset: 200, yoffset: 200 },
    // 906   
        {tag: "ALCHEMIST",            id: 906, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 100 },
    // 907   
        {tag: "FLETCHER",             id: 907, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 100 },
    // 908   
        {tag: "HEALER",               id: 908, cls: "Sprite", width: 50, height: 100, xoffset: 0, yoffset: 100 },
    ]},

    /* === NON INDEXED ASSETS ================================================================ */

    { src: "images/window_tiles.png", cls: "Stretch", tag: "WINDOW_BORDER", border: 15 },
    { src: "images/buttonFrames.png", cls: "Sheet", assets: [
        // S1-S4 border sizes
        // OPAQ|TRAN - opaque|transparent
        {tag: "BUTTON_TAN_S1_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*0, border: 15 },
        {tag: "BUTTON_TAN_S2_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*0, border: 15 },
        {tag: "BUTTON_TAN_S3_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*0, border: 15 },
        {tag: "BUTTON_TAN_S4_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*0, border: 15 },
        {tag: "BUTTON_TAN_S1_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*1, border: 15 },
        {tag: "BUTTON_TAN_S2_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*1, border: 15 },
        {tag: "BUTTON_TAN_S3_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*1, border: 15 },
        {tag: "BUTTON_TAN_S4_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*1, border: 15 },
        // -- RED
        {tag: "BUTTON_RED_S1_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*2, border: 15 },
        {tag: "BUTTON_RED_S2_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*2, border: 15 },
        {tag: "BUTTON_RED_S3_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*2, border: 15 },
        {tag: "BUTTON_RED_S4_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*2, border: 15 },
        {tag: "BUTTON_RED_S1_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*3, border: 15 },
        {tag: "BUTTON_RED_S2_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*3, border: 15 },
        {tag: "BUTTON_RED_S3_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*3, border: 15 },
        {tag: "BUTTON_RED_S4_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*3, border: 15 },
        // -- GREEN
        {tag: "BUTTON_GRN_S1_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*4, border: 15 },
        {tag: "BUTTON_GRN_S2_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*4, border: 15 },
        {tag: "BUTTON_GRN_S3_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*4, border: 15 },
        {tag: "BUTTON_GRN_S4_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*4, border: 15 },
        {tag: "BUTTON_GRN_S1_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*5, border: 15 },
        {tag: "BUTTON_GRN_S2_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*5, border: 15 },
        {tag: "BUTTON_GRN_S3_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*5, border: 15 },
        {tag: "BUTTON_GRN_S4_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*5, border: 15 },
        // -- BLUE
        {tag: "BUTTON_BLU_S1_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*6, border: 15 },
        {tag: "BUTTON_BLU_S2_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*6, border: 15 },
        {tag: "BUTTON_BLU_S3_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*6, border: 15 },
        {tag: "BUTTON_BLU_S4_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*6, border: 15 },
        {tag: "BUTTON_BLU_S1_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*7, border: 15 },
        {tag: "BUTTON_BLU_S2_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*7, border: 15 },
        {tag: "BUTTON_BLU_S3_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*7, border: 15 },
        {tag: "BUTTON_BLU_S4_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*7, border: 15 },
    ]},

    { src: "images/goldButtonFrames.png", cls: "Sheet", assets: [
        {tag: "BUTTON_GLD_S1_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*0, border: 15 },
        {tag: "BUTTON_GLD_S2_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*0, border: 15 },
        {tag: "BUTTON_GLD_S3_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*0, border: 15 },
        {tag: "BUTTON_GLD_S4_OPAQ",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*0, border: 15 },
        {tag: "BUTTON_GLD_S1_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*0, yoffset: 50*1, border: 15 },
        {tag: "BUTTON_GLD_S2_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*1, yoffset: 50*1, border: 15 },
        {tag: "BUTTON_GLD_S3_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*2, yoffset: 50*1, border: 15 },
        {tag: "BUTTON_GLD_S4_TRAN",     cls: "StretchSprite", width: 50, height: 50, xoffset: 50*3, yoffset: 50*1, border: 15 },
    ]},

];

class DaggerAssets {
    static actionSketches;
    static init() {
        // cache action sketches
        this.actionSketches = {
            "none": {cls: "Text", text: "n", color: new Color(225,0,0,.75)},
            "melee":{cls: "Text", text: "m", color: new Color(225,0,0,.75)},
            "drop": {cls: "Text", text: "d", color: new Color(225,0,0,.75)},
            "grab": {cls: "Text", text: "g", color: new Color(225,0,0,.75)},
            "place": {cls: "Text", text: "p", color: new Color(225,0,0,.75)},
            "ranged": {cls: "Text", text: "r", color: new Color(225,0,0,.75)},
            "open": {cls: "Text", text: "o", color: new Color(225,0,0,.75)},
            "magic": {cls: "Text", text: "#", color: new Color(225,0,0,.75)},
            "talk": {cls: "Text", text: "t", color: new Color(225,0,0,.75)},
        };
    }
}