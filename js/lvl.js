/**
 * Class to represent game level, including all static tiles
 */
class Level {
    constructor(spec={}) {
        this.width = spec.width || 16;
        this.height = spec.height || 12;
        this.nentries = this.width * this.height;
        this.bg = spec.bg || new Array(this.nentries);
        this.fg = spec.fg || new Array(this.nentries);
        this.sketchWidth = spec.sketchWidth || 50;
        this.sketchHeight = spec.sketchHeight || 50;
        this.halfWidth = this.sketchWidth * .5;
        this.halfHeight = this.sketchHeight * .5;
        this.fgsketches = new Array(this.nentries);
        this.bgsketches = new Array(this.nentries);
        this.enemies = [];
        this.objects = [];
        this.rooms = unexploredRoomClass.fromGrid(spec.rooms || []);
        this.init();
    }
    
    ifromidx(idx) {
        return idx % this.width;
    }
    jfromidx(idx) {
        return Math.floor(idx/this.width);
    }

    xfromidx(idx) {
        return (idx % this.width) * this.sketchWidth;
    }
    yfromidx(idx) {
        return Math.floor(idx/this.width) * this.sketchHeight;
    }

    contains(x,y) {
        if (x>0 && x<this.width*this.sketchWidth && y>0 && y<this.height*this.sketchHeight) return true;
        return false;
    }

    idxFromXY(x,y) {
        let i = Math.floor(x/this.sketchWidth);
        let j = Math.floor(y/this.sketchHeight);
        if (i < 0) i = 0;
        if (j < 0) j = 0;
        if (i >= this.width) i = this.width-1;
        if (j >= this.height) j = this.height-1;
        return i + this.width*j;
    }

    idxFromIJ(i,j) {
        if (i >= this.width) i = this.width-1;
        if (j >= this.height) j = this.height-1;
        return i + this.width*j;
    }

    init() {
        // iterate through level data
        for (let i=0; i<this.nentries; i++) {
            // lookup enemies
            if (props.isEnemy(this.fg[i])) {
                // don't draw sketch as level data
                let id = this.fg[i];
                this.fg[i] = 0;
                // instantiate enemy
                let enemy = new enemyClass({
                    sketch: props.getImage(id), 
                    collider: "red",
                    name: props.getName(id),
                    x: this.ifromidx(i) * this.sketchWidth + this.halfWidth,
                    y: this.jfromidx(i) * this.sketchHeight + this.halfHeight,
                });
                this.enemies.push(enemy);
            }
            // lookup objects
            // lookup sprites
            this.bgsketches[i] = this.genSketch(this.bg[i]);
            this.fgsketches[i] = this.genSketch(this.fg[i]);
        }
    }

    findId(id) {
        for (let i=0; i<this.nentries; i++) {
            if (this.fg[i] === id) {
                return {i: this.ifromidx(i), j: this.jfromidx(i)};
            }
        }
        return undefined;
    }
    findIdPos(id) {
        for (let i=0; i<this.nentries; i++) {
            if (this.fg[i] === id) {
                return {x: this.ifromidx(i)*this.sketchWidth + this.halfWidth, y: this.jfromidx(i) * this.sketchHeight + this.halfHeight};
            }
        }
        return undefined;
    }

    /**
     * get fg tile index at given x,y
     */
    fg(x, y) {
        let i = y * this.width + x;
        return (i < this.nentries) ? this.fg[i] : 0;
    }
    /**
     * get fg tile index at given array idx i
     */
    fgi(i) {
        return (i < this.nentries) ? this.fg[i] : 0;
    }
    /**
     * set fg tile index at given x,y to v.  reset sketch
     */
    setfg(x, y, v) {
        let i = y * this.width + x;
        if (i < this.nentries) {
            this.fg[i] = v;
            this.fgsketches[i] = this.genSketch(v);
        }
    }
    /**
     * set fg tile index at given idx i to v.  reset sketch
     */
    setfgi(i, v) {
        if (i < this.nentries) {
            this.fg[i] = v;
            this.fgsketches[i] = this.genSketch(v);
        }
    }

    /**
     * get bg tile index at given x,y
     */
    bg(x, y) {
        let i = y * this.width + x;
        return (i < this.nentries) ? this.bg[i] : 0;
    }
    /**
     * get bg tile index at given array idx i
     */
    bgi(i) {
        return (i < this.nentries) ? this.bg[i] : 0;
    }
    /**
     * set bg tile index at given x,y to v.  reset sketch
     */
    setbg(x, y, v) {
        let i = y * this.width + x;
        if (i < this.nentries) {
            this.bg[i] = v;
            this.bgsketches[i] = this.genSketch(v);
        }
    }
    /**
     * set bg tile index at given idx i to v.  reset sketch
     */
    setbgi(i, v) {
        if (i < this.nentries) {
            this.bg[i] = v;
            this.bgsketches[i] = this.genSketch(v);
        }
    }

    genSketch(id) {
        if (!id) return undefined;
        let spriteSpec = assets.find((v) => v.id === id);
        if (!spriteSpec) return undefined;
        return assets.generateFromSpec(spriteSpec);
    }

    update(ctx) {
        // update tiles
        for (let i=0; i<this.nentries; i++) {
            if (this.bgsketches[i] && this.bgsketches[i].update) this.bgsketches[i].update(ctx);
            if (this.fgsketches[i] && this.fgsketches[i].update) this.fgsketches[i].update(ctx);
        }
        // move enemies
        for(let i=0; i<this.enemies.length; i++){
            this.enemies[i].move();
        }
        // move game objects
        for(let i=0; i<this.objects.length; i++){
            this.objects[i].move();
        }
        // check collisions
		for(let i=0; i<this.enemies.length; i++){
			this.enemies[i].checkCollisionAgainst(p1);
		}
		for(let i=0; i<this.enemies.length; i++){
			p1.checkCollisionAgainst(this.enemies[i]);
		}
		for(let i=0; i<this.objects.length; i++){
			this.objects[i].checkCollisionAgainst(p1);
        }
        // check for player entering rooms
        for (let i=0; i<this.rooms.length; i++) {
            this.rooms[i].playerExploredRooms(p1);
        }
    }

    render(ctx) {
        // render tiles
        let y = 0;
        let idx = 0;
        for (let j=0; j<this.height; j++) {
            let x = 0;
            for (let i=0; i<this.width; i++) {
                if (this.bgsketches[idx]) this.bgsketches[idx].render(ctx, x, y);
                if (this.fgsketches[idx]) this.fgsketches[idx].render(ctx, x, y);
                x += this.sketchWidth;
                idx++;
            }
            y += this.sketchHeight;
        }
        // render enemies
		for(let i=0; i<this.enemies.length; i++){
			this.enemies[i].draw();
		}
        // render objects
		for(var i=0; i<this.objects.length; i++){
			this.objects[i].draw();
		}
        // render rooms
		for(var i=0; i<this.rooms.length; i++){
			this.rooms[i].draw();
		}
    }

}