//export { UxPanel };
//import { Color } from "../color.js";
//import { Sketch } from "../sketch.js";
//import { Util } from "../common/util.js";
//import { UxView } from "./uxView.js";

class UxPanel extends UxView {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec) {
        super(spec);
        console.log("xsketch: " + Fmt.ofmt(spec.xsketch));
        this._sketch = (spec.xsketch) ? Sketch.generate(Object.assign({parent: this}, spec.xsketch)) : Sketch.generate({
            cls: "Rect",
            parent: this,
            color: new Color(255,255,255,.25), 
            xfitter: { cls: "FitToParent" },
        });
        // bind event handlers
        Util.bind(this, "onSketchUpdate");
        //this._sketch.evtUpdated
        //if (this._sketch) this._sketch.evtUpdated.listen(this.onSketchUpdate);
    }

    // PROPERTIES ----------------------------------------------------------
    get sketch() {
        return this._sketch;
    }

    set sketch(v) {
        if (v !== this._sketch) {
            //if (this._sketch) this._sketch.evtUpdated.ignore(this.onSketchUpdate);
            if (this._sketch.parent) this._sketch.parent = undefined;
            this._sketch = v;
            v.parent = this;
            //if (this._sketch) this._sketch.evtUpdated.listen(this.onSketchUpdate);
            this.evtUpdated.trigger();
        }
    }

    // EVENT HANDLERS ------------------------------------------------------
    onSketchUpdate(evt) {
        // propagate update
        //this.evtUpdated.trigger();
        //console.log("onSketchUpdate");
    }

    // METHODS -------------------------------------------------------------
    update(ctx) {
        super.update(ctx);
        if (this._sketch) this._sketch.update(ctx);
    }

    _render(ctx) {
        if (this._sketch) this._sketch.render(ctx, this.xform.minx, this.xform.miny);
    }

}