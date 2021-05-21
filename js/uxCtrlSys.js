
/** ========================================================================
 * The base user experience control system to keep track of all UxCtrl instances
 */
class UxCtrlSys {
    // STATIC VARIABLES ----------------------------------------------------
    static _instance;

    // STATIC PROPERTIES ---------------------------------------------------
    static get instance() {
        if (!this._instance) this._instance = new this();
        return this._instance;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        if (!UxCtrlSys._instance) UxCtrlSys._instance=this;
        // the controller stack (non-active controllers)
        this._stack = [];
        // the current controller
        this._current;
        return UxCtrlSys._instance;
    }

    // PROPERTIES ----------------------------------------------------------
    get current() {
        return this._current;
    }

    get last() {
        return (this._stack.length > 0) ? this._stack[0] : undefined;
    }

    // METHODS -------------------------------------------------------------
    // replace current controller w/ new controller
    assign(ctrl, push=false) {
        if (push) this._stack.unshift(this._current);
        this._current = ctrl;
    }

    // pop last controller from stack and assign as current controller
    pop() {
        if (this._stack.length > 0) {
            let ctrl = this._stack.shift();
            this._current = ctrl;
        }
    }

    clear() {
        for (const ctrl of this._stack) {
            if (ctrl.view) ctrl.view.destroy();
        }
        this._stack = [];
        this._current = undefined;
    }

}