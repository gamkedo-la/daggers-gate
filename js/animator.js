
/** ========================================================================
 * An animator is responsible for setting up the animation for a character based on current state.
 */
class Animator {
    static idle =           0;
    static idleWest =       1;
    static idleEast =       2;
    static idleNorth =      3;
    static idleSouth =      4;
    static walkWest =       11;
    static walkEast =       12;
    static walkNorth =      13;
    static walkSouth =      14;

    // PROPERTIES ----------------------------------------------------------
    get width() {
        if (this._anim) return this._anim.width;
        return 0;
    }
    get height() {
        if (this._anim) return this._anim.height;
        return 0;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        // lookup animations
        this._anims = {};
        for (const [id, tag] of Object.entries(spec.animations || {})) {
            let sketch = assets.generate(tag);
            if (sketch) {
                this._anims[id] = sketch;
            } else {
                console.error("missing sketch for animation: " + tag);
            }
        }
        this._state = Animator.idle;
        this._pendingState;
        this._anim = this.getAnim(this._state);
    }

    // METHODS -------------------------------------------------------------
    getAnim(state) {
        return this._anims[state];
    }

    getTransition(from, want) {
        // FIXME: need to pass/parse transitions before we can look them up.
        return undefined;
    }

    update(ctx) {
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

}