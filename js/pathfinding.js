var unvisitedList = [];
var collisionDebugCounter = 0;

function SetupPathfindingGridData(whichPathfinder) {
    var endR = -1;
    var endC = -1;

    unvisitedList = [];
	var pathfinder = whichPathfinder;

    if(grid.length > 0) { // non-zero, copy over player set walls into tileGrid for reset
        for (var eachCol = 0; eachCol < currentLevel.width; eachCol++) {
            for (var eachRow = 0; eachRow < currentLevel.height; eachRow++) {
                var idxHere = currentLevel.idxfromij(eachCol, eachRow);
                if(grid[idxHere].elementType == VISITED ||
                    grid[idxHere].elementType == PATH) {
                   // tileGrid[idxHere] = NOTHING;
                } else {
                    //tileGrid[idxHere] = grid[idxHere].elementType;
                }
            }
        }
    }

    grid = [];

    for (var eachCol = 0; eachCol < currentLevel.width; eachCol++) {
        for (var eachRow = 0; eachRow < currentLevel.height; eachRow++) {
            var idxHere = currentLevel.idxfromij(eachCol, eachRow);

            grid[idxHere] = new GridElement();
			grid[idxHere].name = "" + eachCol + "," + eachRow;
			grid[idxHere].idx = idxHere;
			grid[idxHere].pathfinder = pathfinder;
            unvisitedList.push( grid[idxHere] );

            //grid[idxHere].setup(eachCol, eachRow, idxHere, roomGrid[idxHere], pathfinder);
            grid[idxHere].setup(eachCol, eachRow, idxHere, currentLevel.fgi(idxHere), pathfinder);

            //if(grid[idxHere].elementType == DEST) { ///// found end!
			if(grid[idxHere].elementType == TILE.GOAL) { ///// found end!
                endR = eachRow; ///// save tile coords for use with
                endC = eachCol; ///// computing h value of each tiles
            } /////
        }
    }

    collisionDebugCounter++;
    //next Loop Through Object to mark as impassible for pathFinding
    if(collisionDebugCounter == 2)console.log("-----");
    for (var i = 0; i < currentLevel.objects.length; i++){
      var centerX = currentLevel.objects[i].collider.x;// + currentLevel.objects[i].collider.width/2;
      var centerY = currentLevel.objects[i].collider.y;// + currentLevel.objects[i].collider.height/2;
      var colliderIdx = currentLevel.idxfromxy(centerX, centerY);
      if(grid[colliderIdx].isNotPassible(currentLevel.objects[i].tileid)){
        grid[colliderIdx].changeElement(22);
        if(collisionDebugCounter == 2)console.log(currentLevel.objects[i]);
      }
    } 
    if(collisionDebugCounter == 2)console.log("++++++");
	
     ///// different pass now that endR and endC are set, find h

    for (var eachCol = 0; eachCol < currentLevel.width; eachCol++) { /////
        for (var eachRow = 0; eachRow < currentLevel.height; eachRow++) { /////
            var idxHere = currentLevel.idxfromij(eachCol, eachRow); /////

            grid[idxHere].hVal =  /////
              hValCal(eachCol, eachRow, endC,endR, 3, true); /////
        } /////
    } /////
}

function hValCal(atColumn,atRow, toColumn,toRow, multWeight, geometric) { /////
  var diffC = atColumn - toColumn;
  var diffR = atRow - toRow;
  var geo = geometric;

  if(geo){
	return multWeight * Math.sqrt( diffC*diffC + diffR*diffR ); // geometric dist.
  } else {
    return multWeight * (Math.abs(diffC) + Math.abs(diffR)); ///// manhatten streets
  }
}

function startPath(toTile, pathFor){
	
    //if (toTile< 0 || toTile >= roomGrid.length) { // invalid or off board
    if (toTile< 0 || toTile >= currentLevel.nentries) { // invalid or off board
        console.log("Not a valid location");
		return;
    }
	
	SetupPathfindingGridData(pathFor);
	grid[toTile].setGoal();
	PathfindingNextStep(pathFor);
}

function PathfindingNextStep(whichPathfinder) {
    var tentativeDistance = 0;
	var pathfinder = whichPathfinder;
	var safetyBreak = 1000;
	var endTile = null;

      while(unvisitedList.length > 0 && safetyBreak-- > 0) { //// "while Q is not empty:"
        //// "u := vertex in Q with min dist[u]"
        var currentTile = null;
        var ctDistWithH; ///// a* with hVal heuristic added
        // console.log(unvisitedList.length);
        for (var i=0; i < unvisitedList.length; i++) {
          var compareTile = unvisitedList[i];
        
          if(currentTile == null || compareTile.distance + compareTile.hVal < ctDistWithH) { /////
            currentTile = compareTile;
            ctDistWithH = currentTile.distance + currentTile.hVal; /////
          }
        }
        
        arrayRemove(unvisitedList,currentTile); //// remove u from Q
     
        //// "for each neighbor v of u: //// where v has not yet been removed from Q"
        var neighborsStillInUnvisitedList = currentTile.myUnvisitedNeighbors();
        for (var i = 0; i < neighborsStillInUnvisitedList.length; i++) {
          var neighborTile = neighborsStillInUnvisitedList[i];
          
          ///// A* note: hVal is NOT part of these calls, would accumulate
          if (neighborTile.isTileType(NOTHING)) {
            tentativeDistance = currentTile.distance+1;
            neighborTile.setDistIfLess(tentativeDistance, currentTile);
            neighborTile.setTile(VISITED);
          } else if (neighborTile.isTileType(DEST)) {
            tentativeDistance = currentTile.distance+1;
            neighborTile.setDistIfLess (tentativeDistance, currentTile);
            endTile=neighborTile;
            unvisitedList = []; //// empty the unvisitedList since we've found the end
          }
        }
      
      } 
      
       { //// all nodes have been accounted for, work backward from end's tiles for path
             //// terminate the algorithm from taking further steps since we found what we needed
        if (endTile!=null) {
          //console.log("Best distance found: " + endTile.distance);
			if(endTile.distance == INFINITY_START_DISTANCE){
				console.log("No Valid Path Found");
			} else {
			  // walk backward from destination to create the path
			  var previousTile = endTile.cameFrom;
			  pathfinder.tilePath = [];
			  
			  pathfinder.tilePath.unshift(endTile.idx);
			  for (var pathIndex = endTile.distance; pathIndex>1; pathIndex--) {
				//console.log(previousTile.name);
				pathfinder.tilePath.unshift(previousTile.idx);
				previousTile.setTile(PATH);  
				previousTile = previousTile.cameFrom;  
			  }
			}
		}
      }
}

function arrayContains(arr, obj) {
    var arrLen = arr.length;
    for (var i = 0; i < arrLen; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
function arrayRemove(arr, obj) {
    for (var i = arr.length-1; i >= 0; i--) {
        if (arr[i] === obj) {
            arr.splice(i,1);
            return;
        }
    }
}