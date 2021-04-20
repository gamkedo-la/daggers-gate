//export { UxPanel };
//import { Color } from "../color.js";
//import { Sketch } from "../sketch.js";
//import { Util } from "../common/util.js";
//import { UxView } from "./uxView.js";

class UxFader extends UxView {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec) {
        super(spec);
        // fadein => transparent to black
        // fadeout => black to transparent
        this.fadein = spec.fadein;
        this.fadeTTL = spec.fadeTTL || 1000;
        this.fadeRate = 1/this.fadeTTL;
        let color = spec.color || new Color(0,0,0);
        color.alpha = (this.fadein) ? 0 : 1;
        this._sketch = Sketch.generate({
            parent: this,
            cls: "Rect",
            parent: this,
            color: color,
            xfitter: { cls: "FitToParent" },
        });
    }

    // METHODS -------------------------------------------------------------
    update(ctx) {
        super.update(ctx);
        if (this.fadeTTL > 0) {
            this.fadeTTL -= ctx.deltaTime;
            if (this.fadein) {
                this._sketch._color.a += this.fadeRate*ctx.deltaTime;
                if (this._sketch._color.a > 1) this._sketch.color.a = 1;
            } else {
                this._sketch._color.a -= this.fadeRate*ctx.deltaTime;
                if (this._sketch._color.a < 0) this._sketch.color.a = 0;
            }
        }
        if (this._sketch) this._sketch.update(ctx);
    }

    _render(ctx) {
        if (this._sketch) this._sketch.render(ctx, this.xform.minx, this.xform.miny);
    }

}