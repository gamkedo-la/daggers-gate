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
    // STATIC VARIABLES ----------------------------------------------------
    // map for generate function, used by subclasses to "register" themselves to the generator.
    static _genmap = new Map();

    // STATIC METHODS ------------------------------------------------------
    // the registration function for subclasses to "register" themselves to the generator
    static _genreg(cls) {
        const name = cls.prototype.constructor.name;
        this._genmap.set(name, cls);
        return name;
    }
    static generate(spec={}) {
        let cls = this._genmap.get(spec.cls);
        if (cls) return new cls(spec);
        return undefined;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this.text = spec.text || "objective";
    }

    // PROPERTIES ----------------------------------------------------------
    get done() {
        return false;
    }

    // METHODS -------------------------------------------------------------
    track() {
    }
    forget() {
    }

    toString() {
        return Fmt.toString(this.constructor.name, this.text);
    }
}

class CollectionObjective extends Objective {

    constructor(spec={}) {
        super(spec);
        this.getter = spec.getter || (() => 0);
        this.wantCount = spec.count || 1;
    }

    get count() {
        return this.getter();
    }

    get done() {
        this.count >= this.wantCount;
    }

}

class EvtObjective extends Objective {

    constructor(spec={}) {
        super(spec);
        this.filter = spec.filter || ((evt) => false);
        this.event = spec.event;
        this.count = 0;
        this.wantCount = spec.count || 1;
    }

    get done() {
        console.log("object is done: " + (this.count >= this.wantCount));
        return this.count >= this.wantCount;
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
        console.log("handle called for evt: " + Fmt.ofmt(evt));
        if (this.filter && this.filter(evt)) {
            this.count++;
            console.log("added event count - current: " + this.count);
        }
    }


}

/**
 * a single quest, tracked as an object
 */
class Quest {

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this.name = spec.name || "quest";
        this.main = spec.main || false;
        this.text = spec.text || Text.rlorem,
        this.title = spec.title || "name of quest",
        this.objectives = [];
        for (const xobj of spec.objectives || []) {
            let obj = Objective.generate(xobj);
            this.objectives.push(obj);
        }
        this.rewards = spec.rewards || [];
        this._done = false;
    }

    // PROPERTIES ----------------------------------------------------------
    get done() {
        let v = true;
        for (const obj of this.objectives) {
            console.log("q obj.done: " + obj.done);
            v &= obj.done;
        }
        console.log("q done v: " + v);
        return v;
    }

    // METHODS -------------------------------------------------------------
    track() {
        for (const obj of this.objectives) obj.track();
    }

    forget() {
        for (const obj of this.objectives) obj.forget();
    }

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
        this._sides = [];
        //this._side1 = new Quest({title: "this is a side quest #1...", text: Text.rlorem});
        //this._side2 = new Quest({title: "this is a side quest #2...", text: Text.rlorem});
        //this._side3 = undefined;
        this._completed = {};
        return Quests._instance;
    }

    // PROPERTIES ----------------------------------------------------------
    get main() {
        return this._main;
    }

    get side1() {
        return (this._sides.length > 0) ? this._sides[0] : undefined;
    }

    get side2() {
        return (this._sides.length > 1) ? this._sides[1] : undefined;
    }

    get side3() {
        return (this._sides.length > 2) ? this._sides[2] : undefined;
    }

    // PROPERTIES ----------------------------------------------------------
    start(name) {
        console.log("starting quest: " + name);
        // lookup quest by name
        let xquest = daggerQuests[name];
        if (!xquest) {
            console.error("invalid quest: " + name);
        }
        xquest.name = name;
        // instantiate quest
        let quest = new Quest(xquest);
        // track based on type
        if (quest.main) {
            // FIXME: state/error checking to make sure previous main has been completed?
            this._main = quest;
        } else {
            // FIXME: state/error checking to make sure sides isn't full?
            this._sides.push(quest)
        }
        // start tracking progress on quest
        quest.track();
    }

    checkStarted(name) {
        if (this._main && this._main.name === name) {
            return !this._main.done;
        } else {
            for (let i=0; i<this._sides.length; i++) {
                if (this._sides[i] && this._sides[i].name === name) {
                    return !this._sides[i].done;
                }
            }
        }
        return false;
    }

    checkDone(name) {
        if (this.main && this._main.name === name) {
            console.log("main is done: " + this._main.done);
            return this._main.done;
        } else {
            for (let i=0; i<this._sides.length; i++) {
                if (this._sides[i] && this._sides[i].name === name) {
                    return this._sides[i].done;
                }
            }
        }
        return false;
    }

    checkCompleted(name) {
        return name in this._completed;
    }

    finish(name) {
        let quest;
        // find quest state
        if (this._main.name === name) {
            quest = this._main;
            this._main = undefined;
        } else {
            for (let i=0; i<this._sides.length; i++) {
                if (this._sides[i].name === name) {
                    quest = this._sides[i];
                    this._sides.splice(i, 1);
                }
            }
        }
        if (!quest) {
            console.error(`invalid quest state: ${name} is not a tracked quest`);
            return;
        }
        // distribute rewards
        for (const reward of quest.rewards) {
            p1.gatherLoot(reward);
        }
        // set as completed
        this._completed[name] = quest;
    }

}