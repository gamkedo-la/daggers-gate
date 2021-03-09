
/**
 * a single quest, tracked as an object
 */
class Quest {

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this.text = spec.text || Text.rlorem,
        this.title = spec.title || "name of quest",
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
        this._main = new Quest({title: "this is the main quest for now..."});
        this._side1 = new Quest({title: "this is a side quest #1..."});
        this._side2 = new Quest({title: "this is a side quest #2..."});
        this._side3 = undefined;
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

}