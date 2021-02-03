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

let template_newMap = [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
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
let _newMap = template_newMap.slice();


function setStoredTileValue(val) {
	storedTileValue = val;
	console.log(storedTileValue)

	return storedTileValue;
}

function setupTileButtons() {
	let tileButtonContainer = document.getElementById('editor-mode');
	let htmlString = "";
	let i;
	for (const asset of assets) {
		// skip non-image assets
		if (!asset.img || !asset.hasOwnProperty("id")) continue;
		htmlString += `<input id=${asset.id} type='image' src=${asset.src} onClick="setStoredTileValue(${asset.id})"></input> `;
	}

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
	let mapString = _newMap+'';
	let readableMapString ='[ ' + mapString.replace(/,/g , ", ") + ' ]';
	
	console.log(readableMapString)
}

function clearMapData() {
	// let _newMap = template_newMap.slice();
	if (confirm("You REALLY want to clear all tiles from the map?")) {
		_newMap = template_newMap.slice();
		console.log( "Map is CLEARED" )
	} else {
	return;
	}
}



