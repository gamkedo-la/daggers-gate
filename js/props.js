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
        this._transparency = {};
        this._enemies = {};
        this._objects = {};
        this._doors = {};
        this._passable = {};
        this._swaps = {};
        this._specs = {};
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
            // lookup transparency
            if (asset.transparent) {
                this._transparency[id] = true;
                if (this.dbg) console.log(" -- is transparent");
            }
            // lookup enemies
            if (asset.enemy) {
                this._enemies[id] = true;
                if (this.dbg) console.log(" -- is enemy");
            }
            // lookup objects
            if (asset.object) {
                this._objects[id] = true;
                if (this.dbg) console.log(" -- is object");
            }
            // lookup objects
            if (asset.spec) {
                this._specs[id] = asset.spec;
                if (this.dbg) console.log(" -- has spec: " + Fmt.ofmt(asset.spec));
            }
            // lookup doors
            if (asset.door) {
                this._doors[id] = true;
                if (this.dbg) console.log(" -- is door");
            }
            // lookup swappable
            if (asset.swap) {
                this._swaps[id] = asset.swap;
                if (this.dbg) console.log(" -- is swappable with: " + asset.swap);
            }
            // lookup transparency
            if (asset.passable) {
                this._passable[id] = true;
                if (this.dbg) console.log(" -- passable");
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
     * Is the tile associated w/ the given id transparent?
     * @param {*} id 
     */
    isTransparent(id) {
        return this._transparency[id] || false;
    }

    /**
     * Is the tile associated w/ the given id an enemy?
     * @param {*} id 
     */
    isEnemy(id) {
        return this._enemies[id] || false;
    }

    /**
     * Is the tile associated w/ the given id an object?
     * @param {*} id 
     */
    isObject(id) {
        return this._objects[id] || false;
    }

    /**
     * Is the tile associated w/ the given id an object?
     * @param {*} id 
     */
    getSpec(id) {
        return this._specs[id] || {};
    }

    /**
     * Is the tile associated w/ the given id a door?
     * @param {*} id
     */
    isDoor(id) {
        return this._doors[id] || false;
    }

    /**
     * Is the tile associated w/ the given id swappable?
     * @param {*} id
     */
    swappable(id) {
        // swaps hold tag, convert tag to id
        let swaptag = this._swaps[id];
        if (!swaptag) return 0;
        return assets.getId(swaptag);
    }

    /**
     * Is the tile associated w/ the given id transparent?
     * @param {*} id 
     */
    passable(id) {
        return this._passable[id] || false;
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