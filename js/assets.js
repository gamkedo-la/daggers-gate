/*
export { Assets };
import { Util } from "./common/util.js";
import { KeyedGroup } from "./group.js";
import { Sprite } from "./sprite.js";
import { Animation } from "./animation.js";
import { Fmt } from "./common/fmt.js";
import { AudioMgr } from "./audioMgr.js";
import { Audio } from "./audio.js";
*/

/** =======================================================================
 * Assets implements a singleton store for all game asset specifications, stored
 * by tag and provides methods to load, retrieve and generate in-game assets.
 */
class Assets {
    // STATIC VARIABLES ----------------------------------------------------
    static _instance;

    // STATIC PROPERTIES ---------------------------------------------------
    static get instance() {
        if (!this._instance) this._instance = new this();
        return this._instance;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        if (!Assets._instance) Assets._instance=this;
        this._refs = Util.objKeyValue(spec, "refs", {});
        this._loaders = Util.objKeyValue(spec, "loaders", {
            "Image": new ImageLoader({assets: this}),
            "Sheet": new SheetLoader({assets: this, dbg: spec.dbg}),
            //"Audio": new AudioLoader({assets: this}),
        });
        this._generators = Util.objKeyValue(spec, "generators", {
            "Sprite": Sprite,
            "Animation": Animation,
            //"Audio": Audio,
        });
        this._items = new KeyedGroup((v)=>v.tag);
        this.dbg = spec.dbg;
        return Assets._instance;
    }

    // METHODS -------------------------------------------------------------
    add(obj) {
        if (obj) this._items.add(obj)
    }

    get(tag) {
        return this._items.find(tag);
    }

    find(filter) {
        return this._items.findFirst(filter);
    }

    /**
     * Provides asset iterator
     */
    *[Symbol.iterator]() {
        for (const item of this._items) {
            yield item;
        }
    }

    async load() {
        return new Promise( (resolve) => {
            let promises = [];
            for (const ref of this._refs) {
                // resolve asset loader for this ref
                let cls = ref.cls || "Image";
                const loader = this._loaders[cls];
                if (!loader) {
                    console.error("unable to resolve loader for: " + Fmt.ofmt(ref));
                    continue;
                }
                promises.push(loader.load(ref));
            }
            Promise.all(promises).then(() => {
                if (this.dbg) console.log("assets loaded...");
                resolve();
            })
        });
    }

    generate(tag, overrides={}) {
        // pull asset spec
        let spec = this.get(tag);
        if (!spec) return undefined;
        spec = Object.assign({}, spec, overrides);
        // pull asset generator
        let gen = this._generators[spec.cls];
        if (!gen) return undefined;
        return new gen(spec);
    }

    generateFromSpec(spec) {
        // pull asset generator
        let gen = this._generators[spec.cls];
        if (!gen) return undefined;
        return new gen(spec);
    }

}

/**
 * ImageLoader resolves single image references to single Sprite definitions
 * using the entire image.
 * { src: "src/img/dragon.png", cls: "Image", tag: "dragon" },
 */
class ImageLoader {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this._assets = Util.objKeyValue(spec, "assets", Assets.instance);
    }

    // STATIC METHODS ------------------------------------------------------
    static load(src, data={}) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.addEventListener("load", () => resolve( Object.assign({}, {img: img}, data)));
            img.addEventListener("error", err => reject(err));
            img.src = src;
        });
    }

    // METHODS -------------------------------------------------------------
    load(spec) {
        const src = Util.objKeyValue(spec, "src", "undefined");
        return ImageLoader.load(src, spec).then( rec => {
            // build final Sprite spec
            const spec = Object.assign({}, rec, {cls: "Sprite"});
            // add to assets
            if (this.dbg) console.log("ImageLoader loaded: " + Fmt.ofmt(spec));
            if (this._assets) this._assets.add(spec);
        });
    }

}

/**
 * SheetLoader resolves an image reference as a sprite sheet or animation sheet and
 * breaks it into individual animation or image definitions.
 * src: "src/img/human.png", cls: "Sheet", assets: [
 *      {tag: "human1", cls: "Sprite", width: 32, height: 32, xoffset: 32, yoffset: 32 },
 *      {tag: "human.x", cls: "Animation", cels: [
 *          { xoffset: 32*1, yoffset: 32*2, duration: 80 },
 *          { xoffset: 32*2, yoffset: 32*2, duration: 80 },
 *      ]},
 * },
 */
