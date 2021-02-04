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

let template_new_Map = [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
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

let blank_Map = template_new_Map.slice(); // formerly  blank_Map


function setStoredTileValue(val) {
	storedTileValue = val;
	console.log(storedTileValue)

	return storedTileValue;
}

function setupTileButtons() {
	let editButtonContainer = document.getElementById('edit-buttons');
	
	let tileButtonContainer = document.getElementById('editor-mode');
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

}

function generateReadableMapData() {
	let mapString = blank_Map+'';
	let readableMapString ='[ ' + mapString.replace(/,/g , ", ") + ' ]';
	
	console.log(readableMapString)
}

function clearMapData() {
	// let blank_Map = template_new_Map.slice();
	if (confirm("You REALLY want to clear all tiles from the map?")) {
		blank_Map = template_new_Map.slice();
		console.log( "Map is CLEARED" )
	} else {
	return;
	}
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


