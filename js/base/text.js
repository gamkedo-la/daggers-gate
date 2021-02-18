//export { Text };
//import { Sketch } from './sketch.js';
//import { Util } from './common/util.js';
//import { Font } from './font.js';
//import { Color } from './color.js';
//import { Vect } from './common/vect.js';

/** ========================================================================
 * A string of text rendered to the screen as a sketch.
 */
class Text extends Sketch {
    // STATIC VARIABLES ----------------------------------------------------
    static minFontSize = 5;
    static _textCanvas = document.createElement('canvas');
    static _textCtx = this._textCanvas.getContext('2d');

    // STATIC METHODS ------------------------------------------------------
    static measure(font, text) {
        const ctx = this._textCtx;
        ctx.font = font;
        // Note: hacky... force text to include a capital and a descent letter to make sure we have enough room
        text = "Xg" + text.slice(2);
        const metrics = ctx.measureText(text);
        return new Vect(metrics.width, Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent));
    }
    
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        this._font = Util.objKeyValue(spec, "font", Font.dflt);
        this._color = Util.objKeyValue(spec, "color", new Color(0,0,0,1));
        this._text = Util.objKeyValue(spec, "text", "default text");
        this._outlineWidth = Util.objKeyValue(spec, "outlineWidth", 0);
        this._outlineColor = Util.objKeyValue(spec, "outlineColor", new Color(255,255,255,1));
        this._highlightColor = Util.objKeyValue(spec, "highlightColor", undefined);
        this._valign = Util.objKeyValue(spec, "valign", "middle");
        this._align = Util.objKeyValue(spec, "align", "center");
        // fit - adjust font to best fit sketch size iff sketch size is set
        this._fit = Util.objKeyValue(spec, "fit", true);
        // staticSize - should width/height track to text size
        this._staticSize = ((this.width === 0 && this.height === 0 && !this._fitter) || !this._fit);
        if (this._staticSize) {
            const size = Text.measure(this._font, this._text);
            this._width = size.x;
            this._height = size.y;
        } else {
            this._fitSize = Vect.zero;
            this._resize(true);
        }
    }

    // PROPERTIES ----------------------------------------------------------
    get text() {
        return this._text;
    }
    set text(v) {
        if (v != this._text) {
            this._text = v;
            if (!this._staticSize) {
                this._resize(true);
            } else {
                const size = Text.measure(this._font, this._text);
                this._width = size.x;
                this._height = size.y;
            }
            //this.evtUpdated.trigger();
        }
    }

    // METHODS -------------------------------------------------------------
    _resize(force=false) {
        if (this._staticSize) return;
        if (this.width === 0 && this.height === 0) return;
        // check to see if sketch size has changed since last "fit"...
        let font = this._font;
        let fsize = font.size;
        if (!force && this.size.equals(this._fitSize)) return;
        let tsize = Text.measure(font, this._text);
        this._fitSize = this.size;
        // grow
        if (tsize.x < this.width && tsize.y < this.height) {
            while (tsize.x < this.width && tsize.y < this.height) {
                fsize++;
                font = font.copy({size: fsize});
                tsize = Text.measure(font, this._text);
            }
            this._font = this._font.copy({size: fsize-1});
        // shrink
        } else {
            while (fsize > Text.minFontSize && (tsize.x > this.width || tsize.y > this.height)) {
                fsize--;
                font = font.copy({size: fsize});
                tsize = Text.measure(font, this._text);
            }
            this._font = this._font.copy({size: fsize-1});
        }
    }

    _render(renderCtx, x=0, y=0) {
        // refit text (if necessary based on updated sketch size)
        this._resize();
        if (this._highlightColor) {
            renderCtx.fillStyle = this._highlightColor;
            renderCtx.fillRect(x, y, this.size.x, this.size.y);
        }
        if (!this._staticSize) {
            renderCtx.textAlign = this._align;
            renderCtx.textBaseline = this._valign;
            // update position based on alignment... 
            if (this._align === "center") {
                x += this.width * .5;
            } else if (this._align === "right") {
                x += this.width;
            }
            if (this._valign === "middle") {
                y += this.height * .5;
            } else if (this._valign === "bottom") {
                y += this.height;
            }
        } else {
            renderCtx.textAlign = "left";
            renderCtx.textBaseline = "top";
        }
        renderCtx.fillStyle = this._color;
        renderCtx.font = this._font;
        renderCtx.fillText(this._text, x, y);
        if (this._outlineWidth) {
            renderCtx.lineWidth = this._outlineWidth;
            renderCtx.strokeStyle = this._outlineColor;
            renderCtx.strokeText(this._text, x, y);
        }
    }
}