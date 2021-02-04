var showRoomNumbers = true;

/*
var room_0 = new unexploredRoomClass(0, 0, 0, 6, 4, 0, 0,40, 0);
var room_1 = new unexploredRoomClass(1,11, 0, 2, 4,-20, 0, 10, 0);
var room_2 = new unexploredRoomClass(2,11, 4, 5, 8,-40, 0, 0, 0);
var room_3 = new unexploredRoomClass(3, 3, 7, 2, 5,-20, 8, 2, 0);
var room_4 = new unexploredRoomClass(4, 5, 7, 2, 5,-20, 8, 2, 0);
var room_5 = new unexploredRoomClass(5, 7, 7, 4, 5,-20, 8, 10,0);
var room_6 = new unexploredRoomClass(6,13, 0, 3, 3,-40, 0, 0, 0);
*/

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
	//roomNumber, xPos, yPos, width, length, xAdj, yAdj, wAdj, lAdj) {
		this.idxs = spec.idxs || [];
		this.roomNumber = spec.id || 1;
		this.unexploredRoom = true;
		console.log("setup room: " + this.roomNumber + " idxs: " + this.idxs);
		/*
		this.x = xPos * TILE_W + xAdj;
		this.y = yPos * TILE_H + yAdj;
		this.width = width * TILE_W + wAdj;
		this.length = length * TILE_H - lAdj;
		*/
	}
		
	playerExploredRooms(player) {
		if (!this.unexploredRoom) return;
		// test corners of collider against room idxs
		if (-1 != this.idxs.indexOf(player.colTLIdx)) {
			console.log("explored room: " + this.roomNumber);
			this.unexploredRoom = false;
			return;
		}
		if (-1 != this.idxs.indexOf(player.colTRIdx)) {
			console.log("explored room: " + this.roomNumber);
			this.unexploredRoom = false;
			return;
		}
		if (-1 != this.idxs.indexOf(player.colBLIdx)) {
			console.log("explored room: " + this.roomNumber);
			this.unexploredRoom = false;
			return;
		}
		if (-1 != this.idxs.indexOf(player.colBRIdx)) {
			console.log("explored room: " + this.roomNumber);
			this.unexploredRoom = false;
			return;
		}
		/*
		if(p1.x > this.x && p1.x < this.x + this.width && p1.y > this.y && p1.y < this.y + this.length) {
			this.unexploredRoom = false;
		}
		*/
	}	
	
	draw() {
		if(this.unexploredRoom){
			for (const idx of this.idxs) {
				let x = currentLevel.xfromidx(idx);
				let y = currentLevel.yfromidx(idx);
				colorRect(x,y, currentLevel.sketchWidth, currentLevel.sketchHeight, '#243751');
			}
			//if(this.roomNumber == 1){  //USED TO HELP IDENTIFY WHICH ROOM
			/*
				colorRect(this.x, this.y, this.width, this.length, '#243751');
				
				//additional ceiling required
				if(this.roomNumber == 1){
					colorRect(this.x-20, this.y, TILE_W, TILE_H, '#243751');
				}
				if(this.roomNumber == 2){
					colorRect(this.x + TILE_W * 2, this.y - TILE_H, TILE_W * 3, TILE_H, '#243751');
				}
				if(this.roomNumber == 3 || this.roomNumber == 4 || this.roomNumber == 5){
					colorRect(this.x - 20, this.y + TILE_H * 3, TILE_W, TILE_H+10, '#243751');
				}
				*/
//			} // used for helping identify rooms
		
		}
		
		
		
		if(showRoomNumbers){
			// FIXME
			//colorText("Room " + this.roomNumber, this.x, this.y+30);
		}
		
		
		
	}
}

/*
function drawDungeonCeilings(){
	if(unexploredRoom_1){
		colorRect(room_1_x, room_1_y, room_1_Width+40, room_1_Length, '#243751');
	}
	if(unexploredRoom_2){
		colorRect(room_2_x, room_2_y, room_2_Width+40, room_2_Length, '#243751');	
		colorRect(room_2_x-20, room_2_y, TILE_W, TILE_H, '#243751');
	}
	if(unexploredRoom_3){	
		colorRect(room_3_x, room_3_y-5, room_3_Width+40, room_3_Length, '#243751');
		colorRect(room_3_x + TILE_W * 2 - 20, room_3_y - TILE_H, TILE_W*4, TILE_H, '#243751');
	}
	
	if(unexploredRoom_5){	
		colorRect(room_5_x, room_5_y, room_5_Width, room_5_Length, '#243751');
		colorRect(room_5_x-20, room_5_y+TILE_H*3, TILE_W, TILE_H+5, '#243751');
	}
	if(unexploredRoom_6){	
		colorRect(room_6_x, room_6_y, room_6_Width, room_6_Length, '#243751');
		colorRect(room_6_x-20, room_6_y+TILE_H*3, TILE_W, TILE_H+5, '#243751');
	}
	if(unexploredRoom_7){	
		colorRect(room_7_x, room_7_y, room_7_Width, room_7_Length, '#243751');
		colorRect(room_7_x-20, room_7_y+TILE_H*3, TILE_W, TILE_H+5, '#243751');
	}
	if(unexploredRoom_8){	
		colorRect(room_8_x, room_8_y, room_8_Width, room_8_Length, '#243751');
	}
	
	if(showRoomNumbers){
		colorText("Room 1", room_1_x, room_1_y+30);
		colorText("Room 2", room_2_x, room_2_y+30);
		colorText("Room 3", room_3_x, room_3_y+30);
		//colorText("Room 4", room_4_x, room_4_y+30);
		colorText("Room 5", room_5_x, room_5_y+30);
		colorText("Room 6", room_6_x, room_6_y+30);
		colorText("Room 7", room_7_x, room_7_y+30);
		colorText("Room 8", room_8_x, room_8_y+30);
	}	
} */