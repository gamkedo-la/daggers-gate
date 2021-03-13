
/**
 * A visual game effect...
 */
class GameFx {
    constructor(position) {
        this.getx = spec.getx;
        this.gety = spec.gety;
        this._x = spec.x || 0;
        this._y = spec.y || 0;
        this.geteol = spec.geteol || ((ctx) => false);
        this.eol = false;
        this.depth = (spec.hasOwnProperty("depth")) ? spec.depth : spec.dfltDepth || 0;
        this.layer = (spec.hasOwnProperty("layer")) ? spec.layer : spec.dfltLayer || 0;
        // controllers... 
        // -- emitters or other objects acting as a controller of the effect.  controllers are executed until they are done, then popped from list
        this.ctrls = [];
        // finishers...
        // -- same as controllers, executed when other controllers exit, or when eol is triggered
        this.finishers = [];
        // children...
        // -- any particles or dependent effects that need to be part of the update/rendering sequence
        this.children = [];
        this.done = false;
        // vmgr...
        // Hackety hack hack: treating this a game view and as such, will manage through the ViewMgr.
        // so all instances of GameFx will be added to ViewMgr and lifetimes will be managed through fx.update
        this.vmgr = spec.vmgr || ViewMgr.instance;
        this.vmgr.add(this);
    }

    get x() {
        return (this.getx) ? this.getx() : this._x;
    }
    get y() {
        return (this.gety) ? this.gety() : this._y;
    }

    add(child) {
        this.children.push(child);
    }

    update(ctx) {
        // check for end of life of fx
        if (!this.eol && this.geteol(ctx)) {
            this.eol = true;
        }
        // iterate through controllers
        for (let i=this.ctrls.length-1; i>=0; i++) {
            // if controller is done, or fx eol... remove ctrl
            if (this.ctrls[i].done && this.eol) {
                this.ctrls[i].destroy();
                this.ctrls.pop();
            // otherwise, update top controller
            } else {
                this.ctrls[i].update(ctx);
                break;
            }
        }
        // if no controllers left, transition to eol
        if (this.ctrls.length === 0) this.eol = true;
        // if eol, iterate through finishers
        if (this.eol) {
            for (let i=this.finishers.length-1; i>=0; i++) {
                // if finisher is done, remove
                if (this.finishers[i].done) {
                    this.finishers[i].destroy();
                    this.finishers.pop();
                // otherwise, update top finisher
                } else {
                    this.finishers[i].update(ctx);
                    break;
                }
            }
        }
        // if no finishers left, transition to done
        if (this.finishers.length === 0) {
            this.done = true;
            this.destroy();
        // otherwise... update children
        } else {
            for (let i=this.children.length-1; i>=0; i++) {
                // check for done
                if (this.children[i].done) {
                    this.children.splice(i, 1);
                // or update
                } else {
                    this.children.update(ctx);
                }
            }
        }
    }

    render(ctx) {
        // only children are rendered
        for (let i=0; i<this.children.length; i++) {
            if (this.children[i].render) this.children[i].render(ctx);
        }
    }

    destroy() {
        this.vmgr.remove(this);
    }

    toString() { 
        return Fmt.toString(this.constructor.name);
    }

}
