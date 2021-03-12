
/** ========================================================================
 * The base particle class
 */
class Particle {

    // CONSTRUCTOR ---------------------------------------------------------
    /**
     * Create a new particle
     */
    constructor(spec={}) {
        this.psys = spec.psys || ParticleSystem.instance;
        this.x = spec.x || 0;
        this.y = spec.y || 0;
        this._done = false;
        this.psys.add(this);
    }

    // PROPERTIES ----------------------------------------------------------
    /**
     * Indicates if the particle has completed its life-cycle (and can be discarded)
     */
    get done() {
        return this._done;
    }
    set done(value) {
        this._done = (value) ? true : false;
    }

    // METHODS -------------------------------------------------------------
    update(ctx) {
    }

    render(ctx) {
    }

    destroy() {
        this.psys.remove(this);
    }

}

/** ========================================================================
 * A basic particle emitter which calls the specified generator function based on interval
 */
class ParticleEmitter {

    // CONSTRUCTOR ---------------------------------------------------------
    /**
     * Create a new particle emitter
     */
    constructor(spec={}) {
        this.psys = spec.psys || ParticleSystem.instance;
        this.x = spec.x || 0;
        this.y = spec.y || 0;
        this.generator = spec.generator || (() => undefined),
        this.interval = spec.interval || 1000,
        this.jitter = spec.jitter || 0,
        this.ttl = spec.ttl || 0,
        this.count = spec.count || 1,
        this._done = false;
        // compute next time to emit
        this.tte;
        this.nextTTE();
        this.psys.add(this);
    }

    // PROPERTIES ----------------------------------------------------------
    /**
     * Indicates if the emitter has completed its life-cycle (and can be discarded)
     */
    get done() {
        return this._done;
    }
    set done(value) {
        this._done = (value) ? true : false;
    }

    // METHODS -------------------------------------------------------------
    /**
     * computes new time to emit based on interval and jitter
     */
    nextTTE() {
        this.tte = this.interval;
        console.log("tte: " + this.tte);
        if (this.jitter) {
            let ij = this.jitter * this.interval;
            this.tte += ((Math.random() * ij * 2) - ij);
        }
        if (this.tte < 10) this.tte = 10; // minimum interval;
    }

    /**
     * run generator to emit particle
     */
    emit() {
        for (let i=0; i<this.count; i++) {
            let p = this.generator(this);
            this.psys.add(p);
        }
    }

    /**
     * Update the particle emitter.  This is where new particles get generated based on the emitter schedule.
     */
    update(ctx) {
        let dt = ctx.deltaTime;
        if (!this.first) {
            this.first = true;
            this.emit();
        }
        // don't update if emitter is done
        if (this.done) return;
        // update running emitter lifetime (if set)
        if (this.ttl > 0) {
            this.ttl -= dt;
            if (this.ttl <= 0) {
                this._done = true;
                return;
            }
        }
        // update tte
        this.tte -= dt;
        // run generator if tte is zero
        if (this.tte <= 0) {
            this.emit();
            // compute next tte
            this.nextTTE();
        }
    }

    destroy() {
        this.psys.remove(this);
    }
}

/** ========================================================================
 * The main particle controller (singleton)
 */
class ParticleSystem {
    // STATIC VARIABLES ----------------------------------------------------
    static _instance;

    // STATIC PROPERTIES ---------------------------------------------------
    static get instance() {
        if (!this._instance) this._instance = new this();
        return this._instance;
    }

    // CONSTRUCTOR ---------------------------------------------------------
    constructor(spec={}) {
        this.items = [];
    }

    // METHODS -------------------------------------------------------------
    /**
     * Add a tracked particle or emitter
     * @param {*} p
     */
    add(p) {
        this.items.push(p);
    }

    /**
     * Remove a particle or emitter from tracked list
     * @param {*} p
     */
    remove(p) {
        let idx = this.items.indexOf(p);
        if (idx >= 0) this.items.splice(idx, 1);
    }

    /**
     * Execute the main update thread for all things particles
     */
    update(ctx) {
        // iterate through tracked items
        for (let i=this.items.length-1; i>=0; i--) {
            const item = this.items[i];
            // update each object
            item.update(ctx);
            // if any items are done, remove them
            if (item.done) this.items.splice(i, 1);
        }
    }

    render(ctx) {
        for (let i=this.items.length-1; i>=0; i--) {
            const item = this.items[i];
            if (item.render) item.render(ctx);
        }
    }


}