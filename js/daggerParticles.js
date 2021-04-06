// a simple fade particle
class FadeParticle extends Particle {
    constructor(spec={}) {
        super(spec);
        this.dx = spec.dx || .01;
        this.dy = spec.dy || 0;
        this.size = spec.size || 3;
        this.color = spec.color || new Color(255,201,92,1);
        this.ttl = spec.ttl || 1000;
        this.fade = this.color.a;
        this.fadeRate = this.fade/this.ttl;
    }

    update(ctx) {
        let dt = ctx.deltaTime;
        if (this.done) return;
        // update position
        this.x += (this.dx * dt);
        this.y += (this.dy * dt);
        // fade... slowly fade to nothing
        this.fade -= (dt * this.fadeRate);
        this.color.a = this.fade;
        // time-to-live
        this.ttl -= dt;
        if (this.ttl <= 0) this._done = true;
    }

    render(ctx) {
        if (this._done) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.color.toString();
        ctx.fill();
    }

}

class ShootingStarParticle extends Particle {
    constructor(spec={}) {
        super(spec);
        // pick an angle
        let angle = Math.random() * Math.PI*2;
        let speed = spec.speed || .05;
        this.dx = Math.sin(angle) * speed;
        this.dy = Math.cos(angle) * speed;
        let fallSpeed = spec.fallSpeed || speed*.5;
        this.ddx = 0;
        this.ddy = fallSpeed;
        this.colors = spec.colors || [new Color(255,201,92,1)];
        this.minSize = spec.minSize || 1;
        this.maxSize = spec.maxSize || 3;
        this.subTTL = spec.subTTL || 250;
        this.ttl = spec.ttl || 500;
        this.maxTTL = this.ttl;
        this.emitChance = spec.emitChance || .3;
        this.emitDelay = spec.emitDelay || 10;
        this.emitTTL = 0;
        this.emitCount = spec.emitCount || 1;
        this.children = [];
    }

    add(child) {
        this.children.push(child);
    }
    remove(child) {
        let idx = this.children.indexOf(child);
        if (idx !== -1) this.children.splice(idx, 1);
    }

    update(ctx) {
        let dt = ctx.deltaTime;
        // children
        for (let i=this.children.length-1; i>=0; i--) {
            const child = this.children[i];
            // update each object
            child.update(ctx);
            // if any children are done, remove them
            if (child.done) this.children.splice(i, 1);
        }
        if (this.children.length === 0 && this.ttl <= 0) this.done = true;
        if (this.done) return;
        // time-to-live
        if (this.ttl > 0) {
            this.ttl -= dt;
            // update position
            this.x += (this.dx * dt);
            this.y += (this.dy * dt);
            let ttlp = 1-(this.ttl/this.maxTTL);
            this.x += (this.ddx * dt * ttlp);
            this.y += (this.ddy * dt * ttlp);
            // emit
            if (this.emitTTL > 0) {
                this.emitTTL -= dt;
            } else {
                for (let i=0; i<this.emitCount; i++) {
                    if (Math.random() < this.emitChance) {
                        let size = (Math.random() * (this.maxSize-this.minSize)) + this.minSize;
                        let color = Util.choose(this.colors).copy();
                        let xpart = {
                            psys: this,
                            x: this.x,
                            y: this.y,
                            size: size,
                            color: color,
                            dx: (Math.random() - .5)*.04,
                            dy: (Math.random() - .5)*.04,
                            ttl: this.subTTL,
                        }
                        let p = new FadeParticle(xpart);
                        this.emitTTL = this.emitDelay;
                    }
                }
            }
        }

    }

    render(ctx) {
        if (this._done) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.minSize, 0, Math.PI*2);
        ctx.fillStyle = this.colors[0].toString();
        ctx.fill();
        // children
        for (const child of this.children) child.render(ctx);
    }

}

class SnowflakeParticle extends Particle {
    constructor(spec={}) {
        super(spec);
        this.dx = spec.dx || .01;
        this.dy = spec.dy || 0;
        this.size = spec.size || 3;
        this.width = this.size * .25;
        this.dblSize = this.size * 2;
        this.color = spec.color || new Color(94,215,239,1);
        this.ttl = spec.ttl || 1000;
        this.fade = this.color.a;
        this.fadeRate = this.fade/this.ttl;
        this.angle = Math.random() * Math.PI*2;
        let rotate = Object.hasOwnProperty("rotate") ? spec.rotate : (Math.random() * Math.PI);
        this.rotateRate = rotate/this.ttl;
    }

    update(ctx) {
        let dt = ctx.deltaTime;
        if (this.done) return;
        // update position
        this.x += (this.dx * dt);
        this.y += (this.dy * dt);
        // fade... slowly fade to nothing
        this.fade -= (dt * this.fadeRate);
        this.color.a = this.fade;
        // rotatation...
        this.angle += (dt * this.rotateRate);
        // time-to-live
        this.ttl -= dt;
        if (this.ttl <= 0) this._done = true;
    }

    render(ctx) {
        if (this._done) return;
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color.toString();
        ctx.fillRect(-this.size, -this.width, this.dblSize, this.width*2);
        ctx.fillRect(-this.width, -this.size, this.width*2, this.dblSize);
        ctx.rotate(-this.angle);
        ctx.translate(-this.x, -this.y);
    }

}