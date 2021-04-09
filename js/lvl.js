/**
 * Class to represent game level, including all static tiles
 */
class Level {
    constructor(spec={}) {
        this.name = spec.name || "lvl";
        this.width = spec.width || 16;
        this.height = spec.height || 12;
        this.nentries = this.width * this.height;
        this.bg = (spec.bg) ? spec.bg.slice() : new Array(this.nentries);
        this.fg = (spec.fg) ? spec.fg.slice() : new Array(this.nentries);
        this.sketchWidth = spec.sketchWidth || 50;
        this.sketchHeight = spec.sketchHeight || 50;
        this.maxx = this.sketchWidth * this.width;
        this.maxy = this.sketchHeight * this.height;
        this.halfWidth = this.sketchWidth * .5;
        this.halfHeight = this.sketchHeight * .5;
        this.fgsketches = new Array(this.nentries);
        this.bgsketches = new Array(this.nentries);
        this.lockPredicate = (spec.hasOwnProperty("lockPredicate")) ? spec.lockPredicate : () => false;
        this.editor = spec.editor || false;
        this.npcs = [];
        this.enemies = [];
        this.objects = [];
        this.exits = {};
        this.spawns = {};
        this.rooms = unexploredRoomClass.fromGrid(spec.rooms || []);
        let exits = spec.exits || [];
        let spawns = spec.spawns || {};
        this.dbg = spec.dbg;
        this.dbgNoEnemy = spec.dbgNoEnemy;
        // bind functions
        Util.bind(this, "idxfromxy");
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
            if (!this.editor) {
                let spec;
                // lookup enemies
                spec = props.getEnemySpec(this.fg[i]);
                if (spec) {
                    // don't draw sketch as level data
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
                    // instantiate enemy
                    if (!this.dbgNoEnemy) {
                        //console.log("creating enemy: " + Fmt.ofmt(spec));
                        let enemy = new enemyClass(spec);
                        this.enemies.push(enemy);
                    }
                }
                // lookup npcs
                spec = props.getNpcSpec(this.fg[i]);
                if (spec) {
                    // don't draw sketch as level data
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
                    // instantiate enemy
                    if (!this.dbgNoNpc) {
                        let npc = new Npc(spec);
                        this.npcs.push(npc);
                    }
                }

                // lookup objects
                spec = props.getObjectSpec(this.fg[i]);
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
            }
            // FIXME
            // lookup sprites
            this.bgsketches[i] = this.genSketch(this.bg[i]);
            this.fgsketches[i] = this.genSketch(this.fg[i]);
        }
    }

    isLocked() {
        return this.lockPredicate(this);
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

    isClearAtIdx(idx) {
        let fgtile = currentLevel.fgi(idx);
        let bgtile = currentLevel.bgi(idx);
        if (fgtile && !props.passable(fgtile)) return false;
        if (bgtile && !props.passable(bgtile)) return false;
        //console.log("fg bg clear");
        let x = this.xfromidx(idx);
        let y = this.yfromidx(idx);
        let bounds = new Bounds(x,y,this.sketchWidth,this.sketchHeight);
        let obj = this.findAll((v) => v.collider && v.collider.blocking && v.collider.overlaps(bounds), true);
        //console.log("obj: " + obj);
        if (obj) return false;
        return true;
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

    findObject(filter, first=false) {
        let match = [];
        for (const obj of this.objects) {
            if (filter(obj)) {
                if (first) return obj;
                match.push(obj);
            }
        }
        return (first) ? undefined : match;
    }
    findEnemy(filter, first=false) {
        let match = [];
        for (const obj of this.enemies) {
            if (filter(obj)) {
                if (first) return obj;
                match.push(obj);
            }
        }
        return (first) ? undefined : match;
    }
    findNpc(filter, first=false) {
        let match = [];
        for (const obj of this.npcs) {
            if (filter(obj)) {
                if (first) return obj;
                match.push(obj);
            }
        }
        return (first) ? undefined : match;
    }

    findAll(filter, first) {
        let match = [];
        if (filter(p1)) {
            match.push(p1);
        }
        for (const obj of this.objects) {
            if (filter(obj)) {
                if (first) return obj;
                match.push(obj);
            }
        }
        for (const obj of this.enemies) {
            if (filter(obj)) {
                if (first) return obj;
                match.push(obj);
            }
        }
        for (const obj of this.npcs) {
            if (filter(obj)) {
                if (first) return obj;
                match.push(obj);
            }
        }
        return (first) ? undefined : match;
    }

    /**
     * get fg tile index at given x,y
     */
    getfg(x, y) {
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
    getbg(x, y) {
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
        if (this.dbg) console.log("placed character: " + chr + " at: " + sp.x + "," + sp.y);
    }

    addObject(item) {
        this.objects.push(item);
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
        // update npcs
        for(let i=0; i<this.npcs.length; i++){
            this.npcs[i].update(ctx);
        }
        // update enemies
        for(let i=0; i<this.enemies.length; i++){
            this.enemies[i].update(ctx);
        }
        // update game objects
        for(let i=0; i<this.objects.length; i++){
            this.objects[i].update(ctx);
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
        let mini = Math.max(0,Math.floor(camera.x/this.sketchWidth));
        let minj = Math.max(0,Math.floor(camera.y/this.sketchWidth));
        let maxi = Math.min(this.width, Math.floor(camera.maxx/this.sketchWidth)+1);
        let maxj = Math.min(this.height, Math.floor(camera.maxy/this.sketchHeight)+1);
        // render bg
        let y = minj * this.sketchHeight;
        for (let j=minj; j<maxj; j++) {
            let idx = this.idxfromij(mini, j);
            let x = mini * this.sketchWidth;
            for (let i=mini; i<maxi; i++) {
                if (this.bgsketches[idx]) {
                    this.bgsketches[idx].render(ctx, x, y);
                }
                x += this.sketchWidth;
                idx++;
            }
            y += this.sketchHeight;
        }

        // sort tiles/object/enemies/npcs/player by y
        let sorted = new SortedGroup((v1,v2) => (v1.y-v2.y));
        let overlay = new SortedGroup((v1,v2) => (v1.y-v2.y));
		for(var i=0; i<this.objects.length; i++){
            let obj = this.objects[i];
            if (!obj.visible) continue;
            if (camera.containsRect(obj.x, obj.y, this.sketchWidth, this.sketchHeight)) {
                if (props.bgr(obj.tileid)) {
                    obj.draw();
                } else {
                    if (obj.overlay) {
                        overlay.add(obj);
                    } else {
                        sorted.add(obj);
                    }
                }
            }
		}
		for(let i=0; i<this.enemies.length; i++){
            let enemy = this.enemies[i];
            if (!enemy.visible) continue;
            if (camera.containsRect(enemy.x, enemy.y, this.sketchWidth, this.sketchHeight)) {
                if (props.bgr(enemy.tileid)) {
                    enemy.draw();
                } else {
                    sorted.add(enemy);
                }
            }
		}
		for(let i=0; i<this.npcs.length; i++){
            let npc = this.npcs[i];
            if (!npc.visible) continue;
            if (camera.containsRect(npc.x, npc.y, this.sketchWidth, this.sketchHeight)) {
                if (props.bgr(npc.tileid)) {
                    npc.draw();
                } else {
                    sorted.add(npc);
                }
            }
		}
        sorted.add(p1);
        y = minj * this.sketchHeight;
        for (let j=minj; j<maxj; j++) {
            let idx = this.idxfromij(mini, j);
            let x = mini * this.sketchWidth;
            for (let i=mini; i<maxi; i++) {
                let fid = this.fgi(idx);
                if (this.fgsketches[idx]) {
                    let sketch = this.fgsketches[idx];
                    let cx = x+this.halfWidth;
                    let cy = y+this.halfHeight;
                    let dx = cx-sketch.width*.5;
                    let dy = (sketch.height > this.sketchHeight) ? (cy - sketch.height + this.halfHeight) : cy-sketch.height*.5;
                    if (props.bgr(fid)) {
                        sketch.render(ctx, dx, dy);
                    } else {
                        sorted.add({x: cx, y: cy, draw: () => { sketch.render(ctx, dx, dy); }});
                    }
                }
                x += this.sketchWidth;
                idx++;
            }
            y += this.sketchHeight;
        }

        // render sorted
        for (const obj of sorted) {
            obj.draw();
        }

        // render overlay
        for (const obj of overlay) {
            obj.draw();
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
        this.dbgNoEnemy = spec.dbgNoEnemy || false;
        this.dbgNoNpc = spec.dbgNoNpc || false;
    }

    load(name, editor=false) {
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
            spec.name = name;
            if (editor) spec.editor = true;
            if (this.dbgNoEnemy) spec.dbgNoEnemy = true;
            if (this.dbg) spec.dbg = true;
            lvl = new Level(spec);
            this._cache[name] = lvl;
        }
        // assign current level
        currentLevel = lvl;
        if (this.dbg) console.log("finished loading level: " + name);
    }

    clear() {
        this._cache = {};
    }

}