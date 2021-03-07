
/** ========================================================================
 * NPC class represents a non-player character that can be interacted with in game
 */
class Npc extends characterClass {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        // set spec defaults
        spec.kind = spec.kind || "npc";
        this.wantAction = actionKindMap[this.kind];
    }

    // METHODS -------------------------------------------------------------
    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
    }
}