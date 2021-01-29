 /*
	-draw the a blank tiled map
	-create image-buttons for each different tile
	-image-button stores Tile_id
	-click on blank map tiles to store value of tile at map-index
	-refresh map
	-when done editing a map, click --"CREATE MAP DATA"-- to display "text version" of Map data.
	-create more
	-when done editing, click --"Return To Title Screen"-- to leave Editor Mode
*/

let storedTileValue;
let cleanMap = [	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

let freshMap = [ 	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			 		1, 0, 6, 6, 8, 4, 1, 1, 1, 1, 1, 1, 7, 4, 7, 1,
					1, 0, 1, 1, 1, 1, 1, 1, 8, 6, 0, 5, 0, 0, 0, 1, 
			 		1, 0, 1, 1, 1, 7, 5, 0, 6, 6, 1, 1, 0, 0, 0, 1, 
			 		1, 0, 1, 1, 0, 7, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 
			 		1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1,
			 		1, 5, 1, 1, 1, 1, 4, 0, 0, 0, 0, 5, 0, 0, 0, 1, 
			 		1, 6, 6, 6, 6, 1, 0, 0, 0, 0, 0, 1, 6, 1, 1, 1, 
			 		1, 1, 1, 1, 6, 1, 4, 0, 0, 0, 0, 1, 6, 1, 4, 1, 
			 		1, 3, 1, 1, 6, 1, 1, 1, 0, 1, 1, 1, 6, 1, 6, 1, 
			 		1, 0, 0, 6, 8, 1, 1, 1, 0, 1, 1, 1, 6, 6, 6, 1, 
			 		1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1 ]


function setStoredTileValue(val) {
	storedTileValue = val;
	console.log(storedTileValue)

	return storedTileValue;
}

var imageList = [
		// {varName: warriorPic, theFile: "warrior.png"},
		// MUST ADD " images/ " to theFile string - There's no function to add it for us
		// MUST ADD "tileValue" key to objects; Used for creating IDs for tile buttons AND storedTileValue

		{varName:playerPic, 		theFile:"images/basicPlayerSprite-25.png"},
		{varName:goblinPic, 		theFile:"images/goblin.png"},
		{varName:fireRunePic, 		theFile:"images/fireRune.png"},
		{varName:windRunePic, 		theFile:"images/windRune.png"},
		{varName:waterRunePic, 		theFile:"images/waterRune.png"},
		{varName:earthRunePic, 		theFile:"images/earthRune.png"},
	
    	{tileType:TILE_GROUND, 		theFile:"images/world_ground.png",			tileValue: 0},
    	{tileType:TILE_WALL_1, 		theFile:"images/dungeonWall_1.png",		tileValue: 6},
    	{tileType:TILE_WALL_2, 		theFile:"images/dungeonWall_2.png",		tileValue: 7},
    	{tileType:TILE_WALL_3, 		theFile:"images/dungeonWall_3.png",		tileValue: 8},
    	{tileType:TILE_WALL_4, 		theFile:"images/dungeonWall_4.png",		tileValue: 9},
    	{tileType:TILE_WALL_5, 		theFile:"images/dungeonWall_5.png",		tileValue: 10},
    	{tileType:TILE_WALL_6, 		theFile:"images/dungeonWall_6.png",		tileValue: 11},
		{tileType:TILE_WALL_7, 		theFile:"images/dungeonWall_7.png",		tileValue: 12},
    	{tileType:TILE_WALL_8, 		theFile:"images/dungeonWall_8.png",		tileValue: 1},
    	{tileType:TILE_WALL_9, 		theFile:"images/dungeonWall_9.png",		tileValue: 14},
		{tileType:TILE_WALL_10, 	theFile:"images/dungeonWall_10.png",		tileValue: 15},
		{tileType:TILE_WALL_11, 	theFile:"images/dungeonWall_11.png",		tileValue: 16},
		{tileType:TILE_WALL_12, 	theFile:"images/dungeonWall_12.png",		tileValue: 17},
		{tileType:TILE_WALL_13, 	theFile:"images/dungeonWall_13.png",		tileValue: 18},
		{tileType:TILE_WALL_14, 	theFile:"images/dungeonWall_14.png",		tileValue: 20},
		{tileType:TILE_WALL_15, 	theFile:"images/dungeonWall_15.png",		tileValue: 31},
    	{tileType:TILE_GOAL, 		theFile:"images/world_goal.png",			tileValue: 3},
    	{tileType:TILE_KEY, 		theFile:"images/world_key.png",			tileValue: 4},

    	{tileType:TILE_DOOR_YELLOW_FRONT, 	theFile:"images/yellowDoor_Front.png",				tileValue: 19},	
    	{tileType:TILE_DOOR, 				theFile:"images/world_door.png",					tileValue: 5},
		{tileType:TILE_FLOOR_FIRE_RUNE, 	theFile:"images/floorTileForFireRune.png",			tileValue: 36},
		{tileType:TILE_FLOOR_WATER_RUNE, 	theFile:"images/floorTileForWaterRune.png",		tileValue: 37},
		{tileType:TILE_FLOOR_WIND_RUNE, 	theFile:"images/floorTileForWindRune.png",			tileValue: 38},
		{tileType:TILE_FLOOR_EARTH_RUNE, 	theFile:"images/floorTileForEarthRune.png",		tileValue: 39}

	];

function setupTileButtons() {
	let tileButtonContainer = document.getElementById('editor-mode');
	let htmlString = "";
	let i;
	for(i=7; i<imageList.length; i++) {
		htmlString += `<input id=${imageList[i].tileValue} type='image' src=${imageList[i].theFile} onClick="setStoredTileValue(${imageList[i].tileValue})"></input> `;
	} // end of Loop

	tileButtonContainer.innerHTML += htmlString;

	// Creates the Generate Level Button
	let btn = document.createElement('button');
	btn.innerHTML = 'Generate Level Data';
	btn.addEventListener('click', generateReadableMapData);
	tileButtonContainer.appendChild(btn);

	// Creates the Clear Map Button
	let el_clearBtn = document.createElement('button');
	el_clearBtn.innerHTML = 'Clear Map';
	el_clearBtn.addEventListener('click', clearMapData);
	tileButtonContainer.appendChild(el_clearBtn);

}

function generateReadableMapData() {
	let freshMapText = freshMap+'';
	let readableString ='[ ' + freshMapText.replace(/,/g , ", ") + ' ]';
	
	console.log(readableString)
}

function clearMapData() {
	let newCleanMap = cleanMap.slice();
	if (confirm("You REALLY want to clear all tiles from the map?")) {
		freshMap = newCleanMap;
		console.log( "Map is CLEARED" )
	} else {
	return;
	}
}


