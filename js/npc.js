
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
        this.dialogs = spec.dialogs || [];
    }

    // METHODS -------------------------------------------------------------
    tileCollisionHandle(walkIntoTileIndex, walkIntoTileType, nextX, nextY) {
    }

    interact(other) {
        console.log("interact w/ " + other);
        console.log("tag: " + this.tag);
        // load dialog
        // iterate through possible dialog options, checking against predicate.
        let xdialog;
        for (const dinfo of this.dialogs) {
            if (dinfo.predicate(this)) {
                xdialog = daggerDialogs[dinfo.tag];
                if (xdialog) {
                    xdialog.actor = other;
                    xdialog.npc = this;
                    break;
                }
            }
        }
        if (xdialog) ctrlSys.current.onStartDialog(new Dialog(xdialog));
        /*
        let dspec = daggerDialogs[this.tag];
        if (dspec) {
            dspec.actor = other;
            dspec.npc = this;
            ctrlSys.current.onStartDialog(new Dialog(dspec));
        }
        */
    }

}