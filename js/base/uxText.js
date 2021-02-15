//export { UxText };
//import { Text } from "../text.js";
//import { Util } from "../common/util.js";
//import { UxView } from "./uxView.js";

class UxText extends UxView {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec) {
        super(spec);
        const textSpec = Object.assign( {xfitter: {cls: "Fitter", ref: this}}, Util.objKeyValue(spec, "xtext", {})); 
        this._textSketch = new Text(textSpec);
    }

    // PROPERTIES ----------------------------------------------------------
    get text() {
        return this._textSketch.text;
    }
    set text(v) {
        this._textSketch.text = v;
        this.evtUpdated.trigger();
    }

    // METHODS -------------------------------------------------------------
    _render(ctx) {
        if (this._textSketch) this._textSketch.render(ctx, this.xform.minx, this.xform.miny);
    }

}
