
/** ========================================================================
 * An animator is responsible for setting up the animation for a character based on current state.
 */
class Animator {
    static none =           0;
    static idle =           1;
    static idleWest =       2;
    static idleEast =       3;
    static idleNorth =      4;
    static idleSouth =      5;
    static walkWest =       11;
    static walkEast =       12;
    static walkNorth =      13;
    static walkSouth =      14;
    static open =           20;
    static closed =         21;
    static solved =         22;
    static active =         23;
    static attackWest =     31;
    static attackEast =     32;
    static attackNorth =    33;
    static attackSouth =    34;
    static death =          35;
    static idleTransparent =36;
    static openTransparent =37;
    static delay =          38;

    // PROPERTIES ----------------------------------------------------------
    get width() {
        if (this._anim) return this._anim.width;
        return 0;
    }
    get height() {
        if (this._anim) return this._anim.height;
        return 0;
    }
    get animIdx() {
        return this._anim.animIdx;
    }
    get done() {
        return this._anim.done;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        // animations/transition state mappings
        this._animations = spec.animations || {};
        this._trans = spec.trans || [];
        // sketch cache
        this._sketches = {};
        this._state = Animator.none;
        this._pendingState;
        this._anim = Sketch.zero;
    }

    // METHODS -------------------------------------------------------------
    getSketch(tag) {
        // lookup sketch in cache
        let sketch = this._sketches[tag];
        if (sketch) return sketch;
        // special case... "none" tag always renders as Sketch.zero (a dummy/blank sketch)
        if (tag === "none") {
            sketch = Sketch.zero;
            this._sketches[tag] = sketch;
            return sketch;
        }
        // otherwise... attempt to generate asset for sketch tag
        sketch = assets.generate(tag);
        if (sketch) {
            this._sketches[tag] = sketch;
        } else {
            console.error("missing sketch for animation: " + tag);
            sketch = Sketch.zero;
        }
        return sketch;
    }

    getAnim(state) {
        // lookup sketch tag for given state
        let tag = this._animations[state];
        if (!tag) return undefined;
        return this.getSketch(tag);
    }

    getTransition(from, to) {
        // lookup to determine state transition
        for (const tran of this._trans) {
            if (trans.from === from && trans.to === to) {
                let tag = tran.tag;
                return this.getSketch(tag);
            }
        }
        return undefined;
    }

    update(ctx) {
        // update the current animation state
        if (this._anim) this._anim.update(ctx);
        // compare desired state to current state (pending or actual)
        let wantState = ctx.state || Animator.idle;
        let fromState = (this._pendingState) ? this._pendingState : this._state;
        // check for no state change
        if (wantState === fromState) {
            // if currently in transition/pending state, check for animation completion
            if (this._pendingState) {
                if (this._anim.done) {
                    this._anim = this.getAnim(this._pendingState);
                    this._pendingState = undefined;
                    this._state = this._pendingState;
                }
            }
            return;  
        }
        // we have a new state transition...
        // -- check for animation for given state
        let anim = this.getAnim(wantState);
        if (!anim) return;
        anim.reset();
        // -- check for transition to a pending state...
        let trans = this.getTransition(fromState, wantState);
        // -- if we have a transition... start transition animation and set current state to pending
        let newState = wantState;
        if (trans) {
            this._anim = trans;
            newState = "x" + fromState + "." + wantState;
        // -- otherwise, no transition, start state animation directly
        } else {
            this._anim = anim;
        }
        // assign state
        this._state = newState;
    }

    render(ctx, x=0, y=0) {
        if (this._anim) this._anim.render(ctx, x, y);
    }

    toString() {
        return Fmt.toString(this.constructor.name, this._state, Fmt.ofmt(this._animations));
    }

}