
/**
 * A visual game effect...
 * 
 * Hackety hack hack: treating this a game view and as such, will manage through the ViewMgr.
 * so all instances of GameFx will be added to ViewMgr and lifetimes will be managed through fx.update
 */
class GameFx {
    constructor(position) {
        this.getx = spec.getx;
        this.gety = spec.gety;
        this._x = spec.x || 0;
        this._y = spec.y || 0;
        this.geteol = spec.geteol || ((ctx) => false);

        this.fxs = [];
        this.children = [];
        this._done = false;
    }

    get x() {
        return (this.getx) ? this.getx() : this._x;
    }
    get y() {
        return (this.gety) ? this.gety() : this._y;
    }

    get done() {
        return this.fxs.length === 0;
    }

    update(ctx) {
        if (this.eol(ctx)) {
        }
        // check for effect completion
        kkkkkkkkkkkkk
    }

    render(ctx) {
    }



    toString() { 
        return "[GameFx:" + this._position.x + "," + this._position.y + "]"; 
    }

}
