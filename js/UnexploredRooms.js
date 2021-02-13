var showRoomNumbers = false;

class unexploredRoomClass {

	static specsFromGrid(grid) {
		let specs = [];
		let areas = {};
		for (let idx=0; idx<grid.length; idx++) {
			let id = grid[idx];
			if (id) {
				if (!areas.hasOwnProperty(id)) areas[id] = [];
				let idxs = areas[id];
				idxs.push(idx);
			}
		}
		for (const [id, idxs] of Object.entries(areas)) {
			let spec = {
				id: id,
				idxs: idxs,
			}
			specs.push(spec);
		}
		return specs;
	}
	static fromGrid(grid) {
		let specs = this.specsFromGrid(grid);
		let rooms = [];
		for (const spec of specs) {
			let room = new unexploredRoomClass(spec);
			rooms.push(room);
		}
		return rooms;
	}

	constructor(spec={}) {
		this.idxs = spec.idxs || [];
		this.roomNumber = spec.id || 1;
		this.unexploredRoom = true;
	}
		
	playerExploredRooms(player) {
		if (!this.unexploredRoom) return;
		// test corners of collider against room idxs
		for(const idx of player.interactCollider.tileIndices) {
			if (-1 != this.idxs.indexOf(idx)) {
				this.unexploredRoom = false;
				return;
			}
		}
	}	
	
	draw() {
		if(this.unexploredRoom && cheatSeeThroughCeiling == false){
			for (const idx of this.idxs) {
				let x = currentLevel.xfromidx(idx);
				let y = currentLevel.yfromidx(idx);
				colorRect(x,y, currentLevel.sketchWidth, currentLevel.sketchHeight, '#243751');
				if(showRoomNumbers) {
					colorText(this.roomNumber, x+currentLevel.halfWidth, y+currentLevel.halfHeight, "rgba(255,255,0,.5)");
				}
			}
		}
		
		
		
		
	}
}