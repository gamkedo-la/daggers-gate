
class FireTrailFx extends GameFx {

    constructor(spec={}) {
        super(spec);

        let em = new ParticleEmitter({
            interval: 50,
            count: 3,
            generator: (e) => {
                let xpart = {
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
        });

    }

}