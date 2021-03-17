//import { Fmt } from "../../../github/spark/src/js/common/fmt";

const TILE = {};

/** =======================================================================
 * Props implements a singleton store for all game asset properties, providing
 * lookup functions for various tile properties.
 */
class Props {
    // STATIC VARIABLES ----------------------------------------------------
    static _instance;

    // STATIC PROPERTIES ---------------------------------------------------
    static get instance() {
        if (!this._instance) this._instance = new this();
        return this._instance;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        if (!Props._instance) Props._instance=this;
        let assets = spec.assets || Assets.instance;
        this._tiles = {};
        this._tags = {};
        this._names = {};
        this._tilesByTag = {};
        this._npcs = {};
        this._enemies = {};
        this._objects = {};
        this._passable = {};
        this._permeable = {};
        this._bgr = {};
        this.dbg = spec.dbg;
        // setup lookup tables
        this._setup(assets);
        return Props._instance;
    }

    _setup(assets) {
        for (const asset of assets) {
            let id = asset.id;
            if (id === undefined) continue;
            if (this.dbg) console.log("parsing id: " + id + " tag: " + asset.tag);
            // setup TILE.X variable
            if (asset.tag && asset.hasOwnProperty("id")) {
                TILE[asset.tag] = asset.id;
                if (this.dbg) console.log(" -- assigned TILE." + asset.tag);
            }
            // lookup npcs
            if (asset.tag in daggerNpcs) {
                let spec = daggerNpcs[asset.tag];
                if (spec) {
                    this._npcs[id] = spec;
                    if (this.dbg) console.log(" -- is npc w/ spec: " + Fmt.ofmt(spec));
                }
            }
            // lookup enemies
            if (asset.tag in daggerEnemies) {
                let spec = daggerEnemies[asset.tag];
                if (spec) {
                    this._enemies[id] = spec;
                    if (this.dbg) console.log(" -- is enemy w/ spec: " + Fmt.ofmt(spec));
                }
            }
            // lookup objects
            if (asset.tag in daggerObjects) {
                let spec = daggerObjects[asset.tag];
                if (spec) {
                    this._objects[id] = spec;
                    if (this.dbg) console.log(" -- is object w spec: " + Fmt.ofmt(spec));
                }
            }
            // lookup passable
            if (asset.passable) {
                this._passable[id] = true;
                if (this.dbg) console.log(" -- passable");
            }
            // lookup permeable (can you shoot through it?)
            if (asset.permeable) {
                this._permeable[id] = true;
                if (this.dbg) console.log(" -- permeable");
            }
            // lookup bgr
            if (asset.bgr) {
                this._bgr[id] = true;
                if (this.dbg) console.log(" -- bgr");
            }
            // tag assignment
            this._tags[id] = asset.tag;
            // name assignment
            if (asset.name) {
                this._names[id] = asset.name;
            }
            this._tags[id] = asset.tag;
            // generate asset
            if (asset.cls === "Sprite" || asset.cls === "Animation") {
                this._tiles[id] = assets.generate(asset.tag);
                this._tilesByTag[asset.tag] = this._tiles[id];
                if (this.dbg) console.log(" -- generated: " + this._tiles[id]);
            }
        }
    }

    /**
     * Is the tile associated w/ the given id an enemy?
     * @param {*} id 
     */
    isNpc(id) {
        return this._npcs[id] !== undefined;
    }

    /**
     * Is the tile associated w/ the given id an enemy?
     * @param {*} id 
     */
    isEnemy(id) {
        return this._enemies[id] !== undefined;
    }

    /**
     * Is the tile associated w/ the given id an enemy?
     * @param {*} id 
     */
    getNpcSpec(id) {
        return this._npcs[id] || false;
    }

    /**
     * Is the tile associated w/ the given id an enemy?
     * @param {*} id 
     */
    getEnemySpec(id) {
        return this._enemies[id] || false;
    }

    /**
     * Is the tile associated w/ the given id an object, if so, return object spec...
     * @param {*} id 
     */
    getObjectSpec(id) {
        return this._objects[id] || false;
    }

    /**
     * Is the tile associated w/ the given id passable?
     * @param {*} id 
     */
    passable(id) {
        return this._passable[id] || false;
    }

    /**
     * Is the tile associated w/ the given id passable?
     * @param {*} id 
     */
    permeable(id) {
        return this._permeable[id] || false;
    }

    /**
     * Is the tile associated w/ the given id set for bg rendering?
     * @param {*} id 
     */
    bgr(id) {
        return this._bgr[id] || false;
    }

    /**
     * Retrieve the sketch (sprite/animation) associated w/ the given tile ID.
     * @param {*} id 
     */
    getImage(id) {
        return this._tiles[id];
    }

    /**
     * Retrieve the sketch (sprite/animation) associated w/ the given tile tag.
     * @param {*} tag 
     */
    getImageByTag(tag) {
        return this._tilesByTag[tag];
    }

    /**
     * Retrieve the sketch (sprite/animation) associated w/ the given tile ID.
     * @param {*} id 
     */
    getTag(id) {
        return this._tags[id];
    }

    /**
     * Retrieve the nicely formatted name for the given ID.
     * @param {*} id 
     */
    getName(id) {
        if (this._names.hasOwnProperty(id)) {
            return this._names[id];
        }
        // return tag if no name is found
        return this._tags[id];
    }

}