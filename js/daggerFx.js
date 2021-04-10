
class FireTrailFx extends GameFx {
    constructor(spec={}) {
        spec.depth = 2;
        super(spec);
        let fx = this;
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            psys: undefined,
            interval: 50,
            count: 3,
            generator: (e) => {
                let xpart = {
                    psys: this,
                    x: e.x,
                    y: e.y,
                    size: Math.round(Math.random()*3) + 1,
                    color: (Math.random() > .75) ? new Color(235,138,6,1) : new Color(255,201,92,1),
                    dx: (Math.random() - .5)*.04,
                    dy: (Math.random() - .5)*.04,
                    ttl: 500,
                }
                return new FadeParticle(xpart);
            },
        }));
    }
}

class IceTrailFx extends GameFx {
    constructor(spec={}) {
        spec.depth = 2;
        super(spec);
        let fx = this;
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            psys: undefined,
            interval: 50,
            count: 3,
            generator: (e) => {
                let xpart = {
                    psys: this,
                    x: e.x,
                    y: e.y,
                    size: Math.round(Math.random()*3) + 1,
                    dx: (Math.random() - .5)*.04,
                    dy: (Math.random() - .5)*.04,
                    ttl: 500,
                }
                return new SnowflakeParticle(xpart);
            },
        }));
    }
}

class ChillFx extends GameFx {
    constructor(spec={}) {
        spec.depth = 2;
        super(spec);
        let fx = this;
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            psys: undefined,
            interval: 50,
            count: 1,
            generator: (e) => {
                let xoff = Math.round(Math.random() * 10) - 5;
                let yoff = Math.round(Math.random() * 20) - 10;
                let xpart = {
                    psys: this,
                    x: e.x + xoff,
                    y: e.y + yoff,
                    size: Math.round(Math.random()*3) + 3,
                    dx: (Math.random() - .5)*.08,
                    dy: (Math.random() - .5)*.08,
                    ttl: 500,
                }
                return new SnowflakeParticle(xpart);
            },
        }));
    }
}

class FireExplosionFx extends GameFx {
    constructor(spec={}) {
        spec.depth = 2;
        super(spec);
        let fx = this;
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            count: 7,
            ttl: 10,
            interval: 100,
            generator: (e) => {
                let xpart = {
                    psys: this,
                    x: e.x,
                    y: e.y,
                    colors: [
                        new Color(235,138,6,1), 
                        new Color(255,201,92,1),
                        new Color(168,36,36,1),
                    ],
                };
                return new ShootingStarParticle(xpart);
            },
        }));
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            psys: undefined,
            interval: 100,
            ttl: 10,
            count: 10,
            generator: (e) => {
                let xpart = {
                    psys: this,
                    x: e.x,
                    y: e.y,
                    size: Math.round(Math.random()*5) + 5,
                    color: (Math.random() > .75) ? new Color(235,138,6,1) : new Color(255,201,92,1),
                    color: Util.choose([
                        new Color(235,138,6,1), 
                        new Color(255,201,92,1),
                        new Color(168,36,36,1),
                    ]),
                    dx: (Math.random() - .5)*.08,
                    dy: (Math.random() - .5)*.08,
                    ttl: 250,
                }
                return new FadeParticle(xpart);
            },
        }));
    }
}

class IceExplosionFx extends GameFx {
    constructor(spec={}) {
        spec.depth = 2;
        super(spec);
        let fx = this;
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            count: 7,
            ttl: 10,
            interval: 100,
            generator: (e) => {
                let xpart = {
                    psys: this,
                    x: e.x,
                    y: e.y,
                    colors: [
                        new Color(94,215,239,1), 
                        new Color(32,150,205,1),
                        new Color(38,98,171,1),
                    ],
                };
                return new ShootingStarParticle(xpart);
            },
        }));
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            psys: undefined,
            interval: 100,
            ttl: 10,
            count: 10,
            generator: (e) => {
                let xpart = {
                    psys: this,
                    x: e.x,
                    y: e.y,
                    size: Math.round(Math.random()*5) + 5,
                    color: Util.choose([
                        new Color(94,215,239,1), 
                        new Color(32,150,205,1),
                        new Color(38,98,171,1),
                    ]),
                    dx: (Math.random() - .5)*.08,
                    dy: (Math.random() - .5)*.08,
                    ttl: 450,
                }
                return new SnowflakeParticle(xpart);
            },
        }));
    }
}

class PoisonExplosionFx extends GameFx {
    constructor(spec={}) {
        spec.depth = 2;
        super(spec);
        let fx = this;
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            psys: undefined,
            interval: 100,
            ttl: 10,
            count: 10,
            generator: (e) => {
                let xpart = {
                    psys: this,
                    x: e.x,
                    y: e.y,
                    size: Math.round(Math.random()*5) + 5,
                    color: Util.choose([
                        new Color(205,224,66,1), 
                        new Color(104,178,41,1),
                        new Color(97,123,71,1),
                    ]),
                    dx: (Math.random() - .5)*.08,
                    dy: (Math.random() - .5)*.08,
                    ttl: 650,
                }
                return new FadeParticle(xpart);
            },
        }));
    }
}

class PoisonFx extends GameFx {
    constructor(spec={}) {
        spec.depth = 2;
        super(spec);
        let fx = this;
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            psys: undefined,
            interval: 50,
            count: 1,
            generator: (e) => {
                let xoff = Math.round(Math.random() * 10) - 5;
                let yoff = Math.round(Math.random() * 20) - 10;
                let xpart = {
                    psys: this,
                    x: e.x + xoff,
                    y: e.y + yoff,
                    size: Math.round(Math.random()*3) + 3,
                    color: Util.choose([
                        new Color(205,224,66,.5), 
                        new Color(104,178,41,.5),
                        new Color(97,123,71,.5),
                    ]),
                    dx: (Math.random() - .5)*.08,
                    dy: (Math.random() - .5)*.08,
                    ttl: 600,
                }
                return new FadeParticle(xpart);
            },
        }));
    }
}

class PoisonTrailFx extends GameFx {
    constructor(spec={}) {
        spec.depth = 2;
        super(spec);
        let fx = this;
        this.ctrls.push(new ParticleEmitter({
            getx: () => fx.x,
            gety: () => fx.y,
            psys: undefined,
            interval: 50,
            count: 3,
            generator: (e) => {
                let xpart = {
                    psys: this,
                    x: e.x,
                    y: e.y,
                    size: Math.round(Math.random()*3) + 1,
                    color: Util.choose([
                        new Color(205,224,66,.75), 
                        new Color(104,178,41,.75),
                        new Color(97,123,71,.75),
                    ]),
                    dx: (Math.random() - .5)*.04,
                    dy: (Math.random() - .5)*.04,
                    ttl: 600,
                }
                return new FadeParticle(xpart);
            },
        }));
    }
}