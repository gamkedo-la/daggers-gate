
/** ========================================================================
 * NPC class represents a non-player character that can be interacted with in game
 */
class Npc extends characterClass {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        spec.kind = spec.kind || "npc";
        super(spec);
        // set spec defaults
        this.wantAction = actionKindMap[this.kind];
    }

    // METHODS -------------------------------------------------------------
    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
    }

    interact(other) {
        console.log("interact w/ " + other);
        currentCtrl.onStartDialog();
    }

}