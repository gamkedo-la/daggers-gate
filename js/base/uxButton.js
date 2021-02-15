//export { UxButton };
//import { Color } from "../color.js";
//import { Sketch } from "../sketch.js";
//import { Text } from "../text.js";
//import { Util } from "../common/util.js";
//import { UxView } from "./uxView.js";
//import { getCode as evtCode } from '../event.js';
//import { Channel } from "../emitter.js";

class UxButton extends UxView {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec) {
        super(spec);
        const xtext = Object.assign( {xfitter: {cls: "Fitter", ref: this, top: .15, bottom: .1}}, Util.objKeyValue(spec, "xtext", {})); 
        this._textSketch = new Text(xtext);
        const xunpressed = Object.assign( {cls: "Rect", xfitter: {cls: "Fitter", ref: this}, color: new Color(255,255,255,.25)}, Util.objKeyValue(spec, "xunpressed", {})); 
        this._unpressedSketch = Sketch.generate(xunpressed);
        const xhighlight = Object.assign( {cls: "Rect", xfitter: {cls: "Fitter", ref: this}, color: new Color(255,255,255,.5)}, Util.objKeyValue(spec, "xhighlight", {})); 
        this._highlightSketch = Sketch.generate(xhighlight);
        const xpressed = Object.assign( {cls: "Rect", xfitter: {cls: "Fitter", ref: this}, color: new Color(255,255,255,.75)}, Util.objKeyValue(spec, "xpressed", {})); 
        this._pressedSketch = Sketch.generate(xpressed);
        this._pressedSound = spec.pressedSound;
        this._activeSketch = this._unpressedSketch;
        // bind event handlers
        Util.bind(this, "onSketchUpdate", "onMouseClick");
        // listen for mouse click
        this._mouseClickedFcn = this.onMouseClick.bind(this);
        this.mouse.evtClicked.listen(this._mouseClickedFcn);
        // listen for sketch updates
        if (this._textSketch) this._textSketch.evtUpdated.listen(this.onSketchUpdate);
        if (this._unpressedSketch) this._unpressedSketch.evtUpdated.listen(this.onSketchUpdate);
        if (this._pressedSketch) this._pressedSketch.evtUpdated.listen(this.onSketchUpdate);
        if (this._highlightSketch) this._highlightSketch.evtUpdated.listen(this.onSketchUpdate);
        // events
        this.__evtClicked = new Channel(evtCode("clicked"), {actor: this, mouse:this.mouse});
    }

    // PROPERTIES ----------------------------------------------------------
    get text() {
        return this._textSketch.text;
    }
    set text(v) {
        this._textSketch.text = v;
    }

    // EVENTS --------------------------------------------------------------
    get evtClicked() { return this.__evtClicked; }

    // EVENT HANDLERS ------------------------------------------------------
    onMouseClick(evt) {
        const mousePos = this.mouse.pos;
        const localMousePos = this.xform.getLocal(mousePos);
        if (this.bounds.contains(localMousePos)) {
            if (this._pressedSound) this._pressedSound.play();
            this.evtClicked.trigger();
        }
    }
    onSketchUpdate(evt) {
        // propagate update
        if (evt.actor === this._activeSketch || evt.actor === this._textSketch) this.evtUpdated.trigger();
    }

    // METHODS -------------------------------------------------------------
    update(ctx) {
        super.update(ctx);
        if (!this.active) return;
        // determine active sketch based on mouse state
        let wantSketch = this._unpressedSketch;
        if (this.mouseDown) {
            wantSketch = this._pressedSketch;
        } else if (this.mouseOver) {
            wantSketch = this._highlightSketch;
        }
        if (wantSketch !== this._activeSketch)  {
            this._activeSketch = wantSketch;
            this.evtUpdated.trigger();
        }
        // update active sketch
        if (this._activeSketch) this._activeSketch.update(ctx);
    }

    _render(ctx) {
        let x = this.xform.minx;
        let y = this.xform.miny;
        // render button sketch
        if (this._activeSketch) this._activeSketch.render(ctx, x, y);
        // render text sketch
        if (this._textSketch) this._textSketch.render(ctx, x, y);
    }

    destroy() {
        // stop listening on mouse events
        this.mouse.evtClicked.ignore(this._mouseClickedFcn);
        super.destroy();
    }
}