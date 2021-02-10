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
        this.maxx = this.sketchWidth * this.width;
        this.maxy = this.sketchHeight * this.height;
        this.halfWidth = this.sketchWidth * .5;
        this.halfHeight = this.sketchHeight * .5;
        this.fgsketches = new Array(this.nentries);
        this.bgsketches = new Array(this.nentries);
        this.enemies = [];
        this.objects = [];
        this.exits = {};
        this.spawns = {};
        this.rooms = unexploredRoomClass.fromGrid(spec.rooms || []);
        let exits = spec.exits || [];
        let spawns = spec.spawns || {};
        this.init(exits, spawns);
    }

    init(exitSpecs, spawnSpecs) {
        // setup level exits
        for (const exitSpec of exitSpecs) {
            let x = this.sketchWidth * (exitSpec.x || 0);
            let y = this.sketchHeight * (exitSpec.y || 0);
            let idx = this.idxfromij(exitSpec.x, exitSpec.y);
            this.exits[idx] = Object.assign({}, exitSpec, {x: x, y:y});
        }
        // setup level spawn points
        for (const [name, spec] of Object.entries(spawnSpecs)) {
            let x = this.sketchWidth * (spec.x || 0) + this.halfWidth;
            let y = this.sketchHeight * (spec.y || 0) + this.halfHeight;
            this.spawns[name] = Object.assign({}, spec, {x: x, y:y});
        }
        // iterate through level data
        for (let i=0; i<this.nentries; i++) {
            // lookup enemies
            if (props.isEnemy(this.fg[i])) {
                // don't draw sketch as level data
                let id = this.fg[i];
                this.fg[i] = 0;
                let tag = props.getTag(id);
                // instantiate enemy
                let enemy = new enemyClass({
                    tileid: id,
                    tag: tag,
                    sketch: assets.get(tag), 
                    collider: "red",
                    name: props.getName(id),
                    x: this.xfromidx(i, true),
                    y: this.yfromidx(i, true),
                });
                this.enemies.push(enemy);
            }
            // lookup objects
            let spec = props.getObjectSpec(this.fg[i]);
            if (spec) {
                // don't draw as lvl data
                let id = this.fg[i];
                this.fg[i] = 0;
                let tag = props.getTag(id);
                spec = Object.assign({
                    tileid: id,
                    tag: tag,
                    sketch: assets.get(tag),
                    name: props.getName(id),
                    x: this.xfromidx(i, true),
                    y: this.yfromidx(i, true),

                }, spec);
                let obj = new gameObjectClass(spec);
                this.objects.push(obj);
            }
            // FIXME
            // lookup sprites
            this.bgsketches[i] = this.genSketch(this.bg[i]);
            this.fgsketches[i] = this.genSketch(this.fg[i]);
        }
    }

    ifromidx(idx) {
        return idx % this.width;
    }
    jfromidx(idx) {
        return Math.floor(idx/this.width);
    }

    xfromidx(idx, center=false) {
        return (((idx % this.width) * this.sketchWidth) + ((center) ? this.halfWidth : 0));
    }
    yfromidx(idx, center=false) {
        return ((Math.floor(idx/this.width) * this.sketchHeight) + ((center) ? this.halfHeight : 0));
    }

    containsPoint(x,y) {
        return (x>=0 && x<=this.maxx && y>=0 && y<=this.maxy) 
    }

    idxfromxy(x,y) {
        let i = Math.floor(x/this.sketchWidth);
        let j = Math.floor(y/this.sketchHeight);
        if (i < 0) i = 0;
        if (j < 0) j = 0;
        if (i >= this.width) i = this.width-1;
        if (j >= this.height) j = this.height-1;
        return i + this.width*j;
    }

    idxfromij(i,j) {
        if (i >= this.width) i = this.width-1;
        if (j >= this.height) j = this.height-1;
        return i + this.width*j;
    }

    upFromIdx(idx) {
        return (idx > this.width) ? idx-this.width : idx;
    }
    downFromIdx(idx) {
        return (idx < this.nentries-this.width) ? idx+this.width : idx;
    }
    leftFromIdx(idx) {
        return (idx%this.width > 0) ? idx-1 : idx;
    }
    rightFromIdx(idx) {
        return (idx%this.width < this.width) ? idx+1 : idx;
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
                return {x: this.xfromidx(i, true), y: this.yfromidx(i, true)};
            }
        }
        return undefined;
    }
    findObject(filter) {
        for (const obj of this.objects) {
            if (filter(obj)) return obj;
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

    placeCharacter(chr,  spawn) {
        // find named spawn
        let sp = this.spawns[spawn];
        if (!sp) {
            console.error("can't spawn: " + chr + ", spawn point: " + spawn + " does not exist in current level");
            return;
        }
        chr.x = sp.x;
        chr.y = sp.y;
        if (this.dbg) console.log("placed character: " + chr + " at: " + x + "," + y);
    }

    destroyObject(item) {
        let idx = this.objects.indexOf(item);
        if (idx != -1) this.objects.splice(idx, 1);
    }

    destroyEnemy(item) {
        let idx = this.enemies.indexOf(item);
        if (idx != -1) this.enemies.splice(idx, 1);
    }

    update(ctx) {
        // update tiles
        for (let i=0; i<this.nentries; i++) {
            if (this.bgsketches[i] && this.bgsketches[i].update) this.bgsketches[i].update(ctx);
            if (this.fgsketches[i] && this.fgsketches[i].update) this.fgsketches[i].update(ctx);
        }
        // move enemies
        for(let i=0; i<this.enemies.length; i++){
            this.enemies[i].move(ctx);
        }
        // move game objects
        for(let i=0; i<this.objects.length; i++){
            this.objects[i].move(ctx);
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
        // -- compute visible range from camera
        let mini = Math.floor(camera.x/this.sketchWidth);
        let minj = Math.floor(camera.y/this.sketchWidth);
        let maxi = Math.min(this.width, Math.floor(camera.maxx/this.sketchWidth)+1);
        let maxj = Math.min(this.height, Math.floor(camera.maxy/this.sketchHeight)+1);
        //if (mini !== 0 || minj !== 0 || maxi !== this.width || maxj !== this.height) console.log("saved x: " + (this.width - (maxi-mini)) + " y: " + (this.height - (maxj-minj)));
        let y = minj * this.sketchHeight;
        for (let j=minj; j<maxj; j++) {
            let idx = this.idxfromij(mini, j);
            let x = mini * this.sketchWidth;
            for (let i=mini; i<maxi; i++) {
                if (this.bgsketches[idx]) this.bgsketches[idx].render(ctx, x, y);
                if (this.fgsketches[idx]) this.fgsketches[idx].render(ctx, x, y);
                x += this.sketchWidth;
                idx++;
            }
            y += this.sketchHeight;
        }
        // render enemies
		for(let i=0; i<this.enemies.length; i++){
            let enemy = this.enemies[i];
            if (!enemy.visible) continue;
            if (camera.containsRect(enemy.x, enemy.y, this.sketchWidth, this.sketchHeight)) {
                enemy.draw();
            }
		}
        // render objects
		for(var i=0; i<this.objects.length; i++){
            let obj = this.objects[i];
            if (!obj.visible) continue;
            if (camera.containsRect(obj.x, obj.y, this.sketchWidth, this.sketchHeight)) {
                obj.draw();
            }
		}
        // render rooms
		for(var i=0; i<this.rooms.length; i++){
            this.rooms[i].draw();
		}
    }

}

/** ========================================================================
 * class to load levels and cache instantiated levels
 */
class LevelLoader {
    constructor(spec={}) {
        this._cache = {};
        this._specs = spec.lvls || {};
        this.dbg = spec.dbg || false;
    }

    load(name) {
        let lvl;
        // level exists in cache?
        if (name in this._cache) {
            lvl = this._cache[name];
        // otherwise, need to instantiate new level
        } else {
            // level exists in specs?
            let spec = this._specs[name];
            if (!spec) {
                console.error("spec for level: " + name + " does not exist!");
                return undefined
            }
            lvl = new Level(spec);
            this._cache[name] = lvl;
        }
        // assign current level
        currentLevel = lvl;
        if (this.dbg) console.log("finished loading level: " + name);
    }

}