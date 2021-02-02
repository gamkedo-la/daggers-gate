
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
        this._tilesByTag = {};
        this._transparency = {};
        // setup lookup tables
        this._setup(assets);
        return Props._instance;
    }

    _setup(assets) {
        for (const asset of assets) {
            let id = asset.id;
            if (id === undefined) continue;
            // lookup transparency
            if (asset.transparent) {
                this._transparency[id] = true;
                if (this.dbg) console.log("id: " + id + " tag: " + asset.tag + " is transparent");
            }
            // tag assignment
            this._tags[id] = asset.tag;
            // generate asset
            if (asset.cls === "Sprite" || asset.cls === "Animation") {
                this._tiles[id] = assets.generate(asset.tag);
                this._tilesByTag[asset.tag] = this._tiles[id];
                if (this.dbg) console.log("generated: " + this._tiles[id]);
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

}