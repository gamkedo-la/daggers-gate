//export { ViewMgr };
//import { Util } from "./common/util.js";
//import { SortedGroup } from "./group.js";

// all views under specific layer/depth
class Layer {
    constructor(spec={}) {
        this.layer = spec.layer || 0;
        this.depth = spec.depth || 0;
        this._views = [];
    }

    add(view) {
        if (!this._views.includes(view)) this._views.push(view);
    }

    remove(view) {
        let idx = this._views.indexOf(view);
        if (idx !== -1) {
            this._views.splice(idx, 1);
        }
    }

    render(ctx) {
        for (const view of this._views) {
            if (view.useCamera) ctx.translate(-camera.x, -camera.y);
            view.render(ctx);
            if (view.useCamera) ctx.translate(camera.x, camera.y);
        }
    }
}

class ViewMgr {
    // STATIC VARIABLES ----------------------------------------------------
    static _instance;
    static dfltCanvasName = "gameCanvas";

    // STATIC PROPERTIES ---------------------------------------------------
    static get instance() {
        if (!this._instance) this._instance = new this({});
        return this._instance;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        if (!ViewMgr._instance) ViewMgr._instance = this;
        this._dfltCanvas = Util.objKeyValue(spec, "dfltCanvas", document.getElementById(ViewMgr.dfltCanvasName));
        this._dfltRenderCtx = Util.objKeyValue(spec, "dfltRenderCtx", this.dfltCanvas.getContext("2d"));
        this._layers = new SortedGroup(this.layerCmp);
        this._views = [];
        this._maxDepth = Util.objKeyValue(spec, "maxDepth", 100);
        this.dbg = spec.dbg;
        return ViewMgr._instance;
    }

    // PROPERTIES ----------------------------------------------------------
    get dfltCanvas() {
        return this._dfltCanvas;
    }

    get dfltRenderCtx() {
        return this._dfltRenderCtx;
    }

    // METHODS -------------------------------------------------------------
    layerIdx(layer, depth) {
        return (layer * this._maxDepth) + depth;
    }


    layerCmp(v1, v2) {
        // layer
        if (v1.layer !== v2.layer) return v1.layer - v2.layer;
        // depth
        return (v1.depth - v2.depth);
    }

    getLayer(layer, depth) {
        // check if layer exists
        let lc = this._layers.findFirst((v) => v.layer === layer && v.depth === depth)
        if (!lc) {
            // create new layer
            lc = new Layer({layer: layer, depth: depth});
            // keep track of layer
            this._layers.add(lc);
        }
        return lc;
    }

    update(ctx) {
        // update all managed views
        for(const view of this._views) {
            // trigger view update
            view.update(ctx);
            // handle view layer/depth modification
            let lidx = this.layerIdx(view.layer, view.depth);
            if (lidx !== view.lidx) {
                // remove from old layer
                let ol = Math.floor(view.lidx / this._maxDepth);
                let od = view.lidx % this._maxDepth;
                let olayer = this.getLayer(ol, od);
                olayer.remove(view);
                // add to new layer
                let nlayer = this.getLayer(view.layer, view.depth);
                nlayer.add()
                // mark layer index in view
                view.lidx = lidx;
            }
        }
    }

    render() {
        // clear current context
        this.dfltRenderCtx.fillStyle = 'black';
        this.dfltRenderCtx.fillRect(0, 0, this.dfltCanvas.width, this.dfltCanvas.height);
        // render in layer/depth sorted order
        for (const layer of this._layers) {
            layer.render(this.dfltRenderCtx);
        }
    }

    add(view) {
        if (this.dbg) console.log("view manager adding view: " + view);
        // get layer for view
        const layer = this.getLayer(view.layer, view.depth);
        // add view to layer, stamp w/ layer index
        layer.add(view);
        view.lidx = this.layerIdx(view.layer, view.depth);
        // add view to master view list
        this._views.push(view);
    }

    remove(view) {
        if (this.dbg) console.log("view manager removing view: " + view);
        // lookup layer view for view
        const layer = this.getLayer(view.layer, view.depth);
        // remove view to layer view
        layer.remove(view);
        // remove view from master view list
        let idx = this._views.indexOf(view);
        if (idx !== -1) this._views.splice(idx, 1);
    }

    clear() {
        this._layers.clear();
        this._views.clear();
    }

}