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
    static lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " + 
                   "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                   "nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit " +
                   "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
                   "culpa qui officia deserunt mollit anim id est laborum.";
    static minFontSize = 5;
    static _textCanvas = document.createElement('canvas');
    static _textCtx = this._textCanvas.getContext('2d');

    static get rlorem() {
        let len = Math.floor(Math.random()*this.lorem.length);
        return  this.lorem.slice(0, len);
    }

    static get rword() {
        let choices = this.lorem.split(" ");
        let idx = Math.floor(Math.random() * choices.length);
        return choices[idx];
    }

    // STATIC METHODS ------------------------------------------------------
    static measure(font, text, hacky=true) {
        const ctx = this._textCtx;
        ctx.font = font;
        // Note: hacky... force text to include a capital and a descent letter to make sure we have enough room
        if (hacky) text = "Xg" + text.slice(2);
        const metrics = ctx.measureText(text);
        let h = Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent);
        let w = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
        return new Vect(w, h);
    }

    static measureWrapHeight(font, text, width, leadingPct=.25) {
        // split the lines
        let lines = this.splitText(font, text, width);
        if (lines.length > 0) {
            let tsize = Text.measure(font, lines[0]);
            return (tsize.y * lines.length-1) * (1+leadingPct) + tsize.y;
        }
        return 0;
    }

    static splitText(font, text, width) {
        // split on spaces
        let tokens = text.split(' ');
        // iterate over tokens...
        let line = "";
        let lines = [];
        for (const token of tokens) {
            let testStr = `${line} ${token}`;
            // measure test string
            let tsize = Text.measure(font, testStr);
            if (tsize.x > width) {
                lines.push(line);
                line = "";
            } else {
                line = testStr;
            }
        }
        if (line) lines.push(line);
        return lines;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        super(spec);
        this._font = Util.objKeyValue(spec, "font", Font.dflt);
        this._color = Util.objKeyValue(spec, "color", new Color(0,0,0,1));
        this._text = Util.objKeyValue(spec, "text", "default text");
        this._wrapLines = [];
        this._wrapLeading;
        this._leadingPct = spec.leadingPct || .25;
        this._outlineWidth = Util.objKeyValue(spec, "outlineWidth", 0);
        this._outlineColor = Util.objKeyValue(spec, "outlineColor", new Color(255,255,255,1));
        this._highlightColor = Util.objKeyValue(spec, "highlightColor", undefined);
        this._valign = Util.objKeyValue(spec, "valign", "middle");
        this._align = Util.objKeyValue(spec, "align", "center");
        // fit - adjust font to best fit sketch size iff sketch size is set
        this._fit = Util.objKeyValue(spec, "fit", true);
        // wrap - wrap text, breaking on spaces, applicable to static sized text only
        this._wrap = Util.objKeyValue(spec, "wrap", true);
        // staticSize - should width/height track to text size
        this._staticSize = ((this.width === 0 && this.height === 0 && !this._fitter) || !this._fit);
        if (this._staticSize) {
            const size = Text.measure(this._font, this._text);
            this._width = size.x;
            this._height = size.y;
            if (this._wrap) {
                this._wrapLines = Text.splitText(this._font, this._text, this.width);
                if (this._wrapLines.length) {
                    let tsize = Text.measure(this._font, this._wrapLines[0]);
                    this._wrapLeading = Math.round(tsize.y * (1+this._leadingPct));
                }
            }
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
                if (this._wrap) {
                    this._wrapLines = Text.splitText(this._font, this._text, this.width);
                    if (this._wrapLines.length) {
                        let tsize = Text.measure(this._font, this._wrapLines[0]);
                        this._wrapLeading = Math.round(tsize.y * (1+this._leadingPct));
                        return (tsize.y * this._wrapLines.length-1) * (1+this._leadingPct) + tsize.y;
                    }
                }
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
        renderCtx.lineWidth = this._outlineWidth;
        renderCtx.strokeStyle = this._outlineColor;
        if (this._staticSize && this._wrap) {
            for (let i=0; i<this._wrapLines.length; i++) {
                const line = this._wrapLines[i];
                renderCtx.fillText(line, x, y + (i*this._wrapLeading));
                if (this._outlineWidth) renderCtx.strokeText(line, x, y + (i*this._wrapLeading));
            }
        } else {
            renderCtx.fillText(this._text, x, y);
            if (this._outlineWidth) renderCtx.strokeText(this._text, x, y);
        }
    }
}