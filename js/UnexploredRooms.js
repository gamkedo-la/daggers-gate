var showRoomNumbers = true;

var unexploredRoom_1 = true;
var room_1_x = 0;
var room_1_y = 0;
var room_1_Width = 6 * TILE_W;
var room_1_Length = 4 * TILE_H;

var unexploredRoom_2 = true;
var room_2_x = 11 * TILE_W - 20;
var room_2_y = 0 * TILE_H;
var room_2_Width = 2 * TILE_W - 30;
var room_2_Length = 4 * TILE_H;

var unexploredRoom_3 = true;
var room_3_x = 11 * TILE_W - 20;
var room_3_y = 4 * TILE_H;
var room_3_Width = 5 * TILE_W;
var room_3_Length = 8 * TILE_H;

/*var unexploredRoom_4 = true;
var room_4_x = 11 * TILE_W - 20;
var room_4_y = 0 * TILE_H;
var room_4_Width = 5 * TILE_W - 30;
var room_4_Length = 4 * TILE_H; */

var unexploredRoom_5 = true;
var room_5_x = 3 * TILE_W - 20;
var room_5_y = 7 * TILE_H + 8;
var room_5_Width = 2 * TILE_W+2;
var room_5_Length = 5 * TILE_H;

var unexploredRoom_6 = true;
var room_6_x = 5 * TILE_W - 20;
var room_6_y = 7 * TILE_H + 8;
var room_6_Width = 2 * TILE_W+2;
var room_6_Length = 5 * TILE_H;

var unexploredRoom_7 = true;
var room_7_x = 7 * TILE_W - 20;
var room_7_y = 7 * TILE_H + 8;
var room_7_Width = 4 * TILE_W+10;
var room_7_Length = 5 * TILE_H;

var unexploredRoom_8 = true;
var room_8_x = 13 * TILE_W - 40;
var room_8_y = 0 * TILE_H;
var room_8_Width = 3 * TILE_W+2;
var room_8_Length = 3 * TILE_H;


function playerExploredRooms(){
	console.log
	console.log(room_1_x, room_1_x + room_1_Width, room_1_y, room_1_y + room_1_Length);
	  
	if(p1.x > room_1_x && p1.x < room_1_x + room_1_Width && p1.y > room_1_y && p1.y < room_1_y + room_1_Length) {
		unexploredRoom_1 = false;
	}
	if( p1.x > room_2_x && p1.x < room_2_x + room_2_Width && p1.y > room_2_y && p1.y < room_2_y + room_2_Length){
		unexploredRoom_2 = false;
	}
	if(p1.x > room_3_x && p1.x < room_3_x + room_3_Width && p1.y > room_3_y && p1.y < room_3_y + room_3_Length){
		unexploredRoom_3 = false;
	}
	if(p1.x > room_5_x && p1.x < room_5_x + room_5_Width && p1.y > room_5_y && p1.y < room_5_y + room_5_Length){
		unexploredRoom_5 = false;
	}
	if(p1.x > room_6_x && p1.x < room_6_x + room_6_Width && p1.y > room_6_y && p1.y < room_6_y + room_6_Length){
		unexploredRoom_6 = false;
	}
	if(p1.x > room_7_x && p1.x < room_7_x + room_7_Width && p1.y > room_7_y && p1.y < room_7_y + room_7_Length){
		unexploredRoom_7 = false;
	}
	if(p1.x > room_8_x && p1.x < room_8_x + room_8_Width && p1.y > room_8_y && p1.y < room_8_y + room_8_Length){
		unexploredRoom_8 = false;
	}
	
}

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
	
}