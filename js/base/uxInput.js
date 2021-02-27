
class UxInput extends UxView {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec) {
        super(spec);
        this._sketch = (spec.xsketch) ? Sketch.generate(Object.assign({parent: this}, spec.xsketch)) : Sketch.generate({
            cls: "Rect",
            parent: this,
            color: new Color(255,255,255,.25), 
            xfitter: { cls: "FitToParent" },
        });
        this._cursor = (spec.xcursor) ? Sketch.generate(Object.assign({parent: this}, spec.xcursor)) : Sketch.generate({
            cls: "Rect",
            color: new Color(255,255,255,.5), 
            width: 3,
            height: this.xform.height *.8,
        });
        this._cursorIdx = 0;
        this._cursx = 0;
        this._cursorBlinkRate = spec.cursorBlinkRate || 500;
        this._cursorBlinkTTL = this._cursorBlinkRate;
        this._cursorOn = true;
        this._charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        const xtext = Object.assign( {xfitter: {cls: "Fitter", ref: this, top: .15, bottom: .1}, text:"", align: "left"}, spec.xtext); 
        this._text = new Text(xtext);
        this._textOffset = spec.textOffset || 5;
        this._active = false;
        // bind event handlers
        Util.bind(this, "onSketchUpdate", "onMouseClick", "onKeyDown");
        // listen for mouse click
        this.mouse.evtClicked.listen(this.onMouseClick);
        // listen for key events
        document.addEventListener("keydown", this.onKeyDown);
        // events
        this.__evtClicked = new Channel(evtCode("clicked"), {actor: this, mouse:this.mouse});
    }

    // PROPERTIES ----------------------------------------------------------
    get active() {
        return this._active;
    }

    get sketch() {
        return this._sketch;
    }

    get text() {
        return this._text.text;
    }
    set text(v) {
        this._text.text = v;
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

    get cursIdx() {
        return this._cursorIdx;
    }
    set cursIdx(v) {
        if (v > this._text.text.length) v = this._text.text.length;
        if (v < 0) v = 0;
        if (v > 0) {
            let t = this._text.text.slice(0,v);
            let m = Text.measure(this._text._font, this._text.text.slice(0,v), false);
            this._cursx = m.x;
        } else {
            this._cursx = 0;
        }
        this._cursorIdx = v;
    }

    get cursx() {
        return this._textOffset + this._cursx;
    }
    get cursy() {
        let v = 0;
        v += Math.floor(this._cursor.height * .1);
        return v;
    }

    // EVENTS --------------------------------------------------------------
    get evtClicked() { return this.__evtClicked; }

    // EVENT HANDLERS ------------------------------------------------------
    onMouseClick(evt) {
        const mousePos = this.mouse.pos;
        const localMousePos = this.xform.getLocal(mousePos);
        if (this.bounds.contains(localMousePos)) {
            if (this._pressedSound) this._pressedSound.play();
            // activate/deactivate
            this._active = (!this._active);
            if (this._active) {
                this.cursIdx = this._text.text.length;
            }
            this.evtClicked.trigger();
        } else {
            if (this._active) this._active = false;
        }
    }

    onSketchUpdate(evt) {
        // propagate update
        //this.evtUpdated.trigger();
        //console.log("onSketchUpdate");
    }

    onKeyDown(evt) {
        // ignore key events if not active
        //console.log("onKeyDown: " + evt.key + " shifted: " + evt.shiftKey);
        if (!this._active) return;
        // handle escape
        if (evt.key === "Escape") {
            this._active = false;
            return;
        }
        // handle backspace
        if (evt.key === "Backspace") {
            if (this.cursIdx > 0) {
                this._text.text = Util.spliceStr(this._text.text, this.cursIdx-1, 1);
                this.cursIdx -= 1;
            }
            return;
        }

        // handle arrows
        if (evt.key === "ArrowLeft") {
            if (this.cursIdx > 0) this.cursIdx -= 1;
            return;
        }
        if (evt.key === "ArrowRight") {
            if (this.cursIdx < this._text.text.length) this.cursIdx += 1;
            return;
        }
        if (evt.key === "ArrowUp") {
            this.cursIdx = 0;
            return;
        }
        if (evt.key === "ArrowDown") {
            this.cursIdx = this._text.text.length;
            return;
        }
        // handle delete
        if (evt.key === "Delete") {
            if (this.cursIdx < this._text.text.length) {
                this._text.text = Util.spliceStr(this._text.text, this.cursIdx, 1);
            }
            return;
        }
        // ignore other meta keys
        if (evt.key.length > 1) return;
        let key = evt.key;
        // check charset
        if (!this._charset.includes(key)) return;
        // good to go...
        this._text.text += key;
        this.cursIdx += 1;
    }

    // METHODS -------------------------------------------------------------
    update(ctx) {
        super.update(ctx);
        if (this._sketch) this._sketch.update(ctx);
        // cursor blink handling
        if (this._cursorBlinkTTL) {
            this._cursorBlinkTTL -= ctx.deltaTime;
            if (this._cursorBlinkTTL <= 0) {
                this._cursorBlinkTTL = this._cursorBlinkRate;
                this._cursorOn = (!this._cursorOn);
            }
        }
    }

    _render(ctx) {
        if (this._sketch) this._sketch.render(ctx, this.xform.minx, this.xform.miny);
        if (this._text) this._text.render(ctx, this.xform.minx+this._textOffset, this.xform.miny);
        if (this._active) {
            if (this._cursorOn) this._cursor.render(ctx, this.xform.minx+this.cursx, this.xform.miny+this.cursy);
        }
    }

    destroy() {
        // stop listening on key events
        document.removeEventListener("keydown", this.onKeyDown);
        // stop listening on mouse events
        this.mouse.evtClicked.ignore(this.onMouseClick);
        super.destroy();
    }

}