/**
 * Example quest walk through ...
 * 
 * Talk to NPC about quest, agree to start...
 *      -> This assigns quest to Quests system
 *      -> NPC dialog changes state from "Start Quest" dialog to "Done Yet?".
 * Quest objectives (in plain terms)
 *      -> Go to zone XYZ
 *      -> Kill X enemies of type Y
 *      -> Collect artifact Z
 *      -> Return to NPC
 * Return to NPC
 *      -> NPC dialog changes state from "Done Yet?" to "Finish"
 *      -> Quest reward achieved through dialog w/ NPC
 *      -> Next quest started
 * 
 */


class Objective {
    constructor(spec={}) {
        this.text = spec.text;
    }
    get done() {
        return false;
    }
}

class CollectionObjective extends Objective {

    constructor(spec={}) {
        this.getter = spec.getter || (() => 0);
        this.wantCount = spec.count || 1;
    }

    get count() {
        return this.getter();
    }

    get done() {
        this.count === this.wantCount;
    }

}

class EvtObjective extends Objective {

    constructor(spec={}) {
        this.filter = spec.filter || ((evt) => false);
        this.event = spec.event;
        this.count = 0;
        this.wantCount = spec.count || 1;
    }

    get done() {
        this.count === this.wantCount;
    }

    // start tracking the objective...
    track() {
        if (this.event) {
            this.event.listen(this.handle.bind(this));
        }
    }

    // stop tracking objective...
    forget() {
        if (this.event) {
            this.event.ignore(this.handle.bind(this));
        }
    }

    handle(evt) {
        if (this.filter && this.filter(evt)) {
            this.count++;
        }
    }


}

/**
 * a single quest, tracked as an object
 */
class Quest {

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this.main = spec.main || false;
        this.text = spec.text || Text.rlorem,
        this.title = spec.title || "name of quest",
        this.objectives = spec.objectives || {},
        this._done = false;
    }

    // PROPERTIES ----------------------------------------------------------
    get done() {
        return this._done;
    }
    set done(v) {
        return this._done = v;
    }

    // METHODS -------------------------------------------------------------
    toString() {
        return Fmt.toString(this.constructor.name, this.title, this.done);
    }

}

/**
 * The global quest system, used to track all quest state
 */
class Quests {
    // STATIC VARIABLES ----------------------------------------------------
    static _instance;

    // STATIC PROPERTIES ---------------------------------------------------
    static get instance() {
        if (!this._instance) this._instance = new this();
        return this._instance;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        if (!Quests._instance) Quests._instance=this;
        this._main = new Quest({title: "There and Back Again", text: Text.rlorem,});
        this._side1 = new Quest({title: "this is a side quest #1...", text: Text.rlorem});
        this._side2 = new Quest({title: "this is a side quest #2...", text: Text.rlorem});
        this._side3 = undefined;
        this._completed = {};
        return Quests._instance;
    }

    // PROPERTIES ----------------------------------------------------------
    get main() {
        return this._main;
    }

    get side1() {
        return this._side1;
    }

    get side2() {
        return this._side2;
    }

    get side3() {
        return this._side3;
    }

    // 

}