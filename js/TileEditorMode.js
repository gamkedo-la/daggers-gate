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
let editing_level = "BG"
let template_width = 16;
let template_height = 12;
let template_bg_Map = [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
                        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
						10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ];

// let template_fg_Map = [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
// 						 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, ];


let template_room_Map = [	 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
							 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, ];

let template_fg_Map = new Array(template_width * template_height);
let empty_bg_Map = template_bg_Map.slice();
let empty_fg_Map = template_fg_Map.slice(); // formerly  blank_Map
let empty_room_Map = template_room_Map.slice();
let editorLvl;

function startEditor() {
	editorLvl = new Level({
		bg: template_bg_Map.slice(),
		fg: blank_Map,
		width: template_width,
		height: template_height,
	});
}

function setStoredTileValue(val) {
	storedTileValue = val;
	console.log(storedTileValue)

	return storedTileValue;
}

function setupTileButtons() {
	let editButtonContainer = document.getElementById('edit-buttons');
	let levelButtonContainer = document.getElementById('level-buttons')
	let tileButtonContainer = document.getElementById('tile-buttons');
	let htmlString = "";
	let i;
	for (const asset of assets) {
		// skip non-image assets
		if (!asset.img || !asset.hasOwnProperty("id")) continue;
		htmlString += `<input id=${asset.id} type='image' src=${asset.src} onClick="setStoredTileValue(${asset.id})"></input> `;
	}

	tileButtonContainer.innerHTML += htmlString;

	// Creates the -Generate Level- Button
	let btn_Generate = document.createElement('button');
	btn_Generate.innerHTML = 'Generate Level Data';
	btn_Generate.addEventListener('click', generateReadableMapData);
	editButtonContainer.appendChild(btn_Generate);

	// Creates the -Clear Map- Button
	let btn_Clear = document.createElement('button');
	btn_Clear.innerHTML = 'Clear Map';
	btn_Clear.addEventListener('click', clearMapData);
	editButtonContainer.appendChild(btn_Clear);

	// Creates the -Load Map- Button
	let btn_Load = document.createElement('button');
	btn_Load.innerHTML = 'Load Map';
	btn_Load.addEventListener('click', generateLoadableMapButtons);
	editButtonContainer.appendChild(btn_Load);


	// Creates the -BG Level- Button
	let btn_edit_bg = document.createElement('button');
	btn_edit_bg.innerHTML = 'BG Level';
	btn_edit_bg.addEventListener('click', function() { setEditingLevel("BG") });
	editButtonContainer.appendChild(btn_edit_bg);

	// Creates the -FG Level- Button
	let btn_edit_fg = document.createElement('button');
	btn_edit_fg.innerHTML = 'FG Level';
	btn_edit_fg.addEventListener('click', function() { setEditingLevel("FG") });
	editButtonContainer.appendChild(btn_edit_fg);

	// Creates the -Room Level- Button
	let btn_edit_room = document.createElement('button');
	btn_edit_room.innerHTML = 'Room Level';
	btn_edit_room.addEventListener('click', function() { setEditingLevel("ROOM") });
	editButtonContainer.appendChild(btn_edit_room);
}

function generateReadableMapData() {
	let mapString = blank_Map+'';
	let readableMapString ='[ ' + mapString.replace(/,/g , ", ") + ' ]';
	
	console.log(readableMapString)
}

function clearMapData() {
	if (confirm("You REALLY want to clear all tiles from the map?")) {
		blank_Map = template_fg_Map.slice();
		console.log( "Map is CLEARED" )
	} else {
	return;
	}
}

function setEditingLevel(whichLevel) {
	console.log(whichLevel);

	editing_level = whichLevel;
}

function generateLoadableMapButtons() {
	let loadMapButtonsContainer = document.getElementById('load-maps');
	let htmlString = "";
	console.log("making map buttons..")

	for(const map of allMaps) {
		//htmlString += `<input id=${map.id} type="button" onClick="loadMap(${map.data})"></input> `;
		let btn = document.createElement('button');
		btn.innerHTML = `${map.name}`;
		btn.addEventListener('click', function() { loadMap(map.data); });
		loadMapButtonsContainer.appendChild(btn);
	}
	
}

function loadMap(whichMap) {
	console.log("Loaded Map");
	console.log(whichMap);
	blank_Map = whichMap;
}


