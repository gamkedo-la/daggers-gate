
/** ========================================================================
 * NPC class represents a non-player character that can be interacted with in game
 */
class Npc extends characterClass {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
    }

    // METHODS -------------------------------------------------------------
    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
    }
}