class SheetLoader {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this._assets = Util.objKeyValue(spec, "assets", Assets.instance);
        this._buffer = document.createElement('canvas');
        this._ctx = this._buffer.getContext('2d');
        this.dbg = spec.dbg;
    }

    async loadSprite(sheetImg, asset) {
        // draw referenced image slice to internal/offsceen canvas
        this._buffer.width = asset.width;
        this._buffer.height = asset.height;
        this._ctx.clearRect(0, 0, this._buffer.width, this._buffer.height);
        this._ctx.drawImage(sheetImg, asset.xoffset, asset.yoffset, asset.width, asset.height, 0, 0, asset.width, asset.height);
        // load new image from data URL
        let dataURL = this._buffer.toDataURL();
        let promise = ImageLoader.load(dataURL, Object.assign({}, asset, {src: dataURL}));
        promise.then(rec => {
            // build final Sprite spec
            const spec = Object.assign({}, rec, {cls: "Sprite"});
            if (this.dbg) console.log("SheetLoader loaded: " + Fmt.ofmt(spec));
            // add to assets
            if (this._assets) this._assets.add(spec);
        });
        return promise;
    }

    async loadAnimation(sheetImg, asset) {
        return new Promise( (resolve) => {
            // iterate through referenced animation cels
            const promises = [];
            const animSpec = {
                tag: asset.tag, 
                cls: "Animation", 
                cels: [],
            }
            for (const cel of (asset.cels || [])) {
                // parse cel vars
                const width = Util.objKeyValue(cel, "width", 0);
                const height = Util.objKeyValue(cel, "height", 0);
                const xoffset = Util.objKeyValue(cel, "xoffset", 0);
                const yoffset = Util.objKeyValue(cel, "yoffset", 0);
                const duration = Util.objKeyValue(cel, "duration", 0);
                // draw referenced image slice to internal/offsceen canvas
                this._buffer.width = width;
                this._buffer.height = height;
                this._ctx.clearRect(0, 0, width, height);
                this._ctx.drawImage(sheetImg, xoffset, yoffset, width, height, 0, 0, width, height);
                // load new image from data URL
                promises.push(ImageLoader.load(this._buffer.toDataURL()).then( rec => {
                    // build cel spec
                    const spec = {
                        duration: duration,
                        sketch: new Sprite({img: rec.img}),
                    }
                    // push to animSpec
                    animSpec.cels.push(spec);
                }));
            }
            Promise.all(promises).then(() => {
                // add to assets
                if (this._assets) this._assets.add(animSpec);
                if (this.dbg) console.log("SheetLoader loaded: " + Fmt.ofmt(animSpec));
                resolve();
            })
        });
    }

    // METHODS -------------------------------------------------------------
    async load(spec) {
        const src = Util.objKeyValue(spec, "src", "undefined");
        const assets = Util.objKeyValue(spec, "assets", []);
        const rec = await(ImageLoader.load(src));
        return new Promise( (resolve) => {
            const promises = [];
            const sheet = rec.img;
            for (const asset of assets) {
                if (asset.cls === "Sprite") {
                    promises.push(this.loadSprite(sheet, asset));
                } else if (asset.cls === "Animation") {
                    promises.push(this.loadAnimation(sheet, asset));
                } else {
                    console.error("invalid asset (cls): " + Fmt.ofmt(asset));
                }
            }
            Promise.all(promises).then(() => {
                if (this.dbg) console.log("sheet loaded...");
                resolve();
            })
        });
    }
}

/**
 * AudioLoader resolves short audio references to single Audio definitions.
 * { src: "src/audio/hover.mp3", cls: "Audio", tag: "hover" },
 */
class AudioLoader {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this._assets = Util.objKeyValue(spec, "assets", Assets.instance);
        const amgr = Util.objKeyValue(spec, "amgr", AudioMgr.instance);
        this._audioCtx = Util.objKeyValue(spec, "audioCtx", amgr.audioCtx);
        this.dbg = false;
    }

    // STATIC METHODS ------------------------------------------------------
    static load(ctx, src, data={}) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.responseType = 'arraybuffer';
            req.addEventListener("load", () => {
                ctx.decodeAudioData(req.response,
                    (buffer) => {
                        const rec = Object.assign({}, {audio: buffer}, data);
                        resolve(rec);
                    },
                () => { debug.log('buffer decode failed') });
            });
            req.addEventListener("error", err => reject(err));
            req.open("GET", src, true);
            req.setRequestHeader("Cache-Control", "no-store");
            req.send()
        });
    }

    // METHODS -------------------------------------------------------------
    load(spec) {
        const src = Util.objKeyValue(spec, "src", "undefined");
        const tag = Util.objKeyValue(spec, "tag", "undefined");
        return AudioLoader.load(this._audioCtx, src, {tag: tag}).then( rec => {
            // build final Sprite spec
            const spec = {
                tag: rec.tag,
                cls: "Audio",
                audio: rec.audio,
            }
            // add to assets
            if (this.dbg) console.log("AudioLoader loaded: " + Fmt.ofmt(spec));
            if (this._assets) this._assets.add(spec);
        });
    }

}