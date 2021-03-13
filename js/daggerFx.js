
